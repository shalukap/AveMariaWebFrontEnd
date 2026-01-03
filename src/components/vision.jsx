import React from 'react'
import './vision.css'

export default function Vision() {
  return (
    <div className='h-screen w-full flex'>
      
      <div className="relative h-screen sm:w-full md:w-1/2 bg-image-vision">
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,theme(colors.primary)_70%)]"></div>

      </div>
      <div className='h-screen sm:w-full md:w-1/2 bg-primary content-evenly'>
        <div className=' font-Amaranth p-16 text-white bg-white/25 rounded-3xl border-secondary m-5'>
          <h1 className='sm:text-7xl md:text-7xl font-bold text-center'>Vision</h1>
            <p className='sm:text-3xl md:text-3xl text-center mt-5'>We Produce Good Shepherdesses to the World.</p>
        </div>
        
      </div>


    </div>
  )
}
