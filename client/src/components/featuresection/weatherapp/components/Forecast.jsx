import React from 'react'
import { UilCloudSunRain,UilCloudSunMeatball,UilCloudSun ,UilThunderstormSun,UilClouds,UilCloudShowersHeavy   } from '@iconscout/react-unicons'
function Forecast({title}) {
  return (
    <div>
    <div className="flex flex-col item-centre justify-start mt-3">
    <p className="text-white font-medium ">{title}</p>

    </div>
    <hr className='my-2'/>

    <div className="flex flex-row items-centre justify-between text-white">
        <div className="flex flex-col gap-y-2 items-between">
        <p className="font-light mx-auto">04:30 PM</p>
        <UilClouds className="mx-auto"/>
        <p className="font-light mx-auto">22°</p>
        </div>


        <div className="flex flex-col justify-centre  items-centre gap-y-2">
        <p className="font-light mx-auto">04:30 PM</p>
        <UilCloudShowersHeavy className="mx-auto"/>
        <p className="font-light mx-auto">22°</p>
        </div>

        <div className="flex flex-col justify-centre items-centre gap-y-2">
        <p className="font-light mx-auto">04:30 PM</p>
        <UilCloudSunRain className="mx-auto"/>
        <p className="font-light mx-auto">22°</p>
        </div>

        <div className="flex flex-col justify-centre items-centre gap-y-2">
        <p className="font-light mx-auto">04:30 PM</p>
        <UilThunderstormSun className="mx-auto"/>
        <p className="font-light mx-auto">22°</p>
        </div>

        <div className="flex flex-col justify-centre items-centre gap-y-2">
        <p className="font-light mx-auto">04:30 PM</p>
        <UilCloudSunMeatball className="mx-auto"/>
        <p className="font-light mx-auto">22°</p>
        </div>
    </div>

    </div>
  )
}

export default Forecast