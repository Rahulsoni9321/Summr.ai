import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";

const SyncUser = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User Not found.")
    }

    const client = await clerkClient();
    const UserInfo = await client.users.getUser(userId);

    if (!UserInfo.emailAddresses[0]?.emailAddress) {
        return notFound();
    }

    await db.user.upsert({
        where: {
            id: userId
        },
        update: {
            imageUrl: UserInfo.imageUrl,
            emailAddress: UserInfo.emailAddresses[0].emailAddress,
            firstName: UserInfo.firstName,
            lastName: UserInfo.lastName


        },
        create: {
            id: userId,
            imageUrl: UserInfo.imageUrl,
            emailAddress: UserInfo.emailAddresses[0].emailAddress,
            firstName: UserInfo.firstName,
            lastName: UserInfo.lastName
        }
    })

    return redirect("/dashboard");
}

export default SyncUser;