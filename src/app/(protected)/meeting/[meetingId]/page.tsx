import React from 'react'
import IssueList from './issue-list';

type Props = {
    params: Promise<{meetingId:string}>
}

 const MeetingDetails = async ({params}:Props) => {
    const {meetingId} = await params;
  return (
   <>
   <IssueList meetingId={meetingId}></IssueList>
   </>
  )
}

export default MeetingDetails;
