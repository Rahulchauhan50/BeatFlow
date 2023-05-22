import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({isplaying, SetShufflefun, data, currentIndex, totalResults, currentSongsId, activeSong,handlePlayPauseClick, repeat, setLoop, shuffle}) => {
  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={()=>{setLoop()}} className="hidden sm:block cursor-pointer" />
      {<MdSkipPrevious onClick={()=>handlePlayPauseClick(currentIndex === 0?0:currentIndex-1, data.tracks[currentIndex ===0 ?0:currentIndex-1].title, data.tracks[currentIndex ===0?0:currentIndex-1].images.coverart, data.tracks[currentIndex ===0?0:currentIndex-1].subtitle,data.tracks[currentIndex ===0?0:currentIndex-1].hub.actions[0].id+"")} size={30} color="#FFF" className={`${data.tracks[0].title===activeSong?'opacity-40 cursor-none':'cursor-pointer'}`} />}
      {isplaying? (
        <BsFillPauseFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data.tracks[currentIndex].title, data.tracks[currentIndex].images.coverart, data.tracks[currentIndex].subtitle,data.tracks[currentIndex].hub.actions[0].id+"")} className="cursor-pointer" />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data.tracks[currentIndex].title, data.tracks[currentIndex].images.coverart, data.tracks[currentIndex].subtitle,data.tracks[currentIndex].hub.actions[0].id+"")} className="cursor-pointer" />
      )}
      {<MdSkipNext onClick={()=>handlePlayPauseClick(currentIndex ===totalResults-1?0:currentIndex+1, data.tracks[currentIndex ===totalResults-1?0:currentIndex+1].title, data.tracks[currentIndex ===totalResults-1?0:currentIndex+1].images.coverart, data.tracks[currentIndex ===totalResults-1?0:currentIndex+1].subtitle,data.tracks[currentIndex ===totalResults-1?0:currentIndex+1].hub.actions[0].id+"")} size={30} color="#FFF" className={`${data.tracks[totalResults-1].title===activeSong?'opacity-40 cursor-none':'cursor-pointer'}`}  />}
      <BsShuffle onClick={()=>{SetShufflefun()}} size= {20} color={shuffle ? 'red' : 'white'} className="hidden sm:block cursor-pointer" />
    </div>
  )
};

export default Controls;
