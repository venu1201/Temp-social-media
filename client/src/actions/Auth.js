// In your Redux actions file (authActions.js)
import { client,urlFor } from '../Client.js';
import * as api from '../api/index.js';
export const getuser = (username) => async (dispatch) => {

  try {
    const { data } = await api.getusers(username);
    // console.log(data);
    dispatch({ type: 'FETCH_USERS', data });
  } catch (error) {
    console.log(error);

  }
};

export const signin = (formdata, navigate) => async (dispatch) => {

  try {
    console.log(formdata)
    const { data } = await api.signin(formdata);
    dispatch({ type: 'AUTH_SUCCESS', data });
    navigate('/');
  } catch (error) {
    const errorMessage = error.response.data;
    dispatch({ type: 'SIGNIN_ERROR', payload: errorMessage });
  }
};
// export const googlesignin=(formdata)=>async(dispatch)=>{
//   try {
//     const { data } = await api.signin(formdata);

//     dispatch({ type: 'AUTH_SUCCESS', data });
//     navigate('/');
//   } catch (error) {
//     const errorMessage = error.response.data;
//     dispatch({ type: 'SIGNIN_ERROR', payload: errorMessage });
//   }
// }
export const googlesignup = (formdata, navigate) => async (dispatch) => {
  try {

    const { data } = await api.signup(formdata);
    console.log(data)
    const doc = {
      _id: data?.result?.username,
      _type: 'user',
      username: data?.result?.username,
      //  Image:'hmmm'

    }
    client.createIfNotExists(doc).then(() => {
      console.log('added');
    });
    dispatch({ type: 'GOOGLE_SIGNUP', data });
    localStorage.setItem('profile', JSON.stringify(data));

    navigate('/');
  } catch (error) {
    const errorMessage = error.response;
    dispatch({ type: 'SIGNUP_ERROR', payload: errorMessage });
  }
}
export const signup = (formdata, setisSignin, isSignin) => async (dispatch) => {
  try {
    const { data } = await api.signup(formdata);
    console.log(data);
    const doc = {
      _id: data?.result?.username,
      _type: 'user',
      username: data?.result?.username,
      //  Image:'hmmm'

    }
    client.createIfNotExists(doc).then(() => {
      console.log('added');
    })
    dispatch({ type: 'AUTH_SUCCESS', data });
    setisSignin(!isSignin)
  } catch (error) {
    const errorMessage = error.response.data;
    dispatch({ type: 'SIGNUP_ERROR', payload: errorMessage });
  }
};
export const getgoogleuser = (email) => async (dispatch) => {
  try {
    const { data } = await api.getgoogleuser(email);
    dispatch({ type: 'GOOGLE_VERIFY', data });

  } catch (error) {
    console.log(error)
  }
}
export const getuserdetails = (setuserdetails, username) => async (dispatch) => {
  try {
    const { data } = await api.getuserdetails(username);
    setuserdetails(data.result);
    dispatch({ type: 'USER_DETAILS', data });
  } catch (error) {
    console.log(error)
  }
}
export const getallpendingusers = (setuserdetails, pending) => async (dispatch) => {

  try {

    const { data } = await api.getallpendingusers(pending);
    setuserdetails(data?.result);

  } catch (error) {
    console.log(error)
  }
}
export const acceptanddeleteuser = (obj, username) => async (dispatch) => {
  try {
    const { data } = await api.acceptanddeleteuser(obj, username);

  } catch (error) {

  }
}

export const updateuserdetails = (editdata, username) => async (dispatch) => {
  try {  
    console.log("edit data",editdata)
    if(editdata.selectedfile)
    {
      const doc = {
        _type: 'user',
        _id:'64c63453d31f1a67685cee5b',
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: editdata?.selectedfile?._id,
          },
        },
      };
      console.log(doc,"doc1")
      const updatedDoc = await client.patch(doc._id).set(doc).commit();
      console.log(updatedDoc.image)
      console.log(
        "hmm",urlFor(updatedDoc.image).url())
        const { data } = await api.updateuserdetails({...editdata,selectedfile:urlFor(updatedDoc.image).url()}, username);

    }
    else
    {
        const { data } = await api.updateuserdetails(editdata, username);

    }
   
      


  } catch (error) {
    console.log(error)
  }
};


