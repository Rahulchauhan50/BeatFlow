import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { MdMic } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import start from '../assets/start.mp3'
import end from '../assets/end.mp3'


const SearchBar = ({isActive, isplaying}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.getElementById('searchscroll').scrollIntoView();
    })

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('search-field').blur()
    navigate(`/search/${searchTerm}`);
  };

  const startRecogniion = () => {
    const audio1 = new Audio(start);
    audio1.play();

    document.getElementById('search-field').value=''
    const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = true; 

      recognition.onstart = function() {
        document.getElementsByTagName('audio')[0]?.pause();
        console.log('Speech recognition started...');
      };
      
      recognition.onend = async function() {
        const audio2 = new Audio(end);
        await audio2.play();
        setSearchTerm(document.getElementById('search-field').value)
        if(document.getElementById('search-field').value!==''){
          navigate(`/search/${document.getElementById('search-field').value}`);
        }
        console.log('Speech recognition ended.');
        audio2.onended = () => {
          if(isActive && isplaying){
            document.getElementsByTagName('audio')[0]?.play();
        }
      
        }

      };

      recognition.onresult = function(event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result)
        setSearchTerm(result)
      };
        recognition.start();
        setTimeout(() => {
          recognition.stop();
        },5000);
  }

   return <><span id='searchscroll'></span><form style={{padding:"0px", marginTop:"15px", border: "2px solid", backgroundColor: "#17035a00",position:'absolute'}} onSubmit={handleSubmit} autoComplete="off" className="flex flex-row z-10 md:w-6/12 bg-gradient-to-br from-black to-[#080836] w-full rounded-3xl md:border-none border-solid border-2 border-slate-600 mt-3 md:my-0 sm:py-2 mb-0 text-gray-400 focus-within:text-gray-600">
    <label  className="sr-only">
      Search all files
    </label>
    <div style={{height: "100%",backgroundColor: "#fdfdfd38",borderRadius: "15px 0px 0px 15px",borderRight: "1px solid"}} className="h-full flex flex-row md:py-0 justify-start items-center">
      <FiSearch style={{height: "100%",marginTop: "10px",marginBottom: "10px",marginRight: "10px"}} aria-hidden="true" className="w-6 h-6 ml-4" />
    </div>
    <div className="md:w-4/5 w-7/12 m-2 flex flex-row md:py-0 justify-start items-center">
      <input
        autoComplete="off"
        id="search-field"
        className="flex-1 bg-transparent pl-2 border-none placeholder-gray-500 text-xl outline-none text-white"
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
    <div onClick={startRecogniion} className="cursor-pointer h-full flex flex-row md:py-0 justify-end items-center">
      <MdMic style={{height: "100%",marginTop: "10px",marginBottom: "10px",marginRight: "10px"}} aria-hidden="true" className="w-6 h-6 ml-4" />
    </div>
  </form></>
}
export default SearchBar;