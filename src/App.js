import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Discover from './pages/Discover';
import SongDetails from "./pages/SongDetails";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar"
import TopPlay from './components/TopPlay'
import MusicPlayer from "./components/MusicPlayer"
import ArtistDetails from './pages/ArtistDetails'
import {dataAroundYou} from './assets/AroundyouData'
import TopArtist from './pages/TopArtist'
import Search from './pages/Search'
import SearchBar from "./components/SearchBar";
import Error from "./components/Error";
import Footer from "./components/Footer";
import CustomLoadingBar from "./LoadingBar";

 
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
  const [isdown, setisdown] = useState(true)
  const [fullsong, setfullsong] = useState('')
  const [Progress, setProgress] = useState(0)

  const settingAroundYou = (val) => setIsArondyou(val)
  const SetPause = () => setisPlaying(false);
  const open = () => SetMobileMenuOpen(true)
  const close = () => SetMobileMenuOpen(false)
  const up = () => setisdown(false);
  const down = () => setisdown(true);
  const [keyArray,setKeyarray] = useState(JSON.parse(process.env.REACT_APP_SPOTIFY_API.replace(/'/g, '"')))

  const FetchData = async (fetchkeyId,currentIndex) => {
    try {
      setProgressing(10)
      setFetching(true);
      document.getElementById('loader');
      const headersList = {
        "Accept": "*/*",
        "X-RapidAPI-Key": fetchkeyId,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com"
      };
      setProgressing(30)
      const response = await fetch("https://shazam.p.rapidapi.com/charts/track", {
        method: "GET",
        headers: headersList
      });
      setProgressing(70)
  
      const tempdata = await response.json();
      if (
        tempdata.message === "You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/apidojo/api/shazam" ||
        tempdata.message === "You have exceeded the rate limit per second for your plan, BASIC, by the API provider"
      ) {
        if (currentIndex < keyArray.length - 1) {
          FetchData(keyArray[currentIndex + 1],currentIndex + 1); 
          console.log(keyArray[currentIndex + 1])
        } else {
          setFetching(false);
          return <Error/>
        }
      } else {
        setData(tempdata);
        setFetching(false);
        localStorage.setItem('fetchKey',keyArray[currentIndex])
        setProgressing(100)
      }
      } catch (error) {
      setFetching(false);
      console.error(error);
      setProgressing(100)
    }
  };

  useEffect(() => {
    if(IsArondyou){
      setData(dataAroundYou)
    }
    else{
      FetchData(keyArray[0],0);
    }
  },[IsArondyou])

  const handlePlayPauseClick = async (code,title,coverart,subtitle,songcurid,current,fullsong) =>{
    if(current){
      if(document.getElementsByTagName('audio')[0]?.paused){
        document.getElementsByTagName('audio')[0]?.play()
        setisPlaying(true);
        return
      }else if(document.getElementsByTagName('audio')[0]?.played)
      document.getElementsByTagName('audio')[0]?.pause();
      setisPlaying(false)
      return
    }
    
    try{ 
      setDuration(document.getElementById(songcurid)?.duration)
      setisActive(true);
      setActiveSong(title)
      document.title = title+" - "+subtitle
      setCurrentIndex(code)
    if(songcurid !== currentSongsId){
      setisPlaying(true)
      document.getElementById('audioStack').innerHTML = document.getElementById(songcurid)?.outerHTML;
      document.getElementsByTagName('audio')[0]?.play()
      setfullsong(fullsong)
      setPreviousSongId(songcurid)
      setcurrentSongsId(songcurid)
      setcoverart(coverart)
      setsubtitle(subtitle)
      return
      }
      
    }
    catch{}
    try{
    setcurrentSongsId(songcurid)
    setcoverart(coverart)
    setsubtitle(subtitle)
      if(document.getElementsByTagName('audio')[0]?.paused){
        if(PreviousSongId !== null && document.getElementById(PreviousSongId).played){
          await document.getElementById(PreviousSongId)?.pause()
        }
        setisPlaying(true)
        await document.getElementsByTagName('audio')[0]?.play()
        setPreviousSongId(songcurid);
      }
      else{
        if(document.getElementById(songcurid)?.played){
          setisPlaying(false);
          await document.getElementById(songcurid)?.pause();
        }
      }
    }catch{}
  }

  const setProgressing = (val) => {
    setProgress(val)
  }

  return (
    <Router>
      <CustomLoadingBar progress={Progress} />

      <div className="relative flex h-screen">
        <span className="hidden" id="audioStack"></span>
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <SearchBar/>
        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-78px)] md:h-[calc(100vh-0px)] overflow-y-scroll flex xl:flex-row flex-col-reverse">
          <div  className="flex-1 h-fit pb-40">
          <span style={{display:"none"}} id='forScroll'></span>
            <Routes>
              <Route exact path="/" element={<Discover bundle='discover' IsArondyou={IsArondyou} page='Discover' subtitle={subtitle} settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/songs/:songid/:id" element={<SongDetails setProgressing={setProgressing} otherBundle='SongDetails' subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/artists/:Artistid" element={<ArtistDetails setProgressing={setProgressing} otherBundle='ArtistDetails' subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/:Around" element={<Discover bundle='Aroundyou' IsArondyou={IsArondyou} subtitle={subtitle} settingAroundYou={settingAroundYou} page='Around You' handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/top-artists" element={<TopArtist isTopArtisPage={true} page='Top artists' data={data?.tracks} isFetching={isFetching}/>} />
              <Route exact path="/search/:searchTerm" element={<Search setProgressing={setProgressing} subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/top-charts" element={<Discover bundle='discover' IsArondyou={IsArondyou} subtitle={subtitle} page='Top Charts' settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
            </Routes>
              <Footer/>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
          {!isFetching? <TopPlay subtitle={subtitle} data={data} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick}/>:""}
          </div>
        </div>
      </div>
      {isActive && (<MusicPlayer fullsong={fullsong} up={up} down={down} isdown={isdown} SetPause={SetPause} isplaying={isplaying} subtitle={subtitle} coverart={coverart} duration={duration} totalResults={data?.tracks?.length} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />)}
      </div>

      
    </Router>
  );
}

export default App;