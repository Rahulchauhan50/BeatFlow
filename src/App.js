import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Discover from './pages/Discover';
import SongDetails from "./pages/SongDetails";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopPlay from './components/TopPlay';
import MusicPlayer from "./components/MusicPlayer";
import React, { useEffect } from 'react'
import ArtistDetails from './pages/ArtistDetails'
import {dataAroundYou} from './assets/AroundyouData'
import TopArtist from './pages/TopArtist'
import Search from './pages/Search'
import SearchBar from "./components/SearchBar";
 
function App() {

  const [mobileMenuOpen,SetMobileMenuOpen] =useState(false)
  const [activeSong,setActiveSong] = useState(false)
  const [isplaying,setisPlaying] = useState(false)
  const [currentSongsId,setcurrentSongsId] = useState([])
  const [currentIndex,setCurrentIndex] = useState(0)
  const [isActive,setisActive] = useState(false)
  const [PreviousSongId, setPreviousSongId] = useState(null);
  const [duration, setDuration] = useState(90);
  const [coverart, setcoverart] = useState(0);
  const [subtitle, setsubtitle] = useState(0);
  const [isFetching,setFetching] = useState(false)
  const [IsArondyou,setIsArondyou] = useState(false)
  const [data, setData] = useState({'tracks':[]})

  const settingAroundYou = (val) => {setIsArondyou(val)}

  const SetPause = () => {
    setisPlaying(false);
  }

  const FetchData = async () => {
    setFetching(true)
    let headersList = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "fbbd2ad3a3msh6e1c77ddece80d5p160a98jsn6bfee9489732",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com"
     }
     
     let response = await fetch("https://shazam.p.rapidapi.com/charts/track", { 
       method: "GET",
       headers: headersList
     });
     
     const tempdata = await response.json();
     setData(await tempdata)
     setFetching(false);
  }

  useEffect(() => {
    if(IsArondyou){
      setData(dataAroundYou)
    }
    else{
      FetchData()
    }
  
  }, [IsArondyou])
  
  const open = () => {
    SetMobileMenuOpen(true);
  }

  const close = () => {
    SetMobileMenuOpen(false);
  }

  const handlePlayPauseClick = async (code,title,coverart,subtitle,songcurid) =>{
    setDuration(document.getElementById(songcurid)?.duration)
    setisActive(true);
    setActiveSong(title)
    setCurrentIndex(code)
    if(songcurid !== currentSongsId){
      setisPlaying(true)
      document.getElementById('audioStack').innerHTML = document.getElementById(songcurid).outerHTML;
      document.getElementsByTagName('audio')[0]?.play()
      setcurrentSongsId(songcurid)
      setcoverart(coverart)
      setsubtitle(subtitle)
      return
    }
    setcurrentSongsId(songcurid)
    setcoverart(coverart)
    setsubtitle(subtitle)
      if(document.getElementsByTagName('audio')[0]?.paused){
        if(PreviousSongId !== null && !document.getElementById(PreviousSongId)?.paused){
          await document.getElementById(PreviousSongId)?.pause();
        }
        setisPlaying(true)
        await document.getElementsByTagName('audio')[0]?.play();
        setPreviousSongId(songcurid);
      }
      else{
        setisPlaying(false);
        await document.getElementById(songcurid)?.pause();
      }
  }

  return (
    <Router>
      <div id="forScroll1" className="relative flex h-full">
        <span id="audioStack"></span>
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <SearchBar/>
        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-78px)] md:h-[calc(100vh-0px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div  className="flex-1 h-fit pb-40">
            <span id='forScroll'></span>
            <Routes>
              <Route exact path="/" element={<Discover page='Discover' settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/songs/:songid/:id" element={<SongDetails activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/artists/:Artistid" element={<ArtistDetails activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/:Around" element={<Discover settingAroundYou={settingAroundYou} page='Around You' handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/top-artists" element={<TopArtist isTopArtisPage={true} page='Top artists' data={data?.tracks} isFetching={isFetching}/>} />
              <Route path="/search/:searchTerm" element={<Search activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/top-charts" element={<Discover page='Top Charts' settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
          {!isFetching? <TopPlay data={data} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick}/>:""}
          </div>
        </div>
      </div>
      {isActive && (
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer SetPause={SetPause} isplaying={isplaying} subtitle={subtitle} coverart={coverart} duration={duration} totalResults={data.tracks.length} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />
        </div>
      )}</div>
    </Router>
  );
}

export default App;
