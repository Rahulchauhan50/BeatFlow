import {setAlert, setAlertMsg} from '../redux/features/playerSlice'
import { useAddFavArtistMutation } from '../redux/services/UserApi';
import add from '../assets/add.png'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIsFavArtistMutation } from '../redux/services/UserApi';
import { useDeleteFavArtistMutation } from '../redux/services/UserApi';
import { FaHeart } from "react-icons/fa";
const DetailsHeader = ({ artistData, artistId }) => {
  const dispatch = useDispatch();
  const [AddFavArtist] = useAddFavArtistMutation();
  const [deletEFavArtist] = useDeleteFavArtistMutation();
  const [IsfavArtist, setIsFavArtist] = useState(false)
  const [isFavartist] = useIsFavArtistMutation();

  
  const handleAddFavArtist = () => {
    AddFavArtist({ title: artistData?.resources?.artists[artistId]?.attributes?.name, subTitle: artistData?.resources?.artists[artistId]?.attributes?.genreNames[0], image: artistData?.resources?.artists[artistId]?.attributes?.artwork?.url, ArtistId: artistId })
      .unwrap()
      .then((data) => {
        console.log(' Artist added successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("Artist added to Favorite list successfully"))
        setIsFavArtist(true)
      })
      .catch((error) => {
        console.error('Error adding Artist');
      });
  };

  const handleDeleteFavArtist = () => {
    deletEFavArtist(artistId)
      .unwrap()
      .then((data) => {
        console.log(' Artist removed successfully');
        dispatch(setAlert(true))
        dispatch(setAlertMsg("Artist added to Favorite list successfully"))
        setIsFavArtist(false)
      })
      .catch((error) => {
        console.error('Error removing favorite Artist');
      });
  };

  useEffect(() => {
    isFavartist({ artistId })
      .unwrap()
      .then((data) => {
        setIsFavArtist(data?.result)
      })
      .catch((error) => {
        console.error('Error removing favorite Artist');
      });
      // eslint-disable-next-line
  }, [artistId, IsfavArtist])
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={artistData?.resources ? artistData?.resources?.artists[artistId]?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : artistData?.images?.background}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistData?.resources ? artistData?.resources?.artists[artistId]?.attributes?.name : artistData?.title}
          </p>

          <p className="text-base text-gray-400 mt-2">
            {artistData?.resources ? artistData?.resources?.artists[artistId]?.attributes?.genreNames : artistData?.genres?.primary}
          </p>
          {
            IsfavArtist ?
              <FaHeart color='red' className='w-8 h-8 mt-4 cursor-pointer' onClick={handleDeleteFavArtist} /> :
              <img alt='fav' className='w-8 h-8 mt-4 cursor-pointer' onClick={handleAddFavArtist} src={add} />
          }
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  )
}
export default DetailsHeader;