import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../components/Spinner/Spinner'
import { getuserdetails } from '../../../actions/Auth'
import { requesting } from '../../../actions/user'
import { avatar } from '../../../assets'

const Peoplebox = ({ data, setblur,setdefault }) => {

    const userdata = JSON.parse(localStorage.getItem('profile'));
    const [Tdata, setTdata] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getuserdetails(setTdata, data));
    }, [])
    console.log(Tdata)
    const [data2, setdata2] = useState()
    const [temp, settemp] = useState(1)
    const [value, setvalue] = useState("ADD")
    const [showbtn, setshowbtn] = useState(true);
    useEffect(() => {
        if (Tdata) {
            if (userdata.result.username === Tdata?.username) {
                setshowbtn(false);
            }
            else if (Tdata.followers.includes(userdata?.result?.username)) {
                setvalue("ADDED")
            }
            else if (!Tdata.followers.includes(userdata?.result?.username) && Tdata.pending.includes(userdata?.result?.username)) {
                setvalue("Pending");
            }
            else if (!Tdata.followers.includes(userdata?.result?.username) && !Tdata.pending.includes(userdata?.result?.username)) {
                setvalue("ADD");
            }



        }
    }, [Tdata])


    const [confirm,setconfirm]=useState(false);

    const handleclick = () => {
        if (value === 'ADDED') {
            setconfirm(true);
            setblur(true)
        }
        else {
            setvalue('loading')
            dispatch(requesting(Tdata?.username, userdata?.result))
                .then(() => {

                    dispatch(getuserdetails(setdata2, Tdata?.username));
                    settemp(temp + 1);
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                });
        }

    };
    useEffect(() => {
        if (data2) {
            const pending = data2?.pending || [];
            setvalue(pending.includes(userdata?.result?.username) ? 'Pending' : 'ADD');

        }

    }, [data2?.pending]);
    const handleswitch = () => {
        setdefault((prev) => !prev);
        navigate(`/Profile/${Tdata?.username}`)
    }
    const handleyes=()=>{
        
        console.log("remove")
    }
    const navigate = useNavigate();
    return (

        <div className='flex   w-full h-[60px] justify-around items-center '>
            {Tdata && (
                <div className='flex w-full h-full justify-around items-center'>
                    <div onClick={handleswitch} className='flex cursor-pointer md:gap-5 ssm:gap-2 h-full w-full items-center '>
                        <div className='flex  w-[50px] h-[50px]'>
                            <img className='object-fill h-[50px] w-[50px] rounded-full' src={Tdata?.profilepicture || avatar} alt="" />
                        </div>
                        <div className='ssm:w-[90px]  md:w-[120px] h-full flex flex-col gap-[2px] justify-center'>
                            <h4 className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>{Tdata?.username}</h4>
                            <div className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>
                                {Tdata?.email}
                            </div>
                        </div>
                    </div>
                    {showbtn && (
                        <div className='flex justify-center items-center'>
                            <button onClick={handleclick} className={`bg-gradient  flex justify-center items-center bg-blue-700 rounded-lg h-[50px] w-[90px]`}>
                                {value === 'loading' ? (<LoadingSpinner />) : (
                                    value
                                )}
                            </button>
                        </div>
                    )}
                    {
                        confirm && (
                            <div className='absolute -top-32     flex justify-center items-center   z-[999999] h-full w-full '>
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


                </div>
            )}

        </div>
    )
}

export default Peoplebox