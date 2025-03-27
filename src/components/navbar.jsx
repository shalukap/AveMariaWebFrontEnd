import React from 'react'

export default function NavBar() {
  return (
    <div className='h-screen p-5 overflow-visible'>
    <div className="navbar bg-base-100 bg-opacity-50 rounded-3xl shadow-xl p-5 sticky top-0 z-50 mt-10">
  <div className="flex-1 overflow-visible">
    <img className='w-16 h-15' src="./assets/img/Ave-Maria-Logo.png" alt="" />
  </div>
  <div className="flex-none font-Amaranth ">
    <ul className="menu menu-horizontal px-1 text-2xl">
      <li><a>Home</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>About School</a></li>
      <li><a>History</a></li>
      <li><a>Clubs & Sports</a></li>
      <li><a>Contact Us</a></li>
    </ul>
 
  </div>
</div>
</div>
      );
    }
    
  