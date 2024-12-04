"use client"

import { UserButton } from "@clerk/nextjs";
import { Github,GithubIcon,SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import useProject from "~/hooks/use-project"

const Dashboard = () => {
  const {project} = useProject();
  
  return (
    <div className=''>
        {project?.id}
      <div className="w-full flex items-center justify-between px-4">
       <Button className="h-12 bg-primary flex items-center flex-wrap gap-2">
        <GithubIcon className=" size-6" ></GithubIcon>
        <div>
          <p>This project is link to :</p>
        </div>
        <Link href={project?.githubUrl || ""} className="inline-flex gap-2 items-center underline underline-offset-1 hover:text-blue-400">{project?.githubUrl}
        <SquareArrowOutUpRight/>
        </Link>
        </Button>
        <div className="flex items-center gap-5">
          <UserButton></UserButton>
          <Button className="bg-sidebar border border-sidebar-border text-black">Invite a team Member!</Button>
          <Button className="bg-sidebar border border-sidebar-border text-black">Archive</Button>
          </div> 
      </div>
    </div>
  )
}
export default Dashboard