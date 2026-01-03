import React from 'react'

export default function Mission() {
  return (
    <div className='h-screen w-full flex'>
       <div className='h-screen sm:w-full md:w-1/2 bg-primary content-center'>
        <div className='font-Amaranth p-6 text-white rounded-3xl bg-white/25 border-secondary m-5'>
        <h1 className='sm:text-7xl md:text-7xl font-bold text-center mt-5'>Mission</h1>
        <ul className='sm:text-2xl md:text-2xl list-disc p-6 m-5'>
          <li>For the total development of our students. (Physically, Mentally, Emotionally, Socially and Spiritually)</li>
          <li>To inculcate the values of Jesus, the Good Shepherd in our students.</li>
          <li>To give life witness to a good shepherd teacher.</li>
        </ul>
        </div>
        </div>
          <div className="relative h-screen sm:w-full md:w-1/2 bg-image-vision">
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,theme(colors.primary)_70%)]"></div>

      </div>
    </div>
  )
}
