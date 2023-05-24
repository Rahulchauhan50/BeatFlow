import {genres} from '../assets/constants'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

export default function TopArtist({page, data, isFetching , isTopArtisPage }) {


  if(isFetching){return <Loader title='Loading songs...'/>}

  return (
    <div className='flex flex-col'>
    <div className='w-full flex justify-between sm:flex-row flex-col my-8'>
    <h2 className='font-bold text-3xl text-white'>{page}</h2>
    {isTopArtisPage && <select
    className='bg-black mr-7 text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0'
    >
      {genres.map((Elements)=>{
        return <option key={Elements.title}>{Elements.title}</option>
      })}
    </select>}
    </div> 
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {console.log(data)}
       {data?.map((Elements, i)=>{
        return <div className='flex flex-col w-[70vw] md:w-[190px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
          <div  className='relative w-full h-auto group'>
              <img className='w-full' alt='images' src={Elements?.images?.background !== undefined?Elements?.images?.background : Elements?.artist?.avatar} ></img>
              </div>
              <div className='mt-4 flex flex-col'>
                <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                  <Link to={`/artists/${Elements?.artists !== undefined?Elements?.artists[0]?.adamid : Elements?.artist?.adamid}`}>
                  {Elements?.subtitle !== undefined? Elements?.subtitle : Elements?.artist?.name}
                  </Link>
                </span>
  
              </div>
          
      </div>
       })}

      </div>
    </div>
  )
}
