import Loader from '../components/Loader'
import { useEffect, useState } from 'react';
import  {useParams}  from 'react-router-dom'
import SongBar from '../components/SongBar'
import TopArtist from '../pages/TopArtist'

const Search = ({activeSong,isplaying, handlePlayPauseClick, data}) => {
    const [searchData, setSearchData] = useState('');
    const [isSearching, setisSearching] = useState(false);
    

    const {searchTerm} = useParams();

    const FetchSearchSongs = async () => {
        setisSearching(true)
        const url = `https://shazam.p.rapidapi.com/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`;
        const options = {
            method: 'GET',
            headers: {
                    'X-RapidAPI-Key': 'fbbd2ad3a3msh6e1c77ddece80d5p160a98jsn6bfee9489732',
                    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setSearchData(result);
            } catch (error) {
                console.error(error);
            }
            setisSearching(false)
    }

    useEffect(() => {
        FetchSearchSongs();
       }, [searchTerm])

       if(isSearching){
        return <Loader title='Searching...'/>
      }

    return <>
    <div>
    <div className="flex flex-col mt-5 md-0">
   <div className="flex flex-col mt-5 md-0">
       <div className="flex flex-col ">
            <h1 className="font-bold text-3xl text-white">{`Related Songs`}</h1>
            <div className="mt-6 w-full flex flex-col">
             {searchData?.tracks?.hits?.map((Element,i)=>{
               return <SongBar
               name={Element.track?.title}
               img={Element.track?.images?.coverart}
               songid={Element.track?.key}
               album={Element.track?.subtitle}
               subtitle={Element.track?.subtitle}
               songSource={Element.track?.hub?.actions[1]?.uri}
               i={i}
               activeSong={activeSong}
               artistId='213157068'
               handlePlayPauseClick={handlePlayPauseClick}
               isplaying={isplaying}
               artist = {true}
               />
              
               })

             }
            </div>
            {searchData?.tracks?.hits?.map((Element,i)=>{
             return  <audio id={Element.track?.key} src={Element.track?.hub?.actions?.actions?.uri}></audio>
            })}
       </div>
   </div>
   </div> 
   </div>
   <TopArtist isTopArtisPage={false} page={`Related artists`} data={searchData?.artists?.hits} isFetching={isSearching}/>

    
  </>
};

export default Search;