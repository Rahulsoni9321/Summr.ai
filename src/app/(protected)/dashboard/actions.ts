'use server'

import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { getEmbeddedContent } from '~/lib/gemini-setup';
import { db } from '~/server/db';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function askQuestion(question: string, projectId: string) {
    const stream = createStreamableValue();

    const queryVector = await getEmbeddedContent(question);
    
    const vectorQuery = `[${queryVector.join(',')}]`;
    
    
   
   
    const result = await db.$queryRaw`
    SELECT "fileName", "summary", "content",
    1 -("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "sourceCodeEmbedding"
    WHERE 1 -("summaryEmbedding" <=> ${vectorQuery}::vector) > .5  
    AND "projectId" = ${projectId}  
    ORDER BY similarity DESC
    LIMIT 10
    ` as {fileName:string,content:string,summary:string}[]
   
   
   
    let context = '';

    for (const doc of result ) {
      context += `source : ${doc.fileName}\n code content: ${doc.content}\n summary of code:${doc.summary}\n\n`
    }

    (async ()=>{
        const {textStream} = await streamText({
            model:google('gemini-1.5-flash'),
            prompt:`
            You are an expert assistant designed to answer user questions related to a specific codebase. The user will provide you with the following information:

fileName: The names of the files in the codebase.
summary: A brief explanation of the purpose of each file.
content: The actual content of the files (if applicable).

START OF CONTEXT BLOCK
${context}
END OF CONTEXT BLOCK 

START OF QUESTION
${question}
END OF QUESTION

Your Behavior:

You must only answer questions directly related to the provided codebase.
If the question pertains to any of the provided files, give a detailed, step-by-step explanation to address the query.
If the question is outside the scope of the provided context or information, respond with:
"I'm sorry, but I can only answer questions related to the codebase context provided. Please clarify your query or provide additional context."

Avoid making assumptions or fabricating details about code or features not explicitly described in the provided information.
Focus on being accurate, concise, and user-friendly in your responses.
Follow these instructions strictly and ensure the answers remain relevant to the user's input and the provided context.
            `
        });

        for await (const delta of textStream) {
          stream.update(delta);
        }

        stream.done()
    })()

    return {
        output:stream.value,
        filesReferenced: result
    }

}