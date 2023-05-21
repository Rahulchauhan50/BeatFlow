import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard'


export default function AroundYou({currentSongsId, isFetching, isPlaying, activeSong,handlePlayPauseClick }) {
  const data = {
    "tracks" : [
    
      {
        "title":"o bedardeya" ,
        "subtitle" : "rahul",
        "images":{
          "coverart" : "https://i.ytimg.com/vi/XlOGgjZk_mE/maxresdefault.jpg",
        },
        
        "hub": {
          "actions":[
            {
              "id" : "43348634",
            },
            {
              "uri" : "https://pagalsong.in/uploads/systemuploads/mp3/Tu Jhoothi Main Makkar/O Bedardeya - Tu Jhoothi Main Makkar 128 Kbps.mp3",
            }
          ]
        }
      }
      
      // {"title" :" Suraj Hua Maddham",
      // "id" : "23433634",
      // "subtitle" :" Sandesh Shandilya",
      // "image" : "https://i.ytimg.com/vi/L0zKs8i7Nc8/maxresdefault.jpg",
      // "url" : "https://hindi2.djpunjab.app/load/4zDypX1Cqa9zHsF18SsAhA==/Suraj%20Hua%20Maddham.mp3"}
      
      // {"title" :" Main Yahaan Hoon (From Veer-Zaara)",
      // "id" : "29248634",
      // "subtitle" :" Madan Mohan",
      // "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi9fF8Bl-LwvjN1L1nG2Tn_0G6BeFLBUB56W5nmirT10ayxGLVY02B3XcX-pSRH5xFl60&usqp=CAU",
      // "url" : "https://hindi2.djpunjab.app/load/qSoAZTHsRdRAfn1sCN1rnQ==/Main%20Yahaan%20Hoon%20(From%20Veer-Zaara).mp3"},
      
      // {"title" :" Kesariya (From Brahmastra)",
      // "id" : "23769204",
      // "subtitle" :" Pritam",
      // "image" : "https://c.saavncdn.com/493/Kesariya-Audio-Teaser-From-Brahmastra--Hindi-2022-20220414173718-500x500.jpg",
      // "url" : "https://hindi2.djpunjab.app/load/Zjyn0Ez8qhEF_z3wlsH1Yw==/Kesariya%20(From%20Brahmastra).mp3"},
      
      // {"title" :" Jhoome Jo Pathaan",
      // "id" : "23761004",
      // "subtitle" :" Vishal Shekhar",
      // "image" : "https://c.saavncdn.com/807/Pathaan-Hindi-2022-20221222104158-500x500.jpg",
      // "url" : "https://hindi2.djpunjab.app/load/lPOzkCaSemYTUGG_ZPmBPA==/Jhoome%20Jo%20Pathaan.mp3"},
      
      // {"title" :" No Love",
      // "id" : "2376834984",
      // "subtitle" :" Shubh",
      // "image" : "https://i0.wp.com/www.allindiandjsdrive.com/wp-content/uploads/2022/09/No-Love-Remix-DJ-Kawal-VDJ-Shaan.jpg",
      // "url" : "https://s320.djpunjab.is/data/48/51515/299399/No%20Love%20-%20Shubh.mp3"},
      
      // {"title" :" Thaa",
      // "id" : "049708634",
      // "subtitle" :" Varinder Brar",
      // "image" : "https://c.saavncdn.com/180/Thaa-Thaa-Punjabi-2021-20211028044003-500x500.jpg",
      // "url" : "https://s320.djpunjab.is/data/48/53512/301728/Thaa%20-%20Varinder%20Brar.mp3"},
      
      // {"title" :" Insane",
      // "id" : "84242634",
      // "subtitle" :" Gurinder Gill , AP Dhillon",
      // "image" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzi5GguR5i4rJ_e5epxWdRtqk7_zfqu-brjCAeLX6jccvandcaqQ_NmoO0TCz7vJjYpQ&usqp=CAU",
      // "url" : "https://s320.djpunjab.is/data/48/50071/297697/Insane%20-%20AP%20Dhillon.mp3"},
      
      ]
      
  }  

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
      <h2 className='font-bold text-3xl text-white'>Discover</h2>
      </div> 
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
       {data.tracks.map((Elements, i)=>{
        return <SongCard 
        key={data.tracks[i].hub.actions[0].id}
                currentSongsId={currentSongsId}
                data={data.tracks}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayPauseClick={handlePlayPauseClick}
                i={i}
                />
       })}

      </div>
    </div>
  );
};
