import React, { useState } from 'react'
import Peoplebox from './Peoplebox'
import { VscChromeClose } from 'react-icons/vsc'
import { useLocation } from 'react-router-dom'

const Popup = ({ data, name, setdefault }) => {
    const location=useLocation();
    
    const [blur,setblur]=useState(false);
    return (
        <div className={`absolute "blur-lg":""} overflow-hidden ml-10 mt-2 top-[40px] z-[9999] left-[20px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] h-[80%] w-[80%]`}>
            <div className='relative h-full'>
                <h3 className='w-full relative mt-4 h-[7%] text-[30px] flex justify-center items-center'>
                    <div className=''>
                        {name}

                    </div>
                    <span onClick={()=>setdefault((prev)=>!prev)} className='absolute right-7 hover:bg-white'>
                        <VscChromeClose className='text-black' />
                    </span>
                </h3>
                <div className='mt-4 h-[85%] w-full overflow-scroll px-4 '> 
                    {
                        data.map((item, index) => (
                            <Peoplebox key={index} setblur={setblur} data={item} setdefault={setdefault} />
                        ))
                    }
                </div>
                

            </div>
        </div>
    )
}

export default Popup