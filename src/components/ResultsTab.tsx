import React from 'react';
import { Award, Check, X, GraduationCap } from 'lucide-react';
import { Question, RewardBadge } from '../types';

interface ResultsTabProps {
  score: number | null;
  correctCount: number;
  totalQuestions: number;
  studentName: string;
  avatar: string;
  activeQuiz: Question[];
  userAnswers: Record<number, string>;
  showExplanations: boolean;
  onGoToQuiz: () => void;
}

export default function ResultsTab({
  score,
  correctCount,
  totalQuestions,
  studentName,
  avatar,
  activeQuiz,
  userAnswers,
  showExplanations,
  onGoToQuiz,
}: ResultsTabProps) {
  if (score === null) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-sky-100 shadow-xs text-center max-w-xl mx-auto space-y-5">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-5xl select-none">
          📊
        </div>
        <h3 className="text-3xl font-extrabold text-slate-800 title-font">Chưa có kết quả làm bài</h3>
        <p className="text-slate-500 font-medium">
          Sau khi em hoàn thành và nộp bài ôn tập, bảng điểm chi tiết, huy hiệu phần thưởng và phân tích đáp án sẽ hiển thị ở đây!
        </p>
        <button
          onClick={onGoToQuiz}
          className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          LÀM BÀI ÔN TẬP NGAY
        </button>
      </div>
    );
  }

  // Evaluate tier title and badge rewards based on computed final score
  let badgeList: RewardBadge[] = [];
  let tier = 'Mầm non Công nghệ';

  if (score === 10) {
    badgeList.push({
      name: 'Trạng Nguyên VinaIT 🏆',
      desc: 'Đạt điểm tối đa xuất sắc!',
      icon: '👑',
      color: 'from-amber-400 to-yellow-500',
    });
    badgeList.push({
      name: 'Siêu Nhân Scratch 🐱',
      desc: 'Thành thạo lập trình lớp 5',
      icon: '🐈',
      color: 'from-orange-400 to-amber-500',
    });
    tier = 'Trạng nguyên VinaIT';
  } else if (score >= 8) {
    badgeList.push({
      name: 'Sứ giả Thông tin 💎',
      desc: 'Lý thuyết vững vàng xuất sắc',
      icon: '🌐',
      color: 'from-sky-400 to-indigo-500',
    });
    tier = 'Hiệp sĩ Công nghệ';
  } else if (score >= 5) {
    badgeList.push({
      name: 'Chiến binh Công nghệ 🛡️',
      desc: 'Có kỹ năng máy tính tốt',
      icon: '💻',
      color: 'from-emerald-400 to-teal-500',
    });
    tier = 'Chiến binh Công nghệ';
  } else {
    badgeList.push({
      name: 'Hạt giống Công nghệ 🌱',
      desc: 'Cố gắng nhiều hơn em nhé!',
      icon: '💡',
      color: 'from-slate-400 to-slate-500',
    });
    tier = 'Mầm non Công nghệ';
  }

  return (
    <div className="space-y-8 font-bold">
      {/* Visual score banner */}
      <div className="bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-500 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl"></div>

        <div className="flex items-center space-x-6 relative z-10 text-center md:text-left flex-col md:flex-row gap-4">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-5xl border-2 border-white/30 select-none">
            {avatar}
          </div>
          <div className="space-y-1">
            <span className="bg-white/20 px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase">
              {tier}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black title-font tracking-tight">{studentName}</h3>
            <p className="text-sky-100 text-xs font-semibold">Cố gắng hết mình học tốt nâng cao kiến thức!</p>
          </div>
        </div>

        {/* Double metrics details */}
        <div className="flex items-center space-x-4 relative z-10">
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[100px]">
            <span className="text-4xl font-black text-yellow-300">{score.toFixed(1)}</span>
            <p className="text-[10px] font-bold text-sky-100 mt-1 uppercase tracking-wider">Điểm Số</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[100px]">
            <span className="text-4xl font-black text-emerald-300">
              {correctCount}/{totalQuestions}
            </span>
            <p className="text-[10px] font-bold text-sky-100 mt-1 uppercase tracking-wider">Số câu đúng</p>
          </div>
        </div>
      </div>

      {/* Rewards list */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500 animate-bounce" />
          <span>Huy Hiệu Ghi Nhận Thành Tích</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badgeList.map((badge, i) => (
            <div
              key={i}
              className={`bg-gradient-to-tr ${badge.color} text-white p-4 rounded-2xl text-center shadow-xs relative transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-3xl mb-1 select-none">{badge.icon}</div>
              <h4 className="font-extrabold text-xs tracking-tight">{badge.name}</h4>
              <p className="text-[9px] text-white/85 leading-relaxed mt-1 font-semibold">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown review card list */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 border-b border-slate-100 pb-4">
          Chi Tiết Bài Làm Của Em
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {activeQuiz.map((q, i) => {
            const userAnswer = userAnswers[i] || 'Chưa làm';
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 space-y-3 ${
                  isCorrect
                    ? 'bg-emerald-50/20 border-emerald-200'
                    : 'bg-rose-50/10 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black tracking-wider uppercase flex items-center space-x-1 ${
                      isCorrect ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isCorrect ? <Check className="w-4.5 h-4.5 mr-0.5 inline" /> : <X className="w-4.5 h-4.5 mr-0.5 inline" />}
                    <span>{isCorrect ? '✓ CÂU TRẢ LỜI ĐÚNG' : '✗ CÂU TRẢ LỜI SAI'}</span>
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase">{q.category}</span>
                </div>

                <h4 className="font-bold text-slate-850 text-sm sm:text-base leading-relaxed">
                  Câu {i + 1}: {q.text}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                  {['A', 'B', 'C', 'D'].map((letter) => {
                    const isOptionCorrect = q.correct === letter;
                    const isOptionSelected = userAnswer === letter;

                    let optBg = 'bg-white border-slate-100';
                    if (isOptionCorrect) {
                      optBg = 'bg-emerald-400/10 border-emerald-300 text-emerald-800';
                    } else if (isOptionSelected) {
                      optBg = 'bg-rose-400/10 border-rose-300 text-rose-800';
                    }

                    return (
                      <div
                        key={letter}
                        className={`p-3 rounded-xl border font-semibold ${optBg}`}
                      >
                        <span className="font-bold text-slate-400 mr-1.5">{letter}.</span>
                        {q[letter as 'A' | 'B' | 'C' | 'D']}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white/70 p-3 rounded-xl border border-slate-150/80 text-xs font-semibold text-slate-700">
                  <div>
                    <span className="text-slate-500">Đã chọn:</span>{' '}
                    <span className={`font-black uppercase mr-4 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {userAnswer}
                    </span>
                    <span className="text-slate-500">Đáp án đúng:</span>{' '}
                    <span className="font-black text-emerald-600 uppercase">{q.correct}</span>
                  </div>
                </div>

                {showExplanations && (
                  <p className="text-xs text-sky-700 italic bg-sky-50 p-2.5 rounded-xl border border-sky-100/50 leading-relaxed">
                    <GraduationCap className="w-4 h-4 mr-1 inline -mt-0.5 text-sky-600" />
                    <strong>Lời giải:</strong> {q.explain}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
