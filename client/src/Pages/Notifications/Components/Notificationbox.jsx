import React, { useState } from 'react'
import {avatar} from '../../../assets/index'
import LoadingSpinner from '../../../components/Spinner/Spinner';
const Notificationbox = ({ name,userdata,item, firstname, lastname,handleclick,handle,picture }) => {
    const handleBothFunctions = (type, name) => {
        if(type==='Accept')
            setloading1(true)
        else if(type==='Delete')
            setloading2(true)
        else
            setloading3(true)
        handleclick(type, name);
        
        
        
      };
      console.log(item)
      const [isPresent,setisPresent]=useState( userdata.following.includes(name) || item.pending.includes(userdata?.username))
      console.log(userdata)
      const [loading1,setloading1]=useState(false)
      const [loading2,setloading2]=useState(false)
      const [loading3,setloading3]=useState(false)
    return (
        <div className=' mt-4 px-5 flex w-full h-[82px] justify-between'>
            <div className='flex h-full justify-center gap-5 '>
                <div className='h-full w-[110px] '>
                    <img className='h-full rounded-md w-full  object-fill' src={picture || avatar } alt="" />
                </div>
                <div className='flex items-center gap-3  w-full h-full'>
                    <div className='text-[25px] flex mt-3'>
                        <span>{name}</span>
                    </div>
                    <div className='flex text-dimWhite text-[20px] mt-3'>
                        <span>has requested you to Add...! </span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center gap-5'>
                <button onClick={()=>handleBothFunctions('Accept',name)} className='w-[70px] flex justify-center items-center h-[50px] bg-blue-700 rounded-lg cursor-pointer'>
                    {loading1===true? (
                        <LoadingSpinner/>
                    ):
                    (
                        <span>Accept</span>
                    )}
                </button>
                <button onClick={()=>handleBothFunctions('Delete',name)} className='w-[70px] flex justify-center items-center h-[50px] bg-blue-700 rounded-lg cursor-pointer'>
                    {loading2===true? (
                        <LoadingSpinner/>
                    ):
                    (
                        <span>Delete</span>
                    )}
                </button>
                {!isPresent && (
                    <button onClick={()=>handleBothFunctions('Acceptandaddback',name)} className='w-[110px] flex justify-center items-center h-[50px] bg-blue-700 rounded-lg cursor-pointer'>
                    {loading3===true? (
                        <LoadingSpinner/>
                    ):
                    (
                        <span>Accept & AddBack</span>
                    )}
                    </button>
                )}
                
            </div>

        </div>
    )
}

export default Notificationbox