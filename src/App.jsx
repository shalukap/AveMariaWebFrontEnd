import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

import AdminPage from './pages/admin/adminPage'
import Login from './login/login'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'

function App() {
 

  return (
    <BrowserRouter>
    <Toaster/>
    <Routes path='/*'>
    <Route path='/' element={<Home/>}/> 
    <Route path='/login' element={<Login/>}/> 
    <Route element={<ProtectedRoute/>}>
      <Route path='/admin/*' element={<AdminPage/>} />  
    </Route>
    
    
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
