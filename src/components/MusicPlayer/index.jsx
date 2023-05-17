import React, { useState } from 'react';

import Controls from './Controls';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = ({subtitle, coverart, duration ,totalResults, handlePlayPauseClick, currentSongsId, currentIndex, isActive, activeSong, data}) => {
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const volumechange = (event) => {
    setVolume(event.target.value)
    document.getElementById(currentSongsId).volume = volume;
  }

  document.getElementById(currentSongsId).ontimeupdate = () => {
    setAppTime(document.getElementById(currentSongsId).currentTime)
  }

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

  
    document.getElementById(currentSongsId).onended = () => {
      if(currentIndex < totalResults-1 && shuffle){

        handlePlayPauseClick(currentIndex+1, data.tracks[currentIndex+1].title, data.tracks[currentIndex+1].images.coverart, data.tracks[currentIndex+1].subtitle,data.tracks[currentIndex+1].hub.actions[0].id)
      }
    }


  const setLoop = () => {
    if(document.getElementById(currentSongsId).loop){
      document.getElementById(currentSongsId).loop = false;
      setRepeat(false)
    }
    else{
      document.getElementById(currentSongsId).loop = true;
      setRepeat(true);
      setShuffle(false);
    }
  }

  const SetShufflefun = async () => {
    if(shuffle===true){
       setShuffle(false);
    }
    else{
      setShuffle(true)
      setLoop(false);
    }
  }

  
  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track subtitle={subtitle} coverart={coverart} currentSongsId={currentSongsId} activeSong={activeSong} isActive={isActive}  />
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
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => changeAppTime(event)}
          Seek={Seek}
        />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => {volumechange(event)} }/>
    </div>
  );
};

export default MusicPlayer;
