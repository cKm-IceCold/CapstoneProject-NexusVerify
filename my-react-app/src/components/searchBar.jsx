import React, { useState, useEffect, useRef } from 'react';
import searchIcon from '../assets/Searchimg.png';

const PROPERTY_TYPES = [
  "Self-Contained (One Room)", "1 Bedroom Apartment", "2 Bedroom Flat",
  "3 Bedroom Flat", "Duplex", "Land"
];

function SearchBar() {
  const [location, setLocation] = useState("");
  const [property, setProperty] = useState("");
  const [dynamicLocations, setDynamicLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showLocDropdown, setShowLocDropdown] = useState(false);
  const [showPropDropdown, setShowPropDropdown] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const locRef = useRef(null);
  const propRef = useRef(null);

  const SECRET_KEY = import.meta.env.VITE_EI_SECRET_KEY;

  // --- EFFECT: Fetch locations when property type changes ---
  useEffect(() => {
    if (!property) return;

    const fetchSupportedLocations = async () => {
      const sector = property === "Land" ? "land" : "residential";

      try {
        const response = await fetch('https://api.estateintel.com/locations', {
          method: 'GET',
          headers: {
            'API-KEY': SECRET_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          // Some APIs require GET with body; if this fails, try removing body or moving to query params
          body: JSON.stringify({ sector: sector })
        });

        const result = await response.json();
        if (result.success) {
          // Filter for Lagos only as requested
          const lagosOnly = result.data.locations.filter(loc => loc.city === "Lagos");
          setDynamicLocations(lagosOnly);
        }
      } catch (error) {
        console.error("Location Fetch Error:", error);
      }
    };

    fetchSupportedLocations();
  }, [property, SECRET_KEY]);

  // Close dropdowns if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locRef.current && !locRef.current.contains(event.target)) setShowLocDropdown(false);
      if (propRef.current && !propRef.current.contains(event.target)) setShowPropDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  EFFECT: Auto-clear status messages
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000); // 5 seconds expiry
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  // --- FETCH SEARCH DATA ---
  const handleSearch = async () => {
    setStatus({ type: '', message: '' });

    if (!location || !property) {
      setStatus({ type: 'error', message: "Please select both a location and property type." });
      return;
    }

    setIsLoading(true);

    // 1. Find the slug for the selected location name
    const selectedLocObj = dynamicLocations.find(l => l.name === location);
    const locationSlug = selectedLocObj ? selectedLocObj.slug : location.toLowerCase().replace(/\s+/g, '-');

    // 2. Determine Endpoint
    let API_URL = "";
    if (property === "Land") {
      API_URL = `https://api.estateintel.com/v1/land-prices?location=${locationSlug}&country_code=NG`;
    } else {
      let beds = "1";
      if (property.includes("2 Bedroom")) beds = "2";
      if (property.includes("3 Bedroom")) beds = "3";
      if (property.includes("Duplex")) beds = "4";

      API_URL = `https://api.estateintel.com/v1/residential-prices?location=${locationSlug}&country_code=NG&type=rent&beds=${beds}`;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'API-KEY': SECRET_KEY
        }
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: `${result.message}: ${result.data.currency} ${result.data.price.toLocaleString()}`
        });
      } else {
        setStatus({
          type: 'error',
          message: result.message || "No data found for this selection."
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus({ type: 'error', message: "Connection failed. Please check your internet." });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLocations = dynamicLocations.filter(loc =>
    loc.name.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="w-full max-w-md md:max-w-2xl relative z-40 mt-6 px-2 md:px-0">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl p-2 md:p-0 relative">

        {/* --- LOCATION SECTION --- */}
        <div className="relative w-full md:w-1/3" ref={locRef}>
          <input
            type="text"
            className="p-4 text-sm placeholder-gray-500 border-b md:border-b-0 md:border-r border-gray-100 focus:outline-none w-full"
            placeholder={property ? "Choose area in Lagos" : "Select property first"}
            value={location}
            onChange={(e) => { setLocation(e.target.value); setShowLocDropdown(true); }}
            onFocus={() => setShowLocDropdown(true)}
            disabled={!property}
          />
          {showLocDropdown && filteredLocations.length > 0 && (
            <ul className="absolute left-0 top-full z-50 w-full bg-white border border-gray-200 rounded-b-lg shadow-xl max-h-48 overflow-y-auto">
              {filteredLocations.map((loc, i) => (
                <li key={i} className="p-3 text-sm hover:bg-red-50 cursor-pointer border-b last:border-0"
                  onClick={() => { setLocation(loc.name); setShowLocDropdown(false); }}>
                  {loc.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- PROPERTY TYPE SECTION --- */}
        <div className="relative w-full md:w-1/3" ref={propRef}>
          <input
            type="text"
            readOnly
            className="p-4 text-sm placeholder-gray-500 border-b md:border-b-0 md:border-r border-gray-100 focus:outline-none w-full cursor-pointer"
            placeholder="Property Type"
            value={property}
            onClick={() => { setShowPropDropdown(!showPropDropdown); setShowLocDropdown(false); }}
          />
          {showPropDropdown && (
            <ul className="absolute left-0 top-full z-50 w-full bg-white border border-gray-200 rounded-b-lg shadow-xl max-h-48 overflow-y-auto">
              {PROPERTY_TYPES.map((type, i) => (
                <li key={i} className="p-3 text-sm hover:bg-red-50 cursor-pointer border-b last:border-0"
                  onClick={() => {
                    setProperty(type);
                    setLocation(""); // Reset location when type changes
                    setShowPropDropdown(false);
                  }}>
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- SEARCH BUTTON --- */}
        <button
          disabled={isLoading}
          className="bg-blue-600 md:bg-blue-100 text-white md:text-blue-700 rounded-lg md:rounded-none flex items-center justify-center gap-3 p-4 hover:bg-blue-700 hover:text-white transition w-full md:w-1/3 disabled:opacity-50"
          onClick={handleSearch}
        >
          <span className="font-bold">{isLoading ? "Searching..." : "Search"}</span>
          {!isLoading && <img src={searchIcon} alt="Search" className="w-4 h-4 brightness-0 invert md:brightness-100 md:invert-0" />}
        </button>
      </div>

      {/* --- CUSTOM STATUS UI --- */}
      {status.message && (
        <div className={`mt-4 p-4 rounded-xl border-l-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'success'
          ? 'bg-green-50 border-green-500 text-green-700'
          : 'bg-red-50 border-red-500 text-red-700'
          }`}>
          <div className="flex items-center gap-3">
            {status.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            )}
            <p className="text-sm font-bold uppercase tracking-tight">{status.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;