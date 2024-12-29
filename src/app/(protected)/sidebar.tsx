"use client"
import { CreditCard, FileQuestion, LayoutDashboard, Plus, Presentation, Tv } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '~/components/ui/sidebar'
import useProject from '~/hooks/use-project'
import { cn } from '~/lib/utils'
export const AppSidebar = () => {
   const {open } = useSidebar();
   const {allProjects,projectId,setprojectId} = useProject();
   
    const pathname = usePathname();
    return (
        <Sidebar collapsible='icon' variant='floating' >
            <SidebarHeader>
                <div  className={`${open ? ' flex-row justify-between':' flex-col gap-2'} flex  `}>
                <SidebarTrigger className={open?'order-last':"order-1"}></SidebarTrigger>

                <div className='flex items-center gap-2 order-1'>
                    <Image src={"/png-clipart-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle.png"} alt='logo' width={40} height={40}></Image>
                    
                {open && <h1 className='text-md font-medium text-primary'>Summr-ai</h1>}
                </div>

                </div>



            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarItem.map((items) => {
                                return <SidebarMenuItem key={items.label}>
                                    <SidebarMenuButton asChild>

                                        <Link href={items.url} className={cn({ 'bg-primary  dark:text-black text-white': items.url === pathname }, '')}><items.icon></items.icon>{items.label}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {  allProjects &&
                                allProjects.map((project,index)=>{
                                    return <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild>
                                            <div className='cursor-pointer' onClick={()=>setprojectId(project.id)}>
                                            <div  className={cn('rounded-sm border px-1 flex justify-center items-center gap-2 ',{'!bg-primary dark:!text-black !text-white ':project.id==projectId})}>{project.name[0]}</div>{open && project.name}</div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                })

                            }
                        
                <div className='h-2'></div>
                <SidebarMenuItem>
                   { open &&  <Link href={'/create'}>
                    <Button onClick={()=>redirect("/create")} size="sm" variant='outline' className='w-fit'>
                        <Plus></Plus>
                        Create Project
                    </Button>
                    </Link>}
                </SidebarMenuItem>
                </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>

    )
}


const SidebarItem = [{
    label: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard
}, {
    label: "Q&A",
    url: "/qNa",
    icon: FileQuestion
}, {
    label: "Meetings",
    url: "/meeting",
    icon: Presentation
}, {
    label: "Billing",
    url: "/billing",
    icon: CreditCard
}]

