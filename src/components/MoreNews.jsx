import axios from 'axios'
import React, { useEffect, useState } from 'react'

import NewsEvent from './NewsEvent'

export default function MoreNews() {
    const[news,setNews]=useState([])
   
    useEffect(() => {
        const fetchNews=async()=>{
          try {
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news`).then((res)=>{
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
    <div>
      <h1>More News</h1>
        
    </div>
  )
}
