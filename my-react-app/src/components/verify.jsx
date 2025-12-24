import React from 'react';
import Navbar from './navBar';

function VerifyPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 pt-24 px-6 text-center">
                <h1 className="text-3xl font-bold">Property Verification</h1>
                <p className="mt-4 text-gray-600">Register and verify land documents here.</p>
                <div className="mt-10 p-6 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
                    <p className="italic text-gray-400">Document registry integration coming soon...</p>
                </div>
            </div>
        </>
    );
}

export default VerifyPage;
