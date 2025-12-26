import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function VerifyPage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        property_id: '',
        owner_name: '',
        zoning_status: '',
        fraud_risk_level: 'Low',
    });
    const [document, setDocument] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'document') setDocument(e.target.files[0]);
        if (e.target.name === 'image') setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setStatus({ type: 'error', message: 'You must be logged in to register a property.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (document) data.append('document', document);
        if (image) data.append('image', image);

        try {
            const token = localStorage.getItem('backend_token');
            const response = await fetch('https://backendcapstone-mhh2.onrender.com/api/properties/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: data
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Property registered successfully and is now pending verification!' });
                setFormData({
                    title: '',
                    location: '',
                    property_id: '',
                    owner_name: '',
                    zoning_status: '',
                    fraud_risk_level: 'Low',
                });
                setDocument(null);
                setImage(null);
            } else {
                const errorData = await response.json();
                setStatus({ type: 'error', message: errorData.detail || 'Failed to register property.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Property Registration</h1>
                    <p className="mt-2 text-gray-600">Submit your property details and documents for verification.</p>
                </div>

                {status.message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'}`}>
                        <span>{status.message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Property Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Luxury 3 Bedroom Apartment"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Lekki Phase 1, Lagos"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Property ID / Folio Number</label>
                            <input
                                type="text"
                                name="property_id"
                                required
                                value={formData.property_id}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. LP-12345"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Owner Full Name</label>
                            <input
                                type="text"
                                name="owner_name"
                                required
                                value={formData.owner_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Zoning Status</label>
                            <input
                                type="text"
                                name="zoning_status"
                                required
                                value={formData.zoning_status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Residential"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Fraud Risk Level</label>
                            <select
                                name="fraud_risk_level"
                                value={formData.fraud_risk_level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none bg-white"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Land Document (PDF/Image)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="document"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="doc-upload"
                                />
                                <label
                                    htmlFor="doc-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl group-hover:border-teal-500 transition-colors bg-gray-50"
                                >
                                    <span className="text-gray-500 font-medium">{document ? document.name : 'Click to upload document'}</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Property Image</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="img-upload"
                                    accept="image/*"
                                />
                                <label
                                    htmlFor="img-upload"
                                    className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl group-hover:border-teal-500 transition-colors bg-gray-50"
                                >
                                    <span className="text-gray-500 font-medium">{image ? image.name : 'Click to upload image'}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#4FD1C5] hover:bg-[#38B2AC] shadow-lg hover:shadow-teal-200'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyPage;
