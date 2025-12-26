import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function AuditorDashboard() {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [priceAuditValue, setPriceAuditValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        fetchPendingProperties();
    }, []);

    const fetchPendingProperties = async () => {
        try {
            const token = localStorage.getItem('backend_token');
            const response = await fetch('https://backendcapstone-mhh2.onrender.com/api/properties/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // Filter for pending properties on frontend if backend filter not used
                setProperties(data.filter(p => p.verification_status === 'PENDING'));
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!selectedProperty || !priceAuditValue) return;

        setIsSubmitting(true);
        setMessage({ type: '', content: '' });

        try {
            const token = localStorage.getItem('backend_token');
            const response = await fetch(`https://backendcapstone-mhh2.onrender.com/api/properties/${selectedProperty.id}/verify/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price_audit_value: priceAuditValue
                })
            });

            if (response.ok) {
                setMessage({ type: 'success', content: 'Property verified and price validated successfully!' });
                setSelectedProperty(null);
                setPriceAuditValue('');
                fetchPendingProperties(); // Refresh list
            } else {
                setMessage({ type: 'error', content: 'Failed to verify property.' });
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'An error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (user?.role !== 'AUDITOR') {
        return (
            <div className="min-h-screen pt-32 px-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p>Only registered auditors can access this dashboard.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Auditor Dashboard</h1>
                    <p className="mt-2 text-gray-600">Review pending properties and validate fair market prices.</p>
                </div>

                {message.content && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                        <span>{message.content}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* List of Pending Properties */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold mb-6 uppercase tracking-wider text-gray-700">Pending Verifications</h2>
                        {loading ? (
                            <p className="text-center py-10 text-gray-400">Loading...</p>
                        ) : properties.length === 0 ? (
                            <p className="text-center py-10 text-gray-400">No properties currently awaiting verification.</p>
                        ) : (
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {properties.map((prop) => (
                                    <div
                                        key={prop.id}
                                        onClick={() => setSelectedProperty(prop)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedProperty?.id === prop.id ? 'border-teal-500 bg-teal-50' : 'border-gray-100 hover:border-teal-200'}`}
                                    >
                                        <h3 className="font-bold text-gray-900">{prop.title}</h3>
                                        <p className="text-sm text-gray-500">{prop.location}</p>
                                        <div className="mt-2 flex justify-between text-[10px] font-black uppercase text-gray-400">
                                            <span>ID: {prop.property_id}</span>
                                            <span>Owner: {prop.owner_name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Verification Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-t-8 border-teal-500">
                        {selectedProperty ? (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700">Audit Details</h2>
                                <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                                    <p><span className="font-bold text-gray-500 text-xs uppercase">Zoning:</span> {selectedProperty.zoning_status}</p>
                                    <p><span className="font-bold text-gray-500 text-xs uppercase">Risk Level:</span> {selectedProperty.fraud_risk_level}</p>
                                </div>

                                <form onSubmit={handleVerify} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Verified Price ($)</label>
                                        <input
                                            type="number"
                                            required
                                            value={priceAuditValue}
                                            onChange={(e) => setPriceAuditValue(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                                            placeholder="Enter audited market value"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-white transition-all ${isSubmitting ? 'bg-gray-400' : 'bg-[#4FD1C5] hover:bg-[#38B2AC]'}`}
                                    >
                                        {isSubmitting ? 'Processing...' : 'Approve & Validate'}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                                </div>
                                <p className="text-gray-400 font-medium">Select a property to begin the audit process</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuditorDashboard;
