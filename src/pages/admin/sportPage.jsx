import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { CgAdd } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export default function SportPage() {
    const {user}=useAuth()
    const [sports, setSports] = useState([]);    
    const navigate=useNavigate()
    useEffect(() => {
     

        const fetchSport = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return
            }          
          
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/sports`,
                {headers:{Authorization:`Bearer ${token}`}})
                .then((res) => {
                setSports(res.data);
            }).catch((err) => {
                console.log(err.response.data.message);
            })
        }
            fetchSport()
    }, [])
    async function handleDelete(sport_id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token')
          if (!token) {
            navigate('/login')
            return  
          }
          try {
            axios.delete(`${import.meta.env.VITE_BASE_URL}/api/sports/${sport_id}`, { headers: { Authorization: `Bearer ${token}`}}).then((res) => {
              Swal.fire(
                'Deleted!',
                'The sport has been deleted.',
                'success'
              )
              setSports(sports.filter((sp) => sp.sport_id !== sport_id));
            }).catch((err) => {
             toast.error(err.response.data.message)
            })
          } catch (error) {
            toast.error(err.response.data.message)
          }
        }
      })
    }
  return (
    
        <div className='p-6 bg-white shadow-lg h-full'>
              <h2 className='text-2xl font-bold mb-6 text-gray-800'>Sports in School</h2>
              <div className='w-full max-w-10xl bg-white rounded-lg shadow-lg overflow-hidden'>
                    <table className='w-full'>
                        <thead>
                            <tr className='text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                                <th className='px-4 py-3'>ID</th>
                                <th className='px-4 py-3'>Sport Name</th>
                                <th className='px-4 py-3'>Description</th>
                                <th className='px-4 py-3'>InCharge</th>
                                <th className='px-4 py-3'>Image</th>
                                <th className='px-4 py-3'>Action</th>                       
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                          {sports.map((sp) => (
                            <tr key ={sp.id} className='text-gray-700'>
                              
                                <td className='px-4 py-3 border'>{sp.sport_id}</td>
                                <td className='px-4 py-3 border'>{sp.sport_name}</td>
                                <td className='px-4 py-3 border'>{sp.sport_description}</td>
                                <td className='px-4 py-3 border'>{sp.incharge}</td>
                                <td className='px-4 py-3 border'>{sp.image}</td>
                                <td className='px-4 py-3 border'><div className='flex space-x-2'>
                          
                          <button
                            className='px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600'
                            onClick={() =>navigate(`/admin/sportsdetails/${sp.sport_id}`)}
                          >
                            View
                          </button>
                          {user.role === 'Admin' && (
                          <button
                            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                            onClick={() =>{handleDelete(sp.sport_id)}}
                          >
                            Delete
                          </button>
                            
                          )}
                        </div></td>
                             
                               
                            </tr>
                             ))}
                        </tbody>
        
                    </table>
                    <button className="fixed bottom-5 right-5  hover:bg-blue-600 rounded-full" onClick={()=>{navigate("/admin/sportsdetails")}}><CgAdd className='text-5xl'/></button>
              </div>
            </div>
   
  )
}
