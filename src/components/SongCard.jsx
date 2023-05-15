import React from 'react'
import PlayPause from './PlayPause'
import { Link } from 'react-router-dom';

export default function SongCard({data,activeSongAllDetails, isPlaying, activeSong, i , handlePlayPauseClick}) {
    
    
  return (
    
    <div className='flex flex-col w-[70vw] md:w-[190px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <audio id={data[i].hub.actions[0].id+""} src={data[i].hub.actions[1].uri}></audio>
        <div  onClick={()=>handlePlayPauseClick(data,i)} className='relative w-full h-auto group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong  === data[i].title? 'flex bg-black bg-opacity-70':'hidden'}`}>
              <PlayPause
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
              i={i}
              activeSongAllDetails={activeSongAllDetails}
              />
            </div>
            <img alt='images' src={data[i].images.coverart} ></img>
            </div>
            <div className='mt-4 flex flex-col'>
              <p className='font-semibold text-lg text-white truncate'>
                <Link to="/songs/659500584">
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
