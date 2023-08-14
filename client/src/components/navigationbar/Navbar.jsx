import React, { useEffect, useState } from 'react'
import { Globe, avatar, logo } from '../../assets'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CreatePost from '../postssection/components/CreatePost';
import { getuserdetails } from '../../actions/Auth';
import { AiFillHome} from "react-icons/ai";
import {BsFillRocketTakeoffFill,BsFillChatDotsFill} from "react-icons/bs";
import {MdNotificationsActive} from "react-icons/md";
import {IoIosCreate} from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { CgProfile,CgAddR} from "react-icons/cg";
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const array = ["Home", "Explore", "Chat", "Notifications", "Create Post", "Profile", "Settings"];
  const remove = [2,3,6];
  const iconarray=[<AiFillHome className='h-9 w-9 sm:h-5 sm:w-5'/>,<BsFillRocketTakeoffFill className='h-9 w-9 sm:h-5 sm:w-5'/>,<BsFillChatDotsFill className='h-9 w-9 sm:h-5 sm:w-5'/>,<MdNotificationsActive className='h-9 w-9 sm:h-5 sm:w-5'/>,<CgAddR className='h-9 w-9 sm:h-5 sm:w-5'/>,<CgProfile className='h-9 w-9 sm:h-5 sm:w-5'/>,<FiSettings className='h-9 w-9 sm:h-5 sm:w-5'/>]
  const [createpost, setcreatepost] = useState(false);
  const navigate = useNavigate();
  const localdata = JSON.parse(localStorage.getItem('profile'));
const location =useLocation();
  const [userdata, setuserdata] = useState(null);
  useEffect(() => {
    dispatch(getuserdetails(setuserdata, localdata?.result?.username));
  }, [localdata])
  const handleclick = (index) => {
    console.log(index)
    if (array[index] === 'Create Post') {
      setcreatepost(!createpost);
    }
    if (array[index] === 'Profile') {
      navigate(`/Profile/${userdata?.username}`)
    }
    if (array[index] === 'Home') {
      
      navigate('/')
    }
    if(array[index]==='Settings')
    {
      navigate('/Settings')
    }
    if (array[index] === 'Notifications') {
      navigate('/Notifications');
    }
  }
  

  return (
    <div className='flex ss:flex-col font-poppins  bg-black gap-14 ss:h-screen h-[10%] ss:px-0 px-4 ssm:w-[27%] sm:w-[32%] w-full ss:w-[15%] md:w-[25%] ac:w-[22%]'>
      <CreatePost data={createpost} data2={setcreatepost} />
      <div onClick={() => navigate('/')} className='ss:flex hidden mt-5  gap-4 w-full h-[70px] px-5 items-center'>
        <img className='h-full ' src={logo} alt="" />
        <div className='sm:flex hidden font-bold text-[25px] justify-center items-center'>
          SocialVerse
        </div>
      </div>
      <div className='flex  w-full px-5 justify-center items-center ss:gap-5'>
        <div className='flex w-full sm:gap-10 ss:gap-12 xs:gap-3 ss:flex-col ss:justify-normal justify-center '>
          {array.map((item, index) => (
            <li key={index} className={`list-none ss:flex h-[25px] ${remove.includes(index)===true?"hidden":"flex"} justify-between items-center  sm:mx-5 mx-3 `}>
              <span onClick={() => handleclick(index)} className='cursor-pointer justify-center items-center flex '>
                <div className='mr-3'>
                  {iconarray[index]}
                </div>
                <div className='sm:flex  hidden justify-center items-center '>
                  {item}
                </div>

                
                </span>
              {item === 'Notifications' && userdata?.pending?.length !== 0 && (
                <span
                  className={`${userdata?.pending?.length === 0 ? 'hidden' : 'bg-red-600'
                    } w-[25px] sm:flex hidden justify-center items-center text-[15px] h-[25px] rounded-full`}
                >
                  {userdata?.pending?.length}
                </span>
              )}

            </li>
          ))}

        </div>


      </div>


    </div>
  )
}

export default Navbar