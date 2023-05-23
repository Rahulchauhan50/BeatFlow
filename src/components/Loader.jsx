import React from 'react'
import loader from '../assets/loader.svg'

export default function Loader({title}) {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col align-middle' style={{marginTop:"45vh",marginBottom:"45vh"}}>
       <div>
       <img src={loader} alt='Loader' className='w-32 h-32 object-contain'/>
        <h1 className='font-bold text-2xl text-white mt-2'>
          {title}
        </h1>
       </div>
         
    </div> 
  )
}
