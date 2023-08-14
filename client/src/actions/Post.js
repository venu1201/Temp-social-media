import * as api from '../api/index.js';

export const createpost = (createpostdata) => async (dispatch) => {
    try {
      const { data } = await api.createpost(createpostdata);
    //   setisSignin(!isSignin)
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };
export const getPosts = (posts,setposts)=> async (dispatch)=>{
    try {
        const {data} = await api.getposts();
        // setallposts(data);
        console.log(data.result)
        setposts([...posts,...data.result]);
        dispatch({type:'ALL_POSTS',data});

    } catch (error) {
        console.log(error);
    }
}
export const getpostsbyusername =(username,setuserposts)=>async (dispatch)=>{
  try{
    const {data}=await api.getpostsbyusername(username);
    setuserposts(data?.result);
    console.log(data)
  }catch(err)
  {
    console.log(err);
  }
}