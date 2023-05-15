import { useState, useEffect } from 'react'
import  {useParams}  from 'react-router-dom'
import  DetailsHeader from '../DetailsHeader'

function SongDetails({data}) {
  const [LyricsData, setLyricsData] = useState(false)
const {songid} = useParams();
console.log(songid)

  const Fetchlyrics = async () => {

    let headersListLyrics = {
      "Accept": "*/*",
      "X-RapidAPI-Key": "23d4a35959msh574c51f2ebe033cp1c47cdjsne230ae678948",
      "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com"
    }
    const url = `https://shazam-core7.p.rapidapi.com/songs/get_details?id=${songid}`
   
    let response = await fetch(url, {
      method: "GET",
      headers: headersListLyrics
    });
    
    var tempData = await response.json()
    setLyricsData(await tempData)
    console.log(tempData)
  }

  useEffect(() => {
   Fetchlyrics();
  }, [songid])
  

  return (
    <>
    {data.map((Element)=>{
        return <audio id={Element.hub.actions[0].id+""} src={Element.hub.actions[1].uri}></audio>

    })}
    <div className="flex flex-col mt-5 md-0">
        <DetailsHeader
        artistId={songid}
        songData={LyricsData}
      />
      {/* Render your component content */}
      <div className="mb-10">
      <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      <div className="mt-5">
        {console.log(LyricsData)}
        {LyricsData!==false && LyricsData?.sections[1].type === 'LYRICS'
            ? LyricsData?.sections[1]?.text.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
      </div>
      </div>
      <Related/>
    </div>
    </>
  )
}

export default SongDetails;
