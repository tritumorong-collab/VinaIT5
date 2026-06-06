import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  icon?: string;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  title,
  description,
  icon = '🎉',
  onClose,
}: NotificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-4"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
              {icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 title-font tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-slate-500 font-semibold leading-relaxed">
              {description}
            </p>
            <button
              id="confirm-notification"
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-white font-extrabold rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
            >
              <Check className="w-5 h-5 mr-1" />
              <span>ĐỒNG Ý</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
