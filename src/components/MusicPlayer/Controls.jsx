import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({isplaying, SetShufflefun, data, currentIndex, totalResults, currentSongsId, activeSong,handlePlayPauseClick, repeat, setLoop, shuffle, isdown}) => {
  return (
    <div className={`flex items-center ${isdown?'justify-around':"justify-between w-11/12"}  md:w-36 lg:w-52 2xl:w-80`}>
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={()=>{setLoop()}} className={`${isdown?'hidden ':"block w-7 h-7"} sm:block cursor-pointer`} />
      {<MdSkipPrevious onClick={()=>handlePlayPauseClick(currentIndex === 0?0:currentIndex-1, data?.tracks[currentIndex ===0 ?0:currentIndex-1]?.title, data?.tracks[currentIndex ===0?0:currentIndex-1]?.images?.coverart, data?.tracks[currentIndex ===0?0:currentIndex-1]?.subtitle,data?.tracks[currentIndex ===0?0:currentIndex-1]?.hub.actions[0].id+"")} size={30} color="#FFF" className={`${data?.tracks[0]?.title===activeSong?'opacity-40 cursor-none':'cursor-pointer'} ${!isdown?'mx-auto w-14 h-14':""}`} />}
      {isplaying? (
        <BsFillPauseFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data?.tracks[currentIndex]?.title, data?.tracks[currentIndex]?.images?.coverart, data?.tracks[currentIndex]?.subtitle,data?.tracks[currentIndex]?.hub.actions[0].id+"",true)} className={`cursor-pointer ${!isdown?'w-14 h-16':""}`} />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data?.tracks[currentIndex]?.title, data?.tracks[currentIndex]?.images?.coverart, data?.tracks[currentIndex]?.subtitle,data?.tracks[currentIndex]?.hub.actions[0].id+"",true)} className={`cursor-pointer ${!isdown?'w-14 h-16':""}`} />
      )}
      {<MdSkipNext onClick={()=>handlePlayPauseClick(currentIndex ===totalResults-1?0:currentIndex+1, data?.tracks[currentIndex ===totalResults-1?0:currentIndex+1]?.title, data?.tracks[currentIndex ===totalResults-1?0:currentIndex+1]?.images?.coverart, data?.tracks[currentIndex ===totalResults-1?0:currentIndex+1]?.subtitle,data?.tracks[currentIndex ===totalResults-1?0:currentIndex+1]?.hub.actions[0].id+"")} size={30} color="#FFF" className={`${data?.tracks[totalResults-1]?.title===activeSong?'opacity-40 cursor-none':'cursor-pointer'} ${!isdown?'mx-auto w-14 h-14':""}`}  />}
      <BsShuffle onClick={()=>{SetShufflefun()}} size= {20} color={shuffle ? 'red' : 'white'} className={`${isdown?'hidden':"block w-7 h-7"} sm:block cursor-pointer`} />
    </div>
  )
};

export default Controls;
