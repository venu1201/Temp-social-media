import React from 'react'
import { news } from '../../../assets'

const Newsbox = ({data}) => {
  console.log(data)
  return (
    <div className='min-h-[400px] bg-[--black3] rounded-xl  w-[300px]'>
        <div className='h-[250px] w-full'>
            <img className='h-full w-full object-fill' src={data?.urlToImage || news} alt="" />
        </div>
        <div className=' mt-2 mx-2 w-full'>
            {data.title}
        </div>
        <div className=' mx-2 mt-4 w-full'>
          <div>
            {data.publishedAt}
          </div>
          <div className='mt-2 items-end flex gap-9'>
            <a className='text-blue-400' href={data.url}>Read More</a>
            {data?.source?.name && (
                <div className='text-[13px] flex justify-center items-center'>
                  Source : {data?.source?.name}
                </div>
            )}
     

          </div>
        </div>
    </div>
  )
}

export default Newsbox