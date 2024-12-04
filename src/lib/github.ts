import { Octokit } from "octokit";
import { db } from "~/server/db";
import { api } from "~/trpc/react";
import { summarizeCommits } from "./gemini-setup";
import { Axis3DIcon } from "lucide-react";
import axios from "axios";

const ocktokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const githubUrl = 'https://github.com/docker/genai-stack'

interface Response {
    commitHash: string,
    commitMessage: string,
    commitAuthorName: string,
    commitAuthorAvatar: string,
    commitDate: string
}

export async function getcommitHashes(githubUrl: string): Promise<Response[]> {
    const [owner, repo] = githubUrl.split('/').splice(-2);
    const { data } = await ocktokit.rest.repos.listCommits({
        owner: owner!,
        repo: repo!
    })

    if (!owner || !repo) {
        throw new Error("GithubUrl is not correct.")
    }
    const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author?.date).getTime() - new Date(a.commit.author?.date).getTime()) as any[];

    return sortedCommits.slice(0, 8).map((commits: any) => ({
        commitHash: commits.sha as string,
        commitAuthorAvatar: commits.author.avatar_url ?? "",
        commitMessage: commits.commit.message ?? "",
        commitAuthorName: commits.commit.author.name ?? "",
        commitDate: commits.commit.author.date ?? ""
    }))
}



export const pollCommits = async (projectId: string) => {
    const { project, Url } = await fetchProjectGithubUrl(projectId)
    const commitHashes = await getcommitHashes(Url);
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
    const getSummary = await Promise.allSettled(unprocessedCommits.map(async (commits)=>{
       return await generateSummary(Url,commits.commitHash)
    }))

    const summarises = getSummary.map((response)=>{
        if (response.status === "fulfilled")
            return response.value as string

        else 
        return ""
    })
    const populateCommits = await db.commit.createMany({
        data:summarises.map((summary,index)=>{
            
            return {
                projectId:projectId,
                commitHash:unprocessedCommits[index]!.commitHash,
                commitAuthorName:unprocessedCommits[index]!.commitAuthorName,
                commitMessage:unprocessedCommits[index]!.commitMessage,
                commitAuthorAvatar:unprocessedCommits[index]!.commitAuthorAvatar,
                summary
            }
        })
    })
    return populateCommits;
}


export const generateSummary = async (Url:string,commitHash:any) => {
        const {data} = await axios.get(`${Url}/commit/${commitHash}.diff`,{
            headers:{
                Accept:'application/vnd.github.v3.diff'
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

console.log(await pollCommits("cm49iz3do0000yblyfz8l7iyq"))