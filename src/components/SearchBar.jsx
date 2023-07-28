import { FaSearch, FaMicrophone } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import start from '../assets/start.mp3'
import end from '../assets/end.mp3'
import { useDispatch, useSelector } from 'react-redux';
import { playPause } from '../redux/features/playerSlice';
import { setUserDetails } from '../redux/features/UserAuthSlice';

const Navbar = ({handleTogglePopupOut,handleTogglePopup}) => {
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('search-field').blur()
    navigate(`/search/${searchTerm}`);
  };

  const startRecogniion = () => {
    dispatch(playPause(false));
    const audio1 = new Audio(start);
    audio1.play();

    document.getElementById('search-field').value = ''
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      console.log('Speech recognition started...');
    };

    recognition.onend = async function () {
      const audio2 = new Audio(end);
      await audio2.play();
      setSearchTerm(document.getElementById('search-field').value)
      if (document.getElementById('search-field').value !== '') {
        navigate(`/search/${document.getElementById('search-field').value}`);
      }
      console.log('Speech recognition ended.');

    };

    recognition.onresult = function (event) {
      const result = event.results[event.results.length - 1][0].transcript;
      setSearchTerm(result)
    };
    recognition.start();
    setTimeout(() => {
      recognition.stop();
    }, 5000);
  }

  return (
    <nav className="from-black to-[#121286] p-4 flex h-[60px] md:justify-between items-center mt-2 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to='/'>
            <button className="text-white text-xl mr-4 hidden sm:block">Home</button>
          </Link>
        </div>

      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="bg-[#0071d738] w-[80vw] md:w-[40vw] justify-between rounded-full flex items-center px-4 py-2">
          <div className='flex w-full items-center'>

            <FaSearch className="text-gray-300 mr-2" />
            <input
              autoComplete="off"
              id="search-field"
              type="search"
              className="bg-transparent w-full text-white outline-none placeholder-gray-500"
              placeholder="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <FaMicrophone onClick={startRecogniion} className="text-gray-300 ml-2 cursor-pointer" />
        </div>
      </form>
      <div className="flex items-center gap-8">
        {UserDetails?.name ? <button
        onClick={()=>{localStorage.setItem("token","");dispatch(setUserDetails({}));window.location.href = 'http://localhost:3000'}}
          className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 rounded hidden sm:block to-blue-500 text-white shadow hover:from-green-600 hover:to-blue-600 focus:outline-none transition-colors"
        >
          LogOut
        </button> : <>
          <button
            onClick={handleTogglePopup}
            className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 rounded hidden sm:block to-pink-500 text-white shadow hover:from-purple-600 hover:to-pink-600 focus:outline-none transition-colors">
            SignIn
          </button>
          <button
            onClick={handleTogglePopupOut}
            className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 rounded hidden sm:block to-blue-500 text-white shadow hover:from-green-600 hover:to-blue-600 focus:outline-none transition-colors">
            SignUp
          </button>
        </>}
      </div>
  
    </nav>
  );
};


export default Navbar;
