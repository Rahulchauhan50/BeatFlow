import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Discover from './pages/Discover';
import SongDetails from "./pages/SongDetails";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopPlay from './components/TopPlay';
import MusicPlayer from "./components/MusicPlayer";
import React, { useEffect } from 'react'
import ArtistDetails from './pages/ArtistDetails'

function App() {

  const [mobileMenuOpen,SetMobileMenuOpen] =useState(false)
  
  const [activeSong,setActiveSong] = useState(false)
  const [currentSongsId,setcurrentSongsId] = useState([])
  const [currentIndex,setCurrentIndex] = useState(0)
  const [isActive,setisActive] = useState(false)
  const [isPlaying,setisPlaying] = useState(false)
  const [totalResults, setTotalResults] = useState("rahul");
  const [PreviousSongId, setPreviousSongId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [coverart, setcoverart] = useState(0);
  const [subtitle, setsubtitle] = useState(0);
  const [isFetching,setFetching] = useState(false)


  const [data, setData] = useState({
    'tracks':[]
  })

  const FetchData = async () => {
    setFetching(true)
    let headersList = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "c5c5b07b9emshf9ccbf3f47591ebp1b50e8jsncb9c3c1cb128",
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
    FetchData();
  }, [])
  
  const open = () => {
    SetMobileMenuOpen(true);
  }
  const close = () => {
    SetMobileMenuOpen(false);
  }

  const handlePlayPauseClick = async (code,title,coverart,subtitle,songcurid) =>{
    setisActive(true);
    setActiveSong(title)
    setCurrentIndex(code)
    console.log("currentSongsId", currentSongsId,"    ",activeSong)
    console.log("songcurid",songcurid)
    if(songcurid !== currentSongsId){
      document.getElementById('audioStack').innerHTML = document.getElementById(songcurid).outerHTML;
      document.getElementsByTagName('audio')[0].play()
      setcurrentSongsId(songcurid)
      setcoverart(coverart)
      setsubtitle(subtitle)
      setDuration(document.getElementById(songcurid).duration)
      return
    }
    setcurrentSongsId(songcurid)
    setcoverart(coverart)
    setsubtitle(subtitle)
    setDuration(document.getElementById(songcurid).duration)
      if(document.getElementsByTagName('audio')[0].paused){
        if(PreviousSongId !== null && !document.getElementById(PreviousSongId)?.paused){
          await document.getElementById(PreviousSongId).pause();
        }

        await document.getElementsByTagName('audio')[0].play();
        setisPlaying(true)
        setPreviousSongId(songcurid);
      }
      else{
        await document.getElementById(songcurid).pause();
      }
  }

  return (
    <Router>
      <div className="relative flex h-full">
        <span id="audioStack"></span>
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">

        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-100px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div  className="flex-1 h-fit pb-40">
            <Routes>
              <Route exact path="/" element={<Discover handlePlayPauseClick={handlePlayPauseClick} isPlaying={isPlaying} activeSong={activeSong} data={data} isFetching={isFetching} isActive={isActive}/>} />
              <Route exact path="/songs/:songid/:id" activeSong={activeSong} element={<SongDetails handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/artists/:Artistid" activeSong={activeSong} element={<ArtistDetails handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
          {!isFetching? <TopPlay data={data} activeSong={activeSong} handlePlayPauseClick={handlePlayPauseClick}/>:""}
          </div>
        </div>
      </div>
      {isActive && (
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer subtitle={subtitle} coverart={coverart} duration={duration} totalResults={totalResults} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />
        </div>
      )}    </div>
    </Router>
  );
}

export default App;
