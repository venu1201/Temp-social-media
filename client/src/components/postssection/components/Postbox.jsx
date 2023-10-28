import React, { useEffect, useState } from 'react'
import { getuserbyid, getuserdetails } from '../../../actions/Auth'
import { useDispatch } from 'react-redux'
import { avatar, comment, like } from '../../../assets'
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import HeartSymbol from '../../../svg/Likebutton';
import { useNavigate } from 'react-router-dom';
import { getpostdetails, likepost } from '../../../actions/Post';
import Img from '../../LazyLoadImages/Img';
const Postbox = ({ data,user }) => {
    const [creater, setcreater] = useState(null);
    const [postdata,setpostdata]=useState(data);
    const [iscomment,setiscomment]=useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getuserbyid( data?.username,setcreater));
    }, [])

    
    const navigate=useNavigate();
    const handlelike=()=>{
        // console.log(user)
        dispatch(likepost(user,data._id,setpostdata));
        // dispatch(getpostdetails(data?._id,setpostdata));
    }
    return (
        <div className={`bg-[--black3] shadow-sm shadow-white  ${iscomment===true?"mb-4":""} mt-3 ssm:w-[390px] ms:w-[440px] mms:w-[390px] w-[90%]    ac:w-[440px] h-full rounded-b-[12px]`}>
            {creater && (
                <div className='h-full w-full flex flex-col items-center'>
                     <div className='w-full px-1 flex items-center h-[80px] '>
                        <div onClick={()=>  navigate(`/Profile/${creater?.username}`)} className='flex gap-2  cursor-pointer  items-center h-full'>
                            <div className='h-[60px] rounded-md w-[60px] flex justify-center items-center'>
                                
                                <Img className={`h-[55px] w-[55px]  rounded-full object-fill`} src={creater?.profilepicture || avatar} />
                            </div>
                            <div className=' h-full flex items-center text-[20px]'>
                                {creater.username}
                            </div>
                        </div>

                    </div>
                    {postdata?.selectedfile && (
                        <div className=' w-full ms:h-[400px] mms:h-[380px] xs:h-[370px] h-[310px]' onClick={()=> navigate(`/Post/${data._id}`)}>
                        <Img className={`ms:h-[400px] mms:h-[380px] xs:h-[370px] h-[310px] rounded-0 shadow-md w-full object-fit `} src={data?.selectedfile}  />
                        </div>
                    )}
                    
                
                    <div className='   px-2 text[18px] pt-3 w-full'>
                        {postdata?.description}
                    </div>
                    <div className='h-[40px] mt-2 mb-4   flex gap-2 w-full px-3 pt-2'>
                        <span className='h-full w-[40px]  mr-5 flex gap-3' onClick={handlelike}>
                                {/* <SlLike className='h-full w-[40px]'/> */}
                                <span className='flex justify-center items-center'>
                                   { postdata?.likeCount?.length}
                                </span>
                                <HeartSymbol check={postdata?.likeCount?.includes(user?.username)}/>
                        </span>
                        <span className='h-full flex justify-center items-center '>
                                <AiOutlineComment onClick={()=>setiscomment((prev)=>!prev)} className='h-[40px] w-[40px]'/>
                        </span>
                        
                   
                    </div>
                    
                   
                </div>
                


            )}
            {
                iscomment && (
                    <div className='w-full text-black h-[40px] animate-slidedown    '>
                <input className='w-full h-[40px]' type="text" />
                </div>
                )
            }
            
        </div>
    )
}

export default Postbox