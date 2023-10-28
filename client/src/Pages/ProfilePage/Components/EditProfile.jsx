import React, { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { avatar } from '../../../assets';
import { updateuserdetails } from '../../../actions/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { client, urlFor } from '../../../Client';
const EditProfile = ({ setedit }) => {
    const userdetails=useSelector((state)=>state.authData);

    const [selectedImage, setSelectedImage] = useState(userdetails?.profilepicture);
    const [editdata,seteditdata]=useState({firstname:userdetails?.firstname,lastname:userdetails?.lastname,bio:userdetails?.bio,selectedfile:null});
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
        seteditdata({...editdata,[e.target.name]:e.target.value});
    }
    const dispatch=useDispatch();
    const handlesubmit=(e)=>{
        e.preventDefault();
        setnext(false);
        console.log(editdata);
        dispatch(updateuserdetails(editdata,userdetails?.username)).then(()=>{
            setnext(true);
            setedit(false);
        });
        // setedit(false);
       
        
    }
    return (
        <div className="absolute z-[9999] ml-7 mt-1 top-[40px] left-[20px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] h-[90%] w-[80%]">
            <h2 className="h-[60px] text-white mt-4 flex justify-center items-center p-4 font-poppins font-bold text-[40px] ">
                Edit Profile
                <VscChromeClose
                    onClick={() => setedit((prev) => !prev)}
                    className="right-5 text-black h-[40px] hover:bg-white rounded-md w-[40px] hover:scale-105 absolute"
                />
            </h2>
            <form className="mt-5 flex flex-col justify-center items-center" onSubmit={handlesubmit}>
                <div className="fle my-4 flex-col justify-center items-center h-[120px] w-full">
                    <label className='h-full w-full flex justify-center items-center flex-col' htmlFor="imageInput">
                        <img className="h-[120px] object-fill w-[120px] rounded-full z-[1000]"  src={selectedImage || avatar} alt="" />
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
                    <div className='w-full gap-4 h-[45px] mt-2 flex justify-center items-center'>
                        <input onChange={handlechange} value={editdata?.firstname} name='firstname' placeholder='FirstName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />
                        <input onChange={handlechange} value={editdata?.lastname} name='lastname' placeholder='LastName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />

                    </div>
                    <div className='w-full mt-4 h-[100px]'>
                        <textarea onChange={handlechange} value={editdata?.bio} name='bio' placeholder='Write Some Thing About You' className='w-full text-[18px] outline-none border-none p-4 h-full resize-none' />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-[20px] w-[200px] mt-9 px-3 font-bold text-white bg-gradient h-[70px]"
                >
                    {next ===true? (
                        <span>
                              Save changes
                        </span>
                      
                    ):(
                        <span className='cursor-wait'>
                              Wait...
                        </span>
                    )}
                   
                </button>

            </form>
        </div>
    );
};

export default EditProfile;
