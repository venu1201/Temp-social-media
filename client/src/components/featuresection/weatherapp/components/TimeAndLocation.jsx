import React from 'react'
import { formatToLocalTime } from '../services/WeatherServices'

function TimeAndLocation({weather:{dt,timezone,name,country}}) {
  return (

    <div className='flex flex-col items-centre justify-centre' >
     {/* <div className='flex flex-row items-center justify-centre mx-auto'>

        <p className="text-white font-extralight test-xl">


       </p>
    </div> */}

    <div className='flex items-centre justify-centre mx-auto'>
        <p className="flex items-centre justify-centre mx-2 text-white font-semibold text-3xl">
        {`${name},${country}`}

        </p>
    </div>

    </div>







  )
}

export default TimeAndLocation