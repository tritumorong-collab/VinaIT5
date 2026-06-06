import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, ArrowLeft, ArrowRight, Send, Info, AlertTriangle } from 'lucide-react';
import { Question } from '../types';

interface QuizTabProps {
  quizActive: boolean;
  timeRemaining: number;
  activeQuiz: Question[];
  currentQuizIndex: number;
  userAnswers: Record<number, string>;
  onStartQuiz: () => void;
  onSelectOption: (option: string) => void;
  onJumpToQuestion: (index: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmitQuiz: () => void;
}

export default function QuizTab({
  quizActive,
  timeRemaining,
  activeQuiz,
  currentQuizIndex,
  userAnswers,
  onStartQuiz,
  onSelectOption,
  onJumpToQuestion,
  onNextQuestion,
  onPrevQuestion,
  onSubmitQuiz,
}: QuizTabProps) {
  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizActive) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-sky-100 shadow-xs text-center max-w-xl mx-auto space-y-6">
        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-5xl">🎮</div>
        <h3 className="text-3xl font-extrabold text-slate-800 title-font">Sẵn sàng ôn tập chưa nào?</h3>
        <p className="text-slate-500 font-medium">
          Nhấp nút phía dưới để bắt đầu làm bài ngẫu nhiên từ ngân hàng câu hỏi. Có hệ thống tính giờ và tự động nộp bài khi hết giờ tích hợp!
        </p>
        <button
          onClick={onStartQuiz}
          className="px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-sky-300 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-sky-400/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer"
        >
          <Play className="w-5 h-5 animate-pulse" />
          <span>BẮT ĐẦU NGAY THÔI!</span>
        </button>
      </div>
    );
  }

  const currentQuestion = activeQuiz[currentQuizIndex];
  if (!currentQuestion) return null;

  const fillPercent = ((currentQuizIndex + 1) / activeQuiz.length) * 100;
  const isLastQuestion = currentQuizIndex === activeQuiz.length - 1;

  // Level label color helper
  const getLevelBadgeClass = (lvl: string) => {
    if (lvl === 'Nhận biết') return 'bg-emerald-500 text-white';
    if (lvl === 'Thông hiểu') return 'bg-sky-500 text-white';
    return 'bg-amber-500 text-white';
  };

  return (
    <div id="quiz-active" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Question & Option Answers */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
        {/* Progress bar and Clock timer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-3">
            <span className="text-2xl select-none">🔥</span>
            <div>
              <span className="text-lg font-black text-slate-800">
                Câu {currentQuizIndex + 1} / {activeQuiz.length}
              </span>
              <p className="text-[10px] font-extrabold text-sky-600 tracking-wider">
                CHỦ ĐỀ: {currentQuestion.category.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-500 h-full transition-all duration-300"
              style={{ width: `${fillPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 px-4 py-2 rounded-2xl text-rose-600 font-extrabold animate-pulse">
            <Clock className="w-4 h-4" />
            <span id="quiz-timer" className="text-sm tracking-wider">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Question Text card */}
        <div className="bg-gradient-to-r from-sky-50/50 to-emerald-50/20 p-6 rounded-2xl border border-sky-100/30">
          <span
            className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-full mb-3 tracking-wider ${getLevelBadgeClass(
              currentQuestion.level
            )}`}
          >
            {currentQuestion.level.toUpperCase()}
          </span>
          <h3 className="text-base sm:text-lg font-extrabold leading-relaxed text-slate-800">
            {currentQuestion.text}
          </h3>
        </div>

        {/* Options Answers */}
        <div className="grid grid-cols-1 gap-4 font-bold text-slate-700">
          {['A', 'B', 'C', 'D'].map((letter) => {
            const isSelected = userAnswers[currentQuizIndex] === letter;
            const textValue = currentQuestion[letter as 'A' | 'B' | 'C' | 'D'];

            return (
              <button
                key={letter}
                onClick={() => onSelectOption(letter)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center space-x-4 group cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all border ${
                    isSelected
                      ? 'bg-white text-sky-600 border-transparent'
                      : 'bg-white text-slate-500 border-slate-200 group-hover:bg-sky-500 group-hover:text-white group-hover:border-transparent'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-xs sm:text-sm flex-1 font-semibold">{textValue}</span>
              </button>
            );
          })}
        </div>

        {/* Next / Back navigation controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <button
            onClick={onPrevQuestion}
            disabled={currentQuizIndex === 0}
            className={`px-5 py-3 rounded-2xl transition-all flex items-center space-x-1.5 font-bold text-xs cursor-pointer ${
              currentQuizIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          {!isLastQuestion ? (
            <button
              onClick={onNextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-extrabold rounded-2xl shadow-xs transition-all flex items-center space-x-1.5 text-xs cursor-pointer"
            >
              <span>Tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="submit-exam-btn"
              onClick={onSubmitQuiz}
              className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center space-x-1.5 text-xs cursor-pointer"
            >
              <Send className="w-4 h-4 animate-bounce" />
              <span>Nộp Bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Question Navigation Grid */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-6 self-start font-bold">
        <h3 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-3 flex items-center space-x-1.5 select-none">
          <Info className="w-4 h-4 text-sky-500" />
          <span>Bản Đồ Câu Hỏi</span>
        </h3>

        <div className="grid grid-cols-5 gap-2.5">
          {activeQuiz.map((_, idx) => {
            const hasAnswered = userAnswers[idx] !== undefined;
            const isActive = idx === currentQuizIndex;

            let indicatorClass = 'bg-white border-slate-200 text-slate-600';
            if (isActive) {
              indicatorClass = 'bg-sky-500 border-sky-500 text-white shadow-md scale-105 font-extrabold';
            } else if (hasAnswered) {
              indicatorClass = 'bg-emerald-500 border-emerald-500 text-white font-extrabold';
            }

            return (
              <button
                key={idx}
                id={`quiz-map-btn-${idx}`}
                onClick={() => onJumpToQuestion(idx)}
                className={`w-10 h-10 border-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${indicatorClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
          <h4 className="text-[10px] font-bold text-slate-400 tracking-wider">CHÚ THÍCH BẢN ĐỒ</h4>
          <div className="flex items-center space-x-2.5 text-xs text-slate-600 font-bold">
            <span className="w-4.5 h-4.5 bg-emerald-500 rounded-md"></span>
            <span>Đã chọn đáp án</span>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-slate-600 font-bold">
            <span className="w-4.5 h-4.5 bg-sky-500 rounded-md"></span>
            <span>Đang xem</span>
          </div>
          <div className="flex items-center space-x-2.5 text-xs text-slate-600 font-bold">
            <span className="w-4.5 h-4.5 bg-white border border-slate-200 rounded-md"></span>
            <span>Chưa làm</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-2 select-none">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[10px] font-bold text-amber-800 leading-relaxed">
            Em có thể nhấp trực tiếp vào ô số bản đồ ở trên để chuyển nhanh đến câu hỏi đó bất cứ lúc nào!
          </p>
        </div>
      </div>
    </div>
  );
}
