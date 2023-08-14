import React from 'react'
import { UilSun, UilTemperature,UilWind, UilArrowUp,UilArrowDown,UilTear,UilSunset,UilCloudSunRain,UilCloudSunMeatball,UilCloudSun ,UilThunderstormSun,UilClouds,UilCloudShowersHeavy ,UilWindSun    } from '@iconscout/react-unicons'
import { weathericontourl } from '../services/WeatherServices'

function TemperatureAndDetails({weather:{details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,all,pressure}}) {
  return (
    <div className="flex flex-col items-centre justify-center">

    <div className="flex flex-row mx-auto  py-3 text-xl text-cyan-300  font-light" >
    {details}

    </div>

    <div className="flex justify-between items-centre ">
    <img src={weathericontourl(icon)}
        className='w-20'
    />
     <p className="text-white text-5xl">{`${temp.toFixed()}°`}</p>
     <div className="flex flex-col text-white ">
        <div className="flex font-light text-sm items-centre justify between mb-1">
         <UilTemperature size={18} />
         Really felt:
         <span className="mr-2 font-semibold">{`${feels_like.toFixed()}°`}</span>
        </div>

        <div className="flex font-light text-sm items-centre justify between mb-1">
         <UilTear size={18} />
         Humidity:
         <span className="mr-2 font-semibold">{`${humidity.toFixed()}%`}</span>
        </div>

        <div className="flex font-light text-sm items-centre justify between ">
         <UilWind size={18} />
         Wind:
         <span className="mr-2 font-semibold">{`${speed.toFixed()}km/h`}</span>
        </div>




     </div>


    </div>

    <div className="flex items-centre justify-center space-x-2 text-white text-sm py-3 mt-1">
    <UilClouds/>
    <p className='text-white font-light'>Clouds: <span className='ml-0.5'> {`${all.toFixed()}`}</span></p>
    <span className='text-white'>|</span>

    <UilWindSun/>
    <p className='text-white font-light' >Pressure: <span className='ml-0.5'>{`${pressure.toFixed()}`}</span></p>
    <span className='text-white'>|</span>

    <UilArrowUp/>
    <p className='text-white font-light'>High: <span className='ml-0.5'>{`${temp_max.toFixed()}°`}</span></p>
    <span className='text-white'>|</span>

    <UilArrowDown/>
    <p className='text-white font-light'>Low: <span className='ml-0.5'>{`${temp_min.toFixed()}°`}</span></p>
   



    </div>



    </div>
  )
}

export default TemperatureAndDetails