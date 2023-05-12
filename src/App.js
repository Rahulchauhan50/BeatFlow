
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Discover from './components/Discover';
import Sidebar from './components/Sidebar';
import TopPlay from './components/TopPlay'
import { useState } from "react";

function App() {
  const [mobileMenuOpen,SetMobileMenuOpen] =useState(false)
  
  const open = () => {
    SetMobileMenuOpen(true);
  }
  const close = () => {
    SetMobileMenuOpen(false);
  }
  return (
    <Router>
      <div className="relative flex h-screen">
      <Sidebar open={open} close={close} mobileMenuOpen={mobileMenuOpen}/>
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">

        <div onClick={()=>{close()}} className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route exact path="/" element={<Discover />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay/>
          </div>
        </div>
      </div>
        <div className="absolute h-20 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10"></div>
    </div>
    </Router>
  );
}

export default App;
