import React from 'react'
import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchClick = () => {
        setIsSearchActive(true);
        // Filter data based on search term
        const results = yourData.filter(data =>
          data.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      };
    
      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
  return (
    <div className="flex mr-5">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border-2 border-black px-4 py-2 rounded-l-2xl focus:outline-none focus:border-blue-500"
              />
              <button type="submit" className="bg-[#FFE500] text-black border-black px-3 py-2 rounded-r-2xl hover:bg-[#f6f0ba] focus:outline-none" onClick={handleSearchClick}>
                <IoSearchOutline size={27} />
              </button>
              </div>
  )
}

export default Search
