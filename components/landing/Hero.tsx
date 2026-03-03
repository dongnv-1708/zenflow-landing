"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  Sparkles,
  PerspectiveCamera,
  Environment,
  Torus,
  Stars,
  useScroll,
} from "@react-three/drei";
import { motion, Variants } from "framer-motion";
import * as THREE from "three";
import { TrendingUp, Wallet, ArrowRight, Activity, Zap } from "lucide-react";

// --- HIGH-END BACKGROUND ELEMENTS ---

function ShootingStar() {
  const ref = useRef<THREE.Group>(null);
  const [position, setPosition] = React.useState([0, 0, 0]);
  
  const resetStar = () => {
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 40;
    const z = -20 - Math.random() * 20;
    setPosition([x, y, z]);
  };

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x += 20 * delta;
    ref.current.position.y -= 10 * delta;
    ref.current.position.z += 15 * delta;

    if (ref.current.position.z > 20) {
      resetStar();
    }
  });

  return (
    <group ref={ref} position={position as any}>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.01, 0.05, 2, 8]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Nebula() {
  return (
    <group>
      {/* Cyan Nebula Cloud */}
      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[15, 32, 32]} position={[-10, -5, -20]}>
          <meshBasicMaterial color="#0066ff" transparent opacity={0.03} side={THREE.BackSide} />
        </Sphere>
      </Float>
      {/* Purple Nebula Cloud */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[12, 32, 32]} position={[10, 5, -15]}>
          <meshBasicMaterial color="#7000ff" transparent opacity={0.04} side={THREE.BackSide} />
        </Sphere>
      </Float>
    </group>
  );
}

function BackgroundScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const x = (state.mouse.x * viewport.width) / 10;
    const y = (state.mouse.y * viewport.height) / 10;
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. GALAXY EFFECT */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 2. NEBULA CLOUDS */}
      <Nebula />

      {/* 3. SHOOTING STARS */}
      <ShootingStar />
      <ShootingStar />
      
      {/* 4. AI CORE CENTRAL */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#00f2ff"
            speed={4}
            distort={0.4}
            roughness={0}
            emissive="#0044ff"
            emissiveIntensity={2}
            metalness={1}
          />
        </Sphere>
        {/* Core Glow Lights */}
        <pointLight intensity={3} distance={10} color="#00f2ff" />
        <pointLight position={[-3, -3, -3]} intensity={2} color="#7000ff" />
      </Float>

      {/* 5. ORBITAL SYSTEMS */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <Torus args={[4, 0.005, 16, 100]}>
          <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} />
        </Torus>
        <Torus args={[5, 0.002, 16, 100]} rotation={[1, 1, 0]}>
          <meshBasicMaterial color="#7000ff" transparent opacity={0.1} />
        </Torus>
      </group>

      <ambientLight intensity={0.1} />
    </group>
  );
}

// --- UI COMPONENTS ---

const FloatingCard = () => (
  <motion.div
    initial={{ opacity: 0, x: 100, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1, y: [0, -15, 0] }}
    transition={{ duration: 1.2, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
    className="absolute top-1/2 right-4 lg:right-24 -translate-y-1/2 z-20 hidden xl:block"
  >
    <div className="w-80 p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      
      <div className="flex items-center justify-between mb-10 relative">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
      </div>

      <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-2">Portfolio Intelligence</p>
      <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">$142,580<span className="text-white/30 text-xl">.42</span></h3>

      <div className="h-24 w-full mb-8 relative">
        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
          <motion.path
            d="M 0 50 Q 30 40, 60 45 T 120 20 T 200 30"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono">
          <TrendingUp className="w-3 h-3" />
          <span>+12.4% AUTO-HEDGE</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
      </div>
    </div>
  </motion.div>
);

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#030305] overflow-hidden flex items-center">
      {/* 3D BACKGROUND WORLD */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
          <Suspense fallback={null}>
            <BackgroundScene />
            <Environment preset="night" />
            <fog attach="fog" args={["#030305", 10, 25]} />
          </Suspense>
        </Canvas>
      </div>

      {/* ATMOSPHERIC GRADIENTS */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#030305] via-transparent to-[#030305] opacity-80" />
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(6,182,212,0.1)_0%,transparent_50%)]" />

      {/* DASHBOARD CARD */}
      <FloatingCard />

      {/* HERO CONTENT */}
      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
            <div className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                System Active: Neural V4
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl lg:text-[10rem] font-black text-white tracking-tighter mb-6 leading-[0.8] uppercase italic"
          >
            ZenFlow <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Finance</span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-xl md:text-2xl max-w-2xl mb-14 leading-relaxed font-light tracking-wide"
          >
            Harness the power of <span className="text-white font-medium">Institutional-Grade AI</span> to coordinate your assets, mitigate risk, and achieve financial flow.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full flex items-center gap-4 group transition-all"
            >
              Initialize Node
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, color: "#06b6d4" }}
              className="text-white font-black uppercase tracking-[0.2em] flex items-center gap-3 group"
            >
              <span className="w-12 h-[1px] bg-white group-hover:bg-cyan-400 transition-colors" />
              Technical Whitepaper
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* AMBIENT UI DECOR */}
      <div className="absolute bottom-12 left-12 flex gap-12 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] hidden md:flex">
        <div className="flex flex-col gap-1">
          <span className="text-white/40">Uplink Status</span>
          <span className="text-cyan-500">Secure / 256-bit</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/40">Neural Latency</span>
          <span className="text-purple-500">0.0004 MS</span>
        </div>
      </div>
    </section>
  );
}
