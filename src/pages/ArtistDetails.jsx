import { useState, useEffect } from 'react'
import  {useParams}  from 'react-router-dom'
import  DetailsHeader from '../components/DetailsHeader'
import SongBar from '../components/SongBar';
import Loader from '../components/Loader'

function ArtistDetails({activeSong,isplaying, handlePlayPauseClick, data}) {
  const [ArtistData, setArtistData] = useState(false);
  const [songkey, setsongkey] = useState([]);
  const [isFetchingArtist,setisFetchingArtist] = useState(false)


const {Artistid} = useParams();

  const FtechRelatedSong = async () => {
    setisFetchingArtist(true)
    let headersListrelated = {
      "Accept": "*/*",
          "X-RapidAPI-Key": "9a8431f43bmsh8299b6bd5d5d59cp193902jsne54d9313062f",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com"
        }
        const url = `https://shazam.p.rapidapi.com/artists/get-summary?id=${Artistid}&l=en-US`
       
        let response = await fetch(url, {
          method: "GET",
          headers: headersListrelated
        });
        
        var tempDataRel = await response.json()
        setArtistData(await tempDataRel)
        setsongkey(Object.keys(tempDataRel?.resources?.songs))
        setisFetchingArtist(false)
        console.log(songkey)
      }

  useEffect(() => {
   FtechRelatedSong();
  }, [Artistid])

  if(isFetchingArtist){
    return <Loader title='Loading Artist...'/>
  }
  
  return (
  
   <div>
    

     <div className="flex flex-col mt-5 md-0">
    <div className="flex flex-col mt-5 md-0">
        <DetailsHeader
        songData={ArtistData}
        img={ ArtistData !== false?ArtistData?.resources?.artists[Artistid]?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125'):""}
        title = {ArtistData !== false?ArtistData.resources?.artists[Artistid]?.attributes?.name:"Unknown"}
        subtitle = {''}
        genres = {ArtistData !== false?ArtistData?.resources?.artists[Artistid]?.attributes?.genreNames:""}
      />
        
        <div className="flex flex-col ">
             <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
             <div className="mt-6 w-full flex flex-col">
              {songkey?.map((element,i)=>{
                return <SongBar
                name={ArtistData?.resources?.songs[element].attributes.name}
                img={ArtistData?.resources?.songs[element]?.attributes?.artwork?.url?.replace('{w}', '125').replace('{h}', '125')}
                songid={ArtistData?.resources?.songs[element]?.id}
                album={ArtistData?.resources?.songs[element]?.attributes?.albumName}
                subtitle={ArtistData?.resources?.songs[element]?.attributes?.albumName}
                songSource={ArtistData?.resources?.songs[element]?.attributes?.previews[0]?.url}
                i={i}
                activeSong={activeSong}
                artistId={Artistid}
                handlePlayPauseClick={handlePlayPauseClick}
                isplaying={isplaying}
                artist = {true}
                />
               
                })

              }

              {/* {songkey.map((element,i)=>{}} */}
                
             </div>
             {songkey?.map((element,i)=>{
              return  <audio id={data[i]?.hub?.actions[0]?.id+""} src={data[i]?.hub?.actions[1]?.uri}></audio>
             })}
        </div>
    </div>

    </div> 

    </div>
   
  )
}

export default ArtistDetails;
