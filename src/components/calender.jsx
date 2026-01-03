import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { formatCalenderDate, formatDate } from '../pages/admin/date'

export default function Calender() {
  const [event,setEvent]=useState([])
  
  const thisYear = new Date().getFullYear()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const thisMonth = monthNames[new Date().getMonth()]
  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/calender`).then((res) => {
          setEvent(res.data) 
          
              
          
        }).catch((err) => {
          console.log(err)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
  },[])
  return (
   
    <div className=' max-h-screen overflow-y-auto sm:w-full md:w-1/4 bg-[white] ml-5 mr-10 mt-20' >     
      <h2 className='mt-10 sm:text-xl md:text-2xl font-bold font-Amaranth text-[primary] text-center text-primary'>{thisMonth} {thisYear}</h2>
      {event.filter((eventItem)=>{
        const eventDate = new Date(eventItem.date)
        const now = new Date()
        return(eventDate.getMonth()===now.getMonth() && eventDate.getFullYear()===thisYear);
      }).sort((a, b) => new Date(a.date) - new Date(b.date)).map((eventItem) => (
        <div key={eventItem._id} className='flex font-Amaranth bg-primary text-white m-2'>
          <p className='sm:text-2xl md:text-xl text-center text-primary m-3 p-2 bg-white '>{formatCalenderDate(new Date(eventItem.date))}</p>
          <h1 className='sm:text-3xl md:text-xl font-bold text-center p-5'>{eventItem.event}</h1>
          
        </div>
      ))}
      <div className='flex justify-center items-center pb-5 pt-5'>
      <button className='bottom-0 sm:text-xl md:text-xl justify-items-center font-bold font-Amaranth text-[white] text-center w-1/2  bg-[red] rounded-xl p-3'>View All events</button>

      </div>
      </div>
    
  )
}
