import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({data,currentIndex, totalResults, activeSongAllDetails, handlePlayPauseClick, isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    {<MdSkipPrevious onClick={()=>handlePlayPauseClick(data.tracks,currentIndex ===0?0:currentIndex-1)} size={30} color="#FFF" className={`${data.tracks[0].title===activeSongAllDetails.title?'opacity-40 cursor-none':'cursor-pointer'}`} />}
    {isPlaying ? (
      <BsFillPauseFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(data.tracks,currentIndex)} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(data.tracks,currentIndex)} className="cursor-pointer" />
    )}
    {<MdSkipNext onClick={()=>handlePlayPauseClick(data.tracks,currentIndex ===totalResults-1?0:currentIndex+1)} size={30} color="#FFF" className={`${data.tracks[totalResults-1].title===activeSongAllDetails.title?'opacity-40 cursor-none':'cursor-pointer'}`}  />}
    <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
  </div>
);

export default Controls;
