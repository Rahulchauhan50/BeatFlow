import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
 
const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div className='flex flex-col w-[80vw] md:w-[14vw] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer'>
        <div className='relative w-full h-auto group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
              <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={() => {
                dispatch(setActiveSong({ song, data, i }));
                dispatch(playPause(true))
              }}
              />
            </div>
            <img className='w-full' alt='images' src={song?.images?.coverart?song?.images?.coverart: 'https://e0.pxfuel.com/wallpapers/968/425/desktop-wallpaper-colorful-headphones-simple-vector-icon-or-logo-element-in-thin-line-style-on-dark-background-a-music-logo-design-edm-logo-iphone-neon.jpg'} ></img>
            </div>
            <div className='mt-4 flex flex-col'>
              <span className='font-semibold text-lg text-white truncate hover:underline'>
                <Link to={`/songs/${song?.key}/${song.artists?song.artists[0].adamid:""}`}>
                {song?.title}
                </Link>
              </span>
              <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                <Link to={`/artists/${song.artists?song.artists[0].adamid:""}`}>
                {song?.subtitle}
                </Link>
              </span>

            </div>
        
    </div>
  );
};

export default SongCard;

