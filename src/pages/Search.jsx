import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { SongBar } from '../components';
import { Error, Loader } from '../components';
import Notfound from '../components/Notfound';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const Search = () => {
  const dispatch = useDispatch();

  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hits.map((song) => song.track);

  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isFetching]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  if (isFetching) return <Loader title={`Searching...`} />;

  if (error) return <Error />;

  return (
    <div ref={divRef}>
      <div className="flex flex-col mt-5 md-0">
        <div className="flex flex-col mt-5 md-0">
          <div className="flex flex-col ">
            <h1 className="font-bold text-3xl mb-2 text-white">{`Related Songs :`}</h1>
            <div className="mt-6 w-full flex flex-col">
              {songs ? songs?.map((song, i) => {
                return <SongBar
                  song={song}
                  key={`${song.key}-${i}`}
                  i={i}
                  artistId={false}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePlayClick={() => {
                    dispatch(setActiveSong({ song, data, i }));
                    dispatch(playPause(true))
                  }}
                  handlePauseClick={handlePauseClick}
                />
              }) : <Notfound term='songs' />
              }
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='w-full flex justify-between sm:flex-row flex-col my-8'>
          <h2 className='font-bold text-3xl text-white'>Related Artists :</h2>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
          {data?.artists ? data?.artists?.hits.map((Elements, i) => {
            return <div key={Elements?.artist?.adamid} className='flex flex-col w-[38vw] md:w-[190px] p-4 bg-white/8 bg-opacity-80 backdrop-blur-sm rounded-lg'>
              <div className='relative w-full h-auto group'>
                <Link to={`/artists/${Elements?.artists !== undefined ? Elements?.artists[0]?.adamid : Elements?.artist?.adamid}`}>
                  <img style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }} className='w-full rounded-full' alt='images' src={Elements?.artist?.avatar ? Elements?.artist?.avatar : "https://png.pngtree.com/png-clipart/20210424/ourlarge/pngtree-blue-ladies-suit-cartoon-character-avatar-png-image_3232195.jpg"} ></img>
                </Link>
              </div>
              <div className='mt-4 flex flex-col items-center'>
                <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                  {Elements?.artist?.name?.length > 20 ? Elements?.artist?.name.slice(0, 20) + "..." : Elements?.artist?.name}
                </span>
              </div>
            </div>
          }) : <Notfound term='artists' />}

        </div>
      </div>
    </div>
  );
};

export default Search;