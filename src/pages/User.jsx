import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveSong, setAlert, setAlertMsg } from '../redux/features/playerSlice';
import SongBar from '../components/SongBar';
import { Link } from 'react-router-dom';
import { useDeleteAllFavSongsMutation, useDeleteAllFavArtistsMutation, useDeleteAllHistoryMutation, useDeleteFavSongMutation, useDeleteFavArtistMutation, useDeleteHistoryMutation, useGetAllDataQuery } from '../redux/services/UserApi';
import Delete from '../assets/delete.png'
import clear from '../assets/clear.svg'
import 'tailwindcss/tailwind.css';
import { Error } from '../components';
import Dalle from '../assets/DALL.png'

const UserProfile = () => {
  const dispatch = useDispatch();
  
  const divRef = useRef(null);
  const [histroyExpand, setHistroyExpand] = useState(5)
  const [favSongExpand, setFavSongExpand] = useState(5)
  const [favArtistExpand, setFavArtistExpand] = useState(5)
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const { data, error, refetch } = useGetAllDataQuery({ enabled: false });

  const [deleteAllFavSongs] = useDeleteAllFavSongsMutation();
  const [deleteAllFavArtists] = useDeleteAllFavArtistsMutation();
  const [deletEAllHistory] = useDeleteAllHistoryMutation();
  const [deletEFavSong] = useDeleteFavSongMutation();
  const [deletEFavArtist] = useDeleteFavArtistMutation();
  const [deletEHistory] = useDeleteHistoryMutation();

  const handleDeleteAllFavSongs = () => {
    deleteAllFavSongs()
      .unwrap()
      .then((data) => {
        console.log('All favorite songs removed successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("All favourite song removed successfully"))
      })
      .catch((error) => {
        console.error('Error removing favorite songs');
      });
  };
  const handleDeleteAllFavArtists = () => {
    deleteAllFavArtists()
      .unwrap()
      .then((data) => {
        console.log('All favorite artists removed successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("All favourite artists removed successfully"))
      })
      .catch((error) => {
        console.error('Error removing favorite artists');
      });
  };
  const handleDeleteAllHistory = () => {
    deletEAllHistory()
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log('All History removed successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("History cleared successfully"))
      })
      .catch((error) => {
        console.error('Error removing song from History');
      });
  };
  const handleDeleteFavArtist = (artistId) => {
    deletEFavArtist(artistId)
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' Artist removed successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("Artist removed successfully"))
      })
      .catch((error) => {
        console.error('Error removing favorite Artist');
      });
  };
  const hadleDelete = (songId, val) => {
    if (val) {
      deletEHistory(songId)
        .unwrap()
        .then((data) => {
        })
        .catch((error) => {
          console.error('Error removing Artist from history');
        });

    } else {
      deletEFavSong()
        .unwrap(songId) // Use .unwrap() to access the response data directly
        .then((data) => {
          console.log('song removed successfully');
        })
        .catch((error) => {
          console.error('Error removing favorite song');
        });

    }
  }

  useEffect(() => {
    refetch();
  })
  
  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return (
    <div className="min-h-screen bg-transparent bg-gray-100 py-8 md:px-4 sm:px-6 lg:px-8">
      <div className="md:max-w-7xl mx-auto">
        <div className="pb-8">
          <div className="md:max-w-3xl mx-auto">
            <div className="bg-transparent shadow rounded-lg overflow-hidden">
              <div className="flex items-center justify-center bg-transparent mb-14 bg-gray-200 h-40">
                <img
                  ref={divRef}
                  className="h-36 w-36 rounded-full object-cover"
                  src={UserDetails?.profileImage?UserDetails?.profileImage:Dalle}
                  alt={UserDetails?.name}
                  style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }}
                />
              </div>
              <div className="bg-gradient-to-tr from-[#ff5b5b] to-[#44caff] px-4 rounded-3xl py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {UserDetails?.name ? UserDetails?.name : "Guest"}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-900">
                  {UserDetails?.email ? UserDetails?.email : "example@gmail.com"}
                </p>
              </div>
            </div>

            <div className="mt-16">
              <div className='flex justify-between items-center'>
                <h2 className="flex flex-row items-center text-lg font-medium text-gray-300">
                  History
                  <img alt='delte' onClick={() => { handleDeleteAllHistory() }} title='Clear All History' className='cursor-pointer mx-4 w-14 h-14' src={clear} />
                </h2>
                <h2 onClick={() => { histroyExpand === 30 ? setHistroyExpand(5) : setHistroyExpand(30) }} className="items-center cursor-pointer text-sm font-medium text-gray-400">
                  {histroyExpand === 30 ? "Collapse" : "See more"}
                </h2>
              </div>
              <div className="mt-6 w-full flex flex-col">

                {data?.length >= 1 ? data[0]?.histories?.slice(0, histroyExpand).map((song, i) => {
                  return <SongBar
                    songType={true}
                    hadleDelete={hadleDelete}
                    demo={false}
                    song={song}
                    key={`${song.key}-${i*Math.random}`}
                    i={i}
                    artistId={song?.artists[0]?.adamid}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePlayClick={() => {
                      dispatch(setActiveSong({ song: { song, type: "histroy" }, data, i }));
                      dispatch(playPause(true))
                    }}
                    handlePauseClick={handlePauseClick}
                  />
                }) : [1, 2, 3].map((e) => { return <SongBar i={e} demo={true} /> })
                }
              </div>
            </div>

            <div className="mt-16">
              <div className='flex justify-between items-center'>
                <h2 className="flex flex-row items-center text-lg font-medium text-gray-300">
                  Favorite Songs
                  <img alt='delete' onClick={() => { handleDeleteAllFavSongs() }} title='Clear all favorite songs' className='cursor-pointer mx-4 w-14 h-14' src={clear} />
                </h2>
                <h2 onClick={() => { favSongExpand === 5 ? setFavSongExpand(99) : setFavSongExpand(5) }} className="items-center cursor-pointer text-sm font-medium text-gray-400">
                  {favSongExpand === 5 ? "See more" : "Collapse"}
                </h2>
              </div>
              <div className="mt-6 w-full flex flex-col">
                {data?.length >= 1 ? data[0]?.FavSongs?.slice(0, favSongExpand).map((song, i) => {
                  return <SongBar
                    songType={song?.artists[0]?.adamid}
                    hadleDelete={hadleDelete}
                    song={song}
                    key={`${song.key}-${i}`}
                    i={i}
                    artistId={song?.artists[0]?.adamid}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePlayClick={() => {
                      dispatch(setActiveSong({ song, data, i }));
                      dispatch(playPause(true))
                    }}
                    handlePauseClick={handlePauseClick}
                  />
                }) : [1, 2, 3].map((e) => { return <SongBar i={e} demo={true} /> })
                }
              </div>
            </div>

            <div className="mt-16">
              <div className='flex justify-between items-center'>
                <h2 className="flex flex-row items-center text-lg font-medium text-gray-300">
                  Favorite Artists
                  <img alt='delete' onClick={() => { handleDeleteAllFavArtists() }} title='Clear all favorite artists' className='cursor-pointer mx-4 w-14 h-14' src={clear} />
                </h2>
                <h2 onClick={() => { favArtistExpand === 5 ? setFavArtistExpand(99) : setFavArtistExpand(6) }} className="items-center cursor-pointer text-sm font-medium text-gray-400">
                  {favArtistExpand === 5 ? "See more" : "Collapse"}
                </h2>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-wrap justify-between gap-8'>
                  {data?.length >= 1 ? data[0]?.FavArtists?.map((Elements, favArtistExpand) => {
                    return <div key={Elements?.ArtistId} className='flex flex-col w-[38vw] md:w-[190px] p-4 bg-white/8 bg-opacity-80 backdrop-blur-sm rounded-lg'>
                      <img alt='delete' onClick={() => { handleDeleteFavArtist(Elements?.ArtistId) }} className='md:h-8 md:w-8 w-[30px] h-[30px] cursor-pointer absolute md:right-[25px] right-[14px] z-[15]' src={Delete} />
                      <div className='relative w-full h-auto group'>
                        <Link to={`/artists/${Elements?.ArtistId ? Elements?.ArtistId : ""}`}>
                          <img style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }} className='w-full rounded-full' alt='images' src={Elements?.image ? Elements?.image.replace('{w}', '125').replace('{h}', '125') : "https://png.pngtree.com/png-clipart/20210424/ourlarge/pngtree-blue-ladies-suit-cartoon-character-avatar-png-image_3232195.jpg"} />
                        </Link>
                      </div>
                      <div className='mt-4 flex flex-col items-center'>
                        <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                          {Elements?.title?.length > 20 ? Elements?.title?.slice(0, 20) + "..." : Elements?.title}
                        </span>
                      </div>
                    </div>
                  }) : [1, 2, 3].map((e) => {
                    return <div key={e} className='flex flex-col w-[38vw] md:w-[190px] p-4 bg-white/8 bg-opacity-80 backdrop-blur-sm rounded-lg'>
                      <img alt='delete' className='md:h-8 md:w-8 w-[30px] h-[30px] cursor-pointer absolute md:right-[25px] right-[14px] z-[15]' src={Delete} />
                      <div className='relative w-full h-auto group'>
                        <img alt='hero' style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }} className='w-full rounded-full' src="https://png.pngtree.com/png-clipart/20210424/ourlarge/pngtree-blue-ladies-suit-cartoon-character-avatar-png-image_3232195.jpg" />
                      </div>
                      <div className='mt-4 flex flex-col items-center'>
                        <span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                          emale Artist
                        </span>
                      </div>
                    </div>
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
