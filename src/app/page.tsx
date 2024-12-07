import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";
import useProject from "~/hooks/use-project";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
 
  return (
    <HydrateClient>
      <div className="text-red-500">
     <Link href={"/dashboard"}>
     
      Dashboard
     </Link>
      </div>
    </HydrateClient>
  );
}
