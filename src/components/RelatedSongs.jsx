import SongBar from '../components/SongBar'
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const RelatedSongs = ({artistData, artistId, isPlaying, activeSong, handlePauseClick , setArtist}) => {
  const dispatch = useDispatch(); ;
    return(
        <div className="flex flex-col ">
           <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
             <div className="mt-6 w-full flex flex-col">
                {artistData?.data?artistData?.data.map((song, i)=>{
                  return <SongBar
                  song={song}
                  key={`${artistId}-${song.key}-${i}`}
                  i={i}
                   artistId={artistId}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePlayClick={() => {
                    dispatch(setActiveSong({ song, artistData, i }));
                    dispatch(playPause(true))}}
                  handlePauseClick={handlePauseClick}
                   />
                }):artistData?.map((song, i)=>{
                  return <SongBar
                  song={song}
                  key={`${artistId}-${song.key}-${i}`}
                  i={i}
                  artistId={artistId}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePlayClick={() => {
                    dispatch(setActiveSong({ song, artistData, i }));
                    dispatch(playPause(true))
                    setArtist()
                  }}
                    handlePauseClick={handlePauseClick}
                   />
                })}
                
             </div>
        </div>
    )
}

export default RelatedSongs;