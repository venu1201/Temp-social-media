import React, { useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';


function Input({setQuery,units,setUnits}) {
  const [city,setCity]=useState("");

  const handleSearchClick=()=>{
    if(city!=='') setQuery({q:city})

  }

  const handleLocationCLick=()=>{
    if(navigator.geolocation){
      toast.info('Fetching users location')
      navigator.geolocation.getCurrentPosition((position)=>
      {
        toast.success('Location Fetched Successfully')
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;

        setQuery({
          lat,
          lon,
        })
      })
    }
  }


  const handleUnitchange=(e)=>{
    const selectedUnit=e.currentTarget.name;
    if(units!=selectedUnit) setUnits(selectedUnit);

  };
  return(
  <div className="flex flex-row  justify-center my-6">
  

  <div className="flex flex-row  items-centre justify-centre space-x-4 w-3/4">

  <input value={city} onChange={(e)=>setCity(e.currentTarget.value)} type="text" placeholder="Search for city...." className="text-large text-black font-light p-2 focus:outline-none shadow-xl capitalize transition-all hover:scale-105 duration-300ms rounded-md hover:shadow-blue-600 placeholder:lowercase" ></input>
   
   <UilSearch  
   onClick={handleSearchClick}
   size={20} 
   className="text-white cursor-pointer font-light translate-y-2 transition ease-out hover:scale-125"
   / >
  
   <UilLocationPoint size={20} className="text-white cursor-pointer font-light translate-y-2 transition ease-out hover:scale-125 "
    onClick={handleLocationCLick}
   />
  </div>

  <div className="flex flex-row w-1/4 items-centre justify-center">
  <button  name='metric' className="text-large text-white font-light transition ease-out hover:scale-110 "
  onClick={handleUnitchange}>°C</button>

  <p className="text-large text-white font-light translate-y-2 mx-1" >|</p>


  <button  name='imperial' className="text-large text-white font-light transition ease-out hover:scale-110 " onClick={handleUnitchange}>°F</button>

  </div>

  </div>
  );
}

export default Input