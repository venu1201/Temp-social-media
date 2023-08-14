import React, { useEffect, useState } from 'react'
import { getuser } from '../../actions/Auth'
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from './components/CreatePost';
import { getPosts } from '../../actions/Post';
import Postbox from './components/Postbox';

const Posts = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch=useDispatch();
  const [posts,setposts]=useState([]);
  useEffect(() => {
    dispatch(getPosts(posts,setposts));
  }, [])
  
  console.log(posts)

  return (
    <div className='ac:w-[65%] md:w-[60%] ssm:w-[62%] ssm:justify-normal w-full  ss:h-screen h-full overflow-y-scroll flex flex-col items-center '>
        {posts.map((item,index)=>(
            <Postbox key={index} data={item}/>
       
        ))}

        
        
        
    </div>
  )
}

export default Posts