import React, { useEffect, useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import { getpostdetails } from '../../actions/Post';
import { useDispatch } from 'react-redux';
import { getuserdetails } from '../../actions/Auth';
import { avatar } from '../../assets';

const Postpage = () => {
    const {id}=useParams();
    console.log(id);
    const [postdetail,setpostdetail]=useState(null);
    const dispatch=useDispatch();
    const [user,setuser]=useState(null);
    useEffect(() => {
        dispatch(getpostdetails(id,setpostdetail));
        

    }, [])
    useEffect(() => {
      if(postdetail)
      {
        dispatch(getuserdetails(setuser,postdetail?.username));
      }
    }, [postdetail])
    
    console.log(postdetail);
  return (
    <div className='md:w-[75%] overflow-scroll  sm:w-[68%] ss:w-[90%] w-full ssm:w-[74%] ac:w-[78%] font-poppins text-white h-full '>
        {postdetail && user &&
        (
            <div className='h-ful mt-4 w-full flex flex-col justify-center items-center '>
                <div className='w-[500px] gap-5 flex  h-[85px] pt-2 pl-2 pb-2 bg-black '>
                    <div className='flex w-[65px] '>
                        <img className='object-fill w-full rounded-full h-full' src= {`${user?.profilepicture || avatar} `}  alt="" />
                    </div>
                    <div className='w-[100px] text-[29px] flex justify-start items-center'>
                        {user.username}
                    </div>
                </div>
                <div className='w-[500px] h-[600px]'>
                 <img src={postdetail?.selectedfile } className='object-fill shadow-md shadow-black rounded-2xl  w-full h-full' alt="" />

                </div>
                <div className=' w-[500px] mt-5 h-full text-[20px] flex  pl-3 items-center'>
                    <p>{postdetail?.description}</p>
                </div> <div className=' w-[500px] h-[70px] flex gap-5  pl-3 items-center'>
                    <div className='flex text-[20px]'>
                        Likes : {postdetail?.likeCount.length}
                    </div>
                    <div>
                        Comments : {postdetail?.Comments?.length}
                    </div>
                </div>
                <div className=' '>
                    <input type="text" />
                </div>
                <div>

                </div>

                
            </div>
        )}
        
    </div>
  )
}

export default Postpage