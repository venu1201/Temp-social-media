// import { combineReducers } from 'redux';
// import authReducer from './auth.js'
// import Posts from './Posts.js';
// export const reducers = combineReducers({authReducer,Posts });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
  authData: null,
  users: [],
  googleuser: { check: 0 },
  userdetails:null,
  box:false,
  posts: [],
  profile_data:null,
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    profile_data:(state,action)=>{
        console.log("hmmmm",action.payload)
        state.profile_data=action.payload;
    },
    remove_profile_data:(state)=>{
        state.profile_data=null;
    },
    signin_error:(state,action)=>{
        state.error=action.payload;
    },
    signup_error:(state,action)=>{
        state.error=action.payload;
    },
    user_details:(state,action)=>{
        state.userdetails=action.data.result;
    },
    clear_google:(state)=>{
        localStorage.removeItem('profile');
          state.googleuser.check=0;
          state.error=null;
          state.authData=null;
    },
    reset_state:(state)=>{
        console.log('hmm')
        // delete state.googleuser.authData;
        
    },
    google_verify:(state,action)=>{
        state.googleuser.check= action?.payload.check;
        if(state.googleuser.check==1)
        {
            // const res={result:action?.payload.result,token:action?.payload.token};
            localStorage.setItem('profile', JSON.stringify(action?.payload.result));

            state.authData=action.payload.result;     
        }
        else
        {
            state.googleuser.check=0;

        }
        // state.googleuser=action?.payload.check;
    },
    box:(state,action)=>{
        state.box=action?.data;
    },
    google_signup:(state,action)=>{
        state.error= null;
        state.authData= action?.data;
    },
    auth_success:(state,action)=>{
        localStorage.setItem('profile', JSON.stringify(action?.payload.result));
        state.error= null;
        state.authData= action?.payload.result;
    },
    fetch_users:(state,action)=>{
        state.users= action.payload.result1;
    },
    all_posts:(state,action)=>{
        state.posts= [action.data];
    },
  },
});

export const { signin_error,profile_data,remove_profile_data,reset_state,signup_error,user_details,all_posts,fetch_users,auth_success,google_signup,google_verify,box,clear_google } =
  authSlice.actions;
export default authSlice.reducer;