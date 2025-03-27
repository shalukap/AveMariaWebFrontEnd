import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'


export default function AddCalenderPage() {
    
    const [date,setDate]=useState("")
    const [event,setEvent]=useState("")
    const [enteredBy,setEnteredBy]=useState("")
    const {id}= useParams()
    const navigate=useNavigate()
   
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    navigate('/login')
                    return
                }
                const user=jwtDecode(token)               
                setEnteredBy(user.name)
                if (id) {
                  axios.get(`${import.meta.env.VITE_BASE_URL}/api/calender/` + id).then((res) => {
                    const event = res.data            
                    
                    setDate(event[0].date)
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
        try {
            if (id){
                const res = await axios.put('http://localhost:3000/api/calender/' + id, { 
                    date:date,
                    event:event,
                    enteredBy:enteredBy },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                    toast.success('Event updated successfully')
                    setTimeout(() => navigate("/admin/calender"), 1000);
                }).catch((err) => {
                    console.log(err)
                })
                return
            }else{
              const res = await axios.post('http://localhost:3000/api/calender', { 
                  date:date,
                  event:event,
                  enteredBy:enteredBy },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                 
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
            value={enteredBy}
            readOnly
            className="input input-bordered w-full"
            placeholder={enteredBy}
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
