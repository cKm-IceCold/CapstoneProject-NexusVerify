import React from 'react';

// 1. IMPORT YOUR EXPORTED FIGMA IMAGES HERE
import submitImg from '../assets/how-submit.png';
import prescreenImg from '../assets/how-prescreen.png';
import auditImg from '../assets/how-audit.png';
import verifyImg from '../assets/how-verify.png';
import secureImg from '../assets/how-secure.png';

function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-[#f0f7f8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-gray-900 uppercase tracking-widest">
          How It Works
        </h2>

        {/* --- DESKTOP LAYOUT (Structured Arc) --- */}
        <div className="hidden md:flex flex-col items-center gap-4">
          
          {/* TOP ROW (Submit, Pre-Screen, Audit) */}
          <div className="flex justify-center items-end gap-2">
            {/* SUBMIT */}
            <div className="w-[240px] lg:w-[340px] -rotate-[15deg] translate-y-8 transition-transform hover:scale-110 hover:z-50">
              <img src={submitImg} alt="Submit" className="w-full h-auto drop-shadow-2xl" />
            </div>
            
            {/* PRE-SCREEN (Center Top) */}
            <div className="w-[240px] lg:w-[380px] z-10 transition-transform hover:scale-110 hover:z-50">
              <img src={prescreenImg} alt="Pre-Screen" className="w-full h-auto drop-shadow-2xl" />
            </div>

            {/* AUDIT */}
            <div className="w-[240px] lg:w-[340px] rotate-[15deg] translate-y-8 transition-transform hover:scale-110 hover:z-50">
              <img src={auditImg} alt="Audit" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>

          {/* BOTTOM ROW (Verify, Secure Sale) */}
          <div className="flex justify-center items-start gap-12 -translate-y-4">
             {/* VERIFY */}
             <div className="w-[240px] lg:w-[340px] -rotate-[10deg] transition-transform hover:scale-110 hover:z-50">
              <img src={verifyImg} alt="Verify" className="w-full h-auto drop-shadow-2xl" />
            </div>

            {/* SECURE SALE */}
            <div className="w-[240px] lg:w-[340px] rotate-[10deg] transition-transform hover:scale-110 hover:z-50">
              <img src={secureImg} alt="Secure Sale" className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT (Simple Stack for iPhone 8/Small Screens) --- */}
        <div className="flex md:hidden flex-col items-center gap-10">
          {[submitImg, prescreenImg, auditImg, verifyImg, secureImg].map((img, i) => (
            <div key={i} className="w-full max-w-[320px]">
              <img src={img} alt={`Step ${i + 1}`} className="w-full h-auto drop-shadow-xl" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;