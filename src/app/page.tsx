import {  HydrateClient } from "~/trpc/server";
import LandingPage from "./landing";
import Navbar from "./navbar";

export default async function Home() {
 
  return (
    <HydrateClient>
      <Navbar></Navbar>
     <LandingPage></LandingPage>
      
    </HydrateClient>
  );
}

