import * as api from '../api/index.js';


export const requesting = (username,user,setcheck) => async (dispatch) => {
    try {
      console.log(username,user);
      const { data } = await api.requesting(username,user);
        const {result}=data;
        const {pending}=result;

        for(let i=0;i<pending.length;i++)
        {
            if(pending[i]===user.username)
            {
                dispatch({type:'BOX',data:true})
            }
        }    
    //   setisSignin(!isSignin)
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
    }
  };
  export const remove=(type,username,touser)=>async(dispatch)=>{
    try {
      console.log(type,username,touser)
      const {data}=await api.remove(type,username,touser);
    } catch (error) {
      console.log(error);
    }
  }
  export const removeascompletefriend=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeascompletefriend(username,touser);
    } catch (error) {
      console.log(error);
    }
  }
  export const removeasfollower=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeasfollower(username,touser);
    } catch (error) {
      console.log(error);
    }
  }
  export const removeasfollowing=(username,touser)=>async(dispatch)=>{
    try {
      const {data}=await api.removeascompletefriend(username,touser);
    } catch (error) {
      console.log(error);
    }
  }