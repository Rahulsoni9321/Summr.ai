import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import useProject from "~/hooks/use-project";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
 
  return (
    <HydrateClient>
      <div className="text-red-500">

      Hello Friends
      </div>
    </HydrateClient>
  );
}
