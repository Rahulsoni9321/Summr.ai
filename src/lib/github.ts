import { Octokit } from "octokit";
import { db } from "~/server/db";
import { summarizeCommits } from "./gemini-setup";

import axios from "axios";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

interface Response {
    commitHash: string,
    commitMessage: string,
    commitAuthorName: string,
    commitAuthorAvatar: string,
    commitDate: string
}

export const pollCommits = async (projectId: string) => {

    const { Url } = await fetchProjectGithubUrl(projectId)
    const commitHashes = await getcommitHashes(Url);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    const getSummary = await Promise.allSettled(unprocessedCommits.map(async (commits) => {
        return await generateSummary(Url, commits.commitHash)
    }))

    const summarises = getSummary.map((response) => {
        if (response.status === "fulfilled")
            return response.value as string

        else
            return ""
    })
    const populateCommits = await db.commit.createMany({
        data: summarises.map((summary, index) => {

            return {
                projectId: projectId,
                commitHash: unprocessedCommits[index]!.commitHash,
                commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
                commitMessage: unprocessedCommits[index]!.commitMessage,
                commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
                summary
            }
        })
    })
    return populateCommits;
}

export async function getcommitHashes(githubUrl: string): Promise<Response[]> {
    const [owner, repo] = githubUrl.split('/').splice(-2);
    if (!owner || !repo) {
        throw new Error("GithubUrl is not correct.")
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner: owner!,
        repo: repo!
    })

    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author?.date).getTime() - new Date(a.commit.author?.date).getTime()) as any[];

    return sortedCommits.slice(0, 6).map((commits: any) => ({
        commitHash: commits.sha as string,
        commitAuthorAvatar: commits.author.avatar_url || "",
        commitMessage: commits.commit.message || "",
        commitAuthorName: commits.commit.author.name || "",
        commitDate: commits.commit.author.date || ""
    }))
}

export const generateSummary = async (Url: string, commitHash: any) => {
    const { data } = await axios.get(`${Url}/commit/${commitHash}.diff`, {
        headers: {
            Accept: 'application/vnd.github.v3.diff'
        }
    })
    return await summarizeCommits(data);

}

export const fetchProjectGithubUrl = async (projectId: string) => {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        select: {
            githubUrl: true
        }
    })
    if (!project?.githubUrl) {
        throw new Error("There is not github url associated with it.")
    }
    return { project, Url: project.githubUrl }
}

export const filterUnprocessedCommits = async (projectId: string, commitHashes: Response[]) => {
    const processedCommits = await db.commit.findMany({
        where: {
            projectId: projectId
        }
    })
    const unprocessedCommits = commitHashes.filter((commit: any) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash))
    return unprocessedCommits;
}

