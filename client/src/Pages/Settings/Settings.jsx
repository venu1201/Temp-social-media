import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Switch from './components/Switch';
import { getuserdetails, updateuserdetails } from '../../actions/Auth';
import { client,urlFor } from '../../Client';
import { avatar } from '../../assets';

const Settings = () => {
    const localdata=useSelector((state)=>state.authData);
    const [selectedImage, setSelectedImage] = useState(localdata?.profilepicture);
    const [privacy,setprivacy]=useState(false);
    const dispatch=useDispatch();

    // useEffect(() => {
    //     dispatch(getuserdetails(setuserdetails,userdetails?.username));
    //     seteditdata({firstname:userdetails?.firstname,lastname:userdetails?.lastname,bio:userdetails?.bio,selectedfile:null})
    // }, [userdetails])
    const [editdata,seteditdata]=useState({firstname:localdata?.firstname,lastname:localdata?.lastname,bio:localdata?.bio,selectedfile:null});

    const [next, setnext] = useState(true)
    const handleImageChange =async (e) => {
        setnext(false);
        const file = e.target.files[0];
        setSelectedImage(null)
        if (file) {
         
            console.log(selectedImage,"selectedimage")
            const imageasset = await client.assets.upload('image', file, { contentType: file.type, filename: file.name })
            .catch((err) => {
              console.log('Upload failed', err.message);
            });
            console.log(imageasset,"set");       
            seteditdata({...editdata,selectedfile:imageasset});
            setnext(true);
            setSelectedImage(urlFor({_type:'image',asset:{_type:'_reference',_ref:imageasset._id}}).url());
            console.log(selectedImage)

        }
        else
        {
            setnext(true);
        }
    };

   
    
    const handlechange=(e)=>{
        console.log(e.target.name)
        seteditdata({...editdata,[e.target.name]:e.target.value});
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        setnext(false);
        console.log(editdata);
        dispatch(updateuserdetails(editdata,localdata?.username)).then(()=>{
            setnext(true);
        });
       
        
    }
  
    return (
        <div className='ss:h-screen justify-center items-center h-[90%]  font-poppins  relative flex md:w-[75%] sm:w-[68%] ss:w-[80%] w-full ssm:w-[74%] ac:w-[78%]'>
            <div className='h-[90%] w-[80%] rounded-3xl shadow-sm shadow-dimWhite bg-black flex'>
                <div className='h-full pt-4 flex flex-col border-r-2 w-[30%]'>
                    {["Manage Yout Account"].map((item, index) => (
                        <div className='w-full mt-4 h-[30px] flex justify-center items-center'>
                            {item}
                        </div>
                    ))}
                </div>
                <div className='h-full w-[70%] pt-2'>
                    <form className="mt-1 flex flex-col justify-center items-center" onSubmit={handlesubmit}>
                        <div className="fle my-4 flex-col justify-center items-center h-[120px] w-full">
                            <label className='h-full w-full flex justify-center items-center flex-col' htmlFor="imageInput">
                                <img className="h-[130px] object-fill w-[150px] rounded-lg shadow-sm shadow-dimWhite z-[1000]" src={selectedImage || avatar} alt="" />
                                <span className="mt-3">Edit Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className=' text-black w-[80%] mt-4 flex justify-center  items-center flex-col'>
                            <div className='w-full text-[20px] text-dimWhite gap-4 h-[35px] mt-2 flex  items-center'>
                                <div>Username :</div>
                                <div>
                                    {localdata?.username}
                                </div>
                            </div>
                            <div className='w-full text-[20px] mb-1 text-dimWhite gap-4 h-[35px] flex items-center'>
                                <div>Email :</div>
                                <div>
                                    {localdata?.email}
                                </div>
                            </div>
                            <div className='w-full gap-4 h-[45px] mt-2 flex justify-center items-center'>
                                <input onChange={handlechange} value={editdata?.firstname} name='firstname' placeholder='FirstName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />
                                <input onChange={handlechange} value={editdata?.lastname} name='lastname' placeholder='LastName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />

                            </div>
                            <div className='w-full mt-4 h-[100px]'>
                                <textarea onChange={handlechange} value={editdata?.bio} name='bio' placeholder='Write Some Thing About You' className='w-full text-[18px] outline-none border-none p-4 h-full resize-none' />
                            </div>
                            <div className='text-white flex w-full mt-4 items-center gap-4'>
                                <label>Private Account</label>
                                <Switch data={["",""]} setprivacy={setprivacy}/>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`text-[20px] ${next===true? "cursor-pointer":"cursor-wait"} rounded-lg w-[200px] mt-9 px-3 font-bold text-white bg-gradient h-[70px]`}
                        >
                            {next === true ? (
                                <span>
                                    Save changes
                                </span>

                            ) : (
                                <span>
                                    Wait...
                                </span>
                            )}

                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings