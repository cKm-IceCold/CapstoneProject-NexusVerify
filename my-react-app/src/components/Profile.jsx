import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { currentUser, userRole, logout, fetchUserRole } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            // Ensure role is fetched if not already present
            if (!userRole) {
                fetchUserRole().finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }
    }, [currentUser, userRole, navigate, fetchUserRole]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header/Cover */}
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-teal-500"></div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-6">
                            <div className="inline-block p-1 bg-white rounded-2xl shadow-lg">
                                <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center text-3xl font-bold text-blue-600 uppercase">
                                    {currentUser?.email?.charAt(0)}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">User Profile</h1>
                                <p className="text-gray-500 font-medium">{currentUser?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account Type</span>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">
                                    {userRole?.replace('_', ' ') || 'Searching...'}
                                </h3>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verification Status</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${userRole ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {userRole ? 'Active Sync' : 'Pending Sync'}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h4 className="font-bold text-gray-700 uppercase tracking-wider text-sm mb-4">Quick Actions</h4>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={() => navigate('/verify')} className="px-5 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                                    Register New Property
                                </button>
                                {userRole === 'AUDITOR' && (
                                    <button onClick={() => navigate('/auditors')} className="px-5 py-3 bg-teal-500 text-white rounded-xl font-bold shadow-lg hover:bg-teal-600 transition-all active:scale-95">
                                        Go to Auditor Panel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
