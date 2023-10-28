import React, { useEffect, useState } from 'react'
import Peoplebox from './Peoplebox'
import { VscChromeClose } from 'react-icons/vsc'
import { useLocation, useParams } from 'react-router-dom'
import { getuserdetails } from '../../../actions/Auth'
import { useDispatch, useSelector } from 'react-redux'

const Popup = ({ data, name, userid, setuserdetails, changeremove, edit, type, setdefault }) => {

    const dispatch = useDispatch();
    const profiledata = useSelector((state) => state.profile_data);
    const [list, setlist] = useState(null);
    const store=useSelector((state)=>state)
    const [b, setb] = useState(false);
    console.log(store)
    // useEffect(() => {
    //     setFdata(null);
    //     dispatch(getuserdetails(setdata2, user, type)).then(() => {

    //     });
    useEffect(() => {
        setlist(null);
      if(name=='Followers')
      {
        setlist(profiledata.followers);
      }
      else
      {
        setlist(profiledata.following);
      }
    }, [profiledata])
    
    console.log("pop",list);
    // }, [])
    // const [c,setc]=useState(1);
    // useEffect(() => {
    //   if(data2)
    //   {
    //     setFdata(data2);
    //     setc(c+1);

    //   }
    // }, [data2])
    // useEffect(() => {
    //   if(c!=1)
    //     {
    //         setkey(Math.random());
    //     }
    // }, [c])



    const skl = (value) => {
        return (
            <div className=' flex w-full h-[60px] justify-around items-center ' >
                <div className='flex cursor-pointer md:gap-5 ssm:gap-2 h-full w-full items-center '>
                    <div className='flex bg-blue-500 animate-pulse  w-[50px] h-[50px]'>
                    </div>
                    <div className='w-full  h-full flex flex-col gap-[2px] justify-center'>
                        <h4 className=' h-[20px] bg-blue-500 animate-pulse w-full  overflow-hidden overflow-ellipsis'></h4>
                        <div className=' h-[20px] bg-blue-500 w-full animate-pulse  overflow-hidden overflow-ellipsis'>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    return (
        <div className={`absolute "blur-lg":""}  overflow-hidden ss:ml-10  mt-2 top-[40px] z-[9999] ss:left-[20px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] h-[80%] ss:w-[85%] w-[100%]`}>
            <div className='relative h-full'>
                <h3 className='w-full relative mt-4 h-[7%] text-[30px] flex justify-center items-center'>
                    <div className=''>
                        {name}

                    </div>
                    <span onClick={() => setdefault((prev) => !prev)} className='absolute right-7 hover:bg-white'>
                        <VscChromeClose className='text-black' />
                    </span>
                </h3>
                {list ? (
                    <div className='mt-4 h-[85%] w-full overflow-scroll xs:px-4 px-2 '>
                            {list.length==0 && (
                                <div className='h-full w-full flex justify-center mt-20 font-bold text-[20px]'>
                                    you have no {name} :(
                                </div>
                            )}
                            {
                                list?.map((item,index)=>(
                                    <Peoplebox type={type} edit={edit} b={setb} key={item} data={item} setdefault={setdefault} />

                                ))
                            }
                           
                    </div>
                ) : (
                    <div className='mt-4 h-[85%] flex flex-col w-full overflow-scroll px-4 '>

                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                        {skl('hmm')}
                    </div>
                )}



            </div>
        </div>
    )
}

export default Popup