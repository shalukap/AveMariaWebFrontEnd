import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { set } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const dropDownRef=useRef(null)
  const [isOpen,setIsOpen] =useState(false)
  const [society,setSociety]= useState([])
  const [sports,setSports]= useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/society`).then((res) => {
      setSociety(res.data);
    }).catch((err) => {
      console.log(err);
    })
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/sport`).then((res) => {
      setSports(res.data);
      console.log(sports);
    }).catch((err) => {
      console.log(err);
    })
    function handleClickOutside(event) {
      if (!event.target.closest('summary')) {
        document.querySelectorAll('details').forEach(details => {
          details.removeAttribute('open');
        });
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])
  return (
    <div className='h-screen p-5 overflow-visible'>
    <div className="navbar bg-opacity-50 rounded-3xl text-white p-5 sticky top-0 z-50 mt-10 ">
  
  <button className="lg:hidden text-2xl" onClick={() => setIsOpen(true)}>
          ☰
        </button>
      {/* Full-Screen Navigation Menu */}
      <div className={`fixed font-Amaranth top-0 left-0 w-full h-screen bg-menu flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:h-auto lg:w-auto lg:bg-transparent lg:flex-row lg:justify-end`}>
      {/* Close Button */}
      <button className="absolute top-5 right-5  text-3xl lg:hidden" onClick={() => setIsOpen(false)}>✖</button>
  
    <ul className="menu lg:menu-horizontal menu-vertical px-1 text-2xl">
      <li><a>Home</a></li>
      <li>
        <details>
          <summary>About School</summary>
          <ul className="bg-menu rounded-t-none p-2 text-sm" onClick={()=>setIsOpen(!isOpen)}>
            <li><a>Anthem, Crest ,Flag</a></li>
            <li><a>Houses</a></li>     
           
            <li><a>Board of Administration</a></li>
            <ul className="bg-menu rounded-t-none p-2 text-sm">
              <li><a>Principal</a></li>
              <li><a>Vice Principal</a></li>
              <li><a>Teachers</a></li>
            </ul>
            <li><a>History</a></li>
            <ul className="bg-menu rounded-t-none p-2 text-sm">
              <li><Link to="/past">Past Principals</Link></li>
            </ul>
          </ul>
          </details>
      </li>
      <li><a>Facilities</a></li>
      <li>
      <details>
        <summary>Associations</summary>
       
      
      <ul className="bg-menu rounded-t-none p-2 text-sm">
          {society.map((society) => (
            <li><Link to={`/society/${society.socid}`}>{society.name}</Link></li>
          ))}
          
        </ul>
      
      </details>
      </li>
      <li>
      <details>
        <summary>Sports</summary>
     
        <ul className="bg-menu rounded-t-none p-2 text-sm">
          {sports.map((sport) => (
            <li><Link to={`/sport/${sport.sportid}`}>{sport.sportName}</Link></li>
          ))}
          
        </ul>
     
     </details>
     </li>
      <li><a>Contact Us</a></li>
    </ul>
 
  </div>
 
</div>
</div>
      );
    }
    
  