import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsEvent from './NewsEvent'

export default function News() {
  const [news,setNews]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    const fetchNews=async()=>{
      try {
        const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news`).then((res)=>{
          setNews(res.data)
        }).catch((err)=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error) 
      }
    }
    fetchNews()
  }, [])




  return (
    <>     
     <div className='relative h-[100%] sm:w-full md:w-3/4 pl-10'>
      <h1 className='sm:text-7xl md:text-5xl font-bold font-Amaranth p-5 text-white'>
        Latest News
      </h1>
      <div className='grid md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 gap-10 p-4'>
        {news.slice(0,4).map((newsItem) => (
          <NewsEvent key={newsItem.nid} nid={newsItem.nid} title={newsItem.title} images={newsItem.images} />
        ))}
      </div>
      <button className='btn bg-[#0000FF] text-white border-none w-full bottom-0 right-0' onClick={() => navigate('/morenews')}>More News</button>
    </div>
      
 


    
    </>
    
  )
}
