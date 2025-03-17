import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative  mx-5">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#333334]  rounded-3xl text-gray-400 p-2 pl-10  w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}
