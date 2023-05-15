import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
return(
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
  
      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={songData !== false?songData.images.background :'https://www.google.com/search?q=avatar+logo&safe=active&sxsrf=APwXEdcFlFSK6EXTaYqR4rz_3_DlTia4Jg:1684157613215&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiz7Z-CuPf-AhWxyDgGHbyJAFUQ_AUoAXoECAEQAw&biw=1517&bih=741&dpr=0.9#imgrc=MwZh45tIk3Fb3M&imgdii=leTZ1PeftiIMjM'}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
  
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {songData !== false?songData.title:'Unknown'}
          </p>
          {true && (
            // <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-base text-gray-400 mt-2"> {songData !== false?songData.subtitle:'Unknown'}</p>
            // </Link>
          )}
  
          <p className="text-base text-gray-400 mt-2">
            { songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  )
}
  
  export default DetailsHeader;