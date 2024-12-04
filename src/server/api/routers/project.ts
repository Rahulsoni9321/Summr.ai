import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "~/lib/github";

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

})