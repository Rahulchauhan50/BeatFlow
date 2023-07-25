import React, { useRef } from 'react';
import google from '../assets/google.svg'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/UserAuthSlice';

const SignUpPopup = ({showPopupOut, handleTogglePopupOut, handleTogglePopup}) => {
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = async (e) => {
      e.preventDefault();
      const name = nameRef.current.value;
      const phoneNumber = phoneNumberRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const response = await fetch("http://localhost:5000/auth", {
          method: "POST",
          headers:{
              "Content-Type": "application/json"
          },
          body:JSON.stringify({name,phoneNumber, email, password })

      })
      const data = await response.json()
      dispatch(setUserDetails(data))
      console.log(data)
  }
  
  return (
    showPopupOut &&  <div className="absolute min-h-screen flex items-center justify-center z-[500]">
        <div className="fixed inset-0 bg-black bg-opacity-[0.65] flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-96 transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input  type="text" ref={nameRef} className="form-input mt-1 block w-full bg-gray-100 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone No.</label>
                <input type="number" ref={phoneNumberRef} className="form-input mt-1 block w-full bg-gray-100 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" ref={emailRef} className="form-input mt-1 block w-full bg-gray-100 rounded" />
              </div>
              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type='password' ref={passwordRef} className="form-input mt-1 block w-full bg-gray-100 rounded" />
              </div>
              <div className='flex mb-3 flex-row justify-between'>
                            <button
                                className="flex font-[600] items-center justify-center w-full h-[42px] py-2 px-4 bg-[#0f13ff9f] text-white rounded-md shadow-md"
                            >
                            <img className="w-8 h-6 rounded-[10px] bg-white my-4 cursor-pointer mr-2" src={google} />
                                
                                Sign In with Google
                            </button>
                        </div>
                        
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md py-2 font-medium hover:from-green-600 hover:to-blue-600 focus:outline-none transition-colors"
              >
                Sign Up
              </button>
            </form>
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
        <p className=''><span className='ml-[14%]' >Already have account?<span  onClick={handleTogglePopup} style={{color:"blue"}} className='cursor-pointer'>SignIn here</span></span></p>
          </div>
        </div>
    </div>
  );
};

export default SignUpPopup;
