import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "~/lib/github";
import { indexGithubRepo } from "~/lib/github-loader";

export const ProjectRouter = createTRPCRouter({
  createProject : protectedProcedure.input(
    z.object({
      name:z.string(),
      githubUrl:z.string(),
      githubToken:z.string().optional()
    })
  ).mutation(async ({ctx,input})=>{
    const project = await ctx.db.project.create({
      data:{
        githubToken:input.githubToken || "",
        name:input.name,
        githubUrl:input.githubUrl,
        userToProjects:{
          create:{
            userId:ctx.user.userId!
          }
        }
      }
    })

    await pollCommits(project.id)
    await indexGithubRepo(project.id,project.githubUrl,project.githubToken)
    return project;
  }),
  getProjects:protectedProcedure.query(async ({ctx})=>{
    const allProjects = await ctx.db.project.findMany({
      where:{
        userToProjects:{
          some:{
            userId:ctx.user.userId!
          }
        },
        deletedAt:null
      }
    })
    return allProjects;
  }),
  getCommits: protectedProcedure.input(z.object({
    projectId:z.string()
  })).query(async ({ctx,input})=>{
    pollCommits(input.projectId).then().catch(console.error);
    const allCommits = await ctx.db.commit.findMany({
      where:{
        projectId:input.projectId
      }
    }) 
    return allCommits;
  } )
})