import React from 'react'
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import HeartSymbol from '../../../svg/Likebutton';

const Blogbox = ({ data }) => {
    return (
        <div className={`bg-black ${data?.selectedfile!==null ? "hidden":""} mt-3 font-Satisfy w-full h-[300px]  rounded-[12px]`}>
            <div className='h-full  w-full flex flex-col items-center'>

                <div className='h-[230px] font-Satisfy border-[1px] border-dimWhite m-2 font- w-full mt-2  text-ellipsis overflow-hidden px-2 text[16px] pt-3 max-w-full'>
                    {data?.description}
                </div>
                <div className='h-[35px]  flex gap-0 w-full px-3'>
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

export default Blogbox