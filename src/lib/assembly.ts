import {AssemblyAI} from "assemblyai";


const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
// console.log(ASSEMBLYAI_API_KEY);
// if (!ASSEMBLYAI_API_KEY) {  
//     throw new Error('Please define the ASSEMBLYAI_API_KEY environment variable inside .env');
// }
const client = new AssemblyAI({
    apiKey:ASSEMBLYAI_API_KEY!
})

function msToTime(ms:number) {
    const seconds = ms/1000;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default async function summarizeMeeting(fileUrl:string) {
 
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

