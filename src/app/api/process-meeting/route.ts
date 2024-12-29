import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { summarizeMeeting } from "~/lib/assembly";
import { db } from "~/server/db";


const bodyParser = z.object({
    meetingUrl: z.string(),
    meetingId: z.string()
})

export const maxDuration = 60; // 5 minutes

export async function POST(req: NextRequest, res: NextResponse) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }
    try {
        const body = await req.json();
        const { meetingUrl, meetingId } = bodyParser.parse(body);
        console.log("Inside post request.")
        const { summaries } = await summarizeMeeting(meetingUrl);
        await db.issue.createMany({
            data: summaries.map(summary => ({
                meetingId,
                start: summary.start,
                end: summary.end,
                gist: summary.gist,
                headline: summary.headline,
                summary: summary.summary,
            })),

        })

        await db.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                status: 'COMPLETED',
                name: summaries[0]!.headline,
            }
        })
        return NextResponse.json({ success: true }, { status: 200 });
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}