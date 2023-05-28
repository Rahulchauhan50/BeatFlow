import React, { useEffect } from 'react'
import loader from '../assets/loader.svg'

export default function Loader({title}) {

  useEffect(()=>{
    document.getElementById('loader').scrollIntoView();
    document.getElementById('searchscroll').scrollIntoView();
  })

  return (
    <>
    <span id='loader' ></span>
    <div  className='flex h-screen m-auto justify-center items-center flex-col align-middle'>
       <div>
       <img src={loader} alt='Loader' className='w-32 h-32 object-contain'/>
        <h1 className='font-bold text-2xl text-white mt-2'>
          {title}
        </h1>
       </div>
    </div> 
    </>
  )
}
