import React, { useEffect, useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'


function Input({setQuery,units,setUnits}) {
  const [city,setCity]=useState("");

  const handleSearchClick=()=>{
    if(city!=='') setQuery({q:city})

  }
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>
      {
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;

        setQuery({
          lat,
          lon,
        })
      })
    }
  }, [])
  const handleLocationCLick=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>
      {
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
  <div className="flex flex-row  justify-center my-2">
  

  <div className="flex gap-1 items-centre justify-centre  w-[80%]">

  <input value={city} onChange={(e)=>setCity(e.currentTarget.value)} type="text" placeholder="Search for city...." className="text-large w-[75%] text-black font-light p-2 focus:outline-none shadow-xl capitalize transition-all duration-300 mx-1 placeholder:lowercase" ></input>
   
   <UilSearch  
   onClick={handleSearchClick}
   className="text-white z-[999] cursor-pointer font-light translate-y-2 transition ease-out hover:scale-125"
   />
  
   <UilLocationPoint className="text-white z-[999]   cursor-pointer font-light translate-y-2 transition ease-out hover:scale-125 "
    onClick={handleLocationCLick}
   />
  </div>

  <div className="flex flex-row w-1/4 items-centre justify-center">
  <button  name='metric' className="text-large text-white font-light transition ease-out hover:scale-110 "
  onClick={handleUnitchange}>°C</button>

  <p className="text-large text-white mt-1 font-light translate-y-2 mx-1" >/</p>


  <button  name='imperial' className="text-large text-white font-light transition ease-out hover:scale-110 " onClick={handleUnitchange}>°F</button>

  </div>

  </div>
  );
}

export default Input