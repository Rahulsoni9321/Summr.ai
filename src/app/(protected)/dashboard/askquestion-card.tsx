'use client'
import { readStreamableValue } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import useProject from "~/hooks/use-project";
import { askQuestion } from "./actions";
import { Tabs, TabsList } from "~/components/ui/tabs";

const AskQuestionCard = () => {
    const { project } = useProject();
    const [question, setquestion] = useState('')
    const [open, setopen] = useState(false);
    const [loading,setloading] = useState(false);
    const [answer,setanswer] = useState('')
    const [filesReferences,setfilesReferences] = useState<{fileName:string,content:string,summary:string}[]>()
    const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        setanswer('');
        setfilesReferences([])
        e.preventDefault();
        if (!project?.id) return ;
          setloading(true)
          const {output,filesReferenced} =await askQuestion(question,project.id)
          setopen(true)
        setfilesReferences(filesReferenced);

        for await ( const delta of readStreamableValue(output)) {
         if (delta) {
            setanswer(ans => ans + delta)
         }
        }
        setloading(false);
    }
    return <>
        <Dialog open={open} onOpenChange={setopen}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        <img src={'/png-clipart-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle.png'} width={40} height={40}></img>
                    </DialogTitle>
                </DialogHeader>
                <MDEditor.Markdown source={answer} className="sm:w-[80vw] h-full max-h-[40vh] overflow-scroll"></MDEditor.Markdown>
               
                <Button onClick={()=> setopen(false)}> Close</Button>
            </DialogContent>
        </Dialog>
        <Card className="col-span-3">
            <CardHeader>Ask a question</CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>

                    <Textarea className="" value={question} onChange={(e) => setquestion(e.target.value)} placeholder="Which file do you want me to change?"></Textarea>
                    <div className="h-4"> </div>
                    <Button type="submit" disabled={loading}>Ask Summr.ai</Button>
                </form>

            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    </>
}

export default AskQuestionCard;