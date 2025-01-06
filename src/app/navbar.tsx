import React from 'react'
import { ModeToggle } from '~/components/ui/toggle-theme';

const Navbar = () => {
  return (
    <div className='w-full  p-3 flex flex-col fixed items-center z-50'>
        <div className='w-11/12 flex justify-between px-3  max-w-7xl rounded-full backdrop-blur-md z-50  p-3 border'>
        <div className='flex gap-2 items-center'>
            <img className='w-7 h-5' src='/png-clipart-logo-xunit-random-org-randomness-computer-software-logo-github-blue-angle.png'></img>
            <h1 className='text-xl font-semibold '>Summr-ai</h1>
        </div>
        <div><ModeToggle></ModeToggle></div>
        </div>
    </div>
  )
}

export default Navbar;
