import React,{useState} from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { Link,Routes,Route, useLocation,useNavigate } from 'react-router-dom'
import NewsPage from './newsPage'
import CalenderPage from './calenderPage'
import NewsDetails from './newsDetails'
import UserPage from './userPage'
import AddCalenderPage from './addCalenderPage'
import UserRegisterForm from './userAddPage'
import axios from 'axios'
import SocietiesPage from './societiesPage'
import SocietyDetails from './societyDetails'
import SportPage from './sportPage'
import SportDetails from './sportDetails'
import api from '../../api/axios'
import toast from 'react-hot-toast'





export default function AdminPage() {
  const{logout}=useAuth()
  const navigate=useNavigate()
/**
 * Handles logout by clearing the user from local storage and navigating to the login page.
 * @return {void}
 */
  function handleLogout(){
    try{
      logout()
      toast.success('Logged out successfully')
      navigate('/')
    }catch(error){
      console.error('Logout failed:',error)
      toast.error('Logout failed')
    }
   
  }
  

  const location=useLocation()
  const menuItems=[
    {name:'News',path:'/admin/news'},
    {name:'Calender',path:'/admin/calender'},
    {name:'Society',path:'/admin/society'},
    {name:'Sports',path:'/admin/sports'},
    {name:'Advertiesment',path:'/admin/ads'},
    
    {name:'Users',path:'/admin/users'}];
 

  return (
    <div>
    <div className='w-full h-screen flex '>
      <div className='w-[20%] h-screen bg-primary fixed'>
        <div className='w-full h-[20%] flex flex-col justify-center items-center'>
          <img className='w-16 h-15' src="../assets/img/logoWhite.png" alt="logo" />
          <h1 className='text-2xl font-bold font-Amaranth text-white'>Admin Panel</h1>
      </div>
        <div className='flex flex-col gap-2 ml-10 mt-5'>
          {menuItems.map((item,index)=>(
            <Link key={index} to={item.path} className={`hover:bg-gray-200 hover:text-primary rounded-l-xl transition-all p-5 ${location.pathname===item.path ? 'bg-white text-primary rounded-l-xl transition p-5' : 'bg-primary text-white' }`}>{item.name}</Link>
          ))}
          {/* <Link to='/admin/' className='hover:bg-gray-200 rounded-l-xl transition p-5'>Dashboard</Link>
          <Link to='/admin/news' className='hover:bg-gray-200 rounded-l-xl transition p-5 ${isActive ? bg-gray-200 rounded-l-xl transition p-5: bg-blue-500}'onClick={()=>setActive(!active)}>News</Link>
          <Link to='/admin/calender' className='hover:bg-gray-200 rounded-l-xl transition p-5 peer-checked:bg-gray-200${isActive ? bg-gray-200 rounded-l-xl transition p-5: bg-blue-500}'onClick={()=>setActive(!active)}>Calender</Link>
          <Link to='/admin/ads' className='hover:bg-gray-200 rounded-l-xl transition p-5'>Advertiesments</Link>
          <Link to='/admin/users' className='hover:bg-gray-200 rounded-l-xl transition p-5'>Users</Link> */}
          </div>
          <button className='absolute bottom-5 left-5 btn btn-primary' onClick={()=>handleLogout()}>Logout</button>
      </div>
      
      <div className='w-[80%] h-screen bg-[#121212] ml-[20%]'>
      
        <Routes path='/*'>
          <Route path='/news' element={<NewsPage/>}/>
          <Route path='/news/newsdetails' element={<NewsDetails/>}/>
          <Route path='/news/newsdetails/:id' element={<NewsDetails/>}/>
          <Route path='/calender' element={<CalenderPage/>}/>
           <Route path='/society' element={<SocietiesPage/>}/>
           <Route path='/societydetails' element={<SocietyDetails/>}/>
            <Route path='/societydetails/:id' element={<SocietyDetails/>}/>
           <Route path='/sports' element={<SportPage/>}/>
           <Route path='/sportsdetails' element={<SportDetails/>}/>
           <Route path='/sportsdetails/:id' element={<SportDetails/>}/>
          <Route path='/calender/add' element={<AddCalenderPage/>}/>
          <Route path='/calender/add/:id' element={<AddCalenderPage/>}/>
          <Route path='/users' element={<UserPage/>}/>
          <Route path='/users/add' element={<UserRegisterForm/>}/>
          <Route path='/users/add/:uid' element={<UserRegisterForm/>}/>
        </Routes>
      </div>
    </div>
    </div>
   
  )
}
