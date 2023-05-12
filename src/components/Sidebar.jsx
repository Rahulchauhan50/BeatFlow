import React from 'react'
import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { links } from '../assets/constants'
import { HiOutlineMenu } from 'react-icons/hi'

const NavLinks = () => (
  <div className='mt-10'>
    {links.map((item)=>(
      <NavLink 
      key={item.name}
      t0={item.to}
      className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400' >
        <item.icon className='w-6 h-6 mr-2'/>
      {item.name}
      </NavLink>
    ))}
  </div>
)

export default function Sidebar({mobileMenuOpen,close,open}) {
  return (
   <>
    <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
      <img src={logo} alt='logo' className='w-full h-14 object-contain'/>
      <NavLinks/>
    </div>

    <div className='absolute md:hidden block top-6 right-3'>
      {mobileMenuOpen?(<RiCloseLine onClick={()=>close()} className='w-6 h-6 text-white mr-2'/>):(<HiOutlineMenu onClick={()=>open()} className='w-6 h-6 text-white mr-2'/>)}
    </div>
    <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 transition-all duration-500 md:hidden ${mobileMenuOpen?'left-0':'-left-full'}`}>
      <img src={logo} alt='logo' className='w-full h-14 object-contain'/>
      <NavLinks onClick={()=>close()} />
    </div>
   </>
  )
}
