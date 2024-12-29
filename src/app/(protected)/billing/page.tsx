'use client'
import { useAuth } from '@clerk/nextjs';
import { Info } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Slider } from '~/components/ui/slider';
import { api } from '~/trpc/react'

 const Billing = () => {
  const {data:user, isLoading} = api.project.getMyCredits.useQuery();
  const [creditsToBuy,setCreditsToBuy] = React.useState<number[]>([100])
  const creditsToBuyAmount = creditsToBuy[0]!; 
  const price = (creditsToBuyAmount/50).toFixed(2)
  const {userId} = useAuth();
  return (
    <div>
      <div className='text-2xl font-semibold'>Billing</div>
      <div className='h-2'></div>
      <p className='text-sm text-gray-500'>
        You currently have <span className='font-semibold dark:text-gray-200 text-gray-700'>{user?.credits}</span> credits
      </p>
      <div className="h-2"></div>
      <div className='bg-blue-50 dark:bg-neutral-800 px-4 py-2 rounded-md border border-blue-200 text-blue-700 dark:text-blue-200'>
        <div className='flex items-center gap-2'>
          <Info className='size-4'></Info>
          <p className='text-sm'>Each credit allows you to index 1 file in a repository</p>
        </div>
        <p className='text-sm'>E.g. If your project has 100 files. you will need 100 credits to index it. </p>
      </div>
      <div className='h-6'></div>
      <Slider defaultValue={[100]} max={1000} min={10} step={10} onValueChange={(value)=>setCreditsToBuy(value)} value={creditsToBuy}></Slider>
      <div className="h-8"></div>
      <Button onClick={()=>{
        toast.info("This feature is still under development.")
      }}>
        Buy {creditsToBuyAmount} credits for ${price}
      </Button>
    </div>
  )
}

export default Billing;