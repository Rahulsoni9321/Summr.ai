import { AssemblyAI } from "assemblyai";

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLY_API_KEY || process.env.NEXT_PUBLIC_ASSEMBLY_API_KEY;

if (!ASSEMBLYAI_API_KEY) {  
    throw new Error('Please define the ASSEMBLYAI_API_KEY environment variable inside .env');
}

const client = new AssemblyAI({
    apiKey:ASSEMBLYAI_API_KEY!
})

function msToTime(ms:number) {
    const seconds = ms/1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export async function summarizeMeeting(fileUrl:string) {
 console.log("called summarize meeting.")
 const transcript = await client.transcripts.transcribe({
    audio: fileUrl,
    auto_chapters:true,    
  });

  if ( transcript.status !== 'completed') {
    throw new Error('Summarization of the meeting failed');
  }

  const summaries = transcript.chapters!.map(chapter => {
    return {
        start:msToTime(chapter.start),
        end:msToTime(chapter.end),
        gist:chapter.gist,
        headline:chapter.headline,
        summary:chapter.summary
    }
    })
  return {summaries};
}

// const FILE_URL =
//   'https://assembly.ai/sports_injuries.mp3'

//   const response = await summarizeMeeting(FILE_URL);
//   console.log(response);