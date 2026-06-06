import React, { useState, useEffect, useRef } from 'react';
import {
  BASE_QUESTIONS,
  INITIAL_CLASS_HISTORY,
  INITIAL_CLASSES,
} from './data';
import { Question, ClassHistoryItem } from './types';
import { playBeep } from './utils/audio';

import Header from './components/Header';
import HomeTab from './components/HomeTab';
import QuizTab from './components/QuizTab';
import QuestionsTab from './components/QuestionsTab';
import ResultsTab from './components/ResultsTab';
import StatsTab from './components/StatsTab';
import ReportTab from './components/ReportTab';
import SettingsTab from './components/SettingsTab';
import AddQuestionModal from './components/AddQuestionModal';
import NotificationModal from './components/NotificationModal';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState('trangchu');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Datasets State
  const [questions, setQuestions] = useState<Question[]>(BASE_QUESTIONS);
  const [classHistory, setClassHistory] = useState<ClassHistoryItem[]>(INITIAL_CLASS_HISTORY);
  const [classes, setClasses] = useState<Record<string, string[]>>(INITIAL_CLASSES);

  // Student Profile
  const [studentName, setStudentName] = useState('Học sinh ẩn danh');
  const [studentClass, setStudentClass] = useState('5A1');
  const [avatar, setAvatar] = useState('🚀');

  // Quiz Engine States
  const [quizActive, setQuizActive] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Question[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes default
  
  // Results
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Settings
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);

  // Modals Controller
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    icon: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    icon: '🎉',
  });

  // Reference for Timer Interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Custom alert display wrapper
  const triggerNotification = (title: string, description: string, icon = '🎉') => {
    setNotification({
      isOpen: true,
      title,
      description,
      icon,
    });
  };

  // Fisher-Yates array shuffler helper
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const list = [...arr];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  // Start examination countdown timer cycle
  useEffect(() => {
    if (quizActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizActive]);

  // Handle auto score submission when timer reaches zero
  const handleAutoSubmit = () => {
    handleSubmitQuiz(true);
  };

  // Launch fresh test session from student choices or teacher presets
  const handleStartQuiz = (options?: {
    name: string;
    studentClass: string;
    avatar: string;
    testCode: string;
    customPool?: boolean;
    topicFilter?: string;
    count?: number;
    timeLimit?: number;
  }) => {
    if (options) {
      setStudentName(options.name);
      setStudentClass(options.studentClass);
      setAvatar(options.avatar);
    }

    // Refresh Quiz Session State
    let pool = [...questions];
    if (options?.customPool && options.topicFilter && options.topicFilter !== 'Tất cả') {
      pool = pool.filter((q) => q.category === options.topicFilter);
    }

    if (pool.length === 0) {
      triggerNotification('Không đủ câu hỏi', 'Không tìm thấy câu hỏi nào phù hợp với bộ lọc chủ đề này!', '⚠️');
      return;
    }

    if (shuffleQuestions) {
      pool = shuffleArray(pool);
    }

    const testCount = options?.count || 10;
    const finalSelectedQuestions = pool.slice(0, Math.min(testCount, pool.length));

    setActiveQuiz(finalSelectedQuestions);
    setCorrectCount(0);
    setFinalScore(null);
    setUserAnswers({});
    setCurrentQuizIndex(0);
    setTimeRemaining((options?.timeLimit || 10) * 60);
    setQuizActive(true);
    setCurrentTab('ontap');
  };

  // Record user selection options with sounds play feedback
  const handleSelectOption = (letter: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuizIndex]: letter,
    }));
    playBeep('correct', isSoundEnabled);
  };

  // Navigate back to quiz
  const handleGoToQuiz = () => {
    setCurrentTab('ontap');
  };

  // Process final answers scorecard
  const handleSubmitQuiz = (isTimeout = false) => {
    setQuizActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    let corrects = 0;
    activeQuiz.forEach((q, i) => {
      if (userAnswers[i] === q.correct) {
        corrects++;
      }
    });

    const score = parseFloat(((corrects / activeQuiz.length) * 10).toFixed(1));
    setCorrectCount(corrects);
    setFinalScore(score);

    // Evaluate tier danh hiệu
    let tier = 'Mầm non Công nghệ';
    if (score === 10) tier = 'Trạng nguyên VinaIT';
    else if (score >= 8) tier = 'Hiệp sĩ Công nghệ';
    else if (score >= 5) tier = 'Chiến binh Công nghệ';

    // Append to classroom database history log
    const dateStr = new Date().toISOString().split('T')[0];
    const newRecord: ClassHistoryItem = {
      name: studentName === 'Học sinh ẩn danh' ? 'Khách tự luyện' : studentName,
      class: studentClass,
      category: activeQuiz[0]?.category || 'Tổng hợp',
      correct: `${corrects}/${activeQuiz.length}`,
      score,
      tier,
      date: dateStr,
    };

    setClassHistory((prev) => [newRecord, ...prev]);

    // Handle sounds play matches tier rank
    if (score >= 8) {
      playBeep('success', isSoundEnabled);
    } else if (score >= 5) {
      playBeep('correct', isSoundEnabled);
    } else {
      playBeep('wrong', isSoundEnabled);
    }

    // Switch view to scoreboard reports
    setCurrentTab('ketqua');

    if (isTimeout) {
      triggerNotification('Hết giờ làm bài!', 'Bài làm đã tự động nộp vì hết thời gian kiểm tra!', '⏰');
    } else {
      triggerNotification(
        'Nộp bài thành công!',
        `Xin chúc mừng! Em đã hoàn thành bài thi ôn luyện và đạt được ${score} điểm!`,
        score >= 8.0 ? '🏅' : '💡'
      );
    }
  };

  // Insert custom questions directly to the memory stack bank
  const handleSaveNewQuestion = (q: Omit<Question, 'id'>) => {
    const newQ: Question = {
      id: Date.now(),
      ...q,
    };
    setQuestions((prev) => [...prev, newQ]);
    setIsAddModalOpen(false);
    triggerNotification('Thêm thành công', 'Đã bổ sung câu hỏi mới vào ngân hàng ôn tập!', '💾');
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    triggerNotification('Đã xóa', 'Câu hỏi đã bị xóa khỏi ngân hàng câu hỏi.', '🗑️');
  };

  const handleUpdateRoster = (classId: string, names: string[]) => {
    setClasses((prev) => ({
      ...prev,
      [classId]: names,
    }));
    triggerNotification('Cập nhật thành công', `Hệ thống vừa cập nhật danh sách gồm ${names.length} học sinh cho lớp ${classId}!`, '💾');
  };

  const handleToggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden text-slate-800 bg-[#f0fdf4]">
      {/* Dynamic Header Component */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={handleToggleSound}
        studentName={studentName}
        studentClass={studentClass}
        avatar={avatar}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Container Views Switch */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'trangchu' && (
          <HomeTab
            onStartQuiz={handleStartQuiz}
            onTeacherSetup={() => setCurrentTab('caidat')}
            questionsCount={questions.length}
          />
        )}

        {currentTab === 'ontap' && (
          <QuizTab
            quizActive={quizActive}
            timeRemaining={timeRemaining}
            activeQuiz={activeQuiz}
            currentQuizIndex={currentQuizIndex}
            userAnswers={userAnswers}
            onStartQuiz={() => handleStartQuiz()}
            onSelectOption={handleSelectOption}
            onJumpToQuestion={setCurrentQuizIndex}
            onNextQuestion={() => setCurrentQuizIndex((p) => Math.min(activeQuiz.length - 1, p + 1))}
            onPrevQuestion={() => setCurrentQuizIndex((p) => Math.max(0, p - 1))}
            onSubmitQuiz={() => handleSubmitQuiz(false)}
          />
        )}

        {currentTab === 'nganhang' && (
          <QuestionsTab
            questions={questions}
            onAddQuestion={handleSaveNewQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {currentTab === 'ketqua' && (
          <ResultsTab
            score={finalScore}
            correctCount={correctCount}
            totalQuestions={activeQuiz.length}
            studentName={studentName}
            avatar={avatar}
            activeQuiz={activeQuiz}
            userAnswers={userAnswers}
            showExplanations={showExplanations}
            onGoToQuiz={handleGoToQuiz}
          />
        )}

        {currentTab === 'thongke' && <StatsTab classHistory={classHistory} />}

        {currentTab === 'baocao' && (
          <ReportTab
            classHistory={classHistory}
            onViewStudentDetail={(name) => {
              triggerNotification(
                'Hồ sơ học sinh',
                `Đã nạp thành công lịch sử ôn tập và biểu đồ tiến bộ của em "${name}".`,
                '🎒'
              );
            }}
          />
        )}

        {currentTab === 'caidat' && (
          <SettingsTab
            isSoundEnabled={isSoundEnabled}
            onToggleSound={handleToggleSound}
            showExplanations={showExplanations}
            onToggleExplanations={() => setShowExplanations((prev) => !prev)}
            shuffleQuestions={shuffleQuestions}
            onToggleShuffle={() => setShuffleQuestions((prev) => !prev)}
            classes={classes}
            onUpdateClassRoster={handleUpdateRoster}
          />
        )}
      </main>

      {/* Persistent global footer */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 select-none">
          <p className="title-font text-lg font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            VinaIT 5 - Chắp cánh tương lai Việt
          </p>
          <p className="text-xs text-slate-400 font-bold tracking-wide">
            PHÁT TRIỂN DÀNH RIÊNG CHO HỌC SINH LỚP 5 & GIÁO VIÊN TIỂU HỌC VIỆT NAM
          </p>
          <p className="text-[11px] text-slate-300 font-bold">
            &copy; 2026 VinaIT. Phát hành miễn phí vì nền giáo dục số hóa tiên tiến.
          </p>
        </div>
      </footer>

      {/* Add Question Dialog Modal */}
      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewQuestion}
      />

      {/* Custom replacement of browser alert Dialog notifications */}
      <NotificationModal
        isOpen={notification.isOpen}
        title={notification.title}
        description={notification.description}
        icon={notification.icon}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
