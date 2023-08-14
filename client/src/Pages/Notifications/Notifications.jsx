import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getuserdetails,getallpendingusers, acceptanddeleteuser } from '../../actions/Auth';
import Notificationbox from './Components/Notificationbox';
import LoadingSpinner from '../../components/Spinner/Spinner';


const Notifications = ({handle}) => {
    const data = JSON.parse(localStorage.getItem('profile'));
    const [userdata, setuserdata] = useState(null);
    const [pending,setpending]=useState([]);
    const dispatch=useDispatch();
    const [allpendings,setallpendings]=useState([]);
    const [k,setk]=useState(1);
    const [loadingpage,setloadingpage]=useState(true);
    useEffect(() => {
        dispatch(getuserdetails(setuserdata, data?.result?.username));
      
    }, [k])
    useEffect(() => {
      if(userdata)
      {
        setpending(userdata?.pending);
        setloadingpage(false);
      }
    }, [userdata])
    
    useEffect(() => {
      if(pending?.length>0)
      {
        dispatch(getallpendingusers(setallpendings,pending));
      }
    }, [pending])
    

    const handleclick=(type,touser)=>{
      const obj={username:data?.result?.username,method:type};
      dispatch(acceptanddeleteuser(obj,touser)).then(()=>{
        setk(k=>k+1);
      
        
      });

    }
   
    
  return (
    <div className='w-[80%] font-poppins text-white h-full' >
      {loadingpage===false ? (
        <div>
            {pending.length>0 ? (
            <div className='mt-10'>
                {allpendings?.map((item,index)=>(
                    <div className='flex flex-col'>
                        <Notificationbox key={index} handle={handle} handleclick={handleclick} name={item?.username} item={item} firstname={item?.firstname} picture={item?.profilepicture} lastname={item?.lastname} userdata={userdata} />
                       
                    </div>
                ))}
            </div>
          ):(
            <div className='mt-10 p-4 text-[20px] flex justify-center'>
              No Notifications Yet....Please Come Again 
            </div>
          )}
        </div>
          
      ):(
          <div className='flex justify-center mt-10'>
              <LoadingSpinner/>
          </div>
      )}
      
        
    </div>
  )
}

export default Notifications