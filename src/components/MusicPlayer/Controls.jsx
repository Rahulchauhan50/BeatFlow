import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FaShare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({fav,handleAddFavSong,handleShareClick, mobilePlayerOpen, isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => (
  <div className={`${mobilePlayerOpen?"w-[80vw] mt-[3vh] relative top-full justify-between":"justify-around md:w-[25vw] 2xl:w-80"} flex items-center`}>
    {!mobilePlayerOpen && <BsArrowRepeat size={mobilePlayerOpen?30:20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className={`${mobilePlayerOpen?"flex":"hidden sm:block"} cursor-pointer text-white`} />}
    <FaHeart className={`cursor-pointer md:flex ${mobilePlayerOpen?"flex ":"hidden"}`} size={mobilePlayerOpen?30:20} onClick={handleAddFavSong} color={fav ? 'red' : 'white'} />
    {currentSongs?.length && <MdSkipPrevious size={mobilePlayerOpen?50:30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <BsFillPauseFill size={mobilePlayerOpen?60:45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={mobilePlayerOpen?60:45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={mobilePlayerOpen?50:30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
    <FaShare onClick={handleShareClick} className={`cursor-pointer md:flex ${mobilePlayerOpen?"flex":"hidden"}`} size={mobilePlayerOpen?30:20} color={'white'}/>
    {!mobilePlayerOpen && <BsShuffle size={mobilePlayerOpen?30:20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className={`${mobilePlayerOpen?"flex":"hidden sm:block"} cursor-pointer text-white`}  /> }
    

  </div>
);

export default Controls;
