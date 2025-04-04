import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
     <div className='h-[100%] sm:w-full md:w-3/4 pl-10'>
      <h1 className='sm:text-7xl md:text-5xl font-bold font-Amaranth p-5 text-white'>
        Latest News
      </h1>
      <div className='grid md:grid-cols-2 md:grid-rows-2 sm:grid-cols-1 gap-10 p-4'>
        {news.slice(0,4).map((newsItem) => (
          <div key={newsItem.nid} className="card bg-base-100 image-full w-full h-96 shadow-xl overflow-hidden">
            <figure>
              <img src={newsItem.images && newsItem.images.length > 0 ? newsItem.images[0] : "/assets/img/default.jpg"} alt={newsItem.title} className='w-full h-full cover'/>
            </figure>
            <div className="card-body relative">
              <h2 className="card-title">{newsItem.title}</h2>
              <div className="card-actions justify-end">
                <button className="absolute bottom-5 right-5 btn bg-[#0000FF] text-white border-none">
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      



    
    </>
    
  )
}
