import React from 'react'
import loader from '../assets/loader.svg'

export default function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col align-middle'>
       <div>
       <img src={loader} alt='Loader' className='w-32 h-32 object-contain'/>
        <h1 className='font-bold text-2xl text-white mt-2'>
          Loading songs...
        </h1>
       </div>
         
    </div> 
  )
}
