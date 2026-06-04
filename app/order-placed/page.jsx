'use client'
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useEffect } from 'react'

const OrderPlaced = () => {
  const { router } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 4000)
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-8 bg-cinnamon-accent/30'>
      <div className="relative flex justify-center items-center animate-fade-in">
        <div className="absolute w-32 h-32 bg-cinnamon-primary/10 rounded-full animate-ping"></div>
        <div className="relative bg-white p-8 rounded-full shadow-2xl shadow-cinnamon-primary/20">
            <Image className="w-12 h-12" src={assets.checkmark} alt='success' />
        </div>
      </div>
      
      <div className="text-center space-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cinnamon-primary tracking-tight">
          Welcome to the Fashion Hubb Family
        </h2>
        <p className="text-cinnamon-primary/60 text-sm font-light tracking-widest uppercase">
          Your order has been placed successfully
        </p>
      </div>

      <div className="flex items-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-1.5 h-1.5 bg-cinnamon-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 bg-cinnamon-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-cinnamon-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <p className="text-[10px] uppercase tracking-widest text-cinnamon-primary font-bold ml-2">Redirecting to your orders</p>
      </div>
    </div>
  )
}

export default OrderPlaced