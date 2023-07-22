const DetailsHeader = ({artistData, artistId}) => {
  return(
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
        <div className="absolute inset-0 flex items-center">
          <img
            alt="profile"
            src={artistData?.resources?artistData?.resources?.artists[artistId]?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125'):artistData?.images?.background}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">  
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistData?.resources?artistData?.resources?.artists[artistId]?.attributes?.name: artistData?.title}
            </p>
    
            <p className="text-base text-gray-400 mt-2">
              {artistData?.resources? artistData?.resources?.artists[artistId]?.attributes?.genreNames:artistData.genres?.primary}
            </p>
          </div>
        </div>
        <div className="w-full sm:h-44 h-24" />
      </div>
    )
  }  
    export default DetailsHeader;