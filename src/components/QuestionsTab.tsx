import React, { useState } from 'react';
import { PlusCircle, Search, Trash2 } from 'lucide-react';
import { Question } from '../types';
import { TOPICS, LEVELS } from '../data';

interface QuestionsTabProps {
  questions: Question[];
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  onDeleteQuestion: (id: number) => void;
  onOpenAddModal: () => void;
}

export default function QuestionsTab({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onOpenAddModal,
}: QuestionsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || q.category === selectedTopic;
    const matchesLevel = selectedLevel === 'All' || q.level === selectedLevel;

    return matchesSearch && matchesTopic && matchesLevel;
  });

  const getLevelBadgeClass = (lvl: string) => {
    if (lvl === 'Nhận biết') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (lvl === 'Thông hiểu') return 'bg-sky-50 text-sky-600 border-sky-100';
    return 'bg-amber-50 text-amber-600 border-amber-100';
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="text-3xl select-none">📂</span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 title-font">Ngân Hàng Câu Hỏi</h2>
            <p className="text-xs font-bold text-slate-400">BỘ CÂU HỎI CHUẨN KHUNG GDPT 2018 TIN HỌC 5</p>
          </div>
        </div>

        <button
          onClick={onOpenAddModal}
          className="w-full md:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Thêm Câu Hỏi Mới</span>
        </button>
      </div>

      {/* Filter box controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">Tìm kiếm từ khóa:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Gõ từ khóa tìm câu hỏi..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">Lọc theo chuyên đề:</label>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">Tất cả chủ đề</option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">Lọc theo mức độ:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">Tất cả mức độ</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preloaded / Dynamic List of questions */}
      <div className="grid grid-cols-1 gap-5">
        {filteredQuestions.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-3xl border border-slate-100/60 font-bold">
            <p className="text-slate-400 text-sm">Không tìm thấy câu hỏi nào thỏa mãn bộ lọc!</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 relative overflow-hidden group font-bold"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] border border-sky-100 uppercase tracking-wider">
                    {q.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] border uppercase tracking-wider ${getLevelBadgeClass(
                      q.level
                    )}`}
                  >
                    {q.level}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteQuestion(q.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors border border-rose-100 opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
                  title="Xóa câu hỏi này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-relaxed">
                Câu hỏi {idx + 1}: {q.text}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold leading-relaxed">
                <p>
                  <span className="font-black text-slate-400 mr-1.5">A.</span> {q.A}
                </p>
                <p>
                  <span className="font-black text-slate-400 mr-1.5">B.</span> {q.B}
                </p>
                <p>
                  <span className="font-black text-slate-400 mr-1.5">C.</span> {q.C}
                </p>
                <p>
                  <span className="font-black text-slate-400 mr-1.5">D.</span> {q.D}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold">
                <span className="text-emerald-600">Đáp án đúng nhất: {q.correct}</span>
                <span className="text-slate-400">
                  Lời giải: <span className="font-normal text-slate-500 italic">{q.explain}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
