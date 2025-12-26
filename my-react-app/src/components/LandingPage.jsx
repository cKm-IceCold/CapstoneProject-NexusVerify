import React, { useState } from 'react';
import Home from './Home';
import HowItWorks from './how_it_works';
import ListingsPage from './listings';

// Default Dummy Data (Initial State)
const INITIAL_DATA = [
    {
        id: 1,
        title: "Luxury 4 Bedroom Duplex",
        price: "180,000,000",
        currency: "₦",
        location: "Lekki Phase 1, Lagos",
        image: "https://images.unsplash.com/photo-1600596542815-e32c8cc22ebe?auto=format&fit=crop&w=800&q=80", // Modern duplex look
        agent: "NGOZI ADEBAYO",
        agentImg: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=150", // African woman portrait
        verified: true
    },
    {
        id: 2,
        title: "Modern 2 Bedroom Apartment",
        price: "75,000,000",
        currency: "₦",
        location: "Victoria Island, Lagos",
        image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?auto=format&fit=crop&w=800&q=80", // High rise apartment look
        agent: "EMMANUEL OKAFOR",
        agentImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=150", // African man portrait
        verified: true
    },
    {
        id: 3,
        title: "5 Bedroom Detached House",
        price: "450,000,000",
        currency: "₦",
        location: "Ikoyi, Lagos",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // Luxurious mansion look
        agent: "NGOZI ADEBAYO",
        agentImg: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=150",
        verified: true
    }
];

const getImageForProperty = (type) => {
    if (!type) return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
    const lowerType = type.toLowerCase();

    if (lowerType.includes("land")) {
        return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80";
    } else if (lowerType.includes("apartment") || lowerType.includes("flat")) {
        return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
    } else if (lowerType.includes("duplex") || lowerType.includes("house")) {
        return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";
    }
    return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";
};

function LandingPage() {
    const [searchResults, setSearchResults] = useState(INITIAL_DATA);

    const handleSearchResult = (result) => {
        const newListing = {
            id: Date.now(),
            title: `${result.propertyType} in ${result.locationName}`,
            price: result.price,
            currency: "₦",
            location: result.locationName,
            image: getImageForProperty(result.propertyType),
            agent: "Nexus AI",
            agentImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=150",
            verified: true
        };
        setSearchResults([newListing]);

        // Auto-scroll to listings
        const listingsSection = document.getElementById('listings');
        if (listingsSection) {
            listingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="scroll-smooth">
            <section id="home">
                <Home onSearchResult={handleSearchResult} />
            </section>
            <section id="how-it-works">
                <HowItWorks />
            </section>
            <section id="listings">
                <ListingsPage results={searchResults} onSearchResult={handleSearchResult} />
            </section>
        </div>
    );
}

export default LandingPage;
