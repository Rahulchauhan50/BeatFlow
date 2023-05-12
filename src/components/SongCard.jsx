import React from 'react'
import PlayPause from './PlayPause'
import { Link } from 'react-router-dom';

export default function SongCard(props) {
    const {data, isPlaying, activeSong, i}= props;

    const handlePlayClick = () => {
      
    }
    const handlePauseClick = () => {

    }
  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
        <div className='relative w-full h-56 group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title!==data.title? 'flex bg-black bg-opacity-70':'hidden'}`}>
              <PlayPause
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
              PlayClick={handlePlayClick}
              PauseClick={handlePauseClick}
              />
            </div>
            <img alt='images' src={data[i].images.coverart} ></img>
            </div>
            <div className='mt-4 flex flex-col'>
              <p className='font-semibold text-lg text-white truncate'>
                <Link>
                {data[i].title}
                </Link>
              </p>
              <p className='text-sm truncate text-gray-300 mt-1'>
                <Link>
                {data[i].subtitle}
                </Link>
              </p>

            </div>
        
    </div>
  )
}
