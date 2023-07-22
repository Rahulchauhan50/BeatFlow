import React from 'react';
import google from '../assets/google.svg'

const SignInPopup = ({ showPopup, handleTogglePopup, handleTogglePopupOut }) => {


    return (

        showPopup && <div className="absolute min-h-screen flex items-center justify-center z-[100]">

            <div className="fixed inset-0 bg-black bg-opacity-[0.65] flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 w-96 transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
                    <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Sign In</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full bg-gray-100 rounded focus:border-transparent focus:ring-0"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" className="form-input mt-1 block w-full bg-gray-100 rounded" />
                        </div>
                        <div className='flex flex-row justify-between'>
                            <button
                                className="flex font-[600] items-center justify-center w-full h-12 py-2 px-4 bg-[#0f13ff9f] text-white rounded-md shadow-md"
                            >
                            <img className="w-8 h-8 rounded-[10px] bg-white my-4 cursor-pointer mr-2" src={google} />
                                
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

                    {/* Close button */}
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
                    <p className=''><span className='ml-[14%]' >Did't have any account?<span onClick={handleTogglePopupOut} style={{color:"blue"}} className='cursor-pointer'>SignUp here</span></span></p>
                </div>
            </div>

        </div>
    )
}

export default SignInPopup;


