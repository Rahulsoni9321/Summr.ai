import { callTRPCProcedure } from '@trpc/server';
import React from 'react'
import { api } from '~/trpc/react';
import { useLocalStorage } from "usehooks-ts";

export const useProject = () => {
    const { data: allProjects } = api.project.getProjects.useQuery();
    const [projectId, setprojectId] = useLocalStorage('github-analyzer-projectId', '');
    const project = allProjects?.find(project => project.id === projectId);
    return {
        allProjects,
        project,
        projectId,
        setprojectId
    }
}

export default useProject;
