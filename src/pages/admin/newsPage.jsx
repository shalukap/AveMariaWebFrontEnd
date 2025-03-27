import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { CgAdd  } from "react-icons/cg";
import { formatDate } from './date';

export default function NewsPage() {
  const [news,setNews]=useState([])
  const [user,setUser]=useState({})
  const navigate=useNavigate()
  
  
  useEffect(() => {
    const fetchNews=async()=>{
      try {
        //const token=Cookies.get('token') use this upload to https layer
        const token=localStorage.getItem('token')      
        if (!token) {
          navigate('/login') 
          return        
        }
        const user=jwtDecode(token)
        setUser(user)         
        const res=await axios.get('http://localhost:3000/api/news',{
            headers:{Authorization:`Bearer ${token}`}}
        ).then((res)=>{
          setNews(res.data)        
          
        }).catch((err)=>{
          console.log(err)
        })
      } catch (error) {
        console.log(error) 
      }
      
    }
    fetchNews()
  },[news])
  return (
    /*
    <div className='w-full h-full relative items-center flex-col'>
      <table className='w-full max-w-full border border-black border-500 bg-white rounded-lg shadow-md'>  
      <thead>
        <th className='p3 border'>ID</th>
        <th className='p3 border'>Title</th>
        <th className='p3 border'>Description</th>
        <th className='p3 border'>Images</th>
        <th className='p3 border'>Date</th>
        <th className='p3 border'>Repoted by</th>
        <th className='p3 border'>Approved/Not Approved</th>
        
        <th className='p3 border'>Action</th>
        </thead>
        <tbody>
        {news.map((n)=>{
          return(
          <tr key={n.nid}>
            <td className='p3 border'>{n.nid}</td>
            <td className='p3 border'>{n.title}</td>
            <td className='p3 border'>{n.description}</td>
            <td className='p3 border'>{n.images}</td>
            <td className='p3 border'>{n.date}</td>
            <td className='p3 border'>{n.repotedBy}</td>
            <td className={`p3 border ${n.isApproved?"bg-green-500":" bg-red-500"}`}>{n.isApproved?"Approved":"Not Approved"}</td>
            <td className='p3 border'></td>
          </tr>
        )})}
        </tbody>
      </table>
    </div>
    */
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">News Articles</h2>
    <div className='w-full max-w-10xl bg-white rounded-lg shadow-lg overflow-hidden'>
      <table className='w-full'>
       
        <thead className='bg-blue-500 text-white'>
          <tr>
            <th className='p-4 text-left'>ID</th>
            <th className='p-4 text-left'>Title</th>
            <th className='p-4 text-left'>Description</th>
            <th className='p-4 text-left'>Images</th>
            <th className='p-4 text-left'>Event Date</th>
            <th className='p-4 text-left'>Reported By</th>
            <th className='p-4 text-left'>Status</th>
            <th className='p-4 text-left'>Action</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {news.map((n) => (
            <tr key={n.nid} className='hover:bg-gray-50 transition-colors'>
              <td className='p-4'>{n.nid}</td>
              <td className='p-3 font-medium'>{n.title}</td>
              <td className='p-3 text-gray-600'>{n.description}</td>
              <td className='p-3'>
                <div className='flex space-x-2 w-10 h-10'>
                 <img src={n.images && n.images.length > 0 ? n.images[0] : '/assets/img/default.jpg'} alt="" />
                </div>
              </td>
              <td className='p-3'>{formatDate(new Date(n.eventdate))}</td>
              <td className='p-3'>{n.repotedBy}</td>
              <td className={`p-3 font-semibold ${n.isApproved ? 'text-green-600' : 'text-red-600'}`}>
                {n.isApproved ? 'Approved' : 'Not Approved'}
              </td>
              <td className='p-3'>
                <div className='flex space-x-2'>
                  
                  <button
                    className='px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600'
                    onClick={() =>navigate(`/admin/news/newsdetails/${n.nid}`)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    
    </div>
    <button className='fixed bottom-5 right-5  hover:bg-blue-600 rounded-full' onClick={() =>{navigate('newsdetails/')}}><CgAdd className='text-5xl '/></button>
  </div>
)
 
}
