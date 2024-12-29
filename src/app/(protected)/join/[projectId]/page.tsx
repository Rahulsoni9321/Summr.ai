import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "~/server/db"

type Props = {
    params:Promise <{projectId : string}>
}

const JoinHandler = async (props:Props) => {

    const {projectId} = await props.params
    const {userId} = await auth();
    
    if (!userId) return redirect("/sign-in")

    const findUser = await db.user.findFirst({
        where:{
            id:userId
        }
    })
    const client = await clerkClient();
    const user= await client.users.getUser(userId);
    if (!findUser) {
          await db.user.create({
            data:{
                id:userId,
                firstName:user.firstName,
                lastName:user.lastName,
                emailAddress:user.emailAddresses[0]!.emailAddress,
                imageUrl:user.imageUrl
            }
        })
    }
    const project = await db.project.findUnique({
        where:{
            id:projectId
        }
    })
    if (!project) return redirect('/dashboard')
    if (project.deletedAt) return redirect('/dashboard')

     try {
           await db.userToProject.create({
            data:{
                userId,
                projectId
            }
           })
     }  
     catch(error) {
         console.log("user already in the project.")
     } 
 return redirect(`/dashboard`);
}

export default JoinHandler;