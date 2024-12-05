"use client"
import { Github, LucideGithub, Plus } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react";

interface useFormInput {
    projectName: string,
    githubUrl: string,
    githubToken?: string
}
const CreateProject = () => {
    const { register, handleSubmit, reset } = useForm<useFormInput>()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch();
    const onSubmit = (data: useFormInput) => {
        createProject.mutate({
            name: data.projectName,
            githubUrl: data.githubUrl,
            githubToken: data.githubToken
        }, {
            onSuccess: () => {
                toast.success('Project created successfully.')
                refetch();
                reset()
            },
            onError: () => {
                toast.error('Failed to create Project')
            }
        })

    }
    return (
        <div className="h-full w-full flex justify-center items-center gap-12 text-black">
            <img src={"images.jpg"} alt="man working" width={200} height={200}></img>
            <div className="flex flex-col gap-5">
                <div className="">

                    <h1 className="font-bold xl:text-2xl 2xl:text-3xl flex items-center gap-2">Link Your Github Repository <Github className="size-8"></Github></h1>
                    <p className="text-sm text-muted-foreground text-center">Enter your Github respository to link</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('projectName', { required: true })} placeholder="Project Name"></Input>
                    <div className="h-4"> </div>
                    <Input {...register('githubUrl', { required: true })} type="url" placeholder="Github Url"></Input>
                    <div className="h-4"> </div>
                    <Input {...register('githubToken')} placeholder="Github Token (Optional)"></Input>
                    <div className="h-5"></div>
                    <Button type="submit" disabled={createProject.isPending}>Create Project <Plus></Plus></Button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject;
