import React, { useRef, useState } from 'react';
import google from '../assets/google.svg'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/UserAuthSlice';
import { useUserLoginMutation } from '../redux/services/UserApi';
import IconLoading from '../assets/my-loader.svg'

const SignInPopup = ({ showPopup, handleTogglePopup, handleTogglePopupOut }) => {
    const dispatch = useDispatch();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isfocus, setIsfocus] = useState(false);
    const [SignInUser,{ isLoading }] = useUserLoginMutation();
    const [isError, setIsError] = useState(false);



    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        SignInUser({email,password})
      .unwrap()
      .then((data) => {
        if(data?.success===true){
            setIsError(false)
          localStorage.setItem("token",data.authToken)
          dispatch(setUserDetails(data))
          window.location.href = 'https://music-rahul.netlify.app/'
          }      })
      .catch((error) => {
        console.error('Error Authenicationg user');
        if("user does not exist"===error.data.error){
            setIsError(true)
          }
      });
    }

    return (
        showPopup && <div className="absolute min-h-screen flex items-center justify-center z-[100]">
            <div className="fixed inset-0 bg-black bg-opacity-[0.65] flex items-center justify-center">
                <div style={{maxWidth: "96vw"}} className={`bg-white rounded-lg p-8 ${isfocus && window.innerWidth < 576? '-translate-y-40' : 'translate-y-0 hover:scale-105'} w-96 transform transition-all duration-300 ease-in-out scale-100`}>
                {isLoading &&  <div className={`fixed inset-0 bg-black items-center flex bg-opacity-[0.65] rounded-lg p-8 w-full`} >
            <img alt='loading' className='m-auto' src={IconLoading}/>
          </div>}
                    <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign In</h2>
                    <form onSubmit={handleLogin} autoComplete='true' autoFocus>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Username</label>

                            <input
                                required
                                onInput={()=>{setIsError(false)}}
                                type="email"
                                ref={emailRef}
                                onFocus={()=>{setIsfocus(true)}}
                                onBlur={()=>{setIsfocus(false)}}
                                placeholder="Email"
                                className={`${isError?"border-[#ff0909]":"border-[#E9EDF4]"} w-full rounded-md border bg-[#FCFDFE] py-2 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`}
                            />
                             {isError?<p className='text-red-600 text-sm font-[450]'>Invalid credentials</p>:""}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input required minLength={8} onInput={()=>{setIsError(false)}} onBlur={()=>{setIsfocus(false)}} onFocus={()=>{setIsfocus(true)}} type="password" ref={passwordRef} placeholder='password' className={`${isError?"border-[#ff0909]":"border-[#E9EDF4]"} w-full rounded-md border bg-[#FCFDFE] py-2 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`} />
                            {isError?<p className='text-red-600 text-sm font-[450]'>Invalid credentials</p>:""}
                        </div>
                        <div className='flex flex-row justify-between'>
                            <button
                                className="flex font-[600] items-center justify-center w-full h-[42px] py-2 px-4 bg-[#0f13ff9f] text-white rounded-md shadow-md"
                            >
                                <img alt='googe' className="w-8 h-8 rounded-[10px] bg-white my-4 cursor-pointer mr-2" src={google} />

                                Sign In with Google
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r mt-5 mb-0 from-purple-500 to-pink-500 text-white rounded-md py-2 font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <button
                        onClick={handleTogglePopup}
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
                    <p className=''><span className='ml-[14%]' >Did't have any account?<span onClick={handleTogglePopupOut} style={{ color: "blue" }} className='cursor-pointer'>SignUp here</span></span></p>
                </div>
            </div>

        </div>
    )
}

export default SignInPopup;


