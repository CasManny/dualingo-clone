import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <Image src={'/hr.svg'} alt='crotia' height={32} width={40} className='mr-4 rounded-md' />
          crotian
        </Button>
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <Image src={'/es.svg'} alt='crotia' height={32} width={40} className='mr-4 rounded-md' />
          spanish
        </Button>
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <Image src={'/fr.svg'} alt='crotia' height={32} width={40} className='mr-4 rounded-md' />
          french
        </Button>
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <Image src={'/it.svg'} alt='crotia' height={32} width={40} className='mr-4 rounded-md' />
          italian
        </Button>
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <Image src={'/jp.svg'} alt='crotia' height={32} width={40} className='mr-4 rounded-md' />
          japanese
        </Button>
      </div>
    </footer>
  )
}

export default Footer