import React from 'react'
import News from '../components/news'
import Calender from '../components/calender'
import Vision from '../components/vision'
import NavBar from '../components/navbar'

export default function Home() {
  return (
    <div className='h-[100%] w-full  bg-primary'>
    
      <div className="relative h-screen w-full bg-[url('./assets/img/001.png')] bg-cover shadow-[0px_4px_10px_rgba(255,255,255,0.8)] flex flex-col items-center justify-center ">
      
      <NavBar/> 
        
         
        
      </div>
      <div className='h-screen w-full flex mt-5'>
      <News/>
      <Calender/>
      </div>
      <div className='h-full w-full mt-32'>
      <Vision/>
      </div>
    </div>
  )
}
