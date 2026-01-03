import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { use, useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

export default function userRegisterPage() {
    const navigate=useNavigate()
    const [fname,setFname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confiremPassword,setConfiremPassword]=useState('')
    const [role,setRole]=useState('')
    const [phone,setPhone]=useState('')
    const [status,setStatus]=useState(true)  
    const [isAdmin,setIsAdmin]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    
    const{uid}=useParams()
   
    
    useEffect(() => {   
        
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    navigate('/login')
                    return
                }
              
                setIsAdmin(user.role === 'Admin')
                setIsEdit(uid)
                if (uid) {
                  axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/` + id).then((res) => {
                    const user = res.data                                       
                    setFname(user[0].name)
                    setEmail(user[0].email)                   
                    setRole(user[0].role)
                    setPhone(user[0].phone)
                    setStatus(user[0].status)
                  })
                }              
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [uid])
    async function  handleSubmit() {                       
        if (password !== confiremPassword) {
            toast.error('Password does not match')
            return
        }
        const token = localStorage.getItem('token')
        if (!token) {
            toast.error('You are not logged in')
            navigate('/login')
            return
        }
        if(uid){
            const data={
                name:fname,
                email:email,                
                role:role,
                phone:phone,
                status:status
            }
            if (password){
                data.password=password
                
            }
            const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/` + uid, data,{
                headers:{Authorization:"Bearer"+token}
            }).then((res) => {
                toast.success('User updated successfully')
                navigate('/admin/users')
            }).catch((err) => {
                toast.error(err.response.data.message)
                navigate('/admin/users')
            })
        }else{
            const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, {
                name:fname,
                email:email,
                password:password,
                role:role,
                phone:phone
                
            },{
                headers:{Authorization:"Bearer"+token
    
                }}).then((res) => {
                    toast.success('User added successfully')
                    navigate('/admin/users')
                }).catch((err) => {
                    toast.error(err.response.data.message)
                    navigate('/admin/users')
                })
        }
        
    }

  return (
       <>   
    
    <div className='flex justify-center items-center min-h-screen'>
    <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 rounded-2xl ">
                <div className="card-body">                    
                    <h2 className="card-title text-center text-xl font-semibold">{isEdit ? 'Edit User' : 'Add User'}</h2>         

                    <div className="space-y-4">             
                        
                        <div>
                            <input type="text" placeholder="Full Name" readOnly={!isAdmin} className="input input-bordered w-full" onChange={(e) => setFname(e.target.value)}value={fname}required />
                          
                        </div>

                        <div>
                            <input type="email" placeholder="Email" readOnly={!isAdmin} className="input input-bordered w-full"  onChange={(e) => setEmail(e.target.value)}value={email}required/>
                           
                        </div>
                        <div>
                            <select className="select select-bordered w-full" disabled={!isAdmin} name='role' onChange={(e) => setRole(e.target.value)} value={role} required>
                                <option >Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Author">Author</option>
                                <option value="Photographer">Photographer</option>
                            </select>
                          
                        </div>
                        <div>
                            <select className="select select-bordered w-full" disabled={!isAdmin} name='status' onChange={(e) => setStatus(e.target.value)} value={status} required>
                                <option >Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>                                
                            </select>
                          
                        </div>
                      
                        <div>
                            <input type="password" placeholder="Password" className="input input-bordered w-full" onChange={(e) => setPassword(e.target.value)} value={password}required/>
                           
                        </div>
                        <div>
                            <input type="password" placeholder="Confirm Password" value={confiremPassword} onChange={(e) => setConfiremPassword(e.target.value)}className="input input-bordered w-full"  required/>
                           
                        </div>

                        <div>
                            <input type="text" placeholder="Phone Number" readOnly={!isAdmin} name='phone' className="input input-bordered w-full" onChange={(e) => setPhone(e.target.value)}value={phone}required />
                            
                        </div>

                        <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>{isEdit ? 'Update' : 'Register'}</button>
                    </div>
                </div>
            </div>
            </div>
            </>
  )
}
