import React from 'react'
import News from '../components/news'
import Calender from '../components/calender'
import Vision from '../components/vision'
import NavBar from '../components/navbar'
import './home.css'

export default function Home() {
  return (
    <div className='h-[100%] w-full  bg-primary'>
    
      <div className="relative h-screen w-full bg-image-main  flex flex-col items-center justify-center ">
      
      <NavBar/> 
        
         
        
      </div>
      <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 px-4 md:px-8 mt-5'>
      <News className='w-full'/>
      <Calender className='w-full '/>
      </div>
      <div className='h-full w-full mt-16 px-4 md:px-8'>
      <Vision/>
      </div>
    </div>
  )
}
