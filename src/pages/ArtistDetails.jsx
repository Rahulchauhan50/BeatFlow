import { useState, useEffect } from 'react'
import  {useParams}  from 'react-router-dom'
import  DetailsHeader from '../components/DetailsHeader'
import SongBar from '../components/SongBar';
import Loader from '../components/Loader'

function ArtistDetails({handlePlayPauseClick,activeSong, data}) {
  const [ArtistData, setArtistData] = useState(false);
  const [songkey, setsongkey] = useState([]);
  const [isFetchingArtist,setisFetchingArtist] = useState(false)


const {Artistid} = useParams();

  const FtechRelatedSong = async () => {
    setisFetchingArtist(true)
    let headersListrelated = {
      "Accept": "*/*",
          "X-RapidAPI-Key": "8ced1fc315msh9cd32a155a7668ep1de176jsn566f12ef3bee",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com"
        }
        const url = `https://shazam.p.rapidapi.com/artists/get-summary?id=${Artistid}&l=en-US`
       
        let response = await fetch(url, {
          method: "GET",
          headers: headersListrelated
        });
        
        var tempDataRel = await response.json()
        setArtistData(await tempDataRel)
        setsongkey(tempDataRel!==false?Object.keys(tempDataRel?.resources?.songs):[])
        setisFetchingArtist(false)
      }

  useEffect(() => {
   FtechRelatedSong();
  }, [Artistid])

  if(isFetchingArtist){
    return <Loader/>
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
              {songkey.map((element,i)=>{
                return <SongBar
                name={ArtistData?.resources?.songs[element].attributes.name}
                songSource={ArtistData?.resources?.songs[element]?.attributes?.previews[0]?.url}
                songid={ArtistData?.resources?.songs[element]?.id}
                img={ArtistData?.resources?.songs[element]?.attributes?.artwork?.url?.replace('{w}', '125').replace('{h}', '125')}
                album={ArtistData?.resources?.songs[element]?.attributes?.albumName}
                subtitle={ArtistData?.resources?.songs[element]?.attributes?.albumName}
                i={i}
                activeSong={activeSong}
                artistId={Artistid}
                handlePlayPauseClick={handlePlayPauseClick}
                />
               
                })

              }

              {/* {songkey.map((element,i)=>{}} */}
                
             </div>
             {songkey.map((element,i)=>{
              return  <audio id={data[i].hub.actions[0].id+""} src={data[i].hub.actions[1].uri}></audio>
             })}
        </div>
    </div>

    </div> 

    </div>
   
  )
}

export default ArtistDetails;
