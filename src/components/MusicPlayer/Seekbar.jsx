import React from 'react';
import { AiFillForward , AiFillBackward} from "react-icons/ai";

  const Seekbar = ({isdown, Seek,  value, min, max, onInput }) => {
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className={`${isdown?'hidden':"flex justify-between"} sm:flex flex-row items-center`}>
      <AiFillBackward onClick={()=>{Seek(0)}} className={`${isdown?'hidden':"block w-8 h-8"} lg:mr-4 lg:block text-white cursor-pointer`}/>
      <p className="text-white">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className={`md:block ${!isdown?'w-1/2':'w-24'} md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg`}
      />
      <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
      <AiFillForward onClick={()=>{Seek(1)}} type="button" className={`${isdown?'hidden':"block w-8 h-8"} lg:ml-4 lg:block text-white cursor-pointer`}/>
    </div>
  );
};

export default Seekbar;
