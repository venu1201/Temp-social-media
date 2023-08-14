// In your Redux reducer file

import { urlFor } from "../Client";


const initialState = {
  error: null,
  authData: null,
  users: [],
  googleuser: { check: 0 },
  userdetails:'',
  box:false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
    case 'SIGNUP_ERROR':
      return {
        ...state,
        error: action.payload,
      };
      case 'USER_DETAILS':
        return {
          ...state,userdetails:action.data.result,
        }
      case 'CLEAR_GOOGLE':
        return {
          ...state,
          googleuser:{check:0},
          error:null,
          authData:null,
        }
    case 'GOOGLE_VERIFY':
      return {
        ...state,
        googleuser: action?.data,
      }
      case 'BOX':
        return {
          ...state,
          box:action?.data,
        }
    case 'GOOGLE_SIGNUP':
      return {

        ...state,
        error: null,
        authData: action?.data,


      };
    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify(action?.data));
      return {

        ...state,
        error: null,
        authData: action?.data,


      };
    
    case 'FETCH_USERS':

      return {
        ...state,
        users: action.data,

      }
    default:
      return state;
  }
};

export default authReducer;
