import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate } from './date'
import { useAuth } from '../../context/AuthContext.jsx'


export default function AddCalenderPage() {
    const {user}=useAuth()    
    const [date,setDate]=useState(new Date())
    const [event,setEvent]=useState("")
    const [entered_by,setEnteredBy]=useState("")
    const {id}= useParams()
    const navigate=useNavigate()
   
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {            
                            
                setEnteredBy(user.name)
                if (id) {
                  const token = localStorage.getItem('token')
                  if(!token){
                      navigate('/login')
                      return
                  }
                  axios.get(`${import.meta.env.VITE_BASE_URL}/api/calender/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                    
                    const event = res.data 
                              
                    
                    setDate(formatDate(new Date(event[0].date)))
                    setEvent(event[0].event)
                    setEnteredBy(user.name)
                    
                    
                    
                  })
                }              
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [id])
    
            
       
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!date || !event ){
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
              
                const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/calender/${id}`, { 
                    date:formatDate(new Date(date)),
                    event:event,
                    entered_by:entered_by },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                    toast.success('Event updated successfully')
                    setTimeout(() => navigate("/admin/calender"), 1000);
                }).catch((err) => {
                    if (err.response && err.response.data) {
                        console.log(err.response.data)
                    } else {
                        console.error('An error occurred while updating the event')
                    }
                })
                return
            }else{
              const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/calender`, { 
                  date:formatDate(new Date(date)),
                  event:event,
                  entered_by:entered_by },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                 
                  toast.success('Event added successfully')
                  setTimeout(() => navigate("/admin/calender"), 1000);
              }).catch((err) => { 
                  console.log(err)
              })


            };  
        }catch (error) {    
            console.log(error)
        }
        
    }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">{id?"Update Event":"Add Event"}</h2>      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Event</label>
          <input
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter event name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Entered By</label>
          <input
            type="text"
            value={entered_by}
            onChange={(e) => setEnteredBy(e.target.value)}
            readOnly
            className="input input-bordered w-full"
            placeholder={entered_by}
            required
          />
        </div>
        <button type="submit" className={id?"btn bg-green-600 w-full text-white":"btn bg-red-600 w-full text-white" }>
          {id?"Update Event":"Add Event"}
          Add Event
        </button>
      </form>
    </div>
  )
}
