import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { CgAdd  } from "react-icons/cg";
import { useAuth } from '../../context/AuthContext.jsx';

export default function UserPage() {
    const {user}=useAuth()  
    const [systemUsers,setSystemUsers]=useState([])
    
    const navigate = useNavigate()
   
    useEffect(()=>{
      const fetchUsers=async()=>{
        try {
          const token=localStorage.getItem('token')
          if(!token){
            navigate('/login')
            return
          }
         
          if(user[0].role=="Author"||user[0].role=="Photographer"){
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/me`,{headers:{Authorization:`Bearer ${token}`}})            
            setSystemUsers(response.data)            
          }
          else if(user[0].role=="Admin"){
          const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`,{headers:{Authorization:`Bearer ${token}`}})
          setSystemUsers(response.data)
        }
        else{
          navigate('/login')
        }
       
        } catch (error) {
          console.log(error)
        }
      }
      fetchUsers()
    },[])
  

    
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">User List</h2>
  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
    <thead>
      <tr className="bg-blue-500 text-left text-sm font-medium text-white">
        <th className="px-6 py-4">Name</th>
        <th className="px-6 py-4">Email</th>
        <th className="px-6 py-4">Role</th>
        <th className="px-6 py-4">Phone</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {systemUsers.map((systemUser, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="px-6 py-4 text-gray-800 font-medium">{systemUser.name}</td>
          <td className="px-6 py-4 text-gray-600">{systemUser.email}</td>
          <td className="px-6 py-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                systemUser.role === "Admin"
                  ? "bg-red-100 text-red-600"
                  : systemUser.role === "Author"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {systemUser.role}
            </span>
          </td>
          <td className="px-6 py-4 text-gray-600">{systemUser.phone}</td>
          <td className="px-6 py-4 text-gray-600">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${systemUser.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}> 
            {systemUser.status}
            </span>
           </td>
          <td className="px-6 py-4">
            <div className="flex justify-center gap-2">
              <button
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit" onClick={()=>navigate(`/admin/users/add/${systemUser.id}`)}
              >
                <Pencil size={16} />
              </button>
             
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {user.role==="Admin" &&  (<button className="fixed bottom-5 right-5  hover:bg-blue-600 rounded-full" onClick={()=>navigate('/admin/users/add')}><CgAdd className='text-5xl'/></button>)}
</div>
  )
}
