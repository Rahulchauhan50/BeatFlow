import React, { useState } from 'react';
import { Link, useLocation} from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { links } from '../assets/constants'
import { HiOutlineMenu } from 'react-icons/hi'

const NavLinks = ({close}) => {
  const location = useLocation()
  return<div className='mt-4' >
    {links.map((item)=>(
      <Link 
      key={item.name}
      to={item.to}
      className={`flex flex-row justify-start items-center my-8 text-sm font-medium ${location.pathname==item.to?"text-cyan-400":"text-gray-400"}  hover:text-cyan-400`} >
        <item.icon className='w-6 h-6 mr-2'/>
      {item.name}
      </Link>
    ))}
    </div>
}

export default function Sidebar({setUserPage}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
   <> 
    <div className='md:flex hidden flex-col w-[220px] py-6 px-4 bg-[#191624]'>
    <Link onClick={setUserPage} to='user'>
    <img className="h-[100px] rounded-full object-contain z-50" alt="Spotify logo with text" src='https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740'/>
    <span className='text-white ml-7 mt-4 flex'>Rahul</span>
    </Link>
    <NavLinks/>
    </div>

    <div className='absolute md:hidden block top-5 right-3 z-[19]'>
      {mobileMenuOpen?(<RiCloseLine onClick={()=>setMobileMenuOpen(false)} className='w-6 h-6 text-white mr-2'/>):(<HiOutlineMenu onClick={() => setMobileMenuOpen(true)} className='w-6 h-6 text-white mr-2'/>)}
    </div>
    <div onClick={()=>setMobileMenuOpen(false)} className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-30 p-6 transition-all duration-500 md:hidden ${mobileMenuOpen?'left-0':'-left-full'}`}>
      <Link onClick={setUserPage} to='/user'>
        <div className='w-full flex items-center'>
    <img className=" rounded-full h-20 object-contain z-40 mr-3" alt="Spotify logo with text" src='https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740'/>
    <div className='flex flex-col justify-center text-white md:hidden'>

          <p>rahul</p>
          <p>rahul@gmail.com</p>
          <button className="text-white bg-[#17f7ff18] h-10 w-20 px-4 py-2 rounded">LogOut</button>

    </div>
        </div>
    </Link>
      <NavLinks  />
    </div>
   </>
  )
}