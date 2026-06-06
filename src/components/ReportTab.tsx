import React, { useState } from 'react';
import { FileSpreadsheet, Printer, Search, Eye } from 'lucide-react';
import { ClassHistoryItem } from '../types';

interface ReportTabProps {
  classHistory: ClassHistoryItem[];
  onViewStudentDetail: (name: string) => void;
}

export default function ReportTab({ classHistory, onViewStudentDetail }: ReportTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = classHistory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSV Mock Exporter matching original behavior
  const handleExportCSV = () => {
    let csvContent = '\uFEFF'; // UTF-8 BOM
    csvContent += 'Học sinh,Lớp,Chủ đề,Đúng/Tổng,Điểm số,Xếp loại,Ngày làm\n';

    classHistory.forEach((r) => {
      csvContent += `"${r.name}","${r.class}","${r.category}","${r.correct}","${r.score}","${r.tier}","${r.date}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VinaIT_5_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 8.0) return 'text-emerald-600';
    if (score >= 5.0) return 'text-sky-600';
    return 'text-rose-500';
  };

  return (
    <div className="space-y-6 font-bold">
      {/* Header Panel with Export Buttons */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl select-none">📋</span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 title-font">Báo Cáo Tiến Bộ Học Sinh</h2>
            <p className="text-xs font-bold text-slate-400">DANH SÁCH CHI TIẾT VÀ XUẤT BÁO CÁO ĐỊNH KỲ</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            id="export-excel-btn"
            onClick={handleExportCSV}
            className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="flex-1 md:flex-none px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In báo cáo</span>
          </button>
        </div>
      </div>

      {/* Details List Attempts Grid & Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Table controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-850 text-base sm:text-lg">Danh Sách Lịch Sử Ôn Tập Lớp</h3>
            <p className="text-slate-400 font-semibold text-xs leading-none">Hiển thị các lần ôn tập, kiểm tra gần nhất của học sinh</p>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm HS, lớp, hoặc chủ đề..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-sky-500 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-bold text-xs select-none">
              Không tìm thấy kết quả lịch sử ôn tập nào!
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Học sinh</th>
                  <th className="py-4 px-6 text-center">Lớp</th>
                  <th className="py-4 px-6">Chủ đề</th>
                  <th className="py-4 px-6 text-center">Số câu đúng</th>
                  <th className="py-4 px-6 text-center">Điểm số</th>
                  <th className="py-4 px-6 text-center">Xếp loại danh hiệu</th>
                  <th className="py-4 px-6 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {filteredHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 flex items-center space-x-3 font-extrabold text-slate-800">
                      <span className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sm select-none">
                        👦
                      </span>
                      <span className="limit-text max-w-[150px]">{item.name}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500">{item.class}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] border border-sky-100 block w-fit">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600">{item.correct}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-base font-black ${getScoreColorClass(item.score)}`}>
                        {item.score.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-black uppercase rounded-full border border-amber-100 whitespace-nowrap">
                        {item.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onViewStudentDetail(item.name)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] tracking-tight font-bold transition-all flex items-center space-x-1 ml-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem HS</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
