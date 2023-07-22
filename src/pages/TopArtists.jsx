import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  {useParams,Link}  from 'react-router-dom'
import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const TopAtists = () => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  },[]);
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery();

  if (isFetching) return <Loader title="Loading Artists..." />;

  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <>
    <span ref={divRef}></span>
    <div className='flex flex-col'>
    <div className='w-full flex justify-between sm:flex-row flex-col my-8'>
    <h2 className='font-bold text-3xl text-white'>Top Artists</h2>
    </div> 
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
       {data?.tracks.map((Elements, i)=>{
        return <div key={Elements?.artist?.adamid} className='flex flex-col w-[70vw] md:w-[190px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer'>
                <Link to={`/artists/${Elements?.artists !== undefined?Elements?.artists[0]?.adamid : Elements?.artist?.adamid}`}>
                  <div  className='relative w-full h-auto group'>
                  <img style={{boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)"}}  className='w-full rounded-full' alt='images' src={Elements?.images?.background !== undefined?Elements?.images?.background : Elements?.artist?.avatar} ></img>
                  </div>
                  <div className='mt-4 flex flex-col items-center'>
                    <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                      {Elements?.subtitle?.length > 20? Elements?.subtitle.slice(0,20)+"...":Elements?.subtitle}
                    </span>
                </div>
                </Link>
      </div>
       })}

      </div>
    </div>
    </>
  );
};




  

export default TopAtists;

