import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center sm:pr-0 pr-9 sm:ml-0 ml-7 sm:mt-0 mt-3">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="border-2 border-black  sm:pr-0 -pr-2 px-4 sm:py-2 -py-1 rounded-l-2xl focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-[#FFE500] text-black border-black px-3 sm:py-2 py-1 rounded-r-2xl hover:bg-[#f6f0ba] focus:outline-none ">
                <IoSearchOutline size={window.innerWidth <= 768 ? 20 : 27} /> {/* Conditionally set size */}
            </button>
        </form>
    );
};

export default Search;