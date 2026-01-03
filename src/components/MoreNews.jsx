import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import NewsEvent from './NewsEvent'
import { useNavigate } from 'react-router-dom';

export default function MoreNews() {
    const[news,setNews]=useState([])
    const navigate=useNavigate()
    
      const groupNews=news.reduce((acc,item)=>{
        const date=new Date(item.eventdate)
        const year=date.getFullYear()
        const month=date.toLocaleString('default', { month: 'long' })
        const key=`${year}-${month}`
        if(!acc[key]){
          acc[key]=[]
        }
        acc[key].push(item)
        return acc
      },{})
    
   
    useEffect(() => {
        const fetchNews=async()=>{
          try {
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/approved-news`).then((res)=>{
              setNews(res.data)
              console.log(news)
            }).catch((err)=>{
              console.log(err)
            })
          } catch (error) {
            console.log(error) 
          }
        }
        fetchNews()
    },[])
  return ( 
    <>  
    <div className='bg-primary'>
      <h1 className='sm:text-7xl md:text-5xl font-bold font-Amaranth p-5 text-white'>More News</h1>
      <div className='p-5 '>
          {Object.entries(groupNews).map(([key,items])=>{
            const [year,month]=key.split('-')
            return(
              <div key={key} className='mb-10'>
                <h1 className='sm:text-4xl md:text-3xl font-bold font-Amaranth p-5 text-white'>{month} {year}</h1>
                <div className='grid md:grid-cols-4 sm:grid-cols-1 gap-10'>
                  {items.map((newsItem)=>{
                    return(
                      <NewsEvent key={newsItem._id} title={newsItem.title} nid={newsItem._id} images={newsItem.images}/>
                    )
                  })}
                </div>  
                  
              </div>
            )
          }
          )}


      </div>
      
    </div>
    <button className='fixed bottom-5 right-5 btn bg-[red] sm:text-3xl md:text-4xl rounded-full  text-white border-none' onClick={() => navigate('/')}><FaHome /></button>
    </>
  )
}
