import React from 'react';
import { AiFillForward , AiFillBackward} from "react-icons/ai";
import { BsArrowRepeat, BsShuffle } from 'react-icons/bs';



const Seekbar = ({mobilePlayerOpen,shuffle, setShuffle,setRepeat,repeat,value, min, max, onInput, setSeekTime, appTime }) => {
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className={`${mobilePlayerOpen?"flex w-full items-center justify-between relative top-[75%]":"hidden sm:flex flex-row items-center"}`}>
      {mobilePlayerOpen?<BsArrowRepeat size={25} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className={`${mobilePlayerOpen?"flex":"hidden sm:block"} cursor-pointer text-white`} />:<AiFillBackward size={mobilePlayerOpen?30:20} onClick={() => setSeekTime(appTime - 5)} className={`${mobilePlayerOpen?"flex":"hidden lg:mr-4 lg:block"} text-white`}/>}
      <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className={`${mobilePlayerOpen?"w-[40vw] h-[6px]":""} md:block md:w-56 2xl:w-96 h-1 mx-1 md:mx-4 2xl:mx-6 rounded-lg`}
      />
      <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
      {mobilePlayerOpen?<BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className={`${mobilePlayerOpen?"flex":"hidden sm:block"} cursor-pointer text-white`}  />:<AiFillForward size={mobilePlayerOpen?30:20} type="button" onClick={() => setSeekTime(appTime + 5)} className={`${mobilePlayerOpen?"flex":"hidden lg:ml-4 lg:block"} text-white`}/>}
    </div>
  );
};

export default Seekbar;
