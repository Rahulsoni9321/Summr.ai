"use client"
import React, { useState } from 'react'
import useProject from '~/hooks/use-project';
import { api } from '~/trpc/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import AskQuestionCard from '../dashboard/askquestion-card';
import { cn } from '~/lib/utils';
import MDEditor from '@uiw/react-md-editor';
import CodeReferences from '../dashboard/code-reference';
import { JSONObject } from 'node_modules/superjson/dist/types';


const qNa = () => {
  const { projectId } = useProject();
  const [selectedQuestionIndex, setselectedQuestionIndex] = useState<number>(0)
  const { data: questions } = api.project.getQuestions.useQuery({ projectId })
  const question = questions?.[selectedQuestionIndex] //optional chaining.

  return (
    <Sheet >
      <AskQuestionCard></AskQuestionCard>
      <div className='h-4'></div>
      <h1 className='text-xl font-semibold'>Saved Questions</h1>
      <div className='h-2'></div>
      <div className='flex flex-col gap-5'>
        {questions && questions.map((question, index) => {
          return <React.Fragment key={index}> <SheetTrigger onClick={() => setselectedQuestionIndex(index)} >
            <div className={cn('bg-sidebar flex flex-col items-start gap-2 border dark:bg-black   shadow  rounded-md w-full p-4', {})}>
              <div className='flex items-center gap-3'>
                <p className='font-medium'>{index + 1}.</p>
                <p className='text-primary dark:text-white/90 text-lg line-clamp-1 font-medium'>{question.question}</p>
                <p className='text-xs text-gray-400 whitespace-nowrap'>{question.createdAt.toLocaleDateString()}</p>
              </div>
              <div className='text-muted-foreground font-normal text-sm line-clamp-2'>{question.answer}</div>
            </div>
          </SheetTrigger>
          </React.Fragment>
        })}

      </div>
    {question && <SheetContent className='sm:max-w-[80vw] overflow-scroll'>
      <SheetHeader>
        <SheetTitle>{question.question}</SheetTitle>
        <MDEditor.Markdown source={question.answer} className='p-4'></MDEditor.Markdown>
        <CodeReferences fileReferences={question.fileReferences as any[]}></CodeReferences>
      </SheetHeader>
    </SheetContent>}
    </Sheet>

  )
}

export default qNa;
