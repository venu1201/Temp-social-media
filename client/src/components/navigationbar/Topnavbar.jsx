import React, { useEffect, useState } from 'react'
import { logo2 } from '../../assets'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CreatePost from '../postssection/components/CreatePost';
import { getuserdetails } from '../../actions/Auth';
import { AiFillHome } from "react-icons/ai";
import { BsFillRocketTakeoffFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { CgProfile, CgAddR } from "react-icons/cg";
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const array = ["Home", "Explore", "Chat", "Notifications", "Create Post", "Profile", "Settings"];
  const array1 = [   "Notifications","Chat"];

  const [active, setactive] = useState(0);
  const remove = [2, 3, 6];
  const iconarray = [  <MdNotificationsActive className='h-9 w-9 sm:h-5 sm:w-5' />,<BsFillChatDotsFill className='h-9 w-9 sm:h-5 sm:w-5' />]

  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    if (location.pathname.includes('/Profile')) {
      setactive(5);
    }
  }, [])
  const handleclick = (index) => {
    setactive(index);
    console.log(index)
    if (array1[index] === 'Chat') {
      navigate('/Chat')

    }

    
    if (array1[index] === 'Notifications') {
      navigate('/Notifications');

    }
  }


  return (
    <div className='flex  ss:hidden font-poppins  bg-[--black3] shadow-md  justify-between  ss:h-screen h-[10%] ss:px-0 pl-4 ssm:w-[27%] sm:w-[32%] w-full ss:w-[15%] md:w-[25%] ac:w-[22%]'>
      <div onClick={() => navigate('/')} className='flex   gap-1 w-full h-[100%]  items-center'>
        <div className='flex font-bold xs:text-[25px] text-[22px] font-Satisfy  justify-center items-center'>
          SocialVerse
        </div>
      </div>
      <div className='flex     w-full   '>
        <div className='flex w-full   justify-end ms:pr-7 mt-4 gap-4 '>
          {array1.map((item, index) => (
            <li key={index} className={`list-none ss:flex h-[25px] justify-between   `}>
              <span onClick={() => handleclick(index)} className={`cursor-pointer justify-center items-center flex  `}>
                <div className={`mr-3  `}>
                  {iconarray[index]}
                </div>
                <div className='sm:flex   hidden justify-center items-center '>
                  {item}
                </div>


              </span>
           

            </li>
          ))}

        </div>


      </div>


    </div>
  )
}

export default Navbar