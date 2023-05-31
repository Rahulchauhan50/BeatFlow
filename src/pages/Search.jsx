import Loader from '../components/Loader'
import { useEffect, useState } from 'react';
import  {useParams}  from 'react-router-dom'
import SongBar from '../components/SongBar'
import TopArtist from '../pages/TopArtist'
import Error from '../components/Error'

const Search = ({setProgressing, subtitle, activeSong,isplaying, handlePlayPauseClick, data}) => {
    const [searchData, setSearchData] = useState('');
    const [isSearching, setisSearching] = useState(false);

    const {searchTerm} = useParams();

    const FetchSearchSongs = async () => {
        setProgressing(10)
        try{
            setisSearching(true)
            const url = `https://shazam.p.rapidapi.com/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`;
            setProgressing(20)
            const options = {
            method: 'GET',
            headers: {
                    'X-RapidAPI-Key': localStorage.getItem('fetchKey'),
                    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                }
             };
            setProgressing(30)
            try {
                const response = await fetch(url, options);
                setProgressing(70)
                const result = await response.json();
                setSearchData(result);
                setProgressing(100)
            } catch (error) {
            }
            setisSearching(false)
        }
        catch{
            setisSearching(false);
            setProgressing(100)
            return <Error/>
          }
    }

    useEffect(() => {
        FetchSearchSongs();
        document.getElementById('forScroll').scrollIntoView({ behavior: 'smooth' });
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
               ssubtitle={subtitle}
               fullsong={Element.track?.hub.options[0].actions[1].uri}
               otherBundle='Search'
               />
              
               })

             }
            </div>
       </div>
   </div>
   </div> 
   </div>
   <TopArtist isTopArtisPage={false} page={`Related artists`} data={searchData?.artists?.hits} isFetching={isSearching}/>

    
     </>
};

export default Search;