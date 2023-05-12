import React, { useEffect } from 'react'
import {genres} from '../assets/constants'
import SongCard from './SongCard'
import { useState } from 'react'
import Loader from './Loader'

export default function Discover() {
  const [data, setData] = useState({
    'tracks':[]
  })
  const [activeSong,setActiveSong] = useState(false)
  const [isPlaying,setIsPlaying] = useState(false)
  const [isFetching,setFetching] = useState(false)

  const FetchData = async () => {
    setFetching(true)
    let headersList = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "23d4a35959msh574c51f2ebe033cp1c47cdjsne230ae678948",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com"
     }
     
     let response = await fetch("https://shazam.p.rapidapi.com/charts/track", { 
       method: "GET",
       headers: headersList
     });
     
     setData(await response.json())
     console.log(data);
     setFetching(false);
  }

  useEffect(() => {
    window.scrollTo(0,0);
    FetchData();
  }, [])

  if(isFetching){return <Loader/>}

  return (
    
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-3xl text-white'>Discover</h2>
      <select
      onChange={()=>{}}
      value=''
      className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
      >
        {genres.map((Elements)=>{
          return <option>{Elements.title}</option>
        })}
      </select>
      </div> 
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
       {data.tracks.map((Elements, i)=>{
        return <SongCard 
                key={Elements.key}
                data={data.tracks}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
                />
       })}

      </div>
    </div>
  )
}
