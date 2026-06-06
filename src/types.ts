export interface Question {
  id: number;
  category: string;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | string;
  text: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correct: 'A' | 'B' | 'C' | 'D' | string;
  explain: string;
}

export interface ClassHistoryItem {
  name: string;
  class: string;
  category: string;
  correct: string;
  score: number;
  tier: string;
  date: string;
}

export interface RewardBadge {
  name: string;
  desc: string;
  icon: string;
  color: string;
}
