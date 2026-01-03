import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import './newsPage.css'

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export default function NewsPage() {
  const backendUrl=import.meta.env.VITE_BASE_URL
 const {id}=useParams()
 const [news,setNews]=useState([])
 const navigate=useNavigate()
 
 
useEffect(() => {
    const fetchNews=async()=>{
        try {
            const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`).then((res)=>{
               setNews(res.data)
               
            }).catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error) 
        }
    }
    fetchNews()
},[id])
const onInit = () => {
  console.log('lightGallery has been initialized');
};
    
    
  return (
    <div className='sm:h-[100%] md:h-full w-full bg-menu text-white font-Amaranth text-center'>
      <h1 className='sm:text-7xl md:text-7xl font-bold p-16'>{news.title}</h1>
     
     {Array.isArray(news.images) && news.images.length > 0 && (
      <div className='flex overflow-x-auto whitespace-nowrap gap-4 justify-center py-4'>
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} onInit={onInit} >          
          {news.images.map((image,index) => (           
            <a key={index} href={image} >
              <img src={`${backendUrl}/storage/${image}`} alt="" className='inline-block w-[30vh] h-[40vh] p-4 rounded-md hover:scale-105 hover:outline outline-white hover:outline-offset-4 object-cover' />
            </a>          
          ))}          
        </LightGallery>
        </div>
     )}
      
      <p className='p-4 sm:text-3xl'>{news.description}</p>
      <button className='btn bg-[#0000FF] text-white text-3xl border-none w-[75%] bottom-0 right-0' onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )
}
