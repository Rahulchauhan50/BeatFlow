import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (<>
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <Link to='/player' >
          <h2 className='font-bold text-3xl text-white'>Discover</h2>
        </Link>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8 md:gap-[calc(1.3vw)]'>
        {data?.tracks?.map((song, i) => {
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






export default Discover;