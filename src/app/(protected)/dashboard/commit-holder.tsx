import { ExternalLink } from "lucide-react";
import Link from "next/link";
import useProject from "~/hooks/use-project"
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const CommitHolder = () => {
    const { projectId, project } = useProject();
    const { data: commits } = api.project.getCommits.useQuery({ projectId })
    return (
        <>
            <ul className="space-y-6 ">
                {commits?.map((commit, commitIdx) => {
                    return <li key={commitIdx} className="relative flex gap-x-4 ">
                        <div className={cn(commitIdx === commits.length - 1 ? 'h-full' : '-bottom-6',
                            'absolute left-0 top-0 flex w-6  justify-center')}>
                            <div className="w-px translate-x-1 bg-gray-200"></div>
                        </div>
                        <>
                            <img src={commit.commitAuthorAvatar} alt={"githubAvatar"} className="size-8 flex-none mt-4  relative rounded-full bg-gray-50"></img>
                            <div className="flex-auto rounded-md dark:bg-black/90 bg-white p-3 ring-1 ring-inset ring-gray-200 dark:ring-gray-300/40">
                                <div className="flex justify-between gap-x-4 ">
                                    <Link href={`${project?.githubUrl}/commit/${commit.commitHash}`} target="_blank" className="py-0.5 text-xs leading-5">
                                        <span className="font-medium dark:text-gray-100 text-gray-900">
                                            {commit.commitAuthorName}</span> {" "}
                                        <span className="inline-flex items-center dark:text-gray-300">
                                            commited
                                            <ExternalLink className="size-4 ml-1"></ExternalLink>
                                        </span>  </Link>
                                </div>
                                <span className="font-semibold">
                                    {commit.commitMessage}
                                </span>
                                <pre className="leading-4 mt-2 whitespace-pre-wrap text-sm dark:text-muted-foreground text-gray-500">
                                    {commit.summary}
                                </pre>
                            </div>
                        </>

                    </li>
                })

                }

            </ul>
        </>
    )
}

export default CommitHolder