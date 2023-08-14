import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { VscChromeClose } from "react-icons/vsc";
import './styles.css'
import FileBase from 'react-file-base64';
import { createpost } from '../../../actions/Post';
import { useDispatch, useSelector } from 'react-redux';
import { client, urlFor } from '../../../Client';
const CreatePost = ({ data, data2 }) => {
  const [files, setFiles] = useState([]);
  const [userdata, setuserdata] = useState(JSON.parse(localStorage.getItem('profile')));
  const [userdetails, setuserdetails] = useState(userdata?.result);
  const [createdpost, setcreatedpost] = useState({ title: '', description: '', selectedfile: null, username: userdetails?.username });
  const [image, setimage] = useState(null);
  const [next, setnext] = useState(true)

  const [preview, setpreview] = useState(true);
  const dispatch = useDispatch();
  const handleDrop = async (acceptedFiles) => {
    // Filter only image files

    const imageFiles = acceptedFiles.filter((file) => file.type.startsWith('image/'));
    setnext(false);
    console.log(imageFiles[0])
    if (imageFiles[0]) {
      const imageasset = await client.assets.upload('image', imageFiles[0], { contentType: imageFiles[0].type, filename: imageFiles[0].name })
        .catch((err) => {
          console.log('Upload failed', err.message);
        });
      console.log(imageasset, "set");

      setimage(urlFor({ _type: 'image', asset: { _type: '_reference', _ref: imageasset._id } }).url());
      setnext(true)

    }
    else {
      setnext(true)
    }
  };
  useEffect(() => {
    if (image) {
      setcreatedpost({ ...createdpost, username: userdetails?.username, selectedfile: image });

    }
  }, [image])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(createdpost)
    setpreview((pre) => !pre);
  };

  const handlepost = () => {
    console.log(createdpost);
    dispatch(createpost(createdpost))
    data2((prev)=>!prev);

  }

  const handlechange = (e) => {
    setcreatedpost({ ...createdpost, [e.target.name]: e.target.value });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*', // Only accept image files
    // multiple: true, // Enable selection of multiple images
  });

  return (
    <div
      className={`${data ? 'flex' : 'hidden'
        } bg-blur h-full transition-all ease-in-out duration-1000  top-0 w-full absolute z-[9999] flex justify-center items-center`}
    >
      {preview === true ? (
        <div
          className={`w-[600px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] relative z-[9999] bg-[--black3] h-[400px] flex flex-col gap-8 rounded-[10px] shadow-md shadow-[--black] `}
        >
          <h2 className="h-[60px] text-white mt-4 flex justify-center items-center p-4 font-poppins font-bold text-[40px] ">
            Create Post
            <VscChromeClose onClick={() => data2((prev) => !prev)} className='right-5 text-black h-[40px] hover:bg-white rounded-md w-[40px] hover:scale-105 absolute' />
          </h2>
          <form onSubmit={handleSubmit} className='flex text-black flex-col w-full h-full gap-3 px-5'>

            <div className='w-full h-[100px]'>
              <textarea onChange={handlechange} name='description' placeholder='Whats in Your Mind' className='w-full text-[18px] outline-none border-none p-4 h-full resize-none' />
            </div>
            <div
              {...getRootProps()}
              className={`p-4 mt-4 cursor-pointer w-full h-[70px] border-2 border-black flex justify-center items-center bg-white ${isDragActive ? 'border-blue-500 bg-blue-100' : ''
                }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-400">Drop images here...</p>
              ) : (
                <p className="text-[#666]">Drag 'n' drop images or click to select</p>
              )}
            </div>
            <button
              type="submit"
              className="text-[20px] font-bold text-white bg-gradient h-[50px]"
            >
              {next === true ? (
                <span>Preview</span>
              ) : (
                <span>
                  Wait...
                </span>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div
          className={`w-[600px] bg-gradient-to-r from-[#043d6e] via-[#1928b0] to-[#0f5085] relative z-[9999] bg-[--black3] h-[500px] flex flex-col rounded-[10px] justify-between shadow-md shadow-[--black] `}
        >
          <div className='p-4 flex flex-col gap-2'>
            {createdpost?.selectedfile && (
              <div>
                <img className='h-[350px]' src={createdpost?.selectedfile} alt="" />
              </div>
            )}
            {createdpost?.description.length > 0 && (
              <div className='text-[20px]'>
                {createdpost?.description}
              </div>
            )}
          </div>

          <div className='flex w-full'>
            <button
              onClick={()=>setpreview((prev)=>!prev)}
              className="text-[20px] w-full font-bold text-white bg-gradient h-[50px]"
            >
              Back
            </button>
            <button
              onClick={handlepost}
              className="text-[20px] w-full font-bold text-white bg-gradient h-[50px]"
            >
              Post
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CreatePost;
