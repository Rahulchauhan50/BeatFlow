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
import Player from './components/MusicPlayer/Player'
 
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

  const settingAroundYou = (val) => setIsArondyou(val)
  const SetPause = () => setisPlaying(false);
  const open = () => SetMobileMenuOpen(true)
  const close = () => SetMobileMenuOpen(false)
  const up = () => setisdown(false);
  const down = () => setisdown(true);
  const [keyArray,setKeyarray] = useState(['a92656fe72msh8502130dc98777ap1170fajsn2d09a0dbc7d2','30d0cc0ea5msh71416a73da8a666p1d918ejsn8cf27734f5a7','c5c5b07b9emshf9ccbf3f47591ebp1b50e8jsncb9c3c1cb128','358f24585amshdab4c33f79b82ccp1545fajsn85e8c0ec5804','20c4e48d72mshbee9068ae953622p1afd26jsn77cded2b481d','c03877c933msh90c5aaf3de4f477p10c783jsnea909cae5029','5bd2e9a45fmsh64501b1bb6127b9p15b4f5jsn7eb975aae73d','fbbd2ad3a3msh6e1c77ddece80d5p160a98jsn6bfee9489732','23d4a35959msh574c51f2ebe033cp1c47cdjsne230ae678948','8ced1fc315msh9cd32a155a7668ep1de176jsn566f12ef3bee','9a8431f43bmsh8299b6bd5d5d59cp193902jsne54d9313062f'])

  const FetchData = async (fetchkeyId,currentIndex) => {
    try {
      setFetching(true);
      document.getElementById('loader');
      const headersList = {
        "Accept": "*/*",
        "X-RapidAPI-Key": fetchkeyId,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com"
      };
      const response = await fetch("https://shazam.p.rapidapi.com/charts/track", {
        method: "GET",
        headers: headersList
      });
  
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
      }
      } catch (error) {
      setFetching(false);
      console.error(error);
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

  return (
    <Router>
      <div className="relative flex h-screen">
        <span className="hidden" id="audioStack"></span>
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <SearchBar/>
        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-78px)] md:h-[calc(100vh-0px)] overflow-y-scroll flex xl:flex-row flex-col-reverse">
          <div  className="flex-1 h-fit pb-40">
            <Routes>
              <Route exact path="/" element={<Discover IsArondyou={IsArondyou} page='Discover' subtitle={subtitle} settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/songs/:songid/:id" element={<SongDetails subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/artists/:Artistid" element={<ArtistDetails subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/:Around" element={<Discover IsArondyou={IsArondyou} subtitle={subtitle} settingAroundYou={settingAroundYou} page='Around You' handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/top-artists" element={<TopArtist isTopArtisPage={true} page='Top artists' data={data?.tracks} isFetching={isFetching}/>} />
              <Route path="/search/:searchTerm" element={<Search subtitle={subtitle} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick} data={data.tracks}/>} />
              <Route exact path="/top-charts" element={<Discover IsArondyou={IsArondyou} subtitle={subtitle} page='Top Charts' settingAroundYou={settingAroundYou} handlePlayPauseClick={handlePlayPauseClick} isplaying={isplaying} activeSong={activeSong} data={data} isFetching={isFetching}/>} />
              <Route exact path="/player" element={<Player SetPause={SetPause} isplaying={isplaying} subtitle={subtitle} coverart={coverart} duration={duration} totalResults={data?.tracks?.length} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />} />
            </Routes>
              <Footer/>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
          {!isFetching? <TopPlay subtitle={subtitle} data={data} activeSong={activeSong} isplaying={isplaying} handlePlayPauseClick={handlePlayPauseClick}/>:""}
          </div>
        </div>
      </div>
      {isActive && (<MusicPlayer fullsong={fullsong} up={up} down={down} isdown={isdown} SetPause={SetPause} isplaying={isplaying} subtitle={subtitle} coverart={coverart} duration={duration} totalResults={data?.tracks?.length} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />
      
      )}</div>
      
    </Router>
  );
}

export default App;