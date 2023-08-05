import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import  {Link}  from 'react-router-dom'
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const { activeSong , isPlaying} = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  },[isFetching]);  

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (
    <><span ref={divRef}></span>
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <Link to='/player' >
      <h2 className='font-bold text-3xl text-white'>Around You</h2>
        </Link>
      </div>  
      <div className='flex flex-wrap gap-y-6 justify-between'>
       {data?.tracks?.slice(0,data.tracks.length-(data.tracks.length%3)).map((song, i)=>{
        return <SongCard 
        key={song.key}
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={data}
        i={i}
                />
       })}

      </div>
    </div></>
  );
};




  

export default AroundYou;