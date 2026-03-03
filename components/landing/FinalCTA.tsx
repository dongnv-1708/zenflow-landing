"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for the magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the movement
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Set the pull strength (0.3 = 30% movement towards mouse)
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <motion.button
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 40px rgba(0, 186, 255, 0.5)",
          borderColor: "#00baff"
        }}
        whileTap={{ scale: 0.95 }}
        className="px-16 py-6 bg-transparent border border-white/20 text-white font-black uppercase tracking-[0.4em] transition-colors duration-300 hover:bg-neon-blue hover:text-black rounded-sm"
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

export function FinalCTA() {
  return (
    <section className="relative h-[70vh] w-full bg-deep-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,186,255,0.08)_0%,transparent_60%)]" />
      
      {/* Large Typography */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter mb-12 drop-shadow-2xl">
          Take <span className="text-neon-blue italic">Control.</span>
        </h2>
        
        <div className="flex justify-center">
          <MagneticButton>
            [ Launch Dashboard ]
          </MagneticButton>
        </div>
      </motion.div>

      {/* Decorative scanning line animation */}
      <motion.div 
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent pointer-events-none"
      />

      {/* Footer minimal info */}
      <div className="absolute bottom-12 w-full px-12 flex justify-between items-end">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-loose">
          Version 4.0.2-Stable <br />
          Encrypted Neural Uplink
        </div>
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
          © 2026 AI Finance Engine // All Rights Reserved
        </div>
      </div>
    </section>
  );
}
