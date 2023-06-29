import React from 'react';

const Track = ({isplaying, subtitle, coverart, isActive , activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isplaying && isActive ? /*'animate-[spin_3s_linear_infinite]'*/'' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={coverart} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.length > 15?activeSong.slice(0,18)+"..." : activeSong}
      </p>
      <p className="truncate text-gray-300">
        {subtitle?.length > 15?subtitle.slice(0,18)+"..." : subtitle}
      </p>
    </div>
  </div>
);

export default Track;
