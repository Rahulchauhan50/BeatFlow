import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { links } from '../assets/constants'
import { HiOutlineMenu } from 'react-icons/hi'
import { setUserDetails } from '../redux/features/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dalle from '../assets/DALL.png'

const NavLinks = ({ close }) => {

  const location = useLocation()
  return <div className='mt-2' >
    {links.map((item) => (
      <Link
        key={item.name}
        to={item.to}
        className={`flex flex-row justify-start items-center my-8 text-sm font-medium ${location.pathname === item.to ? "text-cyan-400" : "text-gray-400"}  hover:text-cyan-400`} >
        <item.icon className='w-6 h-6 mr-2' />
        {item.name}
      </Link>
    ))}
  </div>
}

export default function Sidebar({handleTogglePopup}) {
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <>
      <div className='md:flex hidden flex-col h-full w-[220px] py-6 px-4 bg-[#191624]'>
          <div className={`${UserDetails?.name ? "flex-col flex" : 'flex-row flex'} items-center gap-3`}>
        <Link to='user'>
            <img className="h-[90px] rounded-full object-contain z-50" alt="Spotify logo with text" src={Dalle} />
        </Link>
            {UserDetails?.name ? <p className='text-white items-center mt-3 flex'>{UserDetails?.name}</p> : <button onClick={handleTogglePopup} className="text-white bg-[#17f7ff18] h-10 w-20 px-4 py-2 rounded">SignIn</button>}
          </div>
        <NavLinks />
      </div>

      <div className='absolute md:hidden block top-5 right-3 z-[19]'>
        {mobileMenuOpen ? (<RiCloseLine onClick={() => setMobileMenuOpen(false)} className='w-6 h-6 text-white mr-2' />) : (<HiOutlineMenu onClick={() => setMobileMenuOpen(true)} className='w-6 h-6 text-white mr-2' />)}
      </div>
      <div onClick={() => setMobileMenuOpen(false)} className={`absolute top-0 h-full w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-30 p-6 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
          <div className='w-full flex items-center'>
        <Link to='/user'>
            <img className=" rounded-full h-14 object-contain z-40 mr-3" alt="Spotify logo with text" src={Dalle} />
        </Link>
            <div className='flex flex-col justify-center text-white md:hidden'>
              <p>{UserDetails?.name}</p>
              <p>{UserDetails?.email}</p>
              {UserDetails?.name ? <button onClick={()=>{ localStorage.setItem('token','');dispatch(setUserDetails({}));window.location.href = 'https://music-rahul.netlify.app/'}} className="text-white bg-[#17f7ff18] h-10 w-20 px-4 py-2 rounded">LogOut</button> : <button onClick={handleTogglePopup} className="text-white bg-[#17f7ff18] h-10 w-20 px-4 py-2 rounded">SignIn</button>}
            </div>
          </div>
        <NavLinks />
      </div>
    </>
  )
}