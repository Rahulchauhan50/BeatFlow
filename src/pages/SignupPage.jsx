import React, { useRef, useState } from 'react';
import google from '../assets/google.svg'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/UserAuthSlice';
import { useUserSignupMutation } from '../redux/services/UserApi';
import IconLoading from '../assets/my-loader.svg'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig"
import {setAlert, setAlertMsg} from '../redux/features/playerSlice';

const SignUpPopup = ({ showPopupOut, handleTogglePopupOut, handleTogglePopup }) => {
  const dispatch = useDispatch();
  const [isfocus, setIsfocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [SignUPUser, { isLoading }] = useUserSignupMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const phoneNumber = phoneNumberRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    SignUPUser({ phoneNumber, name, email, password })
      .unwrap()
      .then((data) => {
        if (data?.success === true) {
          setIsError(false)
          localStorage.setItem("token", data.authToken)
          dispatch(setUserDetails(data))
          window.location.href = 'https://music-rahul.netlify.app/'
        }
      })
      .catch((error) => {
        console.error('Error Authenicationg user');
        if ("user already exist" === error.data.error) {
          setIsError(true)
        }
      });
  }


  const HandleGoogleSignUP = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(firebaseAuth, provider);
      console.log('User signed in:');
      SignUPUser({ profileImage: user.reloadUserInfo.photoUrl, name: user.reloadUserInfo.displayName, email: user.reloadUserInfo.email, password: user.reloadUserInfo.providerUserInfo[0].rawId })
        .unwrap()
        .then((data) => {
          if (data?.success === true) {
            localStorage.setItem("token", data.authToken)
            dispatch(setUserDetails(data))
            window.location.href = 'https://music-rahul.netlify.app/'
          } else {
            console.log("user already exist hbjhbjhjjhnihik")
          }
        })
        .catch((error) => {
          console.error('Error Authenicationg user', error);
          if ("user already exist" === error.data.error) {
            dispatch(setAlert(true))
            dispatch(setAlertMsg('user already exist SignIn instead'))
          }
        });
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('User canceled the sign-in process.');
      } else {
        console.error('Error signing in:', error);
      }
    }
  };

  return (
    showPopupOut && <div className="absolute min-h-screen flex items-center justify-center z-[500]">
      <div className="fixed inset-0 bg-black bg-opacity-[0.65] flex items-center justify-center">

        <div style={{ maxWidth: "96vw" }} className={`bg-white rounded-lg p-8 w-96 ${isfocus && window.innerWidth < 576 ? '-translate-y-40' : 'translate-y-0 hover:scale-105'} transform transition-all duration-300 ease-in-out scale-100`}>
          {isLoading && <div className={`fixed inset-0 bg-black items-center flex bg-opacity-[0.65] rounded-lg p-8 w-full`} >
            <img alt='hero' className='m-auto' src={IconLoading} />
          </div>}
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>
          <form onSubmit={handleSignUp} autoComplete='true'>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input minLength={3} required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='Name' type="text" ref={nameRef} className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='email' type="email" ref={emailRef} className={`${isError ? "border-[#ff0909]" : "border-[#E9EDF4]"} w-full border rounded-md bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`} />
              {isError ? <p className='text-red-600 text-sm font-[450]'>User already exist</p> : ""}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input minLength={8} required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='create password' type='password' ref={passwordRef} className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md py-2 font-medium hover:from-green-600 hover:to-blue-600 focus:outline-none transition-colors"
            >
              Sign Up
            </button>
          </form>
          <div className='flex my-5 flex-row justify-between'>
              <button onClick={HandleGoogleSignUP} className="flex font-[600] items-center justify-center w-full h-[42px] py-2 px-4 bg-[#0f13ff9f] text-white rounded-md shadow-md">
                <img alt='hello' className="w-8 h-8 rounded-[10px] bg-white my-4 cursor-pointer mr-2" src={google} />
                Sign In with Google
              </button>
            </div>

          <button
            onClick={handleTogglePopupOut}
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <p className=''><span className='ml-[14%]' >Already have account?<span onClick={handleTogglePopup} style={{ color: "blue" }} className='cursor-pointer'>SignIn here</span></span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
