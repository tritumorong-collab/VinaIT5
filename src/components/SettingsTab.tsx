import React, { useState, useEffect } from 'react';
import { Users, ToggleRight } from 'lucide-react';

interface SettingsTabProps {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  showExplanations: boolean;
  onToggleExplanations: () => void;
  shuffleQuestions: boolean;
  onToggleShuffle: () => void;
  classes: Record<string, string[]>;
  onUpdateClassRoster: (classId: string, studentNames: string[]) => void;
}

export default function SettingsTab({
  isSoundEnabled,
  onToggleSound,
  showExplanations,
  onToggleExplanations,
  shuffleQuestions,
  onToggleShuffle,
  classes,
  onUpdateClassRoster,
}: SettingsTabProps) {
  const [selectedClassId, setSelectedClassId] = useState('5A1');
  const [rosterText, setRosterText] = useState('');

  // Sychronize roster editor with state values
  useEffect(() => {
    const roster = classes[selectedClassId] || [];
    setRosterText(roster.join('\n'));
  }, [selectedClassId, classes]);

  const handleSaveRoster = () => {
    const names = rosterText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    
    onUpdateClassRoster(selectedClassId, names);
  };

  return (
    <div className="space-y-6 font-bold">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center space-x-3">
        <span className="text-3xl select-none">⚙️</span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 title-font">Cài Đặt Hệ Thống</h2>
          <p className="text-xs font-bold text-slate-400">QUẢN TRỊ CẤU HÌNH CHO GIÁO VIÊN VÀ HỌC SINH</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-slate-700">
        {/* Class Roster Editor */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2 select-none">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Quản Lý Danh Sách Lớp Học</span>
          </h3>
          <p className="text-xs text-slate-400 font-semibold leading-relaxed">
            Giáo viên có thể thiết lập bổ sung danh sách học sinh (mỗi tên một dòng) phục vụ chọn hồ sơ tên đăng nhập nhanh khi ôn thi tập thể tại phòng máy.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Chọn lớp điều chỉnh:</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none transition-all cursor-pointer"
              >
                <option value="5A1">Lớp 5A1</option>
                <option value="5A2">Lớp 5A2</option>
                <option value="5A3">Lớp 5A3</option>
                <option value="5A4">Lớp 5A4</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Danh sách học sinh lớp {selectedClassId}:</label>
              <textarea
                value={rosterText}
                onChange={(e) => setRosterText(e.target.value)}
                rows={6}
                placeholder="Nguyễn Văn An&#10;Lê Thị Bình..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSaveRoster}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-all shadow-xs cursor-pointer"
            >
              CẬP NHẬT DANH SÁCH LỚP
            </button>
          </div>
        </div>

        {/* Feature Switches Toggle Options */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center space-x-2 select-none">
            <ToggleRight className="w-5 h-5 text-sky-600" />
            <span>Tùy Chọn Trải Nghiệm Học Tập</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
              <div className="leading-tight">
                <h4 className="font-extrabold text-xs text-slate-800 sm:text-sm">Âm thanh sinh động</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Phát các hiệu ứng beeps khi click chọn đúng, rớt thành tích, v.v.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isSoundEnabled}
                  onChange={onToggleSound}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
              <div className="leading-tight">
                <h4 className="font-extrabold text-xs text-slate-800 sm:text-sm">Hiển thị giải thích câu trả lời</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Tự hiển thị đáp án và lý giải chi tiết sau khi nộp bài thi.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showExplanations}
                  onChange={onToggleExplanations}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
              <div className="leading-tight">
                <h4 className="font-extrabold text-xs text-slate-800 sm:text-sm">Xáo trộn câu hỏi ngẫu nhiên</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Xáo trộn các câu hỏi và các lựa chọn giúp chống chép bài lẫn nhau.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={onToggleShuffle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
