import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";


const GEMINI_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_KEY) {
    throw new Error("GEMINI_API is invalid")
}
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You are an expert programmer . ` });


export async function summarizeCommits(data: string) {
    try {
        const summary = await model.generateContent(`You give summary of the changes that have been made in the commit. Commit information is provided, You need to review the changes and create a summary out of it in a numeric point manner and summarize it taking maximum 10 lines lower than that will work as well.
            Here's the commit information
            ---
            ${data}
            ---`);
        return summary.response.text()
    }
    catch (error: any) {
        console.error(new GoogleGenerativeAIError(error.message))
    }
}

export async function summarizeCode(docs: Document) {
    try {
        const code = docs.pageContent.slice(0, 10000);
        const summary = await model.generateContent(`You are trying to explain the purpose of the ${docs.metadata.source} file to the user.
        Here's the code
        ---
        ${code}
        ---
        Try to summarize it in as minimum line as possible, don't repeat same point. Make the response in a bullet point and again don't make the response consuming huge number of lines, keep it short and suffice.`)
        return summary.response.text();
    }
    catch (error) {
        if (error instanceof GoogleGenerativeAIError) {
            return error.message
        }
        return "Something went wrong while summarizing code."
    }
}

export const getEmbeddedContent = async (summary: string):Promise<number[] > => {

    
        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const model = genAI.getGenerativeModel({
            model: 'text-embedding-004',
            systemInstruction: 'You are senior software engineer who have a very deep knowledge of tech. Now you are '
        })
        const embeddedContent = await model.embedContent(summary);
        return embeddedContent.embedding.values;
    
   

}