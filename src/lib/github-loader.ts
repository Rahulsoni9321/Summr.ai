import {GithubRepoLoader} from "@langchain/community/document_loaders/web/github"
const loadGithubRepo = async (githubUrl:string,githubToken?:string)=>{
    const loadRepo = new GithubRepoLoader(githubUrl,{
     accessToken:githubToken || "",
     branch:'main',
     ignoreFiles:['package-lock.json','yarn-lock','pnpm-lock.yaml','bun.lockb'
     ],
     recursive:true,
     unknown:'warn',
     maxConcurrency:5
    })

    const docs = await loadRepo.load();
    return docs;
}

console.log(await loadGithubRepo('https://github.com/Rahulsoni9321/Portfolio'))