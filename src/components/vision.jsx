import React from 'react'

export default function Vision() {
  return (
    <div className='h-screen w-full flex'>
      
      <div className="relative h-screen sm:w-full md:w-1/2 bg-[url('./assets/img/BG.jpg')] bg-cover">
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,theme(colors.primary)_80%)]"></div>

      </div>
      <div className='h-screen sm:w-full md:w-1/2 bg-primary content-evenly'>
        <div className=' font-Amaranth p-16 text-white border-double border-8 border-secondary rounded-3xl m-5'>
          <h1 className='sm:text-7xl md:text-7xl font-bold text-center'>Vision</h1>
            <p className='sm:text-3xl md:text-3xl text-center mt-5'>We Produce Good Shepherdesses to the World.</p>
        </div>
        <div className='font-Amaranth p-5 text-white border-double border-8 border-secondary rounded-3xl m-5'>
        <h1 className='sm:text-7xl md:text-7xl font-bold text-center mb-5'>Mission</h1>
        <ul className='sm:text-2xl md:text-2xl list-disc pl-5'>
          <li>For the total development of our students. (Physically, Mentally, Emotionally, Socially and Spiritually)</li>
          <li>To inculcate the values of Jesus, the Good Shepherd in our students.</li>
          <li>To give life witness to a good shepherd teacher.</li>
        </ul>
        </div>
      </div>


    </div>
  )
}
