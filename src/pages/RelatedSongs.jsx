import SongBar from '../components/SongBar'

const RelatedSongs = ({subtitle,song, activeSong, artistId , handlePlayPauseClick ,isplaying}) => {
    
    return(
        <div className="flex flex-col ">
             <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
             <div className="mt-6 w-full flex flex-col">
                {song?.map((Element, i)=>{
                  return <SongBar
                  key={Element.id}
                  name={Element?.attributes?.name}
                  img={Element?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}
                  songid = {Element.id}
                  album={Element?.attributes?.albumName}
                  songSource = {Element?.attributes?.previews[0]?.url}
                  subtitle = {Element?.attributes?.artistName}
                   i={i}
                   activeSong={activeSong}
                   artistId={artistId}
                   handlePlayPauseClick={handlePlayPauseClick}
                   isplaying={isplaying}
                   artist={false}
                   ssubtitle={subtitle}
                   fullsong={Element?.url}
                   />
                })}
                
             </div>
        </div>
    )
}

export default RelatedSongs;
