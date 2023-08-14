import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Peoplebox from './Peoplebox';
import { getuserdetails } from '../../../actions/Auth';
const Suggestions = () => {
  const data = useSelector((state) => state.authReducer.users);
  console.log(data)
  const localdata = JSON.parse(localStorage.getItem('profile'));
  const [userdetails, setuserdetails] = useState(null)
  const dispatch=useDispatch();
  useEffect(() => {
    if(localdata)
      dispatch(getuserdetails(setuserdetails, localdata?.result?.username))
    // getuserdetails(setuserdetails,username);

  }, [])
  return (
    <div className='flex mt-4 flex-col gap-5'>
      <div>
        Suggestions :
      </div>
      <div className='flex flex-col gap-3'>
        {data?.result?.map((item,index) => (
          <div key={index} className={`${userdetails?.following.includes(item?.username)===true? "hidden":"flex"}`}>
            <Peoplebox data={item}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Suggestions;