import { Presentation, Upload } from 'lucide-react';
import React, { useState } from 'react'
import {useDropzone} from "react-dropzone";
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { uploadFile } from '~/lib/firebase';
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import { api } from '~/trpc/react';
import useProject from '~/hooks/use-project';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


 const MeetingCard = () => {
  const {projectId} = useProject();
  const router = useRouter();
     const [isUploading,setIsUploading] = useState(false);
    const [progress,setProgess] = useState(0);
    const uploadMeeting = api.project.uploadMeeting.useMutation();
    const { getRootProps,getInputProps}  = useDropzone({
      accept:{
       'audio/*':['.mp3','.wav','.m4a'],
      },
      multiple:false,
      maxSize:50_000_000,
      onDrop:async acceptedFiles=>{
        setIsUploading(true);
        console.log(acceptedFiles);
        const file = acceptedFiles[0];
        if (!file) return;
        const downloadUrl = await uploadFile(file as File,setProgess) as string;
        uploadMeeting.mutate({
          meetingUrl:downloadUrl,
          projectId:projectId,
          name:file?.name || "Meeting",
        },
      {
        onSuccess:()=>{
          toast.success('Meeting uploaded successfully');
          router.push(`/meeting`)
        },
        onError:()=>{
         toast.error('Failed to upload meeting');
        }
      }
      )
        setIsUploading(false);
      }
    })
  return (
    <Card className='col-span-2 flex flex-col gap-2 items-center justify-center p-10' {...getRootProps()}>
     {
        !isUploading && (
            <>
            <Presentation className='w-10 h-10 animate-bounce'></Presentation>
            <h3 className='mt-2 text-lg font-semibold dark:text-gray-100 text-gray-800'>Create a new meeting</h3>
            <p className='mt-1 text-center text-sm dark:text-gray-300 text-gray-500'>Analyse your meeting with us

            <br></br>
            Powered by <span className='text-cyan-500 font-semibold italic'>AI</span>
            </p>
           <div className='mt-6'>
            <Button disabled={isUploading}>
                <Upload className='-ml-0.5 mr-1.5 h-5 w-5' arial-hidden="true"></Upload>
                Upload Meeting
                <input className='hidden' {...getInputProps()}></input>

            </Button>
           </div>
            </>
        )
     }
     {
        isUploading && (
            <div className='flex flex-col items-center gap-2'>
                <CircularProgressbar
                value={progress} text={`${progress}%`} styles={buildStyles(
                  {
                    pathColor:'#000',
                    textColor:'#000',
                    trailColor:'#D1D5DB'

                  }
                )} className='size-16 flex items-center justify-center'>
                </CircularProgressbar>
              <p className='text-sm text-gray-500 text-center'> Uploading your meeting...</p>
            </div>
        )
     }
    </Card>
  )
}

export default MeetingCard
