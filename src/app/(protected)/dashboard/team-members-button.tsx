import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import useProject from '~/hooks/use-project';
import { api } from '~/trpc/react';

 const TeamMemberButton = () => {
    const [open,setOpen] = useState(false);
    const {projectId}  = useProject();
    const {data:teamMembers,isLoading} = api.project.getTeamMembers.useQuery({projectId})
    
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
     <DialogHeader className='text-xl font-semibold'>
        <DialogTitle>
            Team Members
        </DialogTitle>
     </DialogHeader>
       <div>
        {teamMembers?.map((members)=>{
            return <div>
                {members.user.firstName} {members.user.lastName}
            </div>
        })}
       </div>

        </DialogContent>
    </Dialog>
    </>
  )
}

export default TeamMemberButton;
