import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-6 md:px-12 py-4 justify-between border-b border-cinnamon-primary/10 bg-cinnamon-accent'>
       <div 
          className="cursor-pointer"
          onClick={() => router.push('/')}
        >
          <h1 className="text-xl md:text-2xl font-bold font-serif tracking-tight text-cinnamon-primary">
            QuickCart <span className="text-[10px] uppercase tracking-widest font-sans font-light opacity-60 ml-2">Seller Panel</span>
          </h1>
        </div>
      <button className='bg-cinnamon-primary text-white px-6 py-2 rounded-full text-xs font-medium hover:bg-cinnamon-secondary transition-all'>
        Logout
      </button>
    </div>
  )
}

export default Navbar