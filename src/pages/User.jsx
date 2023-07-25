import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import SongBar from '../components/SongBar';
import Notfound from '../components/Notfound'
import { Link } from 'react-router-dom';
import { useGetAllDataQuery } from '../redux/services/UserApi';
import { useDeleteAllFavSongsMutation } from '../redux/services/UserApi';
import { useDeleteAllFavArtistsMutation } from '../redux/services/UserApi';
import { useDeleteAllHistoryMutation } from '../redux/services/UserApi';
import { useDeleteFavSongMutation } from '../redux/services/UserApi';
import { useDeleteFavArtistMutation } from '../redux/services/UserApi';
import { useDeleteHistoryMutation } from '../redux/services/UserApi';
import { useAddFavSongMutation } from '../redux/services/UserApi';
import { useAddFavArtistMutation } from '../redux/services/UserApi';
import { useAddHistoryMutation } from '../redux/services/UserApi';

import 'tailwindcss/tailwind.css';

const UserProfile = ({ setUserPage, IsUserPage }) => {
  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const { data, isFetching, error, refetch } = useGetAllDataQuery({ enabled: false });

  useEffect(()=>{
    refetch();
  })

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const [deleteAllFavSongs] = useDeleteAllFavSongsMutation();
  const [deleteAllFavArtists] = useDeleteAllFavArtistsMutation();
  const [deletEAllHistory] = useDeleteAllHistoryMutation();
  const [deletEFavSong] = useDeleteFavSongMutation();
  const [deletEFavArtist] = useDeleteFavArtistMutation();
  const [deletEHistory] = useDeleteHistoryMutation();
  const [AddFavSong] = useAddFavSongMutation();
  const [AddFavArtist] = useAddFavArtistMutation();
  const [AddHistory] = useAddHistoryMutation();

  const handleDeleteAllFavSongs = () => {
    deleteAllFavSongs()
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log('All favorite songs removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing favorite songs', error);
      });
  };
  const handleDeleteAllFavArtists = () => {
    deleteAllFavArtists()
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log('All favorite artists removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing favorite artists', error);
      });
  };
  const handleDeleteAllHistory = () => {
    deletEAllHistory()
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log('All History removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing song from History', error);
      });
  };
  const handleDeleteFavSong = () => {
    deletEFavSong("9575387")
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log('song removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing favorite song', error);
      });
  };
  const handleDeleteFavArtist = () => {
    deletEFavArtist("9575387")
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' Artist removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing favorite Artist', error);
      });
  };
  const handleDeleteHistory = () => {
    deletEHistory("9575387")
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' song removed successfully', data);
      })
      .catch((error) => {
        console.error('Error removing Artist from history', error);
      });
  };
  const handleAddFavSong = () => {
    AddFavSong({
      "FavSongs": "songs is very hot",
      "SongId": "95564587"
    })
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' song added successfully', data);
      })
      .catch((error) => {
        console.error('Error adding song', error);
      });
  };
  const handleAddFavArtist = () => {
    AddFavArtist({
      "FavArtists": "arijit singh",
      "ArtistId": "9575387"
    })
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' song added successfully', data);
      })
      .catch((error) => {
        console.error('Error adding song', error);
      });
  };
  const handleAddHistory = () => {
    AddHistory({
      "histories": "hist",
      "SongId": "9575387"
    })
      .unwrap() // Use .unwrap() to access the response data directly
      .then((data) => {
        console.log(' song added successfully', data);
      })
      .catch((error) => {
        console.error('Error adding song', error);
      });
  };

  const divRef = useRef(null);
  return (
    <div className="min-h-screen bg-transparent bg-gray-100 py-8 md:px-4 sm:px-6 lg:px-8">
      <div className="md:max-w-7xl mx-auto">
        <div className="pb-8">
          <div className="md:max-w-3xl mx-auto">
            <div className="bg-transparent shadow rounded-lg overflow-hidden">
              <div className="flex items-center justify-center bg-transparent mb-14 bg-gray-200 h-40">
                <img
                  ref={divRef}
                  className="h-32 w-32 rounded-full object-cover"
                  src='https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=740'
                  alt={UserDetails.name}
                />
              </div>
              <div className="bg-gradient-to-tr from-[#ff5b5b] to-[#44caff] px-4 rounded-3xl py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {UserDetails.name?UserDetails.name:"Guest"}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-900">
                  {UserDetails.email?UserDetails.email:"example@gmail.com"}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-900">
                  +{UserDetails.phoneNumber?UserDetails.phoneNumber:"(xx)-xxxxxxxxxx"}
                </p>
              </div>
            </div>

            <div className="mt-16">
              <div className='flex justify-between'>
                <h2 className="text-lg font-medium text-gray-300">
                  History
                </h2>
                <h2 className="text-sm font-medium text-gray-400">
                  See more
                </h2>
              </div>
              <div className="mt-6 w-full flex flex-col">

                {data?.length===1? data[0]?.histories?.slice(0, 5).map((song, i) => {
                  return <SongBar
                  demo={false}
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
                }) : [1,2,3].map((e)=>{return<SongBar i={e} demo={true}/>})
                }
              </div>
            </div>

            {/* Favorite Songs Section */}
            <div className="mt-16">
              <div className='flex justify-between'>
                <h2 className="text-lg font-medium text-gray-300">
                  Favorite Songs
                </h2>
                <h2 className="text-sm font-medium text-gray-400">
                  See more
                </h2>
              </div>
              <div className="mt-6 w-full flex flex-col">
                {data?.length===1 && UserDetails.name? data[0]?.FavSongs?.slice(0, 5).map((song, i) => {
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
                }) : [1,2,3].map((e)=>{return<SongBar i={e} demo={true}/>})
                }
              </div>
            </div>
            <div className="mt-16">
              <div className='flex justify-between'>
                <h2 className="text-lg font-medium text-gray-300">
                  Favorite Artists
                </h2>
                <h2 className="text-sm font-medium text-gray-400">
                  See more
                </h2>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-wrap justify-between gap-8'>
                  {data?.length===1? data[0]?.FavArtists?.map((Elements, i) => {
                    return <div key={Elements?.ArtistId} className='flex flex-col w-[38vw] md:w-[190px] p-4 bg-white/8 bg-opacity-80 backdrop-blur-sm rounded-lg'>
                      <div className='relative w-full h-auto group'>
                        {
                          UserDetails.name?<Link to={`/artists/${Elements?.ArtistId?Elements?.ArtistId:""}`}>
                          <img style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }} className='w-full rounded-full' alt='images' src={Elements?.image ? Elements?.image.replace('{w}', '125').replace('{h}', '125') : "https://png.pngtree.com/png-clipart/20210424/ourlarge/pngtree-blue-ladies-suit-cartoon-character-avatar-png-image_3232195.jpg"} ></img>
                          </Link>:<img style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)" }} className='w-full rounded-full' alt='images' src="https://png.pngtree.com/png-clipart/20210424/ourlarge/pngtree-blue-ladies-suit-cartoon-character-avatar-png-image_3232195.jpg" ></img>
                        }
                      
                      </div>
                      <div className='mt-4 flex flex-col items-center'>
                        {
                          UserDetails.name?<span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                          {Elements?.title?.length > 20 ? Elements?.title?.slice(0, 20) + "..." : Elements?.title}
                        </span>:<span className='text-sm truncate text-gray-300 mt-1 hover:underline'>
                          example Artist
                        </span>

                        }
                        
                      </div>
                    </div>
                  }) : <Notfound term='Singned n please' />}

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
