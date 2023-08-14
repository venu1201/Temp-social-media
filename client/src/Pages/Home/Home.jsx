import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navigationbar/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getuser } from '../../actions/Auth'
import Profile from '../ProfilePage/Profile'
import Dashboard from '../../components/HomeDashboard/Dashboard'
const Home = () => {

  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem('profile'));

  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate('/Auth');
    } 
  }, [data, navigate, dispatch]);



  dispatch(getuser(data?.result));

  
  return (
    <div className='ss:h-screen h-[90%]  font-poppins  relative flex md:w-[75%] sm:w-[68%] ss:w-[90%] w-full ssm:w-[74%] ac:w-[78%]'>
      {/* <Navbar user={data?.result?.username} /> */}
      
      <Dashboard />
        
       


   
    </div>
  )
}

export default Home