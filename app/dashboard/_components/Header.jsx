"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/logo.jpg'} width={60} height={60} alt='logo'/>
        <UserButton/>
    </div>
  )
}

export default Header