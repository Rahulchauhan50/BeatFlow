import React from 'react'
import PlayPause from './PlayPause'
import { Link } from 'react-router-dom';

export default function SongCard({ data, isplaying, activeSong , handlePlayPauseClick, i }) {
    
    
  return (
    
    <div className='flex flex-col w-[70vw] md:w-[190px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <audio id={data[i].hub.actions[0].id+""} src={data[i].hub.actions[1].uri}></audio>
        <div  onClick={()=>handlePlayPauseClick(i, data[i].title, data[i].images.coverart, data[i].subtitle,data[i].hub.actions[0].id+"")} className='relative w-full h-auto group'>
            <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong  === data[i].title? 'flex bg-black bg-opacity-70':'hidden'}`}>
              <PlayPause
              isplaying={isplaying}
              activeSong={activeSong}
              data={data[i].title}
              />
            </div>
            <img className='w-full' alt='images' src={data[i].images.coverart} ></img>
            </div>
            <div className='mt-4 flex flex-col'>
              <span className='font-semibold text-lg text-white truncate hover:underline'>
                <Link to={`/songs/${data[i].key}/${data[i]?.artists[0].adamid}`}>
                {data[i].title}
                </Link>
              </span>
              <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                <Link to={`/artists/${data[i]?.artists[0].adamid}`}>
                {data[i].subtitle}
                </Link>
              </span>

            </div>
        
    </div>
  )
}
