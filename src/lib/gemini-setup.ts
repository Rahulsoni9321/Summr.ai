import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";


const GEMINI_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_KEY) {
    throw new Error("GEMINI_API is invalid")
}
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: `You are an expert programmer who gives summary of the changes that have been made in the commit. Commit information is provided, You need to review the changes and create a summary out of it in a numeric point manner and summarize it taking maximum 9 lines lower than that will work as well. ` });


export async function summarizeCommits(data: string) {
    try {
        const summary = await model.generateContent(data);
        return summary.response.text()
    }
    catch (error: any) {
        console.error(new GoogleGenerativeAIError(error.message))
    }
}