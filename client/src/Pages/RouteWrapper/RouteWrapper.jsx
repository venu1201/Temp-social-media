import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navigationbar/Navbar';
import Home from '../Home/Home';
import Authpage from '../Authpage/Authpage';
import Profile from '../ProfilePage/Profile';
import { useDispatch } from 'react-redux';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import Topnavbar from '../../components/navigationbar/Topnavbar';
import Postpage from '../Postpage/Postpage';
import { remove_profile_data } from '../../reducers';
import NewsPage from '../NewsPage/NewsPage';
const RouteWrapper = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(() => JSON.parse(localStorage.getItem('profile')) || {});
  const location = useLocation();
  const Navigate=useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('profile'));
    setUserData(data || {});
    if (!data && !location.pathname.includes('/Auth')) {
      Navigate('/Auth'); 
    }
    if(!location.pathname.includes('Profile'))
    {
      dispatch(remove_profile_data());
    }
  }, [ location.pathname]);

  const [key, setkey] = useState(1);
  useEffect(() => {
    console.log("hello");
    setkey(key + 1);
  }, [location.pathname]);

  return (
    <div className='text-white flex-1 flex ss:flex-row flex-col-reverse fixed h-[100vh] w-screen'>
      {!location.pathname.includes('/Auth') && (
        <Navbar key={key} user={userData?.result} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Authpage />} />
        <Route path='/Profile/:user' element={<Profile />} />
        <Route path='/Notifications' user={userData?.result?.username} element={<Notifications />} />
        <Route path='/Settings' element={<Settings />} />
        <Route path='/Post/:id' element={<Postpage/>}/>
        <Route path='/News' element={<NewsPage/>}/>
      </Routes>
      <Topnavbar />
    </div>
  );
};

export default RouteWrapper;
