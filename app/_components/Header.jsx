import React from 'react'
import Image from "next/image";
import {Button} from '@/components/ui/button';
function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
        <Image src={"/logo.jpg"} alt={"logo"}width={60} height={60}/>
        <Button>Get started</Button>
    </div>
  )
}

export default Header