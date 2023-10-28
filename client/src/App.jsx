import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteWrapper from '../src/Pages/RouteWrapper/RouteWrapper';
import { useSelector } from 'react-redux';


const App = () => {
  // localStorage.removeItem('profile');
  // const store=useSelector((state)=>state);
  // console.log("store",store);
  return (
    <BrowserRouter>
      <RouteWrapper />
      
    </BrowserRouter>
  );
};

export default App;
