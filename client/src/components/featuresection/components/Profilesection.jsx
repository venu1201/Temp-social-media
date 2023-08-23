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
    <div className='text-white   '>
      <div className='h-[250px] bg-[--black3] shadow-sm shadow-white py-3 w-full flex flex-col'>
        <div onClick={() => navigate(`/Profile/${data?.result.username}`)} className='flex flex-col cursor-pointer  h-full w-full items-center '>
          <div className='flex bg-white  w-[120px] h-[120px]'>
            <img className='object-fill h-full min-w-full ' src={userdetails?.profilepicture || avatar} alt="" />
          </div>
          <div className='ssm:w-[90px]   md:w-[120px] mt-2 flex flex-col  justify-center items-center '>
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