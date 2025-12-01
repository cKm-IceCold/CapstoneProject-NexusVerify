import React from 'react'
import background from '../assets/bg-image.jpeg'
import usersno from '../assets/noofusers.png'
import searchIcon from '../assets/Searchimg.png'
import add from '../assets/Add.png'
import verify from '../assets/Verify.png'
import validate from '../assets/Validate.png'

function Home () {
  return (
            <>
              <div 
                  className="h-screen 
                            w-full 
                            bg-cover 
                            bg-no-repeat
                            bg-center
                            flex 
                            items-center
                            justify-center" 

                  style={{ backgroundImage: `url(${background})` }}>
                
                    <div 
                    className=" 
                              -mt-2
                              ml-10
                             ">
                    <img src={usersno} 
                      className="w-20
                                mt-5
                                ml-40
                                animate-bounce
                                "/>
                          <h1 
                            className="text-black-200
                                      text-4xl 
                                      font-medium
                                      font-montserrat
                                      leading-[1.0]
                                      tracking-loose
                                      text-center 
                                       
                                      mb-2">

                            <span className="text-[#FF8787]">Verify</span> Land Documents.<br />
                            <span className="text-[#FF8787]">Validate</span> Prices. Buy Property <br /> With 
                            <span className="text-[#FF8787]"> Total Confidence.</span>
                          </h1>
                          
                        <h2 className="text-xs
                                      text-center
                                      leading-tight
                                      tracking tight
                                      font-medium">
                                      Every property listed is fully authenticated,<br />
                                      transparently priced, and government-zoning verified.
                        </h2>
                        
                      {/* SEARCH BAR SECTION: Combined Inputs and Button */}
              <div
                // Flex container for the inputs and button (now aligned horizontally)
                className="flex 
                          justify-center
                          items-center
                          rounded-lg
                          p-2
                          w-90
                          h-13
                          mt-5
                          mb--4
                          ml-14
                          shadow-xl
                          overflow-hidden 
                          bg-white
                          hover:scale-110">

                {/* Location Input: Styled for uniformity and border-right for the divider */}
                <input 
                    type="text"
                    className="p-3 
                              text-xs 
                              placeholder-gray-500 
                              border-r 
                              border-gray-300 
                              focus:outline-none 
                              w-30"
                    placeholder="Location" 
                />
                
                {/* Property Input */}
                <input 
                    type="text"
                    className="p-3 
                              text-xs 
                              placeholder-gray-500 
                              focus:outline-none 
                              w-30"
                    placeholder="Property" 
                />

                {/* Search Button: Added padding (px-4), removed unnecessary border-black-500 */}
                <button
                    className="bg-blue-100
                              text-black-20
                              font-small 
                              rounded-2xl
                              flex
                              items-center
                              justify-center
                              space-x-2
                              gap-3
                              p-3 hover:bg-blue-700 
                              transition duration-150
                              w-25
                              h-10"
                >Search
                  
                    <img src={searchIcon} alt="Search Icon" className="w-5
                              h-5" />
                </button>
              </div>
              <div className="bg-[#FE8A8A]
                              rounded-xl
                              mt--3
                              flex
                              items-center
                              p-3
                              gap-10
                              w-120">
                    <button>
                       <img src={add} alt="Description of image" 
                                      className="w-20 h-20
                                      hover:scale-110" />
                    </button>
                     <button>
                       <img src={verify} alt="Description of image" 
                                          className="w-40 h-20
                                          hover:scale-110" />
                    </button>
                      <button>
                       <img src={validate} alt="Description of image"
                                           className="w-35 
                                           hover:scale-110
                                           h-20" />
                    </button>
                    </div>
            </div>
                   
       </div>
            </>

  );
}

export default Home;