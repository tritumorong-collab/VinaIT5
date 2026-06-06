import React from 'react';
import {
  Monitor,
  Home,
  Gamepad2,
  Database,
  BarChart2,
  TrendingUp,
  GraduationCap,
  Sliders,
  Volume2,
  VolumeX,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tabId: string) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  studentName: string;
  studentClass: string;
  avatar: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  isSoundEnabled,
  onToggleSound,
  studentName,
  studentClass,
  avatar,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: HeaderProps) {
  const tabs = [
    { id: 'trangchu', label: 'Trang chủ', icon: Home },
    { id: 'ontap', label: 'Luyện tập', icon: Gamepad2 },
    { id: 'nganhang', label: 'Ngân hàng đề', icon: Database },
    { id: 'ketqua', label: 'Kết quả của em', icon: BarChart2 },
    { id: 'thongke', label: 'Thống kê lớp', icon: TrendingUp },
    { id: 'baocao', label: 'Báo cáo học tập', icon: GraduationCap },
    { id: 'caidat', label: 'Cài đặt', icon: Sliders },
  ];

  return (
    <header className="bg-white border-b border-emerald-100 shadow-xs sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => onTabChange('trangchu')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="bg-gradient-to-tr from-sky-500 to-emerald-500 p-2.5 rounded-2xl shadow-sm transform group-hover:scale-105 transition-transform duration-300">
              <Monitor className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="title-font text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                VinaIT 5
              </span>
              <p className="text-[10px] font-extrabold text-emerald-600 tracking-wider">
                TIN HỌC LỚP 5 - GDPT 2018
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100/80">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls & Student Badge */}
          <div className="flex items-center space-x-3">
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                isSoundEnabled
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-100'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-100'
              }`}
              title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {studentName && studentName !== 'Học sinh ẩn danh' && (
              <div className="hidden md:flex items-center space-x-2.5 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 px-4 py-2 rounded-2xl border border-emerald-500/20">
                <span className="text-xl">{avatar}</span>
                <div className="text-left font-bold">
                  <p className="text-xs text-slate-700 leading-tight limit-text">
                    {studentName}
                  </p>
                  <p className="text-[10px] text-emerald-600">
                    Lớp: {studentClass}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileMenu}
              className="xl:hidden p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-700 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
          <div className="px-4 py-3 space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    onToggleMobileMenu();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center space-x-3 transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
