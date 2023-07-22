import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#6649c6] ${activeSong?.title === song?.title && activeSong?.subtitle === song?.subtitle && activeSong?.attributes?.name === song?.attributes?.name && activeSong?.attributes?.albumName === song?.attributes?.albumName  ? 'bg-[#6649c6]' : 'bg-[#260f70]'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
    
      <img
        className="w-20 h-20 rounded-lg"
        src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
       
          <Link to={`/songs/${song?.key?song.key:song?.id}`}>
            <p className="text-sm md:text-lg font-bold text-white hover:underline">
              {song?.title?song?.title:song?.attributes?.name}
            </p>
          </Link>
        <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {true
      ? (
        <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        />
      )
      : null}
  </div>
);

export default SongBar;