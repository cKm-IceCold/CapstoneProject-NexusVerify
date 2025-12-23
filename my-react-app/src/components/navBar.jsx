import React, { useState } from 'react';
import Logo from '../assets/nexus-verify.png';
import verify from '../assets/group.png';
import login from '../assets/login.png';
import auditors from '../assets/auditors.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <nav className="font-medium max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* MOBILE: HAMBURGER BUTTON (Left side on mobile) */}
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

          {/* DESKTOP LINKS (Left Side) - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-blue-600 transition-transform hover:scale-110">Home</a>
            <a href="/about" className="hover:text-blue-600 transition-transform hover:scale-110">How It Works</a>
            <a href="/contact" className="hover:text-blue-600 transition-transform hover:scale-110">Listings</a>
          </div>

          {/* LOGO (Centered on desktop, Right side or Center on mobile) */}
          <img 
            src={Logo} 
            alt="Logo"
            className="w-20 md:w-24 h-16 md:h-20 object-contain"
          />

          {/* DESKTOP LINKS (Right Side Icons) - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/verify" className="hover:scale-110 transition-transform">
              <img src={verify} alt="Verify" className="w-12 h-8 object-contain" />
            </a>
            <a href="/login" className="hover:scale-110 transition-transform">
              <img src={login} alt="Login" className="w-12 h-8 object-contain" />
            </a>
            <a href="/auditors" className="hover:scale-110 transition-transform">
              <img src={auditors} alt="Auditors" className="w-12 h-8 object-contain" />
            </a>
          </div>

          {/* MOBILE PLACEHOLDER: Keeps logo centered on mobile by balancing the hamburger button */}
          <div className="w-10 md:hidden"></div>
        </div>

        {/* MOBILE MENU DROPDOWN (Visible only when isOpen is true) */}
        <div className={`${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t`}>
          <div className="flex flex-col space-y-4 p-6">
            <a href="/" className="text-lg border-b pb-2">Home</a>
            <a href="/about" className="text-lg border-b pb-2">How It Works</a>
            <a href="/contact" className="text-lg border-b pb-2">Listings</a>
            
            <div className="flex justify-around pt-4">
               <img src={verify} className="w-10 h-10 object-contain" />
               <img src={login} className="w-10 h-10 object-contain" />
               <img src={auditors} className="w-10 h-10 object-contain" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;