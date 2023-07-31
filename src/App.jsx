import { useEffect } from 'react';
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
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/features/UserAuthSlice';
import { useUserAuthenticationMutation } from './redux/services/UserApi';
import Footer from './components/Footer';
import { getRedirectResult } from "firebase/auth";
import { firebaseAuth } from "./pages/FirebaseConfig"
import { useUserLoginMutation } from './redux/services/UserApi';
import { useUserSignupMutation } from './redux/services/UserApi';

const App = () => {
  const dispatch = useDispatch();
  const [mobilePlayerOpen, setmobilePlayerOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [gooleloading, setGooleloading] = useState(true);
  const [showPopupOut, setShowPopupOut] = useState(false);
  const { UserDetails } = useSelector((state) => state.UserAuth);
  const [IsUser, { isLoading: authIsLoading }] = useUserAuthenticationMutation();
  const [SignInUser] = useUserLoginMutation();
  const [SignUPUser] = useUserSignupMutation();
  const { activeSong } = useSelector((state) => state.player)
  const location = useLocation();
  const isUserPage = location.pathname === '/user' ;
  
  useEffect(() => {
    AuthUser();
    handleRedirectResult();
    // eslint-disable-next-line
  },[]);

  const GoogleSignUp = (result) => {
    SignUPUser({ profileImage: result.user.reloadUserInfo.photoUrl, name: result.user.reloadUserInfo.displayName, email: result.user.reloadUserInfo.email, password: result.user.reloadUserInfo.providerUserInfo[0].rawId })
        .unwrap()
        .then((data) => {
          if (data?.success === true) {
            localStorage.setItem("token", data.authToken)
            dispatch(setUserDetails(data))
          } else {
            console.log("user already exist hbjhbjhjjhnihik")
          }
        })
        .catch((error) => {
          console.error('Error Authenicationg user', error);
          if ("user already exist" === error.data.error) {
            alert("user already exist")
          }
        });
        setGooleloading(false)
  }

  const GoogleSignIn = (result) => {
    SignInUser({ email: result.user.reloadUserInfo.email, password: result.user.reloadUserInfo.providerUserInfo[0].rawId })
          .unwrap()
          .then((data) => {
            if (data?.success === true) {
              localStorage.setItem("token", data.authToken);
              dispatch(setUserDetails(data));
            }
          })
          .catch((error) => {
            console.error('Error Authenticating user:', error);
            if ("user does not exist" === error.data.error) {
                alert("User not exist SignUp instead")
            }
          });
          setGooleloading(false)
  }

  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(firebaseAuth);
      if (result) {
        console.log(result)
          console.log(result?.user.metadata.creationTime===result?.user.metadata.lastSignInTime)
          if (result.user.metadata.creationTime===result.user.metadata.lastSignInTime) {
            GoogleSignUp(result);
          } else {
            GoogleSignIn(result);
          } 
        }
    } catch (error) {
      console.error('Error getting redirect result:', error);
    }
    setGooleloading(false)
  };
  
  const AuthUser = async () => {
    IsUser()
    .unwrap()
    .then((data) => {
      dispatch(setUserDetails({user:data}))
    })
    .catch((error) => {
      console.error('Error Authenicationg user', error);
    });
  } 

  if (authIsLoading || gooleloading) return 
  const handleTogglePopupOut = () => {
    setShowPopup(false)
    setShowPopupOut(!showPopupOut);
  };

  const handleTogglePopup = () => {
    setShowPopupOut(false)
    setShowPopup(!showPopup);
  };

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

        <div className={`px-6 ${activeSong?.title || activeSong?.attributes?"h-[calc(100vh-130px)]":"h-[calc(100vh-70px)]"} md:h-[calc(100vh-70px)] overflow-y-scroll flex xl:flex-row flex-col-reverse`}>
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
        <div style={{position: "fixed"}}  className={`absolute ${mobilePlayerOpen?"h-[110%]":"h-20"} bottom-[0vh] transition-all duration-[450] w-full left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2424a8] overflow-hidden backdrop-blur-lg rounded-t-3xl z-20`}>
          <MusicPlayer mobilePlayerOpen={mobilePlayerOpen} changePlayer={()=>{mobilePlayerOpen===true?setmobilePlayerOpen(false):setmobilePlayerOpen(true)}}/>
        </div>
        </>
      )}
    </div>
  );
};

export default App;
