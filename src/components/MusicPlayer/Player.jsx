import React from 'react';
import Seekbar from './Seekbar';
import Controls from './Controls';
import { FaAngleUp ,FaAngleDown, FaMusic} from 'react-icons/fa'
import { useEffect } from "react";
import iimg from '../../assets/pngwing.jpeg'

const MusicPlayer = ({fullsong, appTime,changeAppTime,Seek,repeat,  setRepeat ,setLoop, shuffle, SetShufflefun,up,down,isdown, isplaying, subtitle, coverart, duration ,totalResults, handlePlayPauseClick, currentSongsId, currentIndex, activeSong, data}) => {
  useEffect(() => {
   if(isplaying){
    document.getElementById('myMarquee')?.start();
   }else{
    document.getElementById('myMarquee')?.stop()
   }
  },[isplaying])
  
  return (
    <><div className='z-50'>
     <div className='absolute md:hidden block top-6 right-3'>
      {isdown?(<FaAngleUp onClick={()=>up()} className='w-6 h-6 text-white mr-2'/>):(<FaAngleDown onClick={()=>down()} className='w-6 h-6 text-white mr-2'/>)}
      </div>
     <div className='absolute md:hidden block top-6 left-4'>
      <FaMusic className='w-6 h-6 text-white mr-2'/>
      </div>
    <div className="w-full max-w-md text-white ">
      <div style={{marginTop:"10%"}}>
      <marquee id='myMarquee' className="text-3xl font-bold text-center" direction="left" behavior="scroll" hspace="50">{activeSong}</marquee>
      </div>
      <div className="flex flex-col items-center my-4">
        <div id="musicName" className="text-xl font-medium mb-8">{subtitle}</div>
        <img style={{borderRadius:"20px",width:"80vw"}} className='mb-8' id="songImage" src={coverart} />
      </div>
      <div className="relative mx-auto mb-8">
          <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => changeAppTime(event)}
          Seek={Seek}
          />
      </div>
      <div className="flex items-center justify-center">
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
      </div>
      <a href={fullsong} target='_blank' >
      <div className='m-auto' style={{outline: "3px solid #ffffff3d",backgroundColor: "#1e232a",borderRadius: "38px", width: "250px",height:"75px",marginTop: "20px",border: "3px solid #ffffff5e"}}>
        <img style={{height: "55px",margin: "7px",display: "inline",border: "2px solid #ffffffbf",borderRadius: "27px"}} src={iimg}/> 
        <span style={{fontSize: "25px",fontFamily: "cursive",fontWeight: "bold", margin:"auto"}} > Play full song</span>
    </div>
    </a>
    </div>
    </div>
    </>
  );
};

export default MusicPlayer;
