'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  User, 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Target, 
  Settings, 
  Sparkles,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types for Binance WebSocket ---
interface TickerData {
  s: string; // Symbol (e.g., BTCUSDT)
  c: string; // Current price
  P: string; // Price change %
}

/**
 * RealtimeTicker - Thành phần lấy dữ liệu trực tiếp từ Binance WebSocket
 */
function RealtimeTicker() {
  const [tickers, setTickers] = useState<Record<string, TickerData>>({});
  const [lastUpdateSymbol, setLastUpdateSymbol] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Khởi tạo kết nối WebSocket (BTC, ETH, SOL, ADA)
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/solusdt@ticker/adausdt@ticker');

    ws.onmessage = (event) => {
      const data: TickerData = JSON.parse(event.data);
      setTickers((prev) => ({
        ...prev,
        [data.s]: data,
      }));
      // Đánh dấu symbol vừa cập nhật để tạo hiệu ứng flash
      setLastUpdateSymbol(data.s);
    };

    // Dọn dẹp WebSocket khi component unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  if (!mounted) return <div className="h-10 bg-slate-900/50" />;

  const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ADAUSDT'];

  return (
    <div className="bg-slate-950 border-y border-white/5 py-3 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-10 flex items-center justify-between gap-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest min-w-fit">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          Binance Live
        </div>

        <div className="flex items-center gap-12 flex-1 justify-end">
          {symbols.map((s) => {
            const data = tickers[s];
            if (!data) return null;

            const isPositive = parseFloat(data.P) >= 0;
            const displayName = s.replace('USDT', '');

            return (
              <div key={s} className="flex items-center gap-3">
                <span className="text-[11px] font-black text-gray-500 tracking-tighter">{displayName}</span>
                
                {/* Giá với hiệu ứng Flash */}
                <motion.span 
                  key={`${s}-${data.c}`} // Key đổi mỗi khi giá đổi để trigger animation
                  initial={{ color: isPositive ? '#10b981' : '#f43f5e' }}
                  animate={{ color: '#ffffff' }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-mono font-bold"
                >
                  ${parseFloat(data.c).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </motion.span>

                {/* Phần trăm biến động */}
                <div className={`flex items-center text-[10px] font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {isPositive ? '+' : ''}{data.P}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Header - Thanh điều hướng ZenFlow Dashboard
 */
function Header() {
  const menu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, active: true },
    { name: 'Wallets', icon: <Wallet size={18} /> },
    { name: 'Reports', icon: <BarChart3 size={18} /> },
    { name: 'Goals', icon: <Target size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <header className="h-20 bg-[#010409] border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-50">
      {/* Left: Logo & Navigation */}
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-emerald-500 rounded-[12px] flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">ZenFlow</span>
        </div>

        <nav className="hidden lg:flex items-center gap-2">
          {menu.map((item) => (
            <button 
              key={item.name}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Notifications & User */}
      <div className="flex items-center gap-6">
        <button className="relative w-11 h-11 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#010409]" />
        </button>

        <div className="h-8 w-[1px] bg-white/10 mx-1" />

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Dong NV</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium AI Plan</p>
          </div>
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px]">
            <div className="w-full h-full bg-[#010409] rounded-[12px] flex items-center justify-center overflow-hidden">
              <User size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Main Dashboard Page
 */
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#010409]" />;

  return (
    <div className="min-h-screen bg-[#010409] text-gray-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Live Market Ticker (WebSocket) */}
      <RealtimeTicker />

      {/* 3. Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          {/* Dashboard Hero Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">Finance Overview</h1>
              <p className="text-gray-500 font-medium">Theo dõi tài sản và nhận phân tích thông minh từ AI.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-white text-black font-bold rounded-2xl text-sm hover:bg-gray-200 transition-all flex items-center gap-2">
                Export Reports
              </button>
              <button className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl text-sm hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                Sync Wallets
              </button>
            </div>
          </div>

          {/* Grid Layout Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="h-[450px] bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 flex items-center justify-center border-dashed">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-700">Portfolio Performance Analytics</p>
              </div>
            </div>

            {/* Right Column (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="h-[450px] bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-500">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                </div>
                <div className="flex-1 flex items-center justify-center border-y border-white/5 my-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-700 text-center">AI Insights Feed</p>
                </div>
                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                  Ask AI Anything
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
