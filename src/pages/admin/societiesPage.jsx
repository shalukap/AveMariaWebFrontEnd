import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { CgAdd } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Swal from 'sweetalert2';

export default function SocietiesPage() {
 const {user}= useAuth();
  const [society, setSociety] = useState([]);
 
  const navigate=useNavigate()
  useEffect(() => {

    const fetchSociety = async () => { 
       const token= localStorage.getItem('token');
        if(!token){
            navigate('/login')
            return
        }
        
            
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/society`,
          {headers:{Authorization:`Bearer ${token}`}})
          .then((res) => {         
            setSociety(res.data);
           
        }).catch((err) => {
            console.log(err);
        })
    }
    fetchSociety();

  },[])

  async function handleDelete(society_id) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) {
      return
    }
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return  
    }
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/society/${society_id}`, { headers: { Authorization: `Bearer ${token}`}}).then((res) => {
        Swal.fire(
          'Deleted!',
          'The society has been deleted.',
          'success'
        );
        setSociety(society.filter((s) => s.society_id !== society_id))
      }).catch((err) => {
        console.log(err)

      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='p-6 bg-white shadow-lg h-full'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Assosiations in School</h2>
      <div className='w-full max-w-10xl bg-white rounded-lg shadow-lg overflow-hidden'>
            <table className='w-full'>
                <thead>
                    <tr className='text-sm font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
                        <th className='px-4 py-3'>ID</th>
                        <th className='px-4 py-3'>Name</th>
                        <th className='px-4 py-3'>Description</th>
                        <th className='px-4 py-3'>Logo</th>
                        <th className='px-4 py-3'>Image</th>
                        <th className='px-4 py-3'>Action</th>                       
                    </tr>
                </thead>
                <tbody className='bg-white'>
                  {society.map((s) => (
                    <tr key={s.id} className='text-gray-700'>                      
                        <td className='px-4 py-3 border'>{s.society_id}</td>
                        <td className='px-4 py-3 border'>{s.society_name}</td>
                        <td className='px-4 py-3 border'>{s.society_description}</td>
                        <td className='px-4 py-3 border'>{s.logo}</td>
                        <td className='px-4 py-3 border'>{s.image}</td>
                        <td className='px-4 py-3 border'><div className='flex space-x-2'>
                  
                  <button
                    className='px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600'
                    onClick={() =>navigate(`/admin/societydetails/${s.society_id}`)}
                  >
                    View
                  </button>
                  {user.role === 'Admin' && (
                  <button
                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                    onClick={() =>{handleDelete(s.society_id)}}
                  >
                    Delete
                  </button>
                    
                  )}
                </div></td>
                     
                       
                    </tr>
                     ))}
                </tbody>

            </table>
            <button className="fixed bottom-5 right-5  hover:bg-blue-600 rounded-full" onClick={()=>{navigate("/admin/societydetails")}}><CgAdd className='text-5xl'/></button>
      </div>
    </div>
  )
}
