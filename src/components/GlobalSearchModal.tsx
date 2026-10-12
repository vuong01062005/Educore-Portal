import React, { useState, useEffect } from 'react';
import { Student } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onNavigateTab: (tab: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  students,
  onSelectStudent,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.studentClass.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#1b1b1f] border border-[#272a34] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#272a34] gap-3 bg-[#1f1f23]">
          <span className="material-symbols-outlined text-[#adc6ff] text-xl">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm hồ sơ sinh viên, mã SV, lớp học, khoa viện..."
            className="w-full bg-transparent text-[#e3e2e6] placeholder:text-[#8c909f] text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-[#8c909f] hover:text-[#e3e2e6] bg-[#292a2d] rounded border border-[#424754]"
          >
            ESC
          </button>
        </div>

        {/* Content list */}
        <div className="max-h-96 overflow-y-auto p-3 flex flex-col gap-2">
          {/* Quick shortcuts */}
          {!query && (
            <div className="mb-2">
              <span className="text-[11px] font-semibold text-[#8c909f] uppercase tracking-wider px-2">
                Lối tắt thao tác nhanh
              </span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => {
                    onNavigateTab('quan-ly-sinh-vien');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] text-left text-xs text-[#e3e2e6] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#adc6ff] text-base">school</span>
                  <span>Danh sách sinh viên chính quy</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('khoa-va-nganh-hoc');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] text-left text-xs text-[#e3e2e6] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#a4c9ff] text-base">account_tree</span>
                  <span>Các khoa viện & chuyên ngành</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('hoc-tap-va-diem-so');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] text-left text-xs text-[#e3e2e6] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#b4c5ff] text-base">fact_check</span>
                  <span>Bảng điểm & kết quả học tập</span>
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('hoc-phi-va-tai-chinh');
                    onClose();
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] text-left text-xs text-[#e3e2e6] transition-colors"
                >
                  <span className="material-symbols-outlined text-emerald-400 text-base">payments</span>
                  <span>Tài chính học vụ & học phí</span>
                </button>
              </div>
            </div>
          )}

          {/* Student search results */}
          <span className="text-[11px] font-semibold text-[#8c909f] uppercase tracking-wider px-2">
            Kết quả sinh viên ({filteredStudents.length})
          </span>

          {filteredStudents.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8c909f]">
              Không tìm thấy hồ sơ nào khớp với từ khóa "{query}"
            </div>
          ) : (
            filteredStudents.slice(0, 8).map((student) => (
              <div
                key={student.id}
                onClick={() => {
                  onSelectStudent(student);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1f1f23] hover:bg-[#292a2d] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {student.avatar ? (
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center font-bold text-xs">
                      {student.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-[#e3e2e6] group-hover:text-[#adc6ff] transition-colors">
                      {student.name}
                    </span>
                    <span className="text-[11px] text-[#8c909f]">
                      {student.id} • {student.studentClass} • {student.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      student.status === 'active'
                        ? 'bg-[#0267b8]/20 text-[#a4c9ff]'
                        : 'bg-[#93000a]/20 text-[#ffb4ab]'
                    }`}
                  >
                    {student.status === 'active' ? 'Đang học' : 'Bảo lưu'}
                  </span>
                  <span className="material-symbols-outlined text-sm text-[#8c909f] group-hover:text-[#adc6ff]">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
