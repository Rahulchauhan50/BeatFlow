import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation  } from 'react-router-dom';
import { useState } from 'react';
import User from './pages/User';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails } from './pages';

const App = () => {
  const [mobilePlayerOpen, setmobilePlayerOpen] = useState(false);
  const location = useLocation();

  const isUserPage = location.pathname === '/user';

  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  },[]);
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

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
          </div>
          {!isUserPage && (
        <div className="xl:sticky relative top-0 h-fit">
          <TopPlay />
        </div>
          )}
           
        </div>
      </div>

      {(activeSong?.title || activeSong?.attributes) && (<>
        <div  className={`absolute ${mobilePlayerOpen?"h-[110vh]":"h-20"} bottom-0 transition-all duration-[450]  w-screen left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2424a8] overflow-hidden backdrop-blur-lg rounded-t-3xl z-20`}>
          <MusicPlayer mobilePlayerOpen={mobilePlayerOpen} changePlayer={()=>{mobilePlayerOpen===true?setmobilePlayerOpen(false):setmobilePlayerOpen(true)}}/>
        </div>
        {/* <div mobilePlayerOpen={false} className="absolute hidden h-20 bottom-0 left-0 right-0 md:flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div> */}
        </>
      )}
    </div>
  );
};

export default App;
