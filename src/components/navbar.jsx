import React, { useState } from 'react'

export default function NavBar() {
  const [isOpen,setIsOpen] =useState(false)
  return (
    <div className='h-screen p-5 overflow-visible'>
    <div className="navbar bg-base-100 bg-opacity-50 rounded-3xl shadow-xl p-5 sticky top-0 z-50 mt-10">
  <div className="flex-1 overflow-visible">
    <img className='w-16 h-15' src="./assets/img/Ave-Maria-Logo.png" alt="" />
  </div>
  <button className="lg:hidden text-2xl" onClick={() => setIsOpen(true)}>
          ☰
        </button>
      {/* Full-Screen Navigation Menu */}
      <div className={`fixed font-Amaranth top-0 left-0 w-full h-screen bg-base-100 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:h-auto lg:w-auto lg:bg-transparent lg:flex-row lg:justify-end`}>
      {/* Close Button */}
      <button className="absolute top-5 right-5  text-3xl lg:hidden" onClick={() => setIsOpen(false)}>✖</button>
  
    <ul className="menu lg:menu-horizontal menu-vertical px-1 text-2xl">
      <li><a>Home</a></li>
      <li>
        <details>
          <summary>About School</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Vision & Mission</a></li>
            <li><a>Houses</a></li>
            <li><a>Uniform</a></li>
            <li><a>Anthem, Crest ,Flag</a></li>
            <li><a>Board of Administration</a></li>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li><a>Principal</a></li>
              <li><a>Vice Principal</a></li>
              <li><a>Teachers</a></li>
            </ul>
            <li><a>History</a></li>
            <ul className="bg-base-100 rounded-t-none p-2">
              <li><a>Past Principals</a></li>
            </ul>
          </ul>
        </details>
      </li>
      <li><a>Facilities</a></li>
      <li><a>Clubs & Sports</a></li>
      <ul className="bg-base-100 rounded-t-none p-2">
        <li><a>Clubs</a></li>
        <ul className="bg-base-100 rounded-t-none p-2">
          <li><a>Computer Club</a></li>
          <li><a>Chemical Club</a></li>
          <li><a>Maths Club</a></li>
          <li><a>Science Club</a></li>
        </ul>
        <li><a>Sports</a></li>
        <ul className="bg-base-100 rounded-t-none p-2">
          <li><a>Cricket</a></li>
          <li><a>Football</a></li>
          <li><a>Badminton</a></li>
          <li><a>Table Tennis</a></li>
        </ul>
      </ul>
      <li><a>Contact Us</a></li>
    </ul>
 
  </div>
</div>
</div>
      );
    }
    
  