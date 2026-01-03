import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewsEvent({id,nid,title,images}) {
  const navigate=useNavigate()
  const backendUrl=import.meta.env.VITE_BASE_URL
  return (
    <div key={nid} className="card bg-base-100 image-full w-full h-72 hover:scale-105 hover:outline outline-white hover:outline-offset-4 overflow-hidden">
    <figure>
      <img src={images && images.length > 0 ? `${backendUrl}/storage/${images[0]}` : "/assets/img/default.jpg"} alt={title} className='w-full h-full cover'/>
    </figure>
    <div className="card-body relative">
      <h2 className="card-title">{title}</h2>
      <div className="card-actions justify-end">
        <button className="absolute bottom-5 right-5 btn bg-[#0000FF] text-white border-none" onClick={() => navigate(`/newspage/${nid}`)}>
          Read more
        </button>
      </div>
    </div>

  </div>
  )
}
