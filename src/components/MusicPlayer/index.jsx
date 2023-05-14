import React, { useState } from 'react';

import Controls from './Controls';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = ({duration ,totalResults, handlePlayPauseClick, activeSongAllDetails, currentSongsId, currentIndex, isActive, isPlaying, data}) => {
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
        console.log("rahhu")

        handlePlayPauseClick(data.tracks,currentIndex+1)
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
      <Track activeSongAllDetails={activeSongAllDetails} isActive={isActive}  />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          handlePlayPauseClick={handlePlayPauseClick}
          activeSongAllDetails={activeSongAllDetails}
          totalResults={totalResults}
          data={data}
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
