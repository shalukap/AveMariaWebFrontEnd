import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

import AdminPage from './pages/admin/adminPage'
import Login from './login/login'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/protectedRoute'
import MoreNews from './components/MoreNews'
import NewsPage from './components/NewsPage'
import PstPrinceples from './pages/PstPrinceples'
import SocietyPage from './components/SocietyPage'

function App() {
 

  return (
    <BrowserRouter>
    <Toaster/>
    <Routes path='/*'>
    <Route path='/' element={<Home/>}/> 
    <Route path='/morenews' element={<MoreNews/>}/>
    <Route path='/society/:id' element={<SocietyPage/>}/>
    <Route path='/past' element={<PstPrinceples/>}/>  
    <Route path='/newspage/:id' element={<NewsPage/>}/> 
    <Route path='/login' element={<Login/>}/> 
    <Route element={<ProtectedRoute/>}>
      <Route path='/admin/*' element={<AdminPage/>} />  
    </Route>
    
    
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
