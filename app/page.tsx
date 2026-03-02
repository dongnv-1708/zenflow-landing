'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, Clock, Sparkles, ArrowRight, Github, Twitter, Linkedin, Slack } from 'lucide-react';

/**
 * ZenFlow - Landing Page
 * Vibe: Minimalist (Apple-style), Soft Mint Green, Light Gray.
 * Tech: Next.js (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
 */

// --- Constants & Variants ---
const colors = {
  primary: '#E6F4F1', // Soft Mint Green background
  accent: '#10B981',  // Emerald/Mint for highlights
  text: '#1F2937',    // Deep Gray
  subtext: '#6B7280', // Medium Gray
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100">
      <title>ZenFlow | Quản lý công việc, giảm bớt áp lực</title>
      <meta name="description" content="ZenFlow giúp bạn sắp xếp công việc một cách tối giản và hiệu quả nhất." />
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">ZenFlow</span>
          </div>

          {/* Menu Items (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            {['Tính năng', 'Bảng giá', 'Về chúng tôi'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Right */}
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-emerald-200">
            Bắt đầu ngay
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* --- Hero Section --- */}
        <section className="relative overflow-hidden pt-24 pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase mb-6">
                Sản phẩm của năm 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                Làm việc thông minh hơn, <br />
                <span className="text-emerald-500">tâm trí bình an hơn.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                ZenFlow loại bỏ sự hỗn loạn trong danh sách công việc của bạn. Một giao diện tối giản giúp bạn tập trung vào điều thực sự quan trọng.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                  Thử miễn phí 14 ngày <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
                  Xem bản Demo
                </button>
              </div>
            </motion.div>
          </div>

          {/* Abstract Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-[120px] opacity-40" />
        </section>

        {/* --- Social Proof --- */}
        <section className="py-20 border-t border-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-12">
              Được tin dùng bởi các đội ngũ hàng đầu
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale">
               <Github size={32} />
               <Twitter size={32} />
               <Linkedin size={32} />
               <Slack size={32} />
               <div className="font-bold text-2xl italic">Acme</div>
               <div className="font-bold text-2xl tracking-tighter">GLOBEX</div>
            </div>
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tính năng thiết kế cho sự tập trung</h2>
              <p className="text-gray-500">Mọi công cụ bạn cần, không có gì dư thừa.</p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Feature 1 */}
              <motion.div variants={fadeInUp} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Ưu tiên thông minh</h3>
                <p className="text-gray-500 leading-relaxed">
                  Thuật toán tự động sắp xếp công việc dựa trên mức độ quan trọng và thời hạn, giúp bạn bắt đầu ngày mới dễ dàng.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeInUp} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Chế độ Deep Work</h3>
                <p className="text-gray-500 leading-relaxed">
                  Tích hợp bộ hẹn giờ Pomodoro và chặn thông báo phiền phức để bạn có thể tập trung tối đa vào công việc hiện tại.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div variants={fadeInUp} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Gợi ý từ AI</h3>
                <p className="text-gray-500 leading-relaxed">
                  AI học hỏi thói quen của bạn để đưa ra những lời khuyên về cách cân bằng giữa công việc và nghỉ ngơi hiệu quả nhất.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Footer / CTA Section --- */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-emerald-500 rounded-[3rem] py-16 px-10 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Sẵn sàng để lấy lại sự bình yên?
              </h2>
              <p className="text-emerald-50 mb-12 text-lg opacity-90">
                Gia nhập hơn 10,000 người dùng đã thay đổi cách họ làm việc hàng ngày.
              </p>
              <button className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all transform hover:-translate-y-1 shadow-lg shadow-emerald-700/20">
                Bắt đầu hoàn toàn miễn phí
              </button>
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-50" />
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 ZenFlow Inc. Thiết kế bởi sự tinh tế.
        </p>
      </footer>
    </div>
  );
}
