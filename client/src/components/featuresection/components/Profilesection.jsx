import React, { useEffect, useState } from 'react'
import { avatar } from '../../../assets/index'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getuserdetails } from '../../../actions/Auth';
const Profilesection = () => {
  const data = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userdetails, setuserdetails] = useState(null)
  useEffect(() => {
    if (data) {
      // console.log("data",data?.result?.username)
      dispatch(getuserdetails(setuserdetails, data?.result?.username))
    }


  }, [])

  const handlelogout = () => {
    localStorage.removeItem('profile');
    dispatch({ type: 'CLEAR_GOOGLE' })
    navigate('/Auth');
  }
  return (
    <div className='text-white '>
      <div className='h-[70px] mt-4 w-full flex '>
        <div onClick={() => navigate(`/Profile/${data?.result.username}`)} className='flex cursor-pointer md:gap-5 ssm:gap-2 h-full w-full items-center '>
          <div className='flex  w-[50px] h-[50px]'>
            <img className='object-fill h-[64px] min-w-[64px] rounded-full' src={userdetails?.profilepicture || avatar} alt="" />
          </div>
          <div className='ssm:w-[90px]  md:w-[120px] h-full flex flex-col gap-[2px] justify-center mt-3  ml-2'>
            <h4 className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'> {data?.result?.username}</h4>
            <div className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>
            {data?.result?.email}
            </div>
          </div>
        </div>
        
        <div className='flex justify-center items-center'>
          <button onClick={handlelogout} className='bg-blue-700 rounded-lg h-[50px] w-[90px]'>
            Logout
          </button>
        </div>


      </div>

    </div>
  )
}

export default Profilesection