'use client'

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import useProject from "~/hooks/use-project";

const AskQuestionCard = () => {
    const { project } = useProject();
    const [question, setquestion] = useState('')
    const [open, setopen] = useState(false);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setopen(true)
    }
    return <>
        <Dialog open={open} onOpenChange={setopen}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        <img src={'/png-clipart-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle.png'} width={40} height={40}></img>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        <Card className="col-span-3">
            <CardHeader>Ask a question</CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>

                    <Textarea className="" value={question} onChange={(e) => setquestion(e.target.value)} placeholder="Which file do you want me to change?"></Textarea>
                    <div className="h-4"> </div>
                    <Button type="submit">Ask Summr.ai</Button>
                </form>

            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    </>
}

export default AskQuestionCard;