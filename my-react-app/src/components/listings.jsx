import React from 'react';
import SearchBar from './searchBar'; // Using the one we built


// Dummy data to show how it looks with multiple cards
const LISTINGS_DATA = [
  {
    id: 1,
    title: "Luxury 3 Bedroom Apartment",
    price: "100,000",
    location: "Lekki Phase 1, Lagos",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    agent: "ADELE SHEIN",
    agentImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=150",
    verified: true
  },
  {
    id: 2,
    title: "Modern Duplex",
    price: "250,000",
    location: "Victoria Island, Lagos",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    agent: "ADELE SHEIN",
    agentImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=150",
    verified: true
  },
  {
    id: 3,
    title: "Prime Land Space",
    price: "80,000",
    location: "Ikeja, Lagos",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    agent: "ADELE SHEIN",
    agentImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=150",
    verified: true
  }
];

function ListingCard({ item }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden flex flex-col items-center text-center pb-6 border border-gray-100 transition-transform hover:scale-[1.02]">
      {/* Property Image */}
      <div className="w-full h-48 relative">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        {/* The Teal "Wave" or Banner from your design */}
        <div className="absolute bottom-0 w-full h-12 bg-[#4FD1C5] opacity-90 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-white text-[8px]">NEXUS</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 w-full">
        <h3 className="font-bold text-lg text-gray-900 uppercase">{item.title}</h3>
        <p className="text-gray-600 font-bold mt-1 uppercase text-sm">PRICE: ${item.price}</p>
        
        <p className="text-[#3182CE] font-bold text-xl mt-2">${item.price}</p>
        
        <p className="text-gray-400 text-xs mt-4 leading-relaxed px-4">
          Verified property listing with accurate market data and document checks.
        </p>
      </div>

      {/* Agent Info */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-4 border-[#4FD1C5] overflow-hidden p-1">
            <img src={item.agentImg} alt={item.agent} className="w-full h-full rounded-full object-cover" />
        </div>
        <p className="font-bold text-gray-800 mt-2 uppercase text-sm tracking-widest">{item.agent}</p>
      </div>

      {/* Footer Verified Section */}
      <div className="mt-4 w-full px-6">
        <div className="bg-[#E6FFFA] py-2 rounded-full flex items-center justify-center gap-2">
            <div className="bg-[#1A202C] rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="text-[#2C7A7B] text-[10px] font-bold uppercase tracking-tighter">Verified</span>
        </div>
      </div>
    </div>
  );
}

function ListingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B2F5EA] to-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Listings</h1>
          <p className="text-gray-700 font-semibold mt-2">Search through our verified Listings and competitive prices</p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-20">
          <SearchBar />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {LISTINGS_DATA.map(item => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListingsPage;