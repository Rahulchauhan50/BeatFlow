import React from 'react'
import { BsFillPlayCircleFill, BsFillPauseCircleFill} from "react-icons/bs";
const PlayPause = ({subtitle,isplaying, activeSong, data, currentsuntitle}) => {
     return (activeSong === data && isplaying && subtitle === currentsuntitle)?
          < BsFillPauseCircleFill
          size={35}
          className='text-gray-300'
        
    />:
    
        <BsFillPlayCircleFill
        size={35}
        className='text-gray-300'
       
        />
}

        
export default PlayPause