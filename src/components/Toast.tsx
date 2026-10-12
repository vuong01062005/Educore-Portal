import React from 'react';

export interface ToastData {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type !== 'error';

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#292a2d] text-[#e3e2e6] shadow-2xl border border-[#424754] animate-in fade-in slide-in-from-top duration-300">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
          isSuccess
            ? 'bg-[#adc6ff]/20 text-[#adc6ff]'
            : 'bg-[#93000a]/40 text-[#ffb4ab]'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {isSuccess ? 'check_circle' : 'error'}
        </span>
      </div>
      <div className="flex flex-col pr-2 text-left">
        <span className="text-xs font-semibold text-[#e3e2e6]">{toast.title}</span>
        <span className="text-[11px] text-[#c2c6d6]">{toast.message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-[#8c909f] hover:text-[#e3e2e6] p-1 rounded transition-colors ml-2"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  );
};
