import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export default function SportsDetailsPage() {
  const [sportName, setSportName] = useState('');
  const [sport_description, setSport_description] = useState('');
  const [incharge, setIncharge] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
    const fetchSportDetails = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/login')
            return
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/sports/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
          const sport = res.data                
          setSportName(sport[0].sport_name)
          setSport_description(sport[0].sport_description)
          setIncharge(sport[0].incharge)
        }).catch((err) => {
          toast.error(err.response.data.message)
        })

      }
    }
    fetchSportDetails()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!sportName || !sport_description || !incharge){
        alert("Please fill all the fields")
        return
    }
    const token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
        return
    }
    try {
      if (id){
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are about to update this sport.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          });
          if (!result.isConfirmed) {
            toast.error("Update cancelled")
            return
          }else{
            await axios.put(`${import.meta.env.VITE_BASE_URL}/api/sports/${id}`, {
              sport_name: sportName,
              sport_description: sport_description,
              incharge,
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
               Swal.fire('Updated!', 'The sport has been updated.', 'success');
                navigate('/admin/sports')
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
          }
      }else{
          Swal.fire({
            title: 'Are you sure?',
            text: "You are about to add this sport.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
          }).then((result) => {
            if (!result.isConfirmed) {
              toast.error("Addition cancelled")
              return
            }else{
              axios.post(`${import.meta.env.VITE_BASE_URL}/api/sports`, {
                sport_name: sportName,
                sport_description: sport_description,
                incharge,
              }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
                 Swal.fire('Added!', 'The sport has been added.', 'success');
                  navigate('/admin/sports')
              }).catch((err) => {
                  toast.error(err.response.data.message)
              })
            }
          })
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-max bg-gray-100 p-16">
      <h1 className="text-4xl font-bold text-blue-950 text-center mb-6">
        Sports Details
      </h1>

      <form
        className="w-full h-max max-w-9xl p-6 bg-white shadow-lg rounded-xl"
        onSubmit={handleSubmit}
      >
        {/* Sport Name */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Sport Name</label>
            <input
              type="text"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              className="text-lg p-3 rounded-xl border"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="w-full mt-6">
          <label className="font-semibold text-lg">Description</label>
          <textarea
            value={sport_description}
            onChange={(e) => setSport_description(e.target.value)}
            rows={15}
            className="w-full p-3 rounded-xl border"
            required
          />
        </div>

        {/* In-charge */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="font-semibold text-lg">In-charge</label>
            <input
              type="text"
              value={incharge}
              onChange={(e) => setIncharge(e.target.value)}
              className="text-lg p-3 rounded-xl border"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center h-full w-full border-dashed border-4 border-gray-400 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Upload Sport Image</h3>

            <div className="w-full h-[200px] bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-2">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="h-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Image Preview</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        {/* Submit / Update Button */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full">
          <button
            type="submit"
            className={`px-6 py-3 ${
              id
                ? 'bg-yellow-400 hover:bg-yellow-500'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-xl w-full md:w-auto`}
          >
            {id ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
