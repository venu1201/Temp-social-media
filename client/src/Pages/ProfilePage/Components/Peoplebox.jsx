import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../components/Spinner/Spinner'
import { getuserbyid, getuserdetails } from '../../../actions/Auth'
import { remove, requesting } from '../../../actions/user'
import { avatar } from '../../../assets'
import { profile_data } from '../../../reducers'
const Peoplebox = ({ data, b, edit, type,userid,setuserdetails ,changeremove, setblur, setdefault }) => {

    // declarations
    const dispatch = useDispatch();
    const userdata = useSelector((state)=>state.authData);
    

    // states
    const [Tdata, setTdata] = useState(null)
    const [value, setvalue] = useState("ADD")
    const [showbtn, setshowbtn] = useState(true);
    const [confirm, setconfirm] = useState(false);
    const [yes, setyes] = useState(false);
    const [temp1,settemp1]=useState(null);
    const [loading,setloading]=useState(false);


    // functions
    const handleremove = () => {
        setconfirm(true);

    }
    const handleclick = (text) => {
        if (value === 'ADDED') {

        }
        else if (text === 'remove') {
            setconfirm(true);
            setblur(true)
        }
        else {
            setvalue('loading')
            dispatch(requesting(Tdata?.username, userdata))
                
        }

    };
    const removeuser = (type) => {
        setloading(true);
        setconfirm(null);
        setyes(null);
        dispatch(remove(type, userdata.username, Tdata,setuserdetails)).then(() => {
            dispatch(getuserbyid(userdata.username,settemp1)).then(()=>{
                setloading(false);
                
               

            });
            
            // setconfirm(null);
            // setyes(null);
            // console.log(yes, confirm)
        });
        
      
    }
    const handleswitch = () => {
        setdefault((prev)=>!prev)
        navigate(`/Profile/${Tdata?.username}`)
    }
    const handleyes = () => {
        setyes(!yes);

    }

    // useeffects
    useEffect(() => {
        dispatch(getuserbyid(data,setTdata));
    }, [])

    useEffect(() => {
        if (Tdata) {
            if (userdata.username === Tdata?.username) {
                setshowbtn(false);
            }
            else if(userdata?.followers?.includes(Tdata?.username) && Tdata?.followers?.includes(userdata?.username)) {
                setvalue("ADDED");
            }
            else if(Tdata?.pending?.includes(userdata.username))
            {
                setvalue("Pending")
            }
            else if((!userdata?.followers?.includes(Tdata?.username) && !Tdata?.followers?.includes(userdata.username)))
            {
                setvalue("ADD");
            }
              
        }
    }, [Tdata])
    
    // useEffect(() => {
    //     if (data2) {
    //         console.log("heeeeeeeeee")
    //         const pending = data2?.pending || [];
    //         setvalue(pending.includes(userdata?.username) ? 'Pending' : 'ADD');

    //     }

    // }, [data2?.pending]);
   
   
    const navigate = useNavigate();
    return (

        <div className='flex    w-full h-[60px] justify-around items-center '>
            {Tdata && (
                <div className='flex w-full h-full justify-around items-center'>
                    <div onClick={handleswitch} className='flex cursor-pointer md:gap-5 ssm:gap-2 gap-3 h-full w-full items-center '>
                        <div className='flex  w-[50px] h-[50px]'>
                            <img className='object-fill h-[50px] w-[50px] rounded-full' src={Tdata?.profilepicture || avatar} alt="" />
                        </div>
                        <div className='ssm:w-[90px]  md:w-[120px] h-full flex flex-col gap-[2px] justify-center'>
                            <h4 className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>{Tdata?.username}</h4>
                            <div className=' h-[20px] ssm:max-w-[200px] md:max-w-[550px] ss:max-w-[170px] ms:max-w-[180px] xs:max-w-[120px] max-w-[90px]  overflow-hidden overflow-ellipsis'>
                                {Tdata?.firstname}
                            </div>
                        </div>
                    </div>
                    {showbtn && (
                        <div className='flex gap-2 justify-center items-center'>
                            <button onClick={handleclick} className={`bg-gradient  flex justify-center items-center bg-blue-700 rounded-lg h-[50px] ms:w-[90px] w-[60px] ms:text-[17px] text-[13px]`}>
                                {value === 'loading' ? (<LoadingSpinner />) : (
                                    value
                                )}
                            </button>
                            <button onClick={handleremove} className={`text-blue-100 ms:text-[17px] text-[13px] underline ${edit === true ? "" : "hidden"}`}>
                                remove
                            </button>
                        </div>
                    )}
                    {
                        confirm && (
                            <div className='absolute -top-32 flex justify-center items-center z-[999999] h-full w-full '>
                                <div className='text-white justify-center items-center bg-black h-[150px] w-[400px] rounded-xl flex flex-col  gap-4'>
                                    <h3>Do you want to Remove {confirm.username} as a Friend</h3>
                                    <div className='flex justify-center items-center gap-5'>
                                        <button onClick={() => setconfirm(null)} className='bg-blue-600 w-[100px] h-[30px]'>Cancel</button>
                                        <button onClick={handleyes} className='bg-blue-600 w-[100px] h-[30px]'>Yes</button>
                                    </div>
                                </div>
                            </div>
                        )

                    }
                    {
                        loading && (
                            <div className='absolute -top-32 flex justify-center items-center z-[999999] h-full w-full '>
                                <div className='text-white justify-center items-center bg-black h-[150px] w-[400px] rounded-xl flex flex-col  gap-4'>
                                    <LoadingSpinner/>
                                </div>
                            </div>
                        )

                    }
                    {yes && (
                        <div className='absolute -top-32     flex justify-center items-center   z-[999999] h-full w-full '>
                           
                                <div className='text-white relative pt-8 items-center bg-black h-[150px] w-[400px] rounded-xl flex flex-col  gap-4'>
                                <h3> Remove As...</h3>
                                <span onClick={() => setyes((prev) => !prev)} className='absolute right-10'>X</span>
                                <div className='flex justify-center items-center gap-5'>
                                    <button onClick={() => removeuser("follower")} className='bg-blue-600 w-[100px] h-[30px]'>Follower</button>
                                    <button onClick={() => removeuser("following")} className='bg-blue-600 w-[100px] h-[30px]'>Following</button>
                                    <button onClick={() => removeuser("both")} className='bg-blue-600 w-[100px] h-[30px]'>Both</button>

                                </div>
                            </div>
                           
                            
                        </div>
                    )}


                </div>
            )}

        </div>
    )
}

export default Peoplebox