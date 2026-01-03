import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { CgAdd  } from "react-icons/cg";
import toast from 'react-hot-toast';
import { formatDate } from './date';
import { useAuth } from '../../context/AuthContext.jsx';
import swal from 'sweetalert2';


export default function CalenderPage() {

  const { user } = useAuth();
  const[events,setEvents]=useState([])
  
  const navigate=useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token')
       
        if (!token) {
          navigate('/login')
          return  
        } 
        
        
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/calender`).then((res) => {
          setEvents(res.data)
        }).catch((err) => {
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
  }, [])

  async function handleDelete(eventId) {
    const result = await swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    
    if (!result.isConfirmed) {
      return
    }  
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return  
    }    
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/calender/${eventId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => { 
      swal.fire('Deleted!', 'The event has been deleted.', 'success');    
      setEvents(events.filter((event) => event.cid !== eventId))
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="p-6 bg-white shadow-lg h-full">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Event List</h2>
  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
    <thead>
      <tr className="bg-blue-500 text-left text-sm font-medium text-white">
        <th className="px-6 py-4">ID</th>
        <th className="px-6 py-4">Date</th>
        <th className="px-6 py-4">Event</th>
        <th className="px-6 py-4">Enterd By</th>
        <th className="px-6 py-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {events.map((event) => (
        <tr
          key={event.cid}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="px-6 py-4 text-gray-800 font-medium">{event.cid}</td>
          <td className="px-6 py-4 text-gray-600">{formatDate(new Date(event.date))}</td>
          <td className="px-6 py-4 text-gray-600">{event.event}</td>
          
          <td className="px-6 py-4 text-gray-600">{event.enterdBy}</td>
          <td className="px-6 py-4">
            <div className="flex justify-center gap-2">
              <button
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Edit" onClick={()=>navigate(`/admin/calender/add/${event.cid}`)}
              >
                <Pencil size={16} />
              </button>
              {user.role === 'Admin' && (
              <button
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete"
                onClick={()=>handleDelete(event.cid)}
              >
                <Trash size={16} />
              </button>
                
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
   <button className="fixed bottom-5 right-5  hover:bg-blue-600 rounded-full" onClick={()=>navigate('/admin/calender/add')}><CgAdd className='text-5xl'/></button>
</div>
  )
}
