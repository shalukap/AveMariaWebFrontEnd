import React, { useState,useMemo, useEffect } from 'react'
import {  useParams,useNavigate } from 'react-router-dom'
import { Previews } from './dragNdropImg'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';
import MyDropzone from './Dropzone';
import uploadMedia from '../../utils/mediaUpload';
import { formatDate } from './date';
import Swal from 'sweetalert2';




export default function NewsDetails() {
    /*const location=useLocation()
    const {news,user}=location.state*/
    const navigate = useNavigate()
    
    const[imageUrls,setImageUrls]=useState('')
    const [images, setImages] = useState({});
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [eventdate,setEventdate]=useState(new Date())
    const [author,setAuthor]=useState('')
    const [imagesUploadedBy,setImagesUploadedBy]=useState('')
    const [isApproved,setIsApproved]=useState(0)
    
    const { id } = useParams();
    
    
    useEffect(() => {
        const fetchNews = async () => {          
            try {
                const token = localStorage.getItem('token') 
                if(!token){
                    navigate('/login')
                    return
                }
                 
               

                // take the data to news page
                if(id){  
                                       
                    await axios.get(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
                    ).then((res) => {                       
                        const news = res.data
                        console.log(news)                         
                        setTitle(news.title)
                        setDescription(news.description)
                        setEventdate(formatDate(new Date(news.eventdate)))
                        setIsApproved(news.isApproved)
                        setImagesUploadedBy(news.imagesUploadedBy)
                        setAuthor(news.author)
                        setImageUrls(news.images)
                                      
                    }).catch((err) => {
                        console.log(err.response.data.message)
                    })
                }
                
            } catch (error) {
                console.log(error.message)
                
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
        e.preventDefault();/*        
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
            author:author,
            imagesUploadedBy:imagesUploadedBy,
            isApproved:isApproved
        }
        console.log(newsData)
        

        if (imageUrls.length>0){
             imageUrls.forEach((image)=>{
                newsData.append('images[]', image);
             })
            
        }*/
        const newsData=new FormData()
        newsData.append('title',title)
        newsData.append('description',description)
        newsData.append('eventdate',eventdate)
        newsData.append('author',author)
        newsData.append('imagesUploadedBy',imagesUploadedBy)
        newsData.append('isApproved',isApproved ? 1 : 0 )

        if (images.length>0){
            //const uploaded=await Promise.all(images.map((image)=>uploadMedia(image)))
            images.forEach((image)=>{
                newsData.append('images[]', image);
            })
        }
        try {
          const token = localStorage.getItem('token') 
          if(!token){
              navigate('/login')
              return
          }
            if(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You are about to update this news.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, update it!'
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                           newsData.append('_method', 'PUT'); // To simulate PUT request
                           await axios.post(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`,newsData,
                            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'multipart/form-data'}}).then((res)=>{
                            console.log(res.data)
                            Swal.fire('Updated!', 'The news has been updated.', 'success');
                            navigate('/admin/news')
                        }).catch((err)=>{
                            console.log(err.message)
                        })
                        }
                  })
                /*
                const res=axios.put(`${import.meta.env.VITE_BASE_URL}/api/news/${id}`,{
                  newsData
                },
                  {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'multipart/form-data'}}).then((res)=>{
                    console.log(res.data)
                    toast.success('News updated successfully')
                    setTimeout(() => navigate("/admin/news"), 1000);
                }).catch((err)=>{
                    console.log(err.response.data.message)
                })
                return*/
            }else{
              Swal.fire({
                title: 'Are you sure?',
                text: "You are about to add this news.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, add it!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                  const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/news`,newsData,
            
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,'Content-Type': 'multipart/form-data'}}).then((res)=>{
                console.log(res)
                toast.success('News added successfully')
                setTimeout(() => navigate("/admin/news"), 1000);
            }).catch((err)=>{
                console.log(err.response.data.message)
            })
            if(res){
                navigate('/admin/news')
            }
            }
              })
              
            }
            
        } catch (error) {
            console.log(error.message)
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
            <label className="font-semibold text-lg">Author</label>
            <input
              type="text"             
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
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
              onChange={(e) => setIsApproved(e.target.checked)}
              className="w-5 h-5"
            />
            <label className="font-semibold text-lg">Approved</label>
          </div>
          <button className={`px-6 py-3 ${id ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl w-full md:w-auto`}>{id ? 'Update' : 'Submit'}</button>
        </div>

    
      </div>
    </form>
    </div>
  
  )
}
