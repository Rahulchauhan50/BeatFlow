
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
  const [currentSongId, setcurrentSongId] = useState(null)
  const [totalResults, setTotalResults] = useState("rahul");

  const [data, setData] = useState({
    'tracks':[]
  })
  const [isFetching,setFetching] = useState(false)

  const FetchData = async () => {
    setFetching(true)
    let headersList = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "20c4e48d72mshbee9068ae953622p1afd26jsn77cded2b481d",
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
  const handlePlayPauseClick = (songName,code) =>{
    setisActive(true)
    setActiveSongAllDetails(songName[code])
    console.log(data)
    setCurrentIndex(code)
    setcurrentSongsId(songName[code].hub.actions[0].id+"")
    if(activeSong===songName[code].title){

      if(isPlaying===true){
        setisPlaying(false)
        document.getElementById(songName[code].hub.actions[0].id+"").pause();
      }
      else{
        setisPlaying(true)
        document.getElementById(songName[code].hub.actions[0].id+"").play();
      }
    }
    else{
      if(currentSongId !== null){ document.getElementById(currentSongId).pause()}
      setcurrentSongId(songName[code].hub.actions[0].id+"");
      setActiveSong(songName[code].title)
      setisPlaying(true)
      document.getElementById(songName[code].hub.actions[0].id+"").play();

    }
  }
  return (
    <Router>
      <div className="relative flex h-full">
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">

        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route exact path="/" element={<Discover  handlePlayPauseClick={handlePlayPauseClick} isPlaying={isPlaying} activeSong={activeSong} data={data} isFetching={isFetching} isActive={isActive}/>} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay/>
          </div>
        </div>
      </div>
      {activeSong && (
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer totalResults={totalResults} handlePlayPauseClick={handlePlayPauseClick} activeSongAllDetails={activeSongAllDetails} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} isPlaying={isPlaying} data={data} />
        </div>
      )}    </div>
    </Router>
  );
}

export default App;
