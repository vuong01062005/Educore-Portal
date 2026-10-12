import React from 'react';
import { Student } from '../../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  student,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-xl bg-[#1b1b1f] border border-[#272a34] shadow-2xl p-6 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#93000a]/30 text-[#ffb4ab] border border-[#93000a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">warning</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-[#e3e2e6]">
              Xác nhận xóa sinh viên
            </h3>
            <span className="text-xs text-[#ffb4ab]">
              Hành động này không thể hoàn tác
            </span>
          </div>
        </div>

        <p className="text-sm text-[#c2c6d6] mb-6 leading-relaxed">
          Bạn có chắc chắn muốn xóa sinh viên{' '}
          <strong className="text-white font-semibold">
            {student.id} - {student.name}
          </strong>{' '}
          khỏi hệ thống dữ liệu? Tất cả lịch sử học tập liên quan sẽ được đưa vào lưu trữ đóng.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg bg-[#1f1f23] text-[#c2c6d6] hover:text-[#e3e2e6] hover:bg-[#292a2d] transition-colors text-sm font-medium"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#93000a] text-white text-sm font-semibold hover:bg-[#b00020] shadow-md transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete_forever</span>
            <span>Xác nhận xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
