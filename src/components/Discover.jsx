import {genres} from '../assets/constants'
import SongCard from './SongCard'
import Loader from './Loader'

export default function Discover({data, activeSongAllDetails, isFetching, isPlaying, activeSong,handlePlayPauseClick }) {
  

  if(isFetching){return <Loader/>}

  return (
    
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-3xl text-white'>Discover</h2>
      <select
      className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
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
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayPauseClick={handlePlayPauseClick}
                activeSongAllDetails={activeSongAllDetails}
                i={i}
                />
       })}

      </div>
    </div>
  )
}
