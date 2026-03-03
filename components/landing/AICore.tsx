"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const lines = [
  "It watches volatility.",
  "It analyzes behavior.",
  "It predicts risk.",
];

function NeuralSwarm() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
      <motion.svg
        width="600"
        height="600"
        viewBox="0 0 200 200"
        className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="swarmGradient">
            <stop offset="0%" stopColor="#00baff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00baff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Animated Orbits */}
        {[1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={40 + i * 20}
            fill="none"
            stroke="#00baff"
            strokeWidth="0.5"
            strokeDasharray="1 10"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* "Nodes" */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + Math.cos((i * Math.PI) / 6) * 60}
            cy={100 + Math.sin((i * Math.PI) / 6) * 60}
            r="1.5"
            fill="#00baff"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

export function AICore() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: true });

  // Parent container variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 1.5, // Time between each line sequence starting
      },
    },
  };

  // Line animation variants
  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(8px)" 
    },
    visible: {
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      },
    },
    dim: {
      opacity: 0.3,
      filter: "blur(1px)",
      transition: { duration: 1 }
    }
  };

  // Underline variants
  const underlineVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { 
        delay: 0.5, // Start underline after text fades in
        duration: 1, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full bg-deep-black overflow-hidden flex flex-col items-center justify-center"
    >
      <NeuralSwarm />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 space-y-12 md:space-y-20 text-center"
      >
        {lines.map((text, index) => (
          <motion.div 
            key={index} 
            className="relative inline-block group"
            variants={{
              hidden: lineVariants.hidden,
              visible: (i: number) => ({
                ...lineVariants.visible,
                // If it's the last line, don't dim it yet. 
                // If it's a previous line, dim it when the next one appears.
                // We use a custom stagger logic here.
              })
            }}
            // Advanced logic: we can trigger the 'dim' state based on the next child's progress
            // For simplicity in a single variant object, we use animate with conditional states
            animate={isInView ? (
              index === 0 ? ["visible", "dim"] : 
              index === 1 ? ["visible", "dim"] : 
              "visible"
            ) : "hidden"}
            // Overriding the default stagger slightly for the dimming effect
            transition={{
              dim: { delay: (index + 1) * 1.5 } 
            }}
          >
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase italic pb-4">
              {text}
            </h2>
            
            {/* The Glowing Underline */}
            <motion.div
              variants={underlineVariants}
              className="absolute bottom-0 left-0 h-[2px] bg-neon-blue shadow-[0_0_15px_rgba(0,186,255,0.8)]"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,186,255,0.05)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
