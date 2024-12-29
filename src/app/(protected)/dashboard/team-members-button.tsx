import { User, User2, User2Icon, UserRoundMinusIcon, Users } from 'lucide-react';
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import useProject from '~/hooks/use-project';
import { api } from '~/trpc/react';

const TeamMemberButton = () => {
    const [open, setOpen] = useState(false);
    const { projectId } = useProject();
    const { data: teamMembers, isLoading } = api.project.getTeamMembers.useQuery({ projectId })

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
                        {
                            isLoading && <><Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className=" flex gap-2 items-center">
                                        <div className='w-4 h-4 rounded-full animate-pulse bg-gray-400'></div>
                                        <div className='w-16 animate-pulse h-6 bg-gray-400'>

                                        </div>
                                        
                                    </div>
                                </CardTitle>
                                <CardDescription className='text-muted-foreground animate-pulse w-10 h-3'></CardDescription>
                            </CardHeader>
                        </Card><Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className=" flex gap-2 items-center">
                                        <div className='w-4 h-4 rounded-full animate-pulse bg-gray-400'></div>
                                        <div className='w-16 animate-pulse h-6 bg-gray-400'>

                                        </div>
                                        
                                    </div>
                                </CardTitle>
                                <CardDescription className='text-muted-foreground animate-pulse w-10 h-3'></CardDescription>
                            </CardHeader>
                        </Card><Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className=" flex gap-2 items-center">
                                        <div className='w-4 h-4 rounded-full animate-pulse bg-gray-400'></div>
                                        <div className='w-16 animate-pulse h-6 bg-gray-400'>

                                        </div>
                                        
                                    </div>
                                </CardTitle>
                                <CardDescription className='text-muted-foreground animate-pulse w-10 h-3'></CardDescription>
                            </CardHeader>
                        </Card><Card>
                            <CardHeader>
                                <CardTitle>
                                    <div className=" flex gap-2 items-center">
                                        <div className='w-4 h-4 rounded-full animate-pulse bg-gray-400'></div>
                                        <div className='w-16 animate-pulse h-6 bg-gray-400'>

                                        </div>
                                        
                                    </div>
                                </CardTitle>
                                <CardDescription className='text-muted-foreground animate-pulse w-10 h-3'></CardDescription>
                            </CardHeader>
                        </Card></>
                        }
                       
                        {!isLoading && teamMembers?.map((members) => {
                            return <Card key={members.id} className='my-3'>
                                <CardHeader>
                                    
                                        <div className=" flex gap-2 items-center">
                                            <Avatar>
                                                <AvatarImage src={members.user.imageUrl!}></AvatarImage>
                                                <AvatarFallback>{members.user.firstName![0]}{members.user.lastName![0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                             <p className='text-sm font-semibold'>

                                            {members.user.firstName} {members.user.lastName}
                                             </p>
                                    <CardDescription className='text-muted-foreground text-xs'>{members.user.emailAddress}</CardDescription>
                                            </div>
                                        </div>
                                    
                                </CardHeader>
                            </Card>
                        })}
                    </div>

                </DialogContent>
            </Dialog>

            <Button variant={"secondary"} className='bg-sidebar border dark:border-sidebar-accent-foreground border-sidebar-border dark:text-white  text-black' onClick={()=>setOpen(true)}><Users/>  Team</Button>
        </>
    )
}

export default TeamMemberButton;
