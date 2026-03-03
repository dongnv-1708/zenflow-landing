"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useInView 
} from "framer-motion";
import { Layers, ShieldAlert, Cpu } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming basic utility for class merging

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

function TiltCard({ title, description, icon, index }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoothing the mouse movement
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Mapping mouse position to rotation (-15 to 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize mouse position to range [-0.5, 0.5]
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-full rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-[1px] cursor-pointer group"
    >
      {/* Inner Glass Content */}
      <div 
        style={{ transform: "translateZ(50px)" }} // Pushes content forward in 3D space
        className="h-full w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="mb-6 p-4 rounded-full bg-neon-blue/10 border border-neon-blue/20 group-hover:scale-110 group-hover:bg-neon-blue/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,186,255,0.1)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight uppercase italic">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed font-mono">
          {description}
        </p>
        
        {/* Decorative corner accent */}
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
      </div>

      {/* Subtle Glow Effect that follows the mouse could be added here */}
    </motion.div>
  );
}

export function Architecture() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const cards = [
    {
      title: "Assets",
      description: "Real-time liquidity mapping across 40+ global exchanges. Institutional-grade custody protocols.",
      icon: <Layers className="w-8 h-8 text-neon-blue" />,
    },
    {
      title: "Risk",
      description: "Proprietary volatility dampening via neural-recursive hedging strategies and automated risk mitigation.",
      icon: <ShieldAlert className="w-8 h-8 text-neon-blue" />,
    },
    {
      title: "Intelligence",
      description: "Predictive alpha generation using multi-modal deep learning models optimized for high-frequency data.",
      icon: <Cpu className="w-8 h-8 text-neon-blue" />,
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-deep-black overflow-hidden py-32 flex flex-col items-center justify-center"
    >
      {/* Background Grid and Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-tight italic">
            Your Entire Financial <br />
            <span className="text-neon-blue">Universe. Connected.</span>
          </h2>
          <div className="w-24 h-[1px] bg-neon-blue mx-auto opacity-50" />
        </motion.div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {cards.map((card, idx) => (
            <TiltCard key={idx} {...card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
