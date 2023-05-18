import SongBar from '../components/SongBar'


const RelatedSongs = ({song, activeSong, artistId , handlePlayPauseClick}) => {
    
    return(
        <div className="flex flex-col ">
             <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
             <div className="mt-6 w-full flex flex-col">
                {song.map((Element, i)=>{
                  return <SongBar
                  name={Element?.attributes?.name}
                  songSource = {Element.attributes?.previews[0]?.url}
                  songid = {Element.id}
                  img={Element.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}
                  album={Element?.attributes?.albumName}
                  subtitle = {Element?.attributes?.artistName}
                   i={i}
                   activeSong={activeSong}
                   artistId={artistId}
                   handlePlayPauseClick={handlePlayPauseClick}
                   />
                })}
                
             </div>
        </div>
    )
}

export default RelatedSongs;
