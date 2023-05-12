import React from 'react'
import {loader} from '../assets/loader.svg'

export default function Loader() {
  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <img src='../assets/loader.svg' alt='Loader' className='w-32 h-32 object-contain'/>
         
    </div> 
  )
}
