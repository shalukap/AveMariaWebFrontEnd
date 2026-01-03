import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SocietyPage() {
    const {id} = useParams();
    const [society, setSociety] = useState([]);
    console.log(society);
    
    
    useEffect(() => {
        const fetchSociety = async () => {            
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/society/`+id).then((res) => {
                setSociety(res.data[0]);
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchSociety();
    },[])
  return (
    <div className='sm:h-[100%] md:h-full w-full bg-menu text-white font-Amaranth text-center'>
        
        <h1 className='sm:text-7xl md:text-7xl font-bold p-16 text-white'>{society.name}</h1>
        <img src={society.logo} alt="" />
        <p>{society.description}</p>
    </div>
  )
}
