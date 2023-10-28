import React, { useEffect, useState } from 'react'
import { avatar } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requesting } from '../../../actions/user'
import { getuserbyid} from '../../../actions/Auth'
import LoadingSpinner from '../../Spinner/Spinner'
import Img from '../../LazyLoadImages/Img'
const Peoplebox = ({ data }) => {


    const userdata = useSelector((state) => state.authData);
    const [peopledata, setpeopledata] = useState(null);
    const dispatch = useDispatch();
    const [temp, settemp] = useState(1)
    useEffect(() => {
        dispatch(getuserbyid(data, setpeopledata))
        
        
    }, [temp])
    
    const [value, setvalue] = useState(peopledata?.pending?.includes(userdata?.username) === true ? 'Pending' : 'ADD')



    const handleclick = () => {
        setvalue('loading')
        dispatch(requesting(peopledata?.username, userdata, setvalue))
            .then(() => {
                settemp(temp + 1);
            })
            .catch(error => {
                console.error("Error occurred:", error);
            });
    };
    useEffect(() => {
        if (peopledata) {
            const pending = peopledata?.pending || [];
            setvalue(pending.includes(userdata?.username) ? 'Pending' : 'ADD');
        }

    }, [peopledata]);


    const navigate = useNavigate();
    return (
        <div className='flex   w-full h-[60px] justify-around items-center '>
            {peopledata ? (
                <div className='flex   w-full h-[60px] justify-around items-center '>
                    <div onClick={() => navigate(`/Profile/${peopledata?.username}`)} className='flex cursor-pointer md:gap-5 ssm:gap-2 h-full w-full items-center '>
                        <div className='flex  w-[50px] h-[50px]'>
                            <Img className={`object-fill h-[50px] w-[50px] rounded-full`} src={peopledata?.profilepicture || avatar} alt="" />
                        </div>
                        <div className='ssm:w-[90px]  md:w-[120px] h-full flex flex-col gap-[2px] justify-center'>
                            <h4 className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>{peopledata?.username}</h4>
                            <div className=' h-[20px] ssm:max-w-[90px] md:max-w-[120px] overflow-hidden overflow-ellipsis'>
                                {peopledata?.email}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={handleclick} className={`${value === 'ADD' ? "bg-gradient" : "bg-orange-300"} flex justify-center items-center bg-blue-700 rounded-lg h-[50px] w-[90px]`}>
                            {value === 'loading' ? (<LoadingSpinner />) : (
                                value
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}

        </div>
    )
}

export default Peoplebox