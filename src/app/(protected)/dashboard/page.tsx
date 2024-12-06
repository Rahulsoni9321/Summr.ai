"use client"

import { UserButton } from "@clerk/nextjs";
import { Github,GithubIcon,SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import useProject from "~/hooks/use-project"
import CommitHolder from "./commit-holder";
import AskQuestionCard from "./askquestion-card";

const Dashboard = () => {
 
  
  const {project,projectId} = useProject();
  console.log(projectId);
  return (
    <div className=''>
       {project?.id}
      <div className="w-full flex items-center justify-between px-2">
       <Button className="h-12 bg-primary flex items-center flex-wrap gap-2">
        <GithubIcon className=" size-12" ></GithubIcon>
        <div>
          <p>This project is link to :</p>
        </div>
        <Link href={project?.githubUrl || ""} target="_blank" className="inline-flex gap-2 items-center underline underline-offset-1 hover:text-blue-300">{project?.githubUrl}
        <SquareArrowOutUpRight/>
        </Link>
        </Button>
        <div className="flex items-center gap-5">
          <UserButton></UserButton>
          <Button className="bg-sidebar border border-sidebar-border text-black">Invite a team Member!</Button>
          <Button className="bg-sidebar border border-sidebar-border text-black">Archive</Button>
          </div> 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5  gap-4 my-4 m-2 ">
        <AskQuestionCard/>
        <div className="col-span-2 border border-sidebar-border py-8 rounded-md my-2">
          AI Something
        </div>
      </div>
          <CommitHolder></CommitHolder>
    </div>
  )
}
export default Dashboard