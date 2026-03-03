"use client";

import React from "react";
import { motion } from "framer-motion";

export function MotionGrid() {
  // Generate a random-ish path for the chart
  const pathData = "M 0 80 Q 50 10, 100 80 T 200 80 T 300 20 T 400 90 T 500 40 T 600 80";

  return (
    <section className="relative min-h-[80vh] w-full bg-deep-black border-y border-white/5 flex flex-col md:flex-row items-center overflow-hidden">
      {/* Left: Visuals (Animated Chart) */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-full flex items-center justify-center p-12 order-2 md:order-1">
        {/* Moving Grid Background */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: -40 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"
        />
        
        <div className="relative w-full max-w-lg aspect-video">
          <svg viewBox="0 0 600 100" className="w-full h-full overflow-visible">
            {/* Shadow path for depth */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="#00baff"
              strokeWidth="2"
              opacity="0.2"
              className="blur-md"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            {/* Main animated path */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="#00baff"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            {/* Moving point at the end of the path */}
            <motion.circle
              r="4"
              fill="#00baff"
              className="shadow-[0_0_10px_#00baff]"
              initial={{ offsetDistance: "0%" }}
              whileInView={{ offsetDistance: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{ offsetPath: `path('${pathData}')` }}
            />
          </svg>
          
          {/* Metadata labels */}
          <div className="absolute top-0 left-0 text-[10px] font-mono text-neon-blue/40 uppercase tracking-widest">
            Signal Analysis: Active
          </div>
          <div className="absolute bottom-0 right-0 text-[10px] font-mono text-neon-blue/40 uppercase tracking-widest">
            Volatility: 12.4%
          </div>
        </div>
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 p-12 md:p-24 z-10 order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight mb-8">
            Built for <span className="text-neon-blue">Precision.</span><br />
            Designed for <span className="text-neon-blue">Control.</span>
          </h2>
          <p className="text-neutral-400 font-mono text-sm md:text-base max-w-md leading-relaxed border-l border-neon-blue/30 pl-6">
            Our interface is engineered to eliminate noise and surface actionable alpha. 
            Real-time telemetry and advanced visualization tools put you in the cockpit 
            of the most powerful financial engine ever built.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
