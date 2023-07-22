import React from 'react';
import {useEffect} from "react";


const Track = ({mobilePlayerOpen,changePlayer, isPlaying, isActive, activeSong }) => {
  useEffect(() => {
    if(isPlaying && isActive){
     document.getElementById('myMarquee')?.start();
    }else{
     document.getElementById('myMarquee')?.stop()
    }
  },[isPlaying, isActive, mobilePlayerOpen])
  
  return <div onClick={window.innerWidth<768 ?changePlayer:()=>{}} className="flex-1 flex-col md:flex-row md:flex items-center justify-start">
    {mobilePlayerOpen && 
    <>
      <div className='w-[80vw] top-[18%] relative text-white'>
      <marquee id='myMarquee' className="text-3xl font-bold text-center" direction="left" behavior="scroll" hspace="50">
        
      {activeSong?.title?.length > 15 ? activeSong?.title?.slice(0,15)+"..." : ""}
        {activeSong?.title?.length <= 15 ?activeSong?.title : ""}
        {activeSong?.attributes?.name?.length > 15 ?activeSong?.attributes?.name.slice(0,15) : ""}
        {activeSong?.attributes?.name?.length <= 15 ?activeSong?.attributes?.name : ""}</marquee>
      <div className="flex flex-col items-center my-2">
        <div id="musicName" className="text-xl font-medium mb-2">
        {activeSong?.subtitle?.length > 20 ? activeSong?.subtitle?.slice(0,20)+"..." : ""}
        {activeSong?.subtitle?.length <= 20 ?activeSong?.subtitle : ""}
        {activeSong?.attributes?.albumName?.length > 20 ?activeSong?.attributes?.albumName.slice(0,20) : ""}
        {activeSong?.attributes?.albumName?.length <= 20 ?activeSong?.attributes?.albumName : ""}          </div>
      </div>
      </div>
      </>}
    <div className={`${isPlaying && isActive ? /*'animate-[spin_3s_linear_infinite]'*/"" : ''} ${mobilePlayerOpen?"flex relative w-[80vw] h-[40vh] top-[20%]":"hidden sm:block h-16 w-16 mr-4"}`}>
      <img src={activeSong?.images?.coverart?activeSong?.images?.coverart:activeSong?.attributes?.artwork?.url?.replace('{w}', '125').replace('{h}', '125')} alt="cover art" className={`${mobilePlayerOpen?"rounded-3xl w-full":"rounded-full"}`} />
    </div>
    <div className="w-[50%]">
      {!mobilePlayerOpen && <><p className="truncate text-white font-bold text-lg">
        {activeSong?.title?.length > 15 ? activeSong?.title?.slice(0,15)+"..." : ""}
        {activeSong?.title?.length <= 15 ?activeSong?.title : ""}
        {activeSong?.attributes?.name?.length > 15 ?activeSong?.attributes?.name.slice(0,15) : ""}
        {activeSong?.attributes?.name?.length <= 15 ?activeSong?.attributes?.name : ""}      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle?.length > 15 ? activeSong?.subtitle?.slice(0,15)+"..." : ""}
        {activeSong?.subtitle?.length <= 15 ?activeSong?.subtitle : ""}
        {activeSong?.attributes?.albumName?.length > 15 ?activeSong?.attributes?.albumName.slice(0,15) : ""}
        {activeSong?.attributes?.albumName?.length <= 15 ?activeSong?.attributes?.albumName : ""}

      </p></>}
    </div>
  </div>
};

export default Track;
