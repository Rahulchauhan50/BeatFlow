import React from 'react'
import { BsFillPlayCircleFill, BsFillPauseCircleFill} from "react-icons/bs";
const PlayPause = ({activeSong, isPlaying, data, PlayClick, PauseClick, i}) => (activeSong === data[i].title && isPlaying === true?(
    < BsFillPauseCircleFill
    size={35}
    className='text-gray-300'
    onClick={PlayClick}
    />):
    (
        <BsFillPlayCircleFill
        size={35}
        className='text-gray-300'
        onClick={PauseClick}
        />))
        
export default PlayPause