import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleUp , FaMusic} from 'react-icons/fa'
import { useAddFavSongMutation } from '../../redux/services/UserApi';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = ({mobilePlayerOpen,changePlayer}) => {
  const [AddFavSong] = useAddFavSongMutation();

  const {activeSong, currentSongs, currentIndex, isActive, isPlaying, artistId } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  const handleAddFavSong = () => {
    if(activeSong?.hub?.actions[1]?.uri? (
      AddFavSong({"title":activeSong?.title, "key":activeSong?.key, "subtitle":activeSong?.subtitle, "adamid":activeSong?.artists[0].adamid, "background":activeSong?.attributes?.artwork?.url, "id":activeSong?.hub?.actions[0].id, "coverart":activeSong?.images?.coverart, uri:activeSong?.hub?.actions[1]?.uri})
      .unwrap()
      .then((data) => {
      })
      .catch((error) => {
        console.error('Error adding song', error);
      }))      
      
      : AddFavSong({"title":activeSong?.attributes?.name, "key":activeSong?.id, "subtitle":activeSong?.attributes?.artistName, "adamid":artistId, "background":activeSong?.attributes?.artwork?.url, "id":activeSong?.id, "coverart":activeSong?.attributes?.artwork?.url, uri:activeSong?.attributes?.previews[0]?.url})
      .unwrap()
      .then((data) => {
        console.log(' song added successfully', data);
      })
      .catch((error) => {
        console.error('Error adding song', error);
      }));
  };
  

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share via',
          text: 'Check out this amazing content!',
          url: 'https://example.com',
        });
      } else {
        alert('Web Share API is not supported on this browser.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className={`${mobilePlayerOpen?"flex-col w-full flex items-center":"relative sm:px-12 px-8 w-full flex items-center justify-between"}`}>
      <div className='absolute md:hidden block top-[15vh] right-3 z-[50]'>
      {mobilePlayerOpen?(<FaAngleUp onClick={changePlayer} className='w-8 h-8 text-white mr-4'/>):""}
      </div>
      <div className='absolute md:hidden block top-[15vh] left-8 z-[50]'>
      <FaMusic className='w-6 h-6 text-white mr-2'/>
      </div>
      <Track mobilePlayerOpen={mobilePlayerOpen} changePlayer={changePlayer} isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className={`${mobilePlayerOpen?"flex-col-reverse w-[80vw] absolute bottom-[15%] justify-between" : " flex-col"} items-center justify-center flex`}>
        <Controls
        handleAddFavSong={handleAddFavSong}
          handleShareClick={handleShareClick}
          mobilePlayerOpen={mobilePlayerOpen}
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
        handleShareClick={handleShareClick}
          mobilePlayerOpen={mobilePlayerOpen}
          value={appTime}
          repeat={repeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          setRepeat={setRepeat}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar mobilePlayerOpen={mobilePlayerOpen} value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
