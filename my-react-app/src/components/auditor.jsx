import React from 'react';
import Navbar from './navBar';

function AuditorDashboard() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 pt-24 px-6 text-center">
                <h1 className="text-3xl font-bold">Auditor Dashboard</h1>
                <p className="mt-4 text-gray-600">This section is for property valuation and audit status management.</p>
                <div className="mt-10 p-6 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
                    <p className="italic text-gray-400">Loading pending audits...</p>
                </div>
            </div>
        </>
    );
}

export default AuditorDashboard;
