import React, { useEffect, useState } from 'react'
import { getuserdetails } from '../../../actions/Auth'
import { useDispatch } from 'react-redux'
import { comment, like } from '../../../assets'
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import HeartSymbol from '../../../svg/Likebutton';
import { useNavigate } from 'react-router-dom';

const Postbox = ({ data }) => {
    const [creater, setcreater] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getuserdetails(setcreater, data?.username));
    }, [])
    const navigate=useNavigate();
    return (
        <div className='bg-black pb-4  mt-4 ssm:w-[390px] ms:w-[440px] mms:w-[390px] w-[90%]    ac:w-[440px] h-full rounded-b-[12px]'>
            {creater && (
                <div className='h-full p-1 w-full flex flex-col items-center'>
                     <div className='w-full px-1 flex items-center h-[80px] '>
                        <div onClick={()=>  navigate(`/Profile/${creater?.username}`)} className='flex gap-2  cursor-pointer  items-center h-full'>
                            <div className='h-[60px] rounded-md w-[60px] flex justify-center items-center'>
                                <img className='h-[55px]  w-[55px] rounded-full object-fill' src={creater?.profilepicture} alt="" />
                            </div>
                            <div className=' h-full flex items-center text-[20px]'>
                                {creater.username}
                            </div>
                        </div>

                    </div>
                    {data?.selectedfile && (
                        <div className='w-full ms:h-[400px] mms:h-[350px] xs:h-[290px] h-[250px]'>
                        <img className='h-full rounded-0 shadow-md w-full object-fit' src={data?.selectedfile} alt="" />
                        </div>
                    )}
                    
                
                    <div className='   px-2 text[18px] pt-3 w-full'>
                        {data?.description}
                    </div>
                    <div className='h-[40px] mt-2   flex gap-2 w-full px-3 pt-2'>
                        <span className='h-full w-[40px]'>
                                {/* <SlLike className='h-full w-[40px]'/> */}
                                <HeartSymbol/>
                        </span>
                        <span className='h-full flex justify-center items-center '>
                                <AiOutlineComment className='h-[40px] w-[40px]'/>
                        </span>
                        
                   
                    </div>
                   
                </div>


            )}
        </div>
    )
}

export default Postbox