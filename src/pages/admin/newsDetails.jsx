import React, { useState,useMemo, useEffect } from 'react'
import {  useParams,useNavigate } from 'react-router-dom'
import { Previews } from './dragNdropImg'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';
import MyDropzone from './Dropzone';
import uploadMedia from '../../utils/mediaUpload';
import { formatDate } from './date';



export default function NewsDetails() {
    /*const location=useLocation()
    const {news,user}=location.state*/
    const navigate = useNavigate()
    
    const[imageUrls,setImageUrls]=useState('')
    const [images, setImages] = useState([]);
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [eventdate,setEventdate]=useState('')
    const [reportedBy,setReportedBy]=useState('')
    const [imagesUploadedBy,setImagesUploadedBy]=useState('')
    const [isApproved,setIsApproved]=useState(false)
    
    const { id } = useParams();
    
    
    useEffect(() => {
        const fetchNews = async () => {          
            try {
                const token = localStorage.getItem('token') 
                if(!token){
                    navigate('/login')
                    return
                }
                const user=jwtDecode(token) 
                setReportedBy(user.name)

                // take the data to news page
                if(id){  
                  
                     
                    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news/` + id,{
                        headers:{Authorization:`Bearer ${token}`}
                    }).then((res) => {                       
                        const news = res.data               
                        
                        setTitle(news.title)
                        setDescription(news.description)
                        setEventdate(formatDate(new Date(news.eventdate)))
                        setIsApproved(news.isApproved)
                        setImagesUploadedBy(news.imagesUploadedBy)
                        setReportedBy(news.reportedBy)
                        setImageUrls(news.images)
                                      
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews()
    }, [id])
    
    async function handleSubmit(e) { 
      const token = localStorage.getItem('token') 
      if(!token){
          navigate('/login')
          return
      }      
        e.preventDefault();
        const promises=[]
        for (let i = 0; i < images.length; i++) {
            const promise=uploadMedia(images[i])
            promises.push(promise) 
        }
        const imageUrls = await Promise.all(promises)
        setImageUrls(imageUrls) 
        const newsData={
            title:title,
            description:description,
            eventdate:eventdate,
            images:imageUrls,
            reportedBy:reportedBy,
            imagesUploadedBy:imagesUploadedBy,
            isApproved:isApproved
        }
        try {
          const token = localStorage.getItem('token') 
          if(!token){
              navigate('/login')
              return
          }
            if(id){
                const res=axios.put(`${import.meta.env.VITE_BASE_URL}/api/news/` + id,newsData,
                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{
                    toast.success('News updated successfully')
                    setTimeout(() => navigate("/admin/news"), 1000);
                }).catch((err)=>{
                    console.log(err)
                })
                return
            }else{
                
            const res=axios.post(`${import.meta.env.VITE_BASE_URL}/api/news`,newsData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res)=>{
                toast.success('News added successfully')
                setTimeout(() => navigate("/admin/news"), 1000);
            }).catch((err)=>{
                console.log(err)
            })
            if(res){
                navigate('/admin/news')
            }
            }
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
   
    
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-16">
    <h1 className="text-4xl font-bold text-blue-950 text-center mb-6">News Details</h1>
    <form onSubmit={handleSubmit} className='w-full h-full max-w-9xl p-6 bg-white shadow-lg rounded-xl'>
    <div className="bg-white shadow-lg rounded-xl p-6 w-full h-full max-w-9xl">    
       <div className="grid grid-cols-1 md:grid-cols-1 gap-6">        
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Title</label>
          <input
            type="text"           
            value={title}            
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg p-3 rounded-xl border"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center h-[400px] w-full md:w-1/2 border-dashed border-4 border-gray-400 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Upload Images</h3>
          {/* Previews Component */}
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Preview</span>
            <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
          </div>
        </div>

        <div className="w-full md:w-1/2 ">
          <label className="font-semibold text-lg">Description</label>
          <textarea            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={15}
            className="w-full p-3 rounded-xl border"
          />
        </div>
      </div>
      <div className='flex flex-row md:flex-row gap-6'>
      <div className="flex flex-col w-full">
            <label className="font-semibold text-lg">Event Date</label>
            <input
              type="date"
              value={eventdate}
              onChange={(e) => setEventdate(e.target.value)}
              className="text-lg p-3 rounded-xl border w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-lg">Reported By</label>
            <input
              type="text"             
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              className="text-lg p-3 rounded-xl border w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-lg">Images Uploaded By</label>
            <input
              type="text"
              value={imagesUploadedBy}
              onChange={(e) => setImagesUploadedBy(e.target.value)}
              className="text-lg p-3 rounded-xl border w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              
              checked={isApproved}
              onChange={() => setIsApproved(!isApproved)}
              className="w-5 h-5"
            />
            <label className="font-semibold text-lg">Approved</label>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl w-full md:w-auto">Submit</button>
        </div>

    
      </div>
    </form>
    </div>
  
  )
}
