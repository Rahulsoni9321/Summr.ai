'use client'
import { useAuth } from '@clerk/nextjs';
import React from 'react'
import { api } from '~/trpc/react'

 const Billing = () => {
  const {data:user, isLoading} = api.project.getMyCredits.useQuery();
  const [creditsToBuy,setCreditsToBuy] = React.useState<number[]>([100])
  const creditsToBuyAmount = creditsToBuy[0]; 
  const {userId} = useAuth();
  return (
    <div>Billing</div>
  )
}

export default Billing;