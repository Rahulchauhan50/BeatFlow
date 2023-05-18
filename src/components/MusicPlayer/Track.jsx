import React from 'react';

const Track = ({subtitle, coverart, currentSongsId, activeSongAllDetails, isActive , activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${!document.getElementById(currentSongsId).paused && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={coverart} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong ? activeSong : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {subtitle ? subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
