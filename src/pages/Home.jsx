import React from 'react'
import News from '../components/news'
import Calender from '../components/calender'
import Vision from '../components/vision'
import NavBar from '../components/navbar'
import './home.css'
import Footer from '../components/footer'
import Mission from '../components/mission'
import SisterMessage from '../components/SisterMessage'

export default function Home() {
  return (
    <div className='h-[100%] w-full bg-menu'>
      
      <div className="relative h-screen w-full bg-image-main flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-menu opacity-70 z-0"></div>
      <div className="absolute top-10 left-0 w-full h-full flex flex-col items-center justify-center">
        <img className='w-[30vh] h-[40vh] relative' src="./assets/img/logoWhite.png" alt="" />
        <h1 className='sm:text-4xl md:text-5xl font-bold font-Amaranth p-5 text-white'>Ave Maria Convent </h1>
        <h2 className='sm:text-3xl md:text-4xl font-bold font-Amaranth p-5 text-white'>Negombo </h2>
      </div>
      
        <NavBar/>
         
        
      </div>
      <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 px-4 md:px-8 mt-5'>
      <News className='w-full'/>
      <Calender className='w-full '/>
      </div>
      <div className='m-16'>
         <SisterMessage />
      </div>
     
      <div className='h-full w-full mt-16 px-4 md:px-8'>
      <Vision/>
      <Mission/>
      </div>
      <div className='h-full w-full'>
      <Footer/>

      </div>
    </div>
  )
}
