import React, { useEffect, useState } from 'react'
import { avatar } from '../../../assets/index'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear_google, reset_state } from '../../../reducers';
const Profilesection = () => {
  const data=useSelector((state)=>state.authData);
  // const data = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('profile');   
    dispatch(clear_google());
    navigate('/Auth');
  }
  return (
    <div className='text-white   '>
      <div className='h-[250px] bg-[--black3] shadow-sm shadow-white py-3 w-full flex flex-col'>
        <div onClick={() => navigate(`/Profile/${data?.username}`)} className='flex cursor-pointer h-[150px] w-full items-center '>
          <div className='flex ml-2 rounded-3xl w-[150px] h-full'>
            <img className='object-fill h-full rounded-sm min-w-full ' src={data?.profilepicture || avatar} alt="" />
          </div>
          <div className='ssm:w-[90px]  h-full    md:w-[120px]  flex flex-col mt-5 items-center '>
            <h4 className=' h-[40px] flex justify-center items-center text-[20px] font-bold  overflow-hidden overflow-ellipsis'> {data?.username}</h4>
            <div className=' h-[30px] flex gap-1 justify-center   ml-8 w-full overflow-hidden overflow-ellipsis'>
              <div>
                {data?.firstname}
              </div>
              <div>
                {data?.lastname}
              </div>
            </div>
            <div className='ml-3 flex flex-col gap-2'>
              <div>
                Followers : {data?.followers?.length}
              </div>
              <div>
                Following : {data?.following?.length}
              </div>
              
            </div>
          </div>
        </div>
        
        <div className='flex justify-center mt-5 items-center'>
          <button onClick={handlelogout} className='bg-blue-700 rounded-lg h-[50px] w-[90px]'>
            Logout
          </button>
        </div>


      </div>

    </div>
  )
}

export default Profilesection