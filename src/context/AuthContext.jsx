import {createContext, useContext,useEffect, useState} from 'react'
import { set } from 'react-hook-form';
import api from '../api/axios.js';
import { GiToken } from 'react-icons/gi';

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [token,setToken]=useState(localStorage.getItem('token')||null);

    useEffect(()=>{
        if (token){
            api.get('/api/me').then((response)=>{
                setUser(response.data);
            }).catch((error)=>{
                console.error('Error fetching user data:',error);
                setUser(null);
            }).finally(()=>{
                setLoading(false);
            });
        }
    },[token])
    const login= async (email,password)=>{
        const response=await api.post('/api/login',{email,password});            
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token',response.data.token);
        return response.data.user;
    }
    const logout = async () => {
        await api.post("/api/logout")
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
    }
    
    return(
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}