import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import Peoplebox from './Peoplebox';
const Suggestions = () => {
  const data = useSelector((state) => state.users);
  const userdata=useSelector((state)=>state.authData);
  return (
    <div className='flex mt-4 flex-col gap-5'>
      <div>
        Suggestions :
      </div>
      <div className='flex flex-col gap-3'>
        {data?.map((item,index) => (
          <div key={index} className={`${userdata?.following.includes(item)===true? "hidden":"flex"}`}>
            <Peoplebox data={item}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Suggestions;