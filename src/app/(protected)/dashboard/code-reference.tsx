'use client'
import { TabsContent } from '@radix-ui/react-tabs'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'
import {Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {lucario} from 'react-syntax-highlighter/dist/esm/styles/prism'
 
type Props = {
    fileReferences: { fileName: string, content: string, summary: string }[]
}
const CodeReferences = ({ fileReferences }: Props) => {
    const [tab, setTab] = useState(fileReferences[0]?.fileName);

    if (fileReferences.length == 0) return;
    return (
        <div className='max-w-[75vw]  flex justify-center '>
            <Tabs className="w-full" value={tab} onValueChange={setTab}>

               <div className='flex gap-2 items-center overflow-x-scroll bg-gray-200 rounded-md p-1'>
                <TabsList> {fileReferences?.map((file) => {
                    return <TabsTrigger value={file.fileName} onClick={()=>setTab(file.fileName)} key={file.fileName} className={cn('font-medium text-sm rounded-md transition-colors whitespace-nowrap text-muted-foreground hover:bg-muted',{
                        'bg-primary text-primary-foreground' : file.fileName===tab
                    })}>{file.fileName}</TabsTrigger>
                })}
                </TabsList>
                </div>
                {
                    fileReferences.map((file)=>{
                        return <TabsContent key={file.fileName} value={file.fileName} className='max-h-[60vh] overflow-scroll max-w-7xl rounded-md p-2' >
                            <SyntaxHighlighter language='typescript' style={lucario}>
                                {file.content}
                            </SyntaxHighlighter>
                        </TabsContent>
                    })
                }
            </Tabs>
        </div>
    )
}

export default CodeReferences;