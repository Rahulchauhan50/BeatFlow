import {genres} from '../assets/constants'
import SongCard from '../components/SongCard'
import Loader from '../components/Loader'
import { useEffect } from 'react'
import  {useParams}  from 'react-router-dom'

export default function Discover({page, settingAroundYou, handlePlayPauseClick ,isplaying , activeSong, data, isFetching  }) {

  const {Around} = useParams();

  useEffect(() => {
    if(Around==='around-you'){
      settingAroundYou(true)
    }else{
      settingAroundYou(false)
    }
  }, [Around])


  if(isFetching){return <Loader title='Loading songs...'/>}

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-3xl text-white'>{page}</h2>
      <select
      className='bg-black text-gray-300 p-3 mr-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
      >
        {genres.map((Elements)=>{
          return <option key={Elements.title}>{Elements.title}</option>
        })}
      </select>
      </div> 
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>

       {data.tracks.map((Elements, i)=>{
        return <SongCard 
                key={Elements.key}
                data={data.tracks}
                isplaying={isplaying}
                activeSong={activeSong}
                handlePlayPauseClick={handlePlayPauseClick}
                i={i}
                />
       })}

      </div>
    </div>
  )
}