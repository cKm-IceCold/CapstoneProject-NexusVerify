import React from 'react';

function SearchBar() {
  return (
    // 1. Parent Wrapper: Set up Flexbox to place children side-by-side.
    //    Added rounded corners, shadow, and specific width (max-w-xl).
    <div className="flex max-w-xl rounded-lg shadow-lg overflow-hidden bg-white">
      
      {/* 2. Location Input */}
      <input
        type="text"
        className="flex-1 p-3 text-center text-gray-700 placeholder-gray-500 focus:outline-none"
        placeholder="Location (e.g., Lagos)"
      />

      {/* 3. Vertical Divider: A small element for the separating line. */}
      <div className="w-px bg-gray-300 my-2"></div>
      
      {/* 4. Property Type Input */}
      <input
        type="text"
        className="flex-1 p-3 text-center text-gray-700 placeholder-gray-500 focus:outline-none"
        placeholder="Property (e.g., Duplex | Land)"
      />
    </div>
  );
}

export default SearchBar;