import React, { useEffect, useRef } from 'react';
import { loader } from '../assets';

const Loader = ({ title }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return  <>
  <span ref={divRef} ></span>
  <div  className='flex h-[80vh] m-auto justify-center items-center flex-col align-middle'>
     <div>
     <img src={loader} alt='Loader' className='w-32 h-32 object-contain'/>
      <h1 className='font-bold text-2xl text-white mt-2'>
        {title}
      </h1>
     </div>
  </div> 
  </>
};

export default Loader;