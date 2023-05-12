import React from 'react'
import { BsFillPrinterFill, BsFillPauseCircleFill} from "react-icons/bs";
const PlayPause = ({activeSong, isPlaying, data, PlayClick, PauseClick}) => (activeSong && isPlaying!==true && data.title === data.title?(
    <BsFillPrinterFill
    size={35}
    className='text-gray-300'
    onClick={PlayClick}
    />):
    (
        <BsFillPauseCircleFill
        size={35}
        className='text-gray-300'
        onClick={PauseClick}
        />))
        
export default PlayPause