import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation  } from 'react-router-dom';
import { useState } from 'react';
import User from './pages/User';
import { Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails } from './pages';
import * as React from 'react';
import DescriptionAlerts from './components/Alert';
import SignInPopup from './pages/SignPage'
import SignUpPopup from './pages/SignupPage';
import Navbar from './components/Searchbar';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/features/UserAuthSlice';
import { useUserAuthenticationMutation } from './redux/services/UserApi';
import Footer from './components/Footer';


const App = () => {
  const dispatch = useDispatch();
  const [mobilePlayerOpen, setmobilePlayerOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupOut, setShowPopupOut] = useState(false);
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const [IsUser] = useUserAuthenticationMutation();
  const { activeSong } = useSelector((state) => state.player)

  const location = useLocation();

  const isUserPage = location.pathname === '/user' ;

  const divRef = useRef(null);

  const AuthUser = async () => {
    IsUser()
    .unwrap()
    .then((data) => {
      console.log( data);
        dispatch(setUserDetails({user:data}))
    })
    .catch((error) => {
      console.error('Error Authenicationg user', error);
    });
}

  useEffect(() => {
    AuthUser()
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  },[]);

  const handleTogglePopupOut = () => {
    setShowPopup(false)
    setShowPopupOut(!showPopupOut);
  };

  const handleTogglePopup = () => {
    setShowPopupOut(false)
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true)
    }, 5000)
  }, [])

  return (
    <div className="abolute flex h-[100%]">
      {!UserDetails?.name && <>
        <SignInPopup handleTogglePopupOut={handleTogglePopupOut} showPopup={showPopup} handleTogglePopup={handleTogglePopup} />
        <SignUpPopup handleTogglePopup={handleTogglePopup} showPopupOut={showPopupOut} handleTogglePopupOut={handleTogglePopupOut} />
        </>
      }
      <Sidebar handleTogglePopup={handleTogglePopup} />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Navbar handleTogglePopupOut={handleTogglePopupOut} handleTogglePopup={handleTogglePopup} />
       <DescriptionAlerts/>

        <div className="px-6 h-[calc(100vh-1px)] md:h-[calc(100vh-0px)] overflow-y-scroll flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40 md:mt-1">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<Discover />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid/:id" element={<SongDetails relatedSongs={true} />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/user" element={<User />} />
            </Routes>
            <Footer/>
          </div>
          {!isUserPage && (
        <div className="xl:sticky relative top-0 h-fit">
          <TopPlay />
        </div>
          )}
           
        </div>
      </div>

      {(activeSong?.title || activeSong?.attributes) && (<> 
        <div  className={`absolute ${mobilePlayerOpen?"h-[110%]":"h-20"} bottom-[0vh] transition-all duration-[450]  w-screen left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2424a8] overflow-hidden backdrop-blur-lg rounded-t-3xl z-20`}>
          <MusicPlayer mobilePlayerOpen={mobilePlayerOpen} changePlayer={()=>{mobilePlayerOpen===true?setmobilePlayerOpen(false):setmobilePlayerOpen(true)}}/>
        </div>
        </>
      )}
    </div>
  );
};

export default App;
