import { GoogleGenerativeAI } from "@google/generative-ai";
import {GithubRepoLoader} from "@langchain/community/document_loaders/web/github"
import { getEmbeddedContent, summarizeCode } from "./gemini-setup";
import { Document } from "@langchain/core/documents";
import { db } from "~/server/db";
const loadGithubRepo = async (githubUrl:string,githubToken?:string)=>{
    const loadRepo = new GithubRepoLoader(githubUrl,{
     accessToken:githubToken || "",
     branch:'main',
     ignoreFiles:['package-lock.json','yarn-lock','pnpm-lock.yaml','bun.lockb'
     ],
     recursive:true,
     unknown:'warn',
     maxConcurrency:5
    })

    const docs = await loadRepo.load();
    return docs;
}

export const indexGithubRepo = async (projectId:string,githubUrl:string,githubToken?:string)=>{
    const docs = await loadGithubRepo(githubUrl,githubToken);
    const allEmbeddingValue = await generateEmbeddings(docs);
    await Promise.allSettled(allEmbeddingValue.map(async (embeddingvalue,index)=>{
        if (!embeddingvalue) return;
        const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
            data:{
                projectId,
                summary:embeddingvalue.summary,
                fileName:embeddingvalue.fileName,
                content:embeddingvalue.sourceCode 
            }
        }) 
        await db.$executeRaw`
        UPDATE "sourceCodeEmbedding"
        SET  "summaryEmbedding" = ${embeddingvalue.getEmbeddedValue}::vector
        WHERE "id"=${sourceCodeEmbedding.id} 
        `

    }) )
}
export const generateEmbeddings=async (docs:Document[])=>{
    return await Promise.all(docs.map(async (doc:Document)=>{
        const summary = await summarizeCode(doc);
        const getEmbeddedValue = await getEmbeddedContent(summary);
       return {
        summary,
        getEmbeddedValue,
        sourceCode:JSON.parse(JSON.stringify(doc.pageContent)),
        fileName:doc.metadata.source
       }
    })
)
}



// console.log(await loadGithubRepo('https://github.com/Rahulsoni9321/Portfolio'))