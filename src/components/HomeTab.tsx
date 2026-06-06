import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  UserCheck,
  Star,
  Code,
  User,
  Users,
  Gamepad2,
  Dices,
  PlayCircle,
  RotateCw,
  Layers,
} from 'lucide-react';
import { AVATARS, TOPICS } from '../data';

interface HomeTabProps {
  onStartQuiz: (options: {
    name: string;
    studentClass: string;
    avatar: string;
    testCode: string;
    customPool?: boolean;
    topicFilter?: string;
    count?: number;
    timeLimit?: number;
  }) => void;
  onTeacherSetup: () => void;
  questionsCount: number;
}

export default function HomeTab({ onStartQuiz, onTeacherSetup, questionsCount }: HomeTabProps) {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('5A1');
  const [selectedAvatar, setSelectedAvatar] = useState('🚀');
  const [testCode, setTestCode] = useState('');

  // Teacher generator parameters
  const [quickTopic, setQuickTopic] = useState('Tất cả');
  const [quickCount, setQuickCount] = useState(10);
  const [quickTime, setQuickTime] = useState(15);

  const handleStudentSubmit = () => {
    if (!name.trim()) {
      alert('Vui lòng nhập họ và tên của em để lưu thành tích!');
      return;
    }
    onStartQuiz({
      name: name.trim(),
      studentClass,
      avatar: selectedAvatar,
      testCode: testCode.trim(),
    });
  };

  const handleQuickPractice = () => {
    // Generate a quick funny student name if empty
    const prefixes = ['Hiệp sĩ', 'Nhà sáng tạo', 'Cố vấn Công nghệ', 'Kỹ sư nhí', 'Mầm non ICT'];
    const randomName = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${Math.floor(10 + Math.random() * 89)}`;
    onStartQuiz({
      name: randomName,
      studentClass: '5A1',
      avatar: selectedAvatar,
      testCode: '',
    });
  };

  const handleQuickGen = () => {
    onStartQuiz({
      name: name.trim() || 'Giáo viên phát đề',
      studentClass,
      avatar: '👩‍🏫',
      testCode: 'VINAPASS',
      customPool: true,
      topicFilter: quickTopic,
      count: quickCount,
      timeLimit: quickTime,
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 rounded-3xl overflow-hidden shadow-xl text-white py-12 px-8 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-all duration-500">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-300/20 rounded-full blur-3xl"></div>

        <div className="space-y-6 max-w-2xl text-center lg:text-left relative z-10 font-bold">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
            </span>
            <span>Tin học lớp 5 - Kết nối tri thức & Cánh diều</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight title-font">
            Học Mà Chơi - <br className="hidden sm:inline" />Khơi Nguồn Sáng Tạo!
          </h1>
          <p className="text-sm text-sky-50 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Nền tảng ôn tập trắc nghiệm tin học thông minh, sinh động, chuẩn cấu trúc GDPT mới. Giúp các em học sinh làm chủ máy tính, lập trình Scratch và tự tin bứt phá điểm số!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('portal-student');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Rocket className="w-5 h-5 animate-bounce" />
              <span>BẮT ĐẦU ÔN TẬP NGAY</span>
            </button>
            <button
              onClick={onTeacherSetup}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer text-xs"
            >
              <UserCheck className="w-4 h-4" />
              <span>Dành cho Giáo viên</span>
            </button>
          </div>
        </div>

        {/* Cute Custom SVG Robot */}
        <div className="relative w-full max-w-xs sm:max-w-sm flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl animate-pulse">
            <svg className="w-48 h-48 sm:w-60 sm:h-60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="url(#avatar-grad)" />
              <rect x="55" y="60" width="90" height="70" rx="20" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="8" />
              <rect x="67" y="72" width="66" height="46" rx="10" fill="#0f172a" />
              <circle cx="85" cy="95" r="8" fill="#38bdf8" />
              <circle cx="115" cy="95" r="8" fill="#38bdf8" />
              <path d="M90 110 Q100 118 110 110" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
              <line x1="100" y1="60" x2="100" y2="40" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
              <circle cx="100" cy="35" r="8" fill="#eab308" />
              <circle cx="45" cy="95" r="10" fill="#10b981" />
              <circle cx="155" cy="95" r="10" fill="#10b981" />
              <defs>
                <linearGradient id="avatar-grad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute -top-4 -right-4 bg-amber-400 text-slate-900 font-extrabold text-[10px] px-3.5 py-2 rounded-2xl shadow-md rotate-12 flex items-center space-x-1 border-2 border-white select-none">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>VIP 2026</span>
            </div>
            <div className="absolute -bottom-2 -left-4 bg-emerald-500 text-white font-bold text-[10px] px-3.5 py-2 rounded-2xl shadow-md -rotate-6 flex items-center space-x-1 border-2 border-white select-none">
              <Code className="w-3.5 h-3.5" />
              <span>Scratch 3.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* STUDENT ACCESS PANEL */}
        <div
          id="portal-student"
          className="lg:col-span-7 bg-white rounded-3xl p-8 border border-emerald-100 shadow-xs flex flex-col justify-between space-y-6"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 text-2xl font-bold select-none">
                👦
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 title-font">Khu vực Học Sinh</h2>
                <p className="text-xs font-bold text-slate-400">NHẬP THÔNG TIN VÀ CHƠI ÔN TẬP</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Họ và tên của em:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-sky-500 rounded-2xl font-bold text-xs text-slate-700 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Lớp học của em:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <Users className="w-4 h-4" />
                  </span>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-sky-500 rounded-2xl font-bold text-xs text-slate-700 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="5A1">Lớp 5A1</option>
                    <option value="5A2">Lớp 5A2</option>
                    <option value="5A3">Lớp 5A3</option>
                    <option value="5A4">Lớp 5A4</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Avatar Selectors */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3">Chọn Avatar yêu thích:</label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
                {AVATARS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`text-2xl p-2 rounded-2xl hover:scale-110 transition-transform cursor-pointer ${
                      selectedAvatar === emoji
                        ? 'bg-sky-50 border-2 border-sky-500'
                        : 'bg-slate-50 border-2 border-transparent'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification / Mode Select */}
            <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100/80">
              <h3 className="text-xs font-bold text-sky-800 mb-3 flex items-center space-x-1.5">
                <Gamepad2 className="w-4 h-4" />
                <span>Mã ôn tập đặc biệt & Tự luyện</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Mã ôn thi giáo viên giao (nếu có):</label>
                  <input
                    type="text"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                    placeholder="Ví dụ: VINAPASS"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold uppercase tracking-wider text-slate-700 text-center focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleQuickPractice}
                    className="w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 text-xs cursor-pointer"
                  >
                    <Dices className="w-4 h-4" />
                    <span>Học sinh tự do chơi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStudentSubmit}
            className="w-full py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-md transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <PlayCircle className="w-5 h-5" />
            <span>XÁC NHẬN THÔNG TIN & ÔN LUYỆN 🚀</span>
          </button>
        </div>

        {/* TEACHER ACCELERATOR PANEL */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-emerald-100 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl font-bold select-none">
                👩‍🏫
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 title-font">Góc Giáo Viên</h2>
                <p className="text-xs font-bold text-emerald-600">THIẾT LẬP NHANH ĐỀ ÔN TẬP THÔNG MINH</p>
              </div>
            </div>

            {/* Quick Indicators inside card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-center">
                <span className="text-3xl font-black text-emerald-600">{questionsCount}</span>
                <p className="text-[10px] font-bold text-slate-500 mt-1">Câu hỏi ngân hàng</p>
              </div>
              <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 text-center">
                <span className="text-3xl font-black text-sky-600">4</span>
                <p className="text-[10px] font-bold text-slate-500 mt-1">Danh hiệu đạt được</p>
              </div>
            </div>

            {/* Form generator parameters */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 flex items-center space-x-1.5 border-b border-slate-100 pb-1.5">
                <RotateCw className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span>Bộ tạo đề tự động</span>
              </h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Chủ đề mong muốn:</label>
                <select
                  value={quickTopic}
                  onChange={(e) => setQuickTopic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <option value="Tất cả">Tất cả các chủ đề (Tổng hợp)</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Số câu (3 - 15):</label>
                  <input
                    type="number"
                    min={3}
                    max={15}
                    value={quickCount}
                    onChange={(e) => setQuickCount(Math.max(3, Math.min(15, parseInt(e.target.value) || 3)))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Thời gian (phút):</label>
                  <input
                    type="number"
                    min={1}
                    max={45}
                    value={quickTime}
                    onChange={(e) => setQuickTime(Math.max(1, Math.min(45, parseInt(e.target.value) || 1)))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleQuickGen}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            <span>SINH ĐỀ CẤP TỐC & PHÁT HÀNH ĐỀ 🌟</span>
          </button>
        </div>
      </div>

      {/* Curriculum review cards */}
      <div className="space-y-6 pt-4 font-bold">
        <h3 className="text-2xl font-black text-slate-800 title-font text-center lg:text-left flex items-center justify-center lg:justify-start space-x-2">
          <Layers className="text-sky-500 w-5 h-5 mr-1" />
          <span>Nội Dung Trọng Tâm Tin Học 5 (Lớp 5 - GDPT 2018)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-sky-100/80 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 text-xl font-bold mb-4 select-none">
              💻
            </div>
            <h4 class="font-extrabold text-slate-800 text-sm mb-1">Thông tin & Lưu Trữ</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Khám phá các thiết bị lưu trữ ngoài, khái niệm tệp, thư mục, tổ chức bộ nhớ ngăn nắp trong máy tính.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-emerald-100/80 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 text-xl font-bold mb-4 select-none">
              🌐
            </div>
            <h4 class="font-extrabold text-slate-800 text-sm mb-1">Mạng & Internet</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Kỹ năng khai thác tài nguyên học tập trên mạng Internet thông minh, cách phòng tránh thông tin xấu độc hại.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-amber-100/80 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl font-bold mb-4 select-none">
              🐈
            </div>
            <h4 class="font-extrabold text-slate-800 text-sm mb-1">Scratch 3.0 Cơ Bản</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Thành thạo lập trình chuyển động, lặp vô hạn 'forever', câu lệnh điều kiện 'if-then' rẽ nhánh thông minh.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-purple-100/80 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-xl font-bold mb-4 select-none">
              📧
            </div>
            <h4 class="font-extrabold text-slate-800 text-sm mb-1">Thư điện tử (Email)</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Tạo thói quen nhận gửi email trao đổi bài học văn minh, chèn file bài làm gửi cô giáo an toàn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
