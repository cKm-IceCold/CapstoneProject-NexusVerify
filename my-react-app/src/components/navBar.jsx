import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/nexus-verify.png';
import verify from '../assets/Group.png';
import loginIcon from '../assets/login.png';
import auditors from '../assets/auditors.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, userRole, logout } = useAuth();

  const handleHomeClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <nav className="font-medium max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-20">

          {/* MOBILE: HAMBURGER BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" onClick={handleHomeClick} className="hover:text-blue-600 transition-transform hover:scale-110">Home</Link>
            <Link to="/How It Works" className="hover:text-blue-600 transition-transform hover:scale-110">How It Works</Link>
            <Link to="/Listings" className="hover:text-blue-600 transition-transform hover:scale-110">Listings</Link>
          </div>

          {/* LOGO */}
          <Link to="/" onClick={handleHomeClick}>
            <img
              src={Logo}
              alt="Logo"
              className="w-20 md:w-24 h-16 md:h-20 object-contain"
            />
          </Link>

          {/* DESKTOP LINKS (Right Side Icons) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/verify" className="hover:scale-110 transition-transform" title="Verify">
              <img src={verify} alt="Verify" className="w-12 h-8 object-contain" />
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors">
                  Profile
                </Link>
                <button onClick={logout} className="text-sm font-bold text-[#FF8787] hover:underline transition-all">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:scale-110 transition-transform" title="Login">
                  <img src={loginIcon} alt="Login" className="w-12 h-8 object-contain" />
                </Link>
                <Link to="/register" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Sign Up</Link>
              </div>
            )}

            {userRole === 'AUDITOR' && (
              <Link to="/auditors" className="hover:scale-110 transition-transform" title="Auditor Panel">
                <img src={auditors} alt="Auditors" className="w-12 h-8 object-contain" />
              </Link>
            )}
          </div>

          <div className="w-10 md:hidden"></div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div className={`${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t`}>
          <div className="flex flex-col space-y-4 p-6">
            <Link to="/" onClick={handleHomeClick} className="text-lg border-b pb-2">Home</Link>
            <Link to="/How It Works" onClick={() => setIsOpen(false)} className="text-lg border-b pb-2">How It Works</Link>
            <Link to="/Listings" onClick={() => setIsOpen(false)} className="text-lg border-b pb-2">Listings</Link>

            {currentUser && (
              <div className="text-lg border-b pb-2 text-gray-600 truncate">Logged in as: {currentUser.email}</div>
            )}

            <div className="flex justify-around pt-4">
              <Link to="/verify" onClick={() => setIsOpen(false)}><img src={verify} className="w-10 h-10 object-contain" /></Link>
              {currentUser ? (
                <button onClick={() => { logout(); setIsOpen(false); }} className="text-[#FF8787] font-bold">Logout</button>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" onClick={() => setIsOpen(false)}><img src={loginIcon} className="w-10 h-10 object-contain" /></Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-blue-600 font-semibold">Sign Up</Link>
                </div>
              )}
              {userRole === 'AUDITOR' && (
                <Link to="/auditors" onClick={() => setIsOpen(false)}><img src={auditors} className="w-10 h-10 object-contain" /></Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;