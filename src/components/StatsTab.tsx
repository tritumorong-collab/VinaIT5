import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, Trophy, Medal } from 'lucide-react';
import { ClassHistoryItem } from '../types';

interface StatsTabProps {
  classHistory: ClassHistoryItem[];
}

export default function StatsTab({ classHistory }: StatsTabProps) {
  const [selectedClass, setSelectedClass] = useState('5A1');

  const filteredHistory = classHistory.filter((item) => item.class === selectedClass);

  // Compute stats
  const totalAttempts = filteredHistory.length;
  let passCount = 0;
  let totalScore = 0;
  let highestScore = 0;
  let brackets = [0, 0, 0, 0, 0]; // [0-2], [3-4], [5-6], [7-8], [9-10]

  filteredHistory.forEach((h) => {
    totalScore += h.score;
    if (h.score > highestScore) highestScore = h.score;
    if (h.score >= 5.0) passCount++;

    if (h.score <= 2.0) brackets[0]++;
    else if (h.score <= 4.0) brackets[1]++;
    else if (h.score <= 6.0) brackets[2]++;
    else if (h.score <= 8.0) brackets[3]++;
    else brackets[4]++;
  });

  const avgScore = totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(1) : '0.0';
  const passRatio = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

  // Sorted list for leaderboard
  const sortedLeaderboard = [...filteredHistory]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const maxBracketValue = Math.max(...brackets, 1);

  return (
    <div className="space-y-6 font-bold">
      {/* Title Controls Box */}
      <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl select-none">📊</span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 title-font">Bảng Thống Kê & Xếp Hạng</h2>
            <p className="text-xs font-bold text-slate-400">PHÂN TÍCH ĐIỂM SỐ VÀ TIẾN ĐỘ LỚP HỌC</p>
          </div>
        </div>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
        >
          <option value="5A1">Lớp 5A1</option>
          <option value="5A2">Lớp 5A2</option>
          <option value="5A3">Lớp 5A3</option>
          <option value="5A4">Lớp 5A4</option>
        </select>
      </div>

      {/* Numerical Quick Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100 text-center">
          <span className="text-4xl font-black text-emerald-600">{passRatio}%</span>
          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Tỷ Lệ Đạt (≥ 5.0)</p>
        </div>
        <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 p-6 rounded-2xl border border-sky-100 text-center">
          <span className="text-4xl font-black text-sky-600">{avgScore}</span>
          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Điểm Trung Bình Lớp</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-2xl border border-purple-100 text-center">
          <span className="text-4xl font-black text-purple-600">{totalAttempts}</span>
          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Lượt Làm Bài</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-100 text-center">
          <span className="text-4xl font-black text-amber-600">{highestScore.toFixed(1)}</span>
          <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-wide">Điểm Cao Nhất</p>
        </div>
      </div>

      {/* Visual Chart and Leaderboards Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dynamic Responsive SVG Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center space-x-2 select-none">
            <BarChart3 className="w-5 h-5 text-sky-500" />
            <span>Phổ Điểm Ôn Tập (Biểu đồ phân phối)</span>
          </h3>

          <div className="w-full h-64 bg-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col justify-between">
            {totalAttempts === 0 ? (
              <div className="flex-grow flex items-center justify-center font-bold text-slate-400 text-xs">
                Chưa có dữ liệu làm bài nào ở lớp {selectedClass}!
              </div>
            ) : (
              <div className="flex-grow flex items-end justify-around relative px-4 text-xs select-none">
                {brackets.map((count, i) => {
                  const pct = (count / maxBracketValue) * 100;
                  const labels = ['0-2', '3-4', '5-6', '7-8', '9-10'];

                  return (
                    <div key={i} className="flex flex-col items-center w-full group relative">
                      {/* Tooltip on hover */}
                      <span className="absolute -top-10 bg-slate-800 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                        {count} lượt ({Math.round(totalAttempts > 0 ? (count / totalAttempts) * 100 : 0)}%)
                      </span>

                      {/* Filled Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(pct, 8)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-12 bg-gradient-to-t from-emerald-500 to-sky-450 rounded-t-lg transition-all"
                      ></motion.div>

                      <span className="text-[10px] font-black text-slate-500 mt-2">
                        {count} bài
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-t border-slate-200 pt-3 flex justify-around text-[10px] font-black text-slate-400 select-none">
              <span>Điểm 0-2</span>
              <span>Điểm 3-4</span>
              <span>Điểm 5-6</span>
              <span>Điểm 7-8</span>
              <span>Điểm 9-10</span>
            </div>
          </div>
        </div>

        {/* Dynamic Leaderboards */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center space-x-2 select-none">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Bảng Xếp Hạng Lớp</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {sortedLeaderboard.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold text-center py-10">Chưa có bảng xếp hạng.</p>
            ) : (
              sortedLeaderboard.map((item, index) => {
                let badgeNode = <Medal className="w-5 h-5 text-slate-400" />;
                if (index === 0) badgeNode = <span className="text-xl">🥇</span>;
                if (index === 1) badgeNode = <span className="text-xl">🥈</span>;
                if (index === 2) badgeNode = <span className="text-xl">🥉</span>;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/50 rounded-2xl border border-slate-200/50 transition-all font-bold"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        {badgeNode}
                      </div>
                      <div className="text-left leading-tight">
                        <h4 className="font-bold text-xs text-slate-800 limit-text">{item.name}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          {item.tier}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-600 block shrink-0">{item.score.toFixed(1)} đ</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
