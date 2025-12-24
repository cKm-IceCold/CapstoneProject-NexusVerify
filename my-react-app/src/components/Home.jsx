import React from 'react'
import background from '../assets/bg-image.jpeg'
import usersno from '../assets/noofusers.png'
import add from '../assets/Add.png'
import verify from '../assets/Verify.png'
import validate from '../assets/Validate.png'
import Navbar from './navBar' 
import SearchBar from './searchBar'

function Home() {
  return (
    <>
      {/* 1. Navbar stays at the top */}
      <Navbar />

      {/* 2. Main content starts here */}
      <main
        className="min-h-screen w-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center p-4 pt-24 md:pt-10" // Added pt-24 to prevent Navbar overlap
        style={{ backgroundImage: `url(${background})` }}
      >
        
        <div className="w-full max-w-4xl flex flex-col items-center sm:mt-0">
          
          {/* Animated User Icon */}
          <img 
            src={usersno} 
            alt="Users"
            className="w-16 mb-4 md:w-20 lg:mt-9 sm:mt-6 animate-bounce" 
          />

          {/* Heading Section */}
          <div className="text-center w-full px-2 lg:ml-7">
            <h1 className="text-2xl sm:text-3xl md:text-5xl 
            lg:text-6xl
            font-bold
             font-montserrat 
             lg:ml-30
             leading-tight tracking-tight mb-4">
              <span className="text-[#FF8787]">Verify</span> Land Documents.
              <br className="hidden sm:block" />
              <span className="text-[#FF8787]"> Validate</span> Prices. 
              <br className="sm:hidden" />
              Buy Property With 
              <span className="text-[#FF8787]"> Total Confidence.</span>
            </h1>
            <p className="text-[11px] sm:text-sm font-medium leading-relaxed opacity-90">
              Every property listed is fully authenticated, transparently priced, and government-zoning verified.
            </p>
          </div>
         
         <SearchBar />

          {/* ACTION BUTTONS */}
          <div className="
                          bg-[#FE8A8A]/90 backdrop-blur-smrounded-2xl  
                          flex flex-wrap 
                          justify-center 
                          items-center 
                          p-6 
                          gap-8 
                          md:gap-12 
                          lg:w-170">
            <button className="hover:scale-110 transition-transform flex-shrink-0">
              <img src={add} alt="Add" className="h-12 md:h-20 w-auto object-contain" />
            </button>
            <button className="hover:scale-110 transition-transform flex-shrink-0">
              <img src={verify} alt="Verify" className="h-12 md:h-20 w-auto object-contain" />
            </button>
            <button className="hover:scale-110 transition-transform flex-shrink-0">
              <img src={validate} alt="Validate" className="h-12 md:h-20 w-auto object-contain" />
            </button>
          </div>

        </div>
      </main>
    </>
  );
}

export default Home;