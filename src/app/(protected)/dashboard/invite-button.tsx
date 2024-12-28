"use client"
import { Copy } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Dialog, DialogHeader,DialogTitle,DialogDescription, DialogContent } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import useProject from '~/hooks/use-project'

 const InviteButton = () => {
    const {projectId} = useProject();
    const [open,setOpen] = useState(false)
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Invite Team Members!
        </DialogTitle>
        <DialogDescription>
           Ask your team member to copy the below url
        </DialogDescription>
        </DialogHeader>
            <Input readOnly onClick={()=>{
                navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)
                toast.success("copied to clipboard")
            }} value={`${window.location.origin}/join/${projectId}`} className='cursor-pointer'></Input>
            <p className='text-muted-foreground text-xs -mt-2 flex items-center gap-1'>Click to above copy <Copy className='w-3 h-3'></Copy></p>
        </DialogContent>
      
    </Dialog>
    
    <Button variant={"secondary"}  className='bg-sidebar border dark:border-sidebar-accent-foreground border-sidebar-border dark:text-white  text-black' onClick={()=>setOpen(true)}>Invite Team Member!</Button>
    </>
  )
}

export default InviteButton;