import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github"
import { getEmbeddedContent, summarizeCode } from "./gemini-setup";
import { Document } from "@langchain/core/documents";
import { db } from "~/server/db";
import _ from "lodash";
const loadGithubRepo = async (githubUrl: string, githubToken?: string) => {
    try {
        const loadRepo = new GithubRepoLoader(githubUrl, {
        accessToken: githubToken || "",
        branch: 'main',
        ignoreFiles: ['package-lock.json', 'yarn-lock', 'pnpm-lock.yaml', 'bun.lockb', '.gitignore'
        ],
        recursive: true,
        unknown: 'warn',
        maxConcurrency: 5
    })

    const docs = await loadRepo.load();
    return docs;
}
    catch(error){
        console.error(error);
    }
}

export const indexGithubRepo = async (projectId: string, githubUrl: string, githubToken?: string) => {
    const docs = await loadGithubRepo(githubUrl, githubToken);
    console.log(`the length of the docs is ${docs!.length}`)
    const allEmbeddingValue = await generateEmbeddings(docs!);
    await Promise.allSettled(allEmbeddingValue.map(async (embeddingvalue, index) => {
        if (!embeddingvalue) return;

        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data: {
                projectId,
                summary: embeddingvalue.summary,
                fileName: embeddingvalue.fileName,
                content: embeddingvalue.sourceCode
            }
        })
        await db.$executeRaw`
        UPDATE "sourceCodeEmbedding"
        SET  "summaryEmbedding" = ${embeddingvalue.getEmbeddedValue}::vector
        WHERE "id"=${sourceCodeEmbedding.id} 
        `

    }))
}
export const generateEmbeddings = async (docs: Document[]) => {
    const batches = _.chunk(docs, 9);
    let returnedArray: any[] = [];
    for (const batch of batches) {
        const value = await Promise.all(batch.map(async (doc: Document) => {
            const summary = await summarizeCode(doc);
            const getEmbeddedValue = await getEmbeddedContent(summary);
            return {
                summary,
                getEmbeddedValue,
                sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                fileName: doc.metadata.source
            }
        })
        )
        returnedArray = [...returnedArray, ...value]
        await new Promise(resolve => setTimeout(resolve, 60000))
    }
    return returnedArray;
}



