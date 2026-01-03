import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export default function SocietyDetails() {

  const {user}=useAuth()
  const [society_name,setSociety_name]=useState("");
  const [society_description,setSociety_description]=useState("");
  const [images,setImages]=useState([]);
  const navigate=useNavigate()
  const {id}= useParams();

  useEffect(() => {
    const fetchSocietyDetails = async () => {
      const token = localStorage.getItem('token');
      if (id) {
        if(!token){
            navigate('/login')
            return
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/society/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
          const society = res.data                
          setSociety_name(society[0].society_name)
          setSociety_description(society[0].society_description)
        }).catch((err) => {
          console.log(err)
        })
      }
     
    }
    fetchSocietyDetails()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!society_name || !society_description){
        alert("Please fill all the fields")
        return
    }
    const token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
        return
    }
    try {
        if (id){
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to update this society.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          });
          if (!result.isConfirmed) {
            toast.error("Update cancelled")
            return
          }else{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/api/society/${id}`, {
                society_name,
                society_description,                
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
               Swal.fire('Updated!', 'The society has been updated.', 'success');
                navigate('/admin/society')
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
          }
            return
        }else{
            const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to add a new society.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',           
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
            });
            if (!result.isConfirmed) {
              return
            }else{
              try{
             await axios.post(`${import.meta.env.VITE_BASE_URL}/api/society`, {
                society_name,
                society_description,                
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                console.log(res)               
                Swal.fire('Added!', 'The society has been added.', 'success');
                navigate('/admin/society')
            }).catch((err) => {
                console.log(err)
            })
          }catch(error){
            console.log(error)
          }
            
        }
            return
        }

  }
    catch (error) {
      console.log(error)
    }
  }

  return (
   
      <div className="flex flex-col items-center justify-center w-full h-max bg-gray-100 p-16">
    <h1 className="text-4xl font-bold text-blue-950 text-center mb-6">Society Details</h1>
    <form className='w-full h-max max-w-9xl p-6 bg-white shadow-lg rounded-xl' onSubmit={handleSubmit}>
       
       <div className="grid grid-cols-1 md:grid-cols-1 gap-6">        
        <div className="flex flex-col">
          <label className="font-semibold text-lg">Title</label>
          <input
            type="text"  
            value={society_name}                             
            onChange={(e) => setSociety_name(e.target.value)}
            className="text-lg p-3 rounded-xl border"
          />
        </div>
      </div>
      <div className="w-full ">
          <label className="font-semibold text-lg">Description</label>
          <textarea            
           value={society_description}
            onChange={(e) => setSociety_description(e.target.value)}
            rows={15}
            className="w-full p-3 rounded-xl border"
          />
        </div>
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center h-[100%] w-full md:w-1/2 border-dashed border-4 border-gray-400 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Upload Logo</h3>
          {/* Previews Component */}
          <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Preview</span>
            <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
          </div>
        </div>

        <div className="flex flex-col items-center h-[100%] w-full md:w-1/2 border-dashed border-4 border-gray-400 p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Upload Photo</h3>
          {/* Previews Component */}
          <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Image Preview</span>
            <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
          </div>
        </div>
      </div>


        <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full">
          
          <button className={`px-6 py-3 ${id ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl w-full md:w-auto`}>{id ? 'Update' : 'Submit'}</button>
        </div>

    
      
    </form>
   
    </div>
  )
}
