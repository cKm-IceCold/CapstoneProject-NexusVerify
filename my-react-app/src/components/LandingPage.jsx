import React from 'react';
import Home from './Home';
import HowItWorks from './how_it_works';
import ListingsPage from './listings';

function LandingPage() {
    return (
        <div className="scroll-smooth">
            <section id="home">
                <Home />
            </section>
            <section id="how-it-works">
                <HowItWorks />
            </section>
            <section id="listings">
                <ListingsPage />
            </section>
        </div>
    );
}

export default LandingPage;
