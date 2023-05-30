import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.getElementById('searchscroll').scrollIntoView();
    })

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('search-field').blur()
    navigate(`/search/${searchTerm}`);
  };

   return <><span id='searchscroll'></span><form style={{backgroundColor: "#17035a00",position:'-webkit-sticky',position:'sticky'}} onSubmit={handleSubmit} autoComplete="off" className="p-2 rounded-3xl md:border-none border-solid border-2 border-slate-600 mt-3 md:my-0 sm:py-2 mb-0 text-gray-400 focus-within:text-gray-600">
    <label  className="sr-only">
      Search all files
    </label>
    <div className="flex flex-row sm:pt-2 sm:py-2 justify-start items-center">
      <FiSearch aria-hidden="true" className="w-6 h-6 ml-4" />
      <input
        autoComplete="off"
        id="search-field"
        className="flex-1 bg-transparent pl-2 border-none placeholder-gray-500 text-xl outline-none text-white"
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  </form></>
}
export default SearchBar;