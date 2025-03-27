import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'



export default function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[isLoading,setIsloading]=useState(false)
    

    function handleLogin(e){
        e.preventDefault() 
        setIsloading(true)      
            axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`,{
                email:email,
                password:password
            },{withCredentials:true}).then((res)=>{                 
                const user=res.data.user           
                localStorage.setItem('token',res.data.token)     
                if ((user.role === 'Admin' || user.role === 'Author'|| user.role === 'Photographer')&& user.status==="Active") {
                    navigate('/admin/adminPage')
                    toast.success('Login Success')
                    setIsloading(false)
                }else{                    
                    toast.error('You are not authorized to login')                    
                   }
                
            }).catch((err)=>{                
                toast.error("Username or password is incorrect")             
            })        
        
    }
  return (
    <div className='w-full h-screen flex justify-center items-center bg-image'>
        <div className='w-[600px] h-[400px] backdrop-blur-xl bg-opacity-15 rounded-2xl flex justify-center items-center p-10 flex-col'> 
    
           <div className='flex'>
                <img src="../assets/img/logoWhite.png" alt="logo" className='w-[100px] h-[150px] bg-cover  m-10' />
                <form onSubmit={handleLogin}>
                <div className='flex flex-col gap-10 text-white text-2xl'>
                <input type="email" placeholder='Email' className='w-[300px] h-[50px] bg-transparent border-b-2' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' className='w-[300px] h-[50px] bg-transparent border-b-2'  onChange={(e)=>setPassword(e.target.value)}/>
                <button className={`flex justify-center items-center bg-blue-950 hover:bg-blue-700 text-white p-[15px] rounded-2xl text-2xl ${isLoading ? 'opacity-50':'' }`} onClick={handleLogin}>{isLoading?(<div className='w-[30px] h-[30px] border-b-2 border-b-accent-400 rounded-full animate-spin'></div>):' Login'}</button>
                
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
