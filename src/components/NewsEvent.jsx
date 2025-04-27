import React from 'react'

export default function NewsEvent({nid,title,images}) {
  return (
    <div key={nid} className="card bg-base-100 image-full w-full h-96 shadow-xl overflow-hidden">
    <figure>
      <img src={images && images.length > 0 ? images[0] : "/assets/img/default.jpg"} alt={title} className='w-full h-full cover'/>
    </figure>
    <div className="card-body relative">
      <h2 className="card-title">{title}</h2>
      <div className="card-actions justify-end">
        <button className="absolute bottom-5 right-5 btn bg-[#0000FF] text-white border-none">
          Read more
        </button>
      </div>
    </div>

  </div>
  )
}
