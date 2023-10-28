import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getuser } from '../../actions/Auth'
import Dashboard from '../../components/HomeDashboard/Dashboard'
const Home = () => {

  const dispatch = useDispatch();
  const data = useSelector((state)=>state.authData);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!data) {
      navigate('/Auth');
    } 
  }, [data, navigate]);



  dispatch(getuser(data?.username));
  // console.log(state)

  

  return (
    <div className='ss:h-screen h-[80%]  font-poppins  relative flex md:w-[75%] sm:w-[68%] ss:w-[90%] w-full ssm:w-[74%] ac:w-[78%]'>    
      <Dashboard />       
    </div>
  )
}

export default Home