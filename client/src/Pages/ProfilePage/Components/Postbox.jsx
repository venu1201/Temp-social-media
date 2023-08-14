import React from 'react'
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import HeartSymbol from '../../../svg/Likebutton';

const Postbox = ({ data }) => {
    return (
        <div className={`bg-black ${data?.selectedfile===null ? "hidden":""} mt-3 ac:w-[290px] md:w-[260px] ssm:w-[230px] sm:w-[275px] ss:w-[250px] ms:w-[230px] mms:w-[190px] xs:w-[175px] w-[230px] rounded-[12px]`}>
            <div className='  w-full flex flex-col items-center'>

                <div className='w-full rounded-t-[12px]l md:h-[260px] ssm:h-[245px] ss:h-[260px] ms:h-[240px] xs:h-[230px] h-[250px]'>
                    <img className='h-full rounded-t-[12px] shadow-md w-full object-fit' src={data?.selectedfile} alt="" />
                </div>




                <div className='mb-1  w-full mt-2  text-ellipsis overflow-hidden px-2 text[16px] pt-3 max-w-full'>
                    {data?.description}
                </div>
                <div className='h-[35px] mb-3 mt-2  flex gap-0 w-full px-3'>
                    <span className='h-full w-[40px]'>
                        <HeartSymbol />
                    </span>
                    <span className='h-full w-[40px]'>
                        <AiOutlineComment className='h-[37px] w-[37px]' />
                    </span>


                </div>

            </div>



        </div>
    )
}

export default Postbox