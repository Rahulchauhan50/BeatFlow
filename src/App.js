
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Discover from './components/Discover';
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopPlay from './components/TopPlay';
import MusicPlayer from "./components/MusicPlayer";
import React, { useEffect } from 'react'


function App() {

  const [mobileMenuOpen,SetMobileMenuOpen] =useState(false)
  
  const [activeSong,setActiveSong] = useState(false)
  const [activeSongAllDetails,setActiveSongAllDetails] = useState(false)
  const [currentSongsId,setcurrentSongsId] = useState([])
  const [currentIndex,setCurrentIndex] = useState(0)
  const [isActive,setisActive] = useState(false)
  const [isPlaying,setisPlaying] = useState(false)
  const [totalResults, setTotalResults] = useState("rahul");
  const [PreviousSongId, setPreviousSongId] = useState(null);
  const [duration, setDuration] = useState(0);


  const [data, setData] = useState({
    'tracks':[]
  })
  const [isFetching,setFetching] = useState(false)

  const FetchData = async () => {
    setFetching(true)
    let headersList = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "c03877c933msh90c5aaf3de4f477p10c783jsnea909cae5029",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com"
     }
     
     let response = await fetch("https://shazam.p.rapidapi.com/charts/track", { 
       method: "GET",
       headers: headersList
     });
     
     const tempdata = await response.json();
     setData(await tempdata)
     setFetching(false);
     setTotalResults(tempdata.tracks.length);
  }

  useEffect(() => {
    window.scrollTo(0,0);
    FetchData();
  }, [])
  
  const open = () => {
    SetMobileMenuOpen(true);
  }
  const close = () => {
    SetMobileMenuOpen(false);
  }

  const handlePlayPauseClick = async (songName,code) =>{
    setisActive(true);
    setActiveSong(songName[code].title)
    setActiveSongAllDetails(songName[code])
    setCurrentIndex(code)
    setcurrentSongsId(songName[code].hub.actions[0].id+"")
    setDuration(document.getElementById(songName[code].hub.actions[0].id+"").duration)
      if(document.getElementById(songName[code].hub.actions[0].id+"").paused){
        if(PreviousSongId !== null && !document.getElementById(PreviousSongId).paused){
          await document.getElementById(PreviousSongId).pause();
        }

        await document.getElementById(songName[code].hub.actions[0].id+"").play();
        setisPlaying(true)
        setPreviousSongId(songName[code].hub.actions[0].id+"");
      }
      else{
        await document.getElementById(songName[code].hub.actions[0].id+"").pause();
      }
  }
  return (
    <Router>
      <div className="relative flex h-full wifull">
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">

        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route exact path="/" element={<Discover activeSongAllDetails={activeSongAllDetails} handlePlayPauseClick={handlePlayPauseClick} isPlaying={isPlaying} activeSong={activeSong} data={data} isFetching={isFetching} isActive={isActive}/>} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
          <TopPlay data={data} activeSong={activeSong} handlePlayPauseClick={handlePlayPauseClick} />          
          </div>
        </div>
      </div>
      {isActive && (
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer duration={duration} totalResults={totalResults} handlePlayPauseClick={handlePlayPauseClick} activeSongAllDetails={activeSongAllDetails} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />
        </div>
      )}    </div>
    </Router>
  );
}

export default App;
