import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import Controls from './Controls';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import Player from '../MusicPlayer/Player'

const MusicPlayer = ({ fullsong, up ,down, isdown, SetPause,isplaying, subtitle, coverart, duration ,totalResults, handlePlayPauseClick, currentSongsId, currentIndex, isActive, activeSong, data}) => {
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const volumechange = (event) => {
    setVolume(event.target.value)
    document.getElementById(currentSongsId).volume = volume;
  }

  try{
    document.getElementById(currentSongsId).ontimeupdate = () => {
     try{ setAppTime(document.getElementById(currentSongsId).currentTime)}
     catch{}
    }
  }catch{}

  const changeAppTime = (event) =>{
    setAppTime(event.target.value)
    document.getElementById(currentSongsId).currentTime = appTime;
  }

  const Seek = (val) => {
    if(val){
      if(document.getElementById(currentSongsId).currentTime === duration-6){
        return
      }
      document.getElementById(currentSongsId).currentTime = appTime+5;
    }
    else{
      if(document.getElementById(currentSongsId).currentTime < 6){
        return
      }
      document.getElementById(currentSongsId).currentTime = appTime-5;
    }
  }

  try{
    document.getElementById(currentSongsId).onended = () => {
      SetPause();
      if(shuffle){

        if(document.getElementsByTagName('audio')[0].getAttribute('track') === 'discover'){
          document.querySelector(`[trackforclick='discover-${currentIndex+1}']`)?.click();
        }
        else if(document.getElementsByTagName('audio')[0].getAttribute('track') === 'Aroundyou'){
          document.querySelector(`[trackforclick='Aroundyou-${currentIndex+1}']`)?.click();
        }
        else if(document.getElementsByTagName('audio')[0].getAttribute('track') === 'SongDetails'){
          document.querySelector(`[trackforclick='SongDetails-${currentIndex+1}']`)?.click();
        }
        else if(document.getElementsByTagName('audio')[0].getAttribute('track') === 'ArtistDetails'){
          document.querySelector(`[trackforclick='ArtistDetails-${currentIndex+1}']`)?.click();
        }
      }
  }
  }catch{}

  const setLoop = () => {
    setShuffle(false);
    if(repeat === true){
        setRepeat(false)
        document.getElementsByTagName('audio')[0].loop = false;
      }else if(repeat === false){
        setRepeat(true);
        document.getElementsByTagName('audio')[0].loop = true;
      }
    }
  

  const SetShufflefun = async () => {
    setRepeat(false)
    document.getElementsByTagName('audio')[0].loop = false;
    if(shuffle===true){
       setShuffle(false);
    }
    else{
      setShuffle(true);
    }
  }

  
  return (<>
    <div style={{position:"fixed"}} className="absolute h-20 bottom-0 left-0 right-0 flex bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isplaying={isplaying} subtitle={subtitle} coverart={coverart} currentSongsId={currentSongsId} activeSong={activeSong} isActive={isActive}  />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          handlePlayPauseClick={handlePlayPauseClick}
          currentSongsId={currentSongsId}
          totalResults={totalResults}
          data={data}
          activeSong={activeSong}
          currentIndex={currentIndex}
          setLoop={setLoop}
          SetShufflefun={SetShufflefun}
          isplaying={isplaying}
          isdown={isdown}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => changeAppTime(event)}
          Seek={Seek}
          isdown={isdown}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => {volumechange(event)} }/>
      <div className='absolute md:hidden block top-6 right-3 z-50'>
      {isdown?(<FaAngleUp onClick={()=>up()} className='w-6 h-6 text-white mr-2'/>):(<FaAngleDown onClick={()=>down()} className='w-6 h-6 text-white mr-2'/>)}
      </div>
    </div>
    
    </div>
    <div className={`absolute botton-0 w-screen h-full bg-gradient-to-tl from-white/10 to-[#281a81] backdrop-blur-xl z-10 p-6 transition-all duration-500 md:hidden ${!isdown?'bottom-0':'-bottom-full'}`}>
    <Player fullsong={fullsong} appTime={appTime} changeAppTime={changeAppTime} Seek={Seek} repeat={repeat}  setRepeat={setRepeat}  setLoop={setLoop} shuffle={shuffle} SetShufflefun={SetShufflefun} up={up} down={down} isdown={isdown} SetPause={SetPause} isplaying={isplaying} subtitle={subtitle} coverart={coverart} duration={duration} totalResults={data.tracks.length} handlePlayPauseClick={handlePlayPauseClick} activeSong={activeSong} currentSongsId={currentSongsId} currentIndex={currentIndex} isActive={isActive} data={data} />
    </div>
    </>
  );
};

export default MusicPlayer;
