import React, { useState, useEffect } from 'react';

import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { RiClosedCaptioningLine } from 'react-icons/ri';

const MusicPlayer = ({ totalResults, handlePlayPauseClick, activeSong, activeSongAllDetails, currentSongsId, currentIndex, isActive, isPlaying, data}) => {
  const [duration, setDuration] = useState(document.getElementById(currentSongsId).duration);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const volumechange = () => {
    document.getElementById(currentSongsId).volume = volume;
  }

  document.getElementById(currentSongsId).ontimeupdate = () => {
    setAppTime(document.getElementById(currentSongsId).currentTime)
  }

  const changeAppTime = () =>{
    console.log("yyt")
  }

  
  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track activeSongAllDetails={activeSongAllDetails} isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          handlePlayPauseClick={handlePlayPauseClick}
          activeSongAllDetails={activeSongAllDetails}
          totalResults={totalResults}
          data={data}
          currentIndex={currentIndex}

        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onChange={() => changeAppTime()}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
        />
      </div>
      <VolumeBar currentSongsId={currentSongsId} value={volume} min="0" max="1" onChange={(event) => {setVolume(event.target.value),volumechange()}} />
    </div>
  );
};

export default MusicPlayer;
