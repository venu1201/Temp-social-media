import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Google, Login } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getgoogleuser, googlesignup, signin, signup } from '../../actions/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginSocialGoogle } from "reactjs-social-login";
import LoadingSpinner from '../../components/Spinner/Spinner';
const initialdata = { username: '', firstname: '', lastname: '', email: '', password: '', confirmpassword: '', picture: '' }
const Authpage = () => {

  // declarations..........................................................................
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleuser = useSelector((state) => state.googleuser);
  const error = useSelector((state) => state.error);  
  const state = useSelector((state) => state);
  console.log(state)

  // states...................................................................................
  const [isSignin, setisSignin] = useState(true);
  const [formdata, setformdata] = useState(initialdata);
  const [googledata, setgoogledata] = useState({})
  const [Error, setError] = useState(error);
  const [loading, setloading] = useState(false);

  // useeffects.............................................................................
  useEffect(() => {
    if (error)
      setError(error)
  }, [error])
  useEffect(() => {

    if (Error) {
      toast.error(Error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }

  }, [Error])
  useEffect(() => {
    if (localStorage.getItem('profile'))
      navigate('/')
    else
      navigate('/Auth')
  }, [localStorage.getItem('profile')])

  useEffect(() => {
    if (googleuser.check == 1 && localStorage.getItem('profile') != null)
      navigate('/')
    else
      navigate('/Auth');
  }, [googleuser.check])
  
  useEffect(() => {
    // Reset error message after 3 seconds
    if (Error?.message?.length > 0) {
      const timeout = setTimeout(() => {
        setError({ message: null });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [Error]);

  // functions........................................................................................

  const handlesubmit = (e) => {
    e.preventDefault();
    setloading(true);


    if (isSignin) {

      if (!formdata.username || !formdata.password) {
        setError({ message: 'Please enter username and password.' });
        setloading(false);
        return;
      }
      // console.log("formdataaaaaaaaaaa",formdata)
      dispatch(signin(formdata, navigate)).then(() => {
        setloading(false);
      });
    } else {

      if (!formdata.username || !formdata.firstname || !formdata.lastname || !formdata.email || !formdata.password || !formdata.confirmpassword) {
        setError({ message: 'Please fill all the required fields.' });
        setloading(false);

        return;
      }

      if (!isValidEmail(formdata.email)) {
        setError({ message: 'Please enter a valid email address.' });
        setloading(false);

        return;
      }

      if (!isValidPassword(formdata.password)) {
        setError({
          message:
            'Password must contain at least 8 characters, including 1 capital letter and 1 special character.',
        });
        setloading(false);

        return;
      }

      if (formdata.password !== formdata.confirmpassword) {
        setError({ message: 'Passwords do not match.' });
        setloading(false);

        return;
      }

      dispatch(signup(formdata, setisSignin, isSignin)).then(() => {
        setloading(false);

      });
    }
  };

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };


  const handlegooglesubmit = async () => {
    const { email, given_name, family_name, picture } = googledata;
    formdata.email = email;
    formdata.firstname = given_name;
    formdata.lastname = family_name;
    formdata.picture = picture;

    dispatch(googlesignup(formdata, navigate))

  }
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const handleswitch = () => {
    setisSignin(!isSignin);
    setformdata(initialdata);
    if (error)
      error.message = '';
  }
  const forgotpassword=(e)=>{
    e.preventDefault();
  }
  // console.log(googleuser);
  // console.log(Error)

  return (
    <div className='h-screen   py-10 transition ease-in-out duration-1000 w-screen flex flex-col font-poppins  items-center '>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {googleuser.check === 0 || googleuser.check === 1 ? (
        <div className=' bg-[--black3] px-5 pb-5 shadow-sm shadow-white   w-[500px]'>
          <h3 className='flex justify-center text-[35px] m-5 font-poppins font-bold'>
            <div className=' w-[30px] h-full'>
              <LockOpenIcon className='scale-125' />
            </div>

            {isSignin === true ? (
              "Sign In"
            ) : ("Sign Up")}
          </h3>

          {isSignin === true ? (
            <div className=''>
              <form className='transition-all  duration-300 ease-in-out'>
              <div className='flex  flex-col p-2 gap-2'>

                <input value={formdata.username} name='username' onChange={handlechange} type="text" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />
                <input value={formdata.password} name='password' onChange={handlechange} type="password" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />
                
              </div>
              </form>
              <div className='mt-1 text-green-500 pr-3 w-full flex justify-end'>
                  <button onClick={()=>forgotpassword()} className='hover:scale-105'>Forgot Password</button>
              </div>
            </div>
            
          ) : (
            <form className='duration-300 ease-in-out'>
              <div className='flex flex-col p-2 gap-2'>
                <input name='username' onChange={handlechange} type="text" className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />

                <div className='flex gap-2 flex-1'>
                  <input name='firstname' onChange={handlechange} type="text" required={true} className='w-full  h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='First Name*' />
                  <input name='lastname' onChange={handlechange} type="text" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Last Name*' />
                </div>
                <div>

                  <input name='email' onChange={handlechange} type="email" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Email*' />

                </div>
                <div className='flex flex-col gap-2'>
                  <input name='password' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />
                  <input name='confirmpassword' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Confirm Password*' />

                </div>

              </div>
            </form>
          )}
          {/* {Error?.message?.length > 0 && (
            <div className='flex justify-end px-2 text-red-600'>
              *{Error.message || Error}
            </div>
          )} */}

          <div className='p-2 flex flex-col'>
            <button onClick={handlesubmit} className='w-full h-[60px] bg-blue-900 text-[24px] mt-2'>
              {loading === true ? (
                <div className='flex justify-center'>
                  <LoadingSpinner />
                </div>
              ) : (
                <div>
                  {isSignin == true ? ("Sign In") : ("Sign Up")}
                </div>
              )}


            </button>
            <LoginSocialGoogle
              client_id={"615136400415-4s3dtmu7pj9ppi40gccmh6e555eaf7ce.apps.googleusercontent.com"}
              scope="openid profile email"
              discoveryDocs="claims_supported"
              access_type="offline"
              onResolve={async ({ data }) => {
                const { email } = await data;
                setgoogledata(data);
                if (email) {
                  dispatch(getgoogleuser(email));

                }

              }}
              onReject={(err) => {
                console.log(err);
              }}
            >
              <button

                className="w-full h-[60px] bg-red-500 text-[24px] mt-2 flex items-center justify-center"
              // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Google style={{ marginRight: '8px' }} /> {isSignin == true ? "Sign In " : "Sign up "}with Google
              </button>
            </LoginSocialGoogle>
          </div>
          <div className='flex justify-end p-2 '>
            <button className='bg-none outline-none border-none' onClick={handleswitch}>
              {isSignin === true ?
                (
                  <div className='flex gap-1'>
                    <p className='text-dimWhite'>Dont have an account ?</p>
                    <p>Sign Up</p>
                  </div>
                ) :
                (
                  <div className='flex gap-1'>
                    <p className='text-dimWhite'>Already have an account ?</p>
                    <p>Sign In</p>
                  </div>
                )}

            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex flex-col p-2 gap-2'>
            <h3 className='flex justify-center text-[35px] m-5 font-poppins font-bold'>
              <div className=' w-[30px] h-full'>
                <LockOpenIcon className='scale-125' />
              </div>
              Create User
            </h3>
            <input name='username' onChange={handlechange} type="text" className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Username*' />
            <input name='password' onChange={handlechange} type="password" className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Password*' />
            <input name='confirmpassword' onChange={handlechange} type="password" required={true} className='w-full h-[60px] text-[24px] text-center outline-none border-none text-black' placeholder='Confirm Password*' />
            <button onClick={handlegooglesubmit} className='w-full h-[60px] rounded-lg bg-blue-900 text-[24px] mt-2'>
              Sign Up
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default Authpage