import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash } from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { CgAdd  } from "react-icons/cg";


export default function CalenderPage() {

  const[events,setEvents]=useState([])
  const [user,setUser]=useState({})
  const navigate=useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return  
        }
        const user = jwtDecode(token)
        setUser(user)
        const res = await axios.get('http://localhost:3000/api/calender').then((res) => {
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
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Event List</h2>
  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
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
          <td className="px-6 py-4 text-gray-600">{event.date}</td>
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
              <button
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete"
              >
                <Trash size={16} />
              </button>
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
