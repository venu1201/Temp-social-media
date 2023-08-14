import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';
import Home from '../Home/Home';
import Authpage from '../Authpage/Authpage';
import Profile from '../ProfilePage/Profile';
import { useDispatch } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
const RouteWrapper = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('profile')) || {});
  const location = useLocation();
  
  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('profile'));
    setUserData(data || {});
  }, []);
  
  return (
    <div className='text-white flex-1 flex ss:flex-row flex-col-reverse fixed h-[100vh] w-screen'>
      {!location.pathname.includes('/Auth') && (
        <Navbar user={userData?.result} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Authpage />} />
        <Route path='/Profile/:user' element={<Profile />} />
        <Route path='/Notifications' user={userData?.result?.username} element={<Notifications/>}/>
        <Route path='/Settings' element={<Settings />} />
        
      </Routes>
    </div>
  );
};

export default RouteWrapper;
