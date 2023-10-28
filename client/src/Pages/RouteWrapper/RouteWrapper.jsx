import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';
import Home from '../Home/Home';
import Authpage from '../Authpage/Authpage';
import Profile from '../ProfilePage/Profile';
import { useDispatch, useSelector } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import Topnavbar from '../../components/navigationbar/Topnavbar';
import Postpage from '../Postpage/Postpage';
import { remove_profile_data } from '../../reducers';
import NewsPage from '../NewsPage/NewsPage';
const RouteWrapper = () => {
  const dispatch = useDispatch();
  const user=useState((state)=>state);
  const location = useLocation();
  const Navigate=useNavigate();
  
  console.log(user)
  useEffect(() => {
    if (user.authData===null && !location.pathname.includes('/Auth')) {
      console.log("nen erripuk ni");
      Navigate('/Auth'); 
    }
    if(!location.pathname.includes('Profile'))
    {
      dispatch(remove_profile_data());
    }
  }, [ location.pathname]);



  return (
    <div className='text-white flex-1 flex ss:flex-row flex-col-reverse fixed h-[100vh] w-screen'>
      {!location.pathname.includes('/Auth') && (
        <Navbar />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Authpage />} />
        <Route path='/Profile/:user' element={<Profile />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='/Post/:id' element={<Postpage/>}/>
        <Route path='/News' element={<NewsPage/>}/>
      </Routes>
      <Topnavbar />
    </div>
  );
};

export default RouteWrapper;
