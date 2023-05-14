import React from 'react';

const VolumeBar = ({ value, min, max, onChange }) => {
  return(
    <div className="hidden lg:flex flex-1 items-center justify-end">
    <input
      id='vol'
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
    />
  </div>
  )
}
export default VolumeBar;
