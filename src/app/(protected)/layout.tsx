import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react'
import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from './sidebar';




const layout = ({children}:{children:ReactNode}) => {
  return (
    <SidebarProvider>
        <AppSidebar></AppSidebar>
        <main className='w-full m-2 flex flex-col gap-4'>
        <div className='w-full flex items-center gap-2 p-2 px-4 border-sidebar-border shadow border bg-sidebar rounded-md'>
            {/* <SearchBar></SearchBar> */}
            <div className='ml-auto'></div>
            <UserButton></UserButton>
        </div>
        <div className=' border border-gray-200 bg-sidebar border-sidebar-border  rounded-md overflow-y-auto h-[calc(100vh-5rem)] p-4 shadow'>
            {children}
        </div>
        </main>

    </SidebarProvider>
  )
}


export default layout;