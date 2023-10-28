import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Notificationbox from './Components/Notificationbox';
import LoadingSpinner from '../../components/Spinner/Spinner';


const Notifications = () => {
  const data = useSelector((state) => state.authData);
  const [pending, setpending] = useState([]);
  const [loadingpage, setloadingpage] = useState(true);
  // useEffect(() => {
  //     dispatch(getuserdetails(setuserdata, data?.username));

  // }, [k])
  useEffect(() => {
    if (data) {
      setpending(data?.pending);
      setloadingpage(false);
    }
  }, [data])

  // useEffect(() => {
  //   if(pending?.length>0)
  //   {
  //     dispatch(getallpendingusers(setallpendings,pending));
  //   }
  // }, [pending])

  // const handleclick = (type, touser) => {
  //   const obj = { username: data?.result?.username, method: type };

  //   dispatch(acceptanddeleteuser(obj, touser)).then(() => {
  //     setk(k => k + 1);


  //   });



  // }


  return (
    <div className=' md:w-[75%]  sm:w-[68%] ss:w-[90%] w-full ssm:w-[74%] ac:w-[78%] font-poppins text-white h-full' >
      {loadingpage === false ? (
        <div className=''>
          {pending.length > 0 ? (
            <div className='mt-10'>
              {pending?.map((item, index) => (
                <div className='flex flex-col'>
                  <Notificationbox key={item} item={item} userdata={data} />

                </div>
              ))}
            </div>
          ) : (
            <div className='mt-10 p-4 text-[20px] flex justify-center'>
              No Notifications Yet....Please Come Again
            </div>
          )}
        </div>

      ) : (
        <div className='flex justify-center mt-10'>
          <LoadingSpinner />
        </div>
      )}


    </div>
  )
}

export default Notifications