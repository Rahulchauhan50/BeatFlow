import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const divRef = useRef(null);
  
  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  },[isFetchingArtistDetails]);
    const handlePauseClick = () => {
      dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, artistData, i }));
    dispatch(playPause(true));
  };

  if (isFetchingArtistDetails) return <Loader title="Loading artist..." />;

  if (error) return <Error />;


  return (
      <><span ref={divRef}></span>
    <div className="flex flex-col mt-5 md-0">
      <div className="flex flex-col mt-5 md-0" >
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />
  <div   className="flex flex-col ">
  <div className="mt-6 w-full flex flex-col">
      <RelatedSongs
        artistData={artistData.resources?Object.keys(artistData?.resources?.songs).map((key) => {
          return { id: key, ...artistData?.resources?.songs[key] };
        }):[]}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default ArtistDetails;