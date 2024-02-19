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
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="border-2 border-black px-4 py-2 rounded-l-2xl focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-[#FFE500] text-black border-black px-3 py-2 rounded-r-2xl hover:bg-[#f6f0ba] focus:outline-none ">
                <IoSearchOutline size={27} />
            </button>
        </form>
    );
};

export default Search;
