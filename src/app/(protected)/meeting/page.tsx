"use client"
import React from 'react'
import useProject from '~/hooks/use-project';
import { api } from '~/trpc/react';
import MeetingCard from '../dashboard/meeting-card';
import { Badge } from '~/components/ui/badge';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { toast } from 'sonner';
import useRefetch from '~/hooks/use-refetch';

const MeetingPage = () => {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery({ projectId },
    {
      refetchInterval:4000
    }
  );
  const refetch  = useRefetch();
  const deleteMeeting = api.project.deleteMeeting.useMutation()
  const handleDelete = async (meetingId: string) => {
    deleteMeeting.mutate({ meetingId },
      {
        onSuccess: () => {
          toast.success("Meeting Deleted Successfully")
          refetch();
        },
        onError: () => {
          toast.error("Error in deleting Meeting.")
        }
      }
    )
  }
  return (
    <>
      <MeetingCard></MeetingCard>
      <div className="h-6"></div>
      <h2 className='text-2xl font-semibold'>Meetings</h2>
      <div className="h-5"></div>
      {
        meetings && meetings.length === 0 && (
          <div className='flex justify-center items-center h-96'>
            <p className='text-gray-500'>No meetings found</p>
          </div>
        )
      }
      {
        isLoading && (
          <div className='flex justify-center items-center h-96'>
            <p className='text-gray-500'>Loading...</p>
          </div>
        )
      }
      {
        meetings && meetings.length > 0 && (
          <ul className='divide-y divide-gray-200'>
            {
              meetings.map(meeting => (
                <li key={meeting.id} className='flex  items-center justify-between gap-x-6 gap-5 p-4'>
                  <div className=''>
                    <div className='min-w-0 '>
                      <div className='flex items-center justify-between w-full gap-7'>
                        <p className='text-[16px] font-semibold'>
                          {meeting.name}
                        </p>

                        {
                          meeting.status === 'PROCESSING' && <Badge className='bg-yellow-400 text-white'>
                            Processing...
                          </Badge>
                        }
                        {
                          meeting.status === 'COMPLETED' && <Badge className='bg-green-400 text-white'>
                            Completed
                          </Badge>
                        }
                      </div>

                    </div>
                    <div className="h-2"></div>
                    <div className='flex items-center text-xs text-gray-500 gap-x-4'>
                      <p className='whitespace-nowrap'>
                        {meeting.createdAt.toLocaleString()}
                      </p>
                      <p className='truncate'>
                        {meeting.issue.length} issues
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-4'>
                    <Link  href={`/meeting/${meeting.id}`} className='flex items-center flex-none gap-x-4'>
                      <Button size={"sm"} variant='outline'>
                        View Meeting
                      </Button>

                    </Link>
                    <Button size="sm" disabled={deleteMeeting.isPending} variant='destructive' onClick={()=>handleDelete(meeting.id)} >
                      Delete Meeting 
                      </Button>
                  </div>
                </li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}

export default MeetingPage;
