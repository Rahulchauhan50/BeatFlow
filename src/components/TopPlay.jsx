import { useRef, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper , SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import 'swiper/css';
import 'swiper/css/free-mode'
import PlayPause from "./PlayPause";


const TopChartCard = ({activeSong, data, i, song, handlePlayPauseClick}) => {
    return(
    <div onClick={()=>{handlePlayPauseClick(data.tracks,i)}} className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong  === song.title? 'bg-[#4c426e]' : 'bg-transparent'} py-1 p-4 rounded-lg cursor-pointer mb-1`}>
         <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
            <div className="flex-1 flex flex-row justify-between items-center">
            <img className="w-16 h-16 md:h-14 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
            <div className="flex-1 flex flex-col justify-center mx-3">
                {/* <Link to={`/songs/${song.key}`}> */}
                <p className="text-sm font-bold text-white">
                    {song?.title}
                </p>
                {/* </Link> */}
                {/* <Link to={`/artists/${song?.artists[0].adamid}`}> */}
                <p className="text-base text-gray-300 mt-1">
                    {song?.subtitle}
                </p>
                {/* </Link> */}
            </div>
            </div>
            <PlayPause
            activeSong={activeSong}
            data={data.tracks}
            i={i}
            />
    </div>
);}


export default function TopPlay({activeSong, data, handlePlayPauseClick}){
    const TopPlays = data.tracks
    console.log(TopPlays)

    return(
        <div  className="xl:ml-6 ml-0 xl:mb-0 mb-2 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold my-4 text-2xl">Top Charts</h2>
                {/* <Link to="/top-charts"> */}
                    <p className="text-gray-300 text-base cursor-pointer">See more</p>
                {/* </Link> */}
                </div>
                <div className="mt-1 flex flex-col gap-1">
                    {TopPlays?.slice(0, 5).map((songs, i) => (
                        <TopChartCard
                        activeSong={activeSong}
                        key={songs.key}
                        song={songs}
                        data={data}
                        i={i}
                        handlePlayPauseClick={handlePlayPauseClick}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col mt-4">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-white font-bold text-2xl">Top Artists</h2>
                {/* <Link to="/top-artists"> */}
                    <p className="text-gray-300 text-base cursor-pointer">See more</p>
                {/* </Link> */}
                </div>
                <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
                className="mt-4"
                >
                {TopPlays?.map((artist) => (
                    <SwiperSlide
                    key={artist?.key}
                    style={{ width: '25%', height: 'auto' }}
                    className="shadow-lg rounded-full animate-slideright"
                    >
                    {/* <Link to={`/artists/${artist?.artists[0].adamid}`}> */}
                        <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
                    {/* </Link> */}
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    )
    
}