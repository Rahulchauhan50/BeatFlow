import React from 'react';
import ErrorPage from '../assets/404ErrorPage1.svg'

const Error = () => (
  <div className="w-full h-[60vh] contents flex-row justify-center ">
    <div className='mt-[5vh] m-auto'>
    <h1 className="font-bold text-2xl flex justify-center text-white">Something went wrong. Please try again</h1>
    </div>
    <div className='mt-[10vh] flex justify-center'>
    <img className='md:w-[50vw] w-full' src={ErrorPage}/>

    </div>
  </div>
);

export default Error;