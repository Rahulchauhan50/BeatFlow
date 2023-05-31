import { useState, useEffect } from 'react'
import  {useParams}  from 'react-router-dom'
import RelatedSongs from './RelatedSongs'
import  DetailsHeader from '../components/DetailsHeader'
import Loader from '../components/Loader'
import Error from '../components/Error'

function SongDetails({setProgressing, otherBundle, subtitle, activeSong,isplaying ,handlePlayPauseClick ,data}) {
  const [LyricsData, setLyricsData] = useState(false)
  const [relatedData, setrelatedData] = useState(false);
  const [IsFetchingLyrics, setIsFetchingLyrics] = useState(false);

const {songid} = useParams();
const {id} = useParams();

  const Fetchlyrics = async () => {
    setProgressing(10)
    try{
    setIsFetchingLyrics(true)

    let headersListLyrics = {
      "Accept": "*/*",
      "X-RapidAPI-Key": localStorage.getItem('fetchKey'),
      "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com"
    }
    const url = `https://shazam-core7.p.rapidapi.com/songs/get_details?id=${songid}`
   
    let response = await fetch(url, {
      method: "GET",
      headers: headersListLyrics
    });
    
    var tempData = await response.json()
    setLyricsData(await tempData)
    setIsFetchingLyrics(false)
  }
  catch{
    setIsFetchingLyrics(false);
    return <Error/>
  }
}
  
  const FtechRelatedSong = async () => {
    try{
      setProgressing(20)
        let headersListrelated = {
          "Accept": "*/*",
          "X-RapidAPI-Key": localStorage.getItem('fetchKey'),
          "X-RapidAPI-Host": "shazam.p.rapidapi.com"
        }
        const url = `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${id}&l=en-US`
        setProgressing(30)
        let response = await fetch(url, {
          method: "GET",
          headers: headersListrelated
        });
        setProgressing(70)
        var tempDataRel = await response.json()
        setrelatedData(await tempDataRel)
        setIsFetchingLyrics(false)
        setProgressing(100)
    }
    catch{
      setIsFetchingLyrics(false);
      setProgressing(100)
      return <Error/>
    }
    }

  useEffect(() => {
    document.getElementById('forScroll').scrollIntoView({ behavior: 'smooth' });
    Fetchlyrics();
    FtechRelatedSong();
  }, [id,songid])

  if(IsFetchingLyrics){
    return <Loader title='Loading Lyrics...'/>
  }
  
  return (
    <>
    <div>
    <div className="flex flex-col mt-5 md-0">
        <DetailsHeader
        songData={LyricsData}
        img={ LyricsData !== false?LyricsData?.images?.background:""}
        title = {LyricsData !== false?LyricsData?.title:"Unknown"}
        subtitle = {LyricsData !== false?LyricsData?.subtitle:'Unknown'}
        genres = {LyricsData !== false?LyricsData?.genres?.primary:""}
      />
      <div  className="mb-10">
      <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      <div className="mt-5">
        {LyricsData!==false && LyricsData?.sections[1]?.type === 'LYRICS'
            ? LyricsData?.sections[1]?.text?.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
      </div>
      </div>
      <RelatedSongs
      otherBundle={otherBundle}
      song={relatedData !== false?relatedData.data:[]}
      activeSong={activeSong}
      artistId={id}
      handlePlayPauseClick={handlePlayPauseClick}
      isplaying={isplaying}
      subtitle={subtitle}
      />
    </div>
    </div>
    </>
  )
}

export default SongDetails;
