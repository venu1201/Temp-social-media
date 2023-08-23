import React, { useEffect, useState } from 'react'
import { avatar } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requesting } from '../../../actions/user'
import { getuserdetails } from '../../../actions/Auth'
import LoadingSpinner from '../../Spinner/Spinner'
import Img from '../../LazyLoadImages/Img'
const Peoplebox = ({ data }) => {
 
    const userdata = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();
    const [data2, setdata2] = useState()
    const [temp, settemp] = useState(1)

    const [value, setvalue] = useState(data?.pending?.includes(userdata?.result?.username)===true?'Pending':'ADD')
    
    
    
    const handleclick = () => {
        setvalue('loading')
        dispatch(requesting(data?.username, userdata?.result))
          .then(() => {
            
            dispatch(getuserdetails(setdata2, data?.username));
            settemp(temp + 1);
          })
          .catch(error => {
            console.error("Error occurred:", error);
          });
      }; 
      useEffect(() => {
        if (data2) {
          const pending = data2?.pending || [];
          setvalue(pending.includes(userdata?.result?.username) ? 'Pending' : 'ADD');
         
        }
        
      }, [data2?.pending]);
      

    const navigate = useNavigate();
    return (
        <div className='flex   w-full h-[60px] justify-around items-center '>
            <div onClick={() => navigate(`/Profile/${data?.username}`)} className='flex cursor-pointer md:gap-5 ssm:gap-2 h-full w-full items-center '>
                <div className='flex  w-[50px] h-[50px]'>
                    <Img className={`object-fill h-[50px] w-[50px] rounded-full`} src={data?.profilepicture || avatar} alt="" />
                </div>
                <div className='ssm:w-[90px]  md:w-[120px] h-full flex flex-col gap-[2px] justify-center'>
                    <h4 className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>{data?.username}</h4>
                    <div className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>
                        {data?.email}
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={handleclick} className={`${value === 'ADD' ? "bg-gradient" : "bg-orange-300"} flex justify-center items-center bg-blue-700 rounded-lg h-[50px] w-[90px]`}>
                    {value==='loading'?(<LoadingSpinner/>):(
                        value
                    )}
                </button>
            </div>
        </div>
    )
}

export default Peoplebox