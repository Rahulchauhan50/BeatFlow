import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({PevNext,isplaying, SetShufflefun, data, currentIndex, totalResults, activeSong,handlePlayPauseClick, repeat, setLoop, shuffle, isdown}) => {
  return (
    <div className={`flex items-center ${isdown?'justify-around':"justify-between w-11/12"}  md:w-36 lg:w-52 2xl:w-80`}>
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={()=>{setLoop()}} className={`${isdown?'hidden ':"block w-7 h-7"} sm:block cursor-pointer`} />
      {<MdSkipPrevious onClick={()=>PevNext(currentIndex-1)} size={30} color="#FFF" className={`${data?.tracks[0]?.title===activeSong?'opacity-40 cursor-none':'cursor-pointer'} ${!isdown?'mx-auto w-14 h-14':""}`} />}
      {isplaying? (
        <BsFillPauseFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data?.tracks[currentIndex]?.title, data?.tracks[currentIndex]?.images?.coverart, data?.tracks[currentIndex]?.subtitle,data?.tracks[currentIndex]?.hub.actions[0].id+"",true)} className={`cursor-pointer ${!isdown?'w-14 h-16':""}`} />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={()=>handlePlayPauseClick(currentIndex, data?.tracks[currentIndex]?.title, data?.tracks[currentIndex]?.images?.coverart, data?.tracks[currentIndex]?.subtitle,data?.tracks[currentIndex]?.hub.actions[0].id+"",true)} className={`cursor-pointer ${!isdown?'w-14 h-16':""}`} />
      )}
      {<MdSkipNext onClick={()=>PevNext(currentIndex+1)} size={30} color="#FFF" className={`${data?.tracks[totalResults-1]?.title===activeSong?'opacity-40 cursor-none':'cursor-pointer'} ${!isdown?'mx-auto w-14 h-14':""}`}  />}
      <BsShuffle onClick={()=>{SetShufflefun()}} size= {20} color={shuffle ? 'red' : 'white'} className={`${isdown?'hidden':"block w-7 h-7"} sm:block cursor-pointer`} />
    </div>
  )
};

export default Controls;
