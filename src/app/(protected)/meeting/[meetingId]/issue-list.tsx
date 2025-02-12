"use client";
import React, { useState } from "react";
import { VideoIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import { api, RouterOutputs } from "~/trpc/react";

type Props = {
  meetingId: string;
};

const IssueList = ({ meetingId }: Props) => {
  const { data: meeting, isLoading } = api.project.getMeetingById.useQuery({ meetingId });

  if (isLoading || !meeting) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 border-b pb-8 lg:mx-0 lg:max-w-none">
        <div className="flex items-center gap-x-6">
          <div className="rounded-full border bg-white p-3">
            <VideoIcon className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="text-sm leading-6 text-muted-foreground">
              Meeting on {new Date(meeting.createdAt).toLocaleDateString()}
            </div>
            <h1 className="text-xl mt-1 leading-6 text-gray-900 dark:text-gray-100 font-semibold">
              {meeting.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-4">
        {meeting.issue.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

const IssueCard = ({
  issue,
}: {
  issue: NonNullable<RouterOutputs["project"]["getMeetingById"]>["issue"][number];
}) => {
  const [openSummary, setOpenSummary] = useState(false);

  return (
    <>
      <Dialog open={openSummary} onOpenChange={setOpenSummary}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{issue.gist}</DialogTitle>
            <DialogDescription>
              Created on: {new Date(issue.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <p className="dark:text-gray-300 text-gray-800">{issue.headline}</p>
          <blockquote className="mt-2 border-l-4 border-gray-300 bg-gray-50 dark:bg-neutral-800 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {issue.start} - {issue.end}
            </p>
            <p className="italic font-medium leading-relaxed text-gray-900 dark:text-gray-100">
              {issue.summary}
            </p>
          </blockquote>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{issue.gist}</CardTitle>
          <div className="border-b"></div>
          <CardDescription>{issue.headline}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"default"} onClick={() => setOpenSummary(true)}>
            View Details
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default IssueList;
