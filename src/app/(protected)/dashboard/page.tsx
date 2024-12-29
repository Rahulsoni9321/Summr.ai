"use client"
import { Github, GithubIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import useProject from "~/hooks/use-project"
import CommitHolder from "./commit-holder";
import AskQuestionCard from "./askquestion-card";
import MeetingCard from "./meeting-card";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import useRefetch from "~/hooks/use-refetch";
const InviteButton = dynamic(() => import('./invite-button'), { ssr: false })
import TeamMemberButton from "./team-members-button";
import dynamic from "next/dynamic";

const Dashboard = () => {
  const { project, projectId } = useProject();
  const refetch = useRefetch();
  const archiveProject = api.project.archiveProject.useMutation();
  const handleArchive = () => {
    archiveProject.mutate({ projectId }, {
      onSuccess: () => {
        toast.success("Project archived successfully.")
        refetch()
      },
      onError: () => {
        toast.error('Failed to Archive the project.')
      }
    })
  }
  return (
    <div className=''>
      <div className="w-full flex items-center justify-between px-2">
        <Button className="h-12 bg-primary flex items-center flex-wrap gap-2">
          <GithubIcon className=" size-12" ></GithubIcon>
          <div>
            <p>This project is link to :</p>
          </div>
          <Link href={project?.githubUrl || ""} target="_blank" className="inline-flex gap-2 items-center underline underline-offset-1 hover:text-blue-300">{project?.githubUrl}
            <SquareArrowOutUpRight />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <TeamMemberButton></TeamMemberButton>
          <InviteButton />
          <Button variant={"secondary"} disabled={archiveProject.isPending} onClick={handleArchive} className="bg-sidebar border dark:border-sidebar-accent-foreground border-sidebar-border dark:text-white  text-black">Archive</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  gap-4 my-6 m-2 ">
        <AskQuestionCard />
        <MeetingCard></MeetingCard>
      </div>
      <CommitHolder></CommitHolder>
    </div>
  )
}
export default Dashboard