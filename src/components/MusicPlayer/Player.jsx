import React, { useRef, useEffect } from 'react';
import { useAddHistoryMutation } from '../../redux/services/UserApi';
import { useIsFavSongMutation } from '../../redux/services/UserApi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Player = ({ setFav ,activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const { artistId } = useSelector((state) => state.player);
  const [AddHistory] = useAddHistoryMutation();
  const [IsFavsong] = useIsFavSongMutation();
  const location = useLocation();

  const ref = useRef(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }
  const handleIsFavSong = () => {
    IsFavsong({uri:activeSong?.hub?.actions[1]?.uri?activeSong?.hub?.actions[1]?.uri:activeSong?.attributes?.previews[0]?.url})
      .unwrap()
      .then((data) => {
        setFav(data?.result)
      })
      .catch((error) => {
        console.error('Error removing favorite Artist');
      });
  };

  useEffect(() => {
    ref.current.volume = volume;
    // eslint-disable-next-line
  }, [volume]);
  useEffect(() => {
    ref.current.currentTime = seekTime;
    // eslint-disable-next-line
  }, [seekTime]);

  useEffect(()=>{
    const artistid = location.pathname.split('/')[1]==='artists'?location.pathname.split('/')[2]:"";

    handleIsFavSong()
    document.title = activeSong?.title? activeSong?.title+" - BeatFlow" : activeSong?.attributes?.name+" - BeatFlow"

    if(activeSong?.hub?.actions[1]?.uri? (
      AddHistory({"title":activeSong?.title, "key":activeSong?.key, "subtitle":activeSong?.subtitle, "adamid":activeSong?.artists[0].adamid?activeSong?.artists[0].adamid:artistid, "background":activeSong?.attributes?.artwork?.url, "id":activeSong?.hub?.actions[0].id, "coverart":activeSong?.images?.coverart, uri:activeSong?.hub?.actions[1]?.uri})
      .unwrap()
      .then((data) => {
        console.log(' song added successfully');
      })
      .catch((error) => {
        console.error('Error adding song');
      }))      
      
      : AddHistory({"title":activeSong?.attributes?.name, "key":activeSong?.id, "subtitle":activeSong?.attributes?.artistName, "adamid":artistId, "background":activeSong?.attributes?.artwork?.url, "id":activeSong?.id, "coverart":activeSong?.attributes?.artwork?.url, uri:activeSong?.attributes?.previews[0]?.url})
      .unwrap()
      .then((data) => {
        console.log(' song added successfully');
      })
      .catch((error) => {
        console.error('Error adding song');
        // eslint-disable-next-line
      }));},[activeSong])
  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri?activeSong?.hub?.actions[1]?.uri:activeSong?.attributes?.previews[0]?.url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
