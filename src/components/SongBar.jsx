import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick, demo }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#6649c6] ${activeSong?.title === song?.title && activeSong?.subtitle === song?.subtitle && activeSong?.attributes?.name === song?.attributes?.name && activeSong?.attributes?.albumName === song?.attributes?.albumName ? 'bg-[#6649c6]' : 'bg-[#260f70]'} py-2 p-4 rounded-lg mb-2`}>
   <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    
    <div className="flex-1 flex flex-row justify-between items-center">
      {demo ?
        <img
          className="h220 w-20 rounded-lg"
          alt='song'
          src='https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/88/04/aa/8804aa35-c7d4-cee9-bb30-02dec60d7f26/AppIcon-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg'
        /> : <img
          className="h-20 w-20 rounded-lg"
          src={artistId && song?.attributes?.artwork? song?.attributes?.artwork?.url?.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart?.replace('{w}', '125').replace('{h}', '125')}
          alt={song?.title}
        />
      }
      <div className="flex-1 flex flex-col justify-center mx-3">
        {demo ?
          <p className="text-sm md:text-lg font-bold text-white hover:underline">
            example song
          </p> : <Link to={`/songs/${song?.key ? song.key : song?.id}/${artistId}`}>
            <p className="text-sm md:text-lg font-bold text-white hover:underline">
              {song?.title ? song?.title : song?.attributes?.name}
            </p>
          </Link>
        }
        {
          demo ? <p className="text-base text-gray-300 mt-1">
            example Artist
          </p> : <Link to={`/artists/${artistId}`}>
            <p className="text-base text-gray-300 mt-1 hover:underline">
              { song?.attributes?.albumName ?song?.attributes?.albumName.slice(0, 25): song?.subtitle.slice(0, 30)}
            </p>
          </Link>
        }
      </div>
    </div>
    {demo
      ? (
        <PlayPause/>
      )
      : (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      )}
  </div>
);

export default SongBar;