import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {

  return (  isPlaying && activeSong?.title === song?.title && activeSong?.subtitle === song?.subtitle && activeSong?.attributes?.name === song?.attributes?.name && activeSong?.attributes?.albumName === song?.attributes?.albumName ? 
  <FaPauseCircle
    size={35}
    className="text-gray-300 cursor-pointer"
    onClick={handlePause}
  />
  : 
  <FaPlayCircle
    size={35}
    className="text-gray-300 cursor-pointer"
    onClick={handlePlay}
  />
  )
}


export default PlayPause;