import React from 'react';
import { Student } from '../../types';

interface StudentDetailModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onEdit: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  student,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#1b1b1f] border border-[#272a34] shadow-2xl overflow-hidden flex flex-col text-left max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover */}
        <div className="relative p-6 bg-gradient-to-r from-[#1f1f23] via-[#292a2d] to-[#1f1f23] border-b border-[#272a34]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {student.avatar ? (
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#4d8eff]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#4d8eff]/20 text-[#adc6ff] border border-[#4d8eff]/30 flex items-center justify-center font-bold text-xl">
                  {student.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{student.name}</h3>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      student.status === 'active'
                        ? 'bg-[#0267b8]/20 text-[#a4c9ff] border border-[#0267b8]/40'
                        : 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#93000a]/40'
                    }`}
                  >
                    {student.status === 'active' ? 'Đang học' : 'Bảo lưu'}
                  </span>
                </div>
                <span className="text-sm text-[#adc6ff] font-mono mt-0.5">
                  {student.id} • {student.cohort} • {student.gender}
                </span>
                <span className="text-xs text-[#8c909f] mt-0.5">
                  {student.facultyName}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#8c909f] hover:text-white hover:bg-[#292a2d] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Content Tabs / Info Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34]">
              <span className="text-[11px] text-[#8c909f]">Điểm GPA tích lũy</span>
              <div className="text-xl font-bold text-[#adc6ff] mt-0.5 font-mono">
                {student.gpa.toFixed(2)} / 4.0
              </div>
              <span className="text-[10px] text-emerald-400">
                {student.gpa >= 3.6 ? 'Xuất sắc' : student.gpa >= 3.2 ? 'Giỏi' : 'Khá'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34]">
              <span className="text-[11px] text-[#8c909f]">Lớp học</span>
              <div className="text-base font-semibold text-white mt-1">
                {student.studentClass}
              </div>
              <span className="text-[10px] text-[#8c909f]">Chính quy tập trung</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34]">
              <span className="text-[11px] text-[#8c909f]">Tình trạng hồ sơ</span>
              <div className="text-sm font-semibold text-white mt-1">
                {student.dossierStatus}
              </div>
              <span className="text-[10px] text-[#adc6ff]">Phòng Đào tạo duyệt</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34]">
              <span className="text-[11px] text-[#8c909f]">Học phí HK2</span>
              <div className="text-sm font-semibold text-emerald-400 mt-1">
                {student.tuitionStatus === 'paid' ? 'Đã quyết toán' : 'Chưa đóng'}
              </div>
              <span className="text-[10px] text-[#8c909f]">Cổng trực tuyến</span>
            </div>
          </div>

          {/* Details Table */}
          <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-4 space-y-3">
            <h4 className="text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
              Thông tin liên hệ & định danh
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#8c909f]">Email học vụ:</span>
                <p className="text-white font-mono mt-0.5">{student.email}</p>
              </div>
              <div>
                <span className="text-[#8c909f]">Số điện thoại:</span>
                <p className="text-white font-mono mt-0.5">{student.phone}</p>
              </div>
              <div>
                <span className="text-[#8c909f]">Số định danh CCCD:</span>
                <p className="text-white font-mono mt-0.5">{student.identityCard}</p>
              </div>
              <div>
                <span className="text-[#8c909f]">Ngày nhập học:</span>
                <p className="text-white mt-0.5">{student.enrolledDate}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#8c909f]">Địa chỉ thường trú:</span>
                <p className="text-white mt-0.5">{student.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1f1f23] border-t border-[#272a34] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onEdit(student);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-white text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            <span>Chỉnh sửa hồ sơ</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#4d8eff] hover:bg-[#2563eb] text-[#00285d] hover:text-white text-xs font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
