import React, { useState } from 'react';
import { Faculty } from '../../types';

interface FacultiesScreenProps {
  faculties: Faculty[];
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const FacultiesScreen: React.FC<FacultiesScreenProps> = ({
  faculties,
  onTriggerToast,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(faculties[0]);

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 gap-6 text-[#e3e2e6] text-left">
      {/* Banner */}
      <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#618bff]/20 text-[#b4c5ff] text-[11px] font-bold uppercase tracking-wider">
                Cơ cấu học viện
              </span>
              <span className="text-xs text-[#8c909f]">• Năm học 2024-2025</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
              Khoa & Ngành Đào tạo
            </h1>
            <p className="text-xs sm:text-sm text-[#8c909f] mt-1">
              Quản lý các khoa viện, chuyên ngành, đội ngũ chủ nhiệm khoa và chương trình đào tạo chuẩn quốc tế.
            </p>
          </div>

          <button
            onClick={() => onTriggerToast('Thông báo', 'Đang kết nối cổng dữ liệu đề cương viện.')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4d8eff] text-[#00285d] font-semibold text-xs sm:text-sm hover:bg-[#2563eb] hover:text-white transition-all shadow-md shrink-0"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Thêm ngành mới</span>
          </button>
        </div>
      </div>

      {/* Grid of Faculties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculties.map((f) => {
          const isSelected = selectedFaculty?.id === f.id;
          return (
            <div
              key={f.id}
              onClick={() => setSelectedFaculty(f)}
              className={`p-5 rounded-xl bg-[#1b1b1f] border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#4d8eff] shadow-lg shadow-[#4d8eff]/10 bg-[#1f1f23]'
                  : 'border-[#272a34] hover:border-[#424754]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#292a2d] text-[#adc6ff] font-mono text-xs font-semibold">
                    {f.code}
                  </span>
                  <span className="text-xs font-mono text-[#8c909f]">
                    {f.percentage}% quy mô
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-3">{f.name}</h3>
                <p className="text-xs text-[#8c909f] mt-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#adc6ff]">
                    person
                  </span>
                  Trưởng khoa: {f.dean}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-[#272a34] text-xs">
                <div>
                  <span className="text-[11px] text-[#8c909f]">Sinh viên</span>
                  <p className="font-bold text-white font-mono">{f.studentsCount} SV</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#8c909f]">Lớp hành chính</span>
                  <p className="font-bold text-white font-mono">{f.classesCount} Lớp</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Faculty Detail Panel */}
      {selectedFaculty && (
        <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-[#272a34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-xl">account_tree</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Chi tiết {selectedFaculty.name} ({selectedFaculty.code})
                </h3>
                <p className="text-xs text-[#8c909f]">
                  Chủ nhiệm khoa: {selectedFaculty.dean} • Quy mô: {selectedFaculty.studentsCount} sinh viên
                </p>
              </div>
            </div>

            <button
              onClick={() => onTriggerToast('Xuất đề cương', `Đã xuất đề cương chi tiết khoa ${selectedFaculty.name}.`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-xs text-[#adc6ff] border border-[#424754]"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Xuất khung CTĐT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-[#1b1b1f] border border-[#272a34]">
              <span className="text-xs text-[#8c909f]">Chương trình đào tạo</span>
              <p className="text-sm font-semibold text-white mt-1">Cử nhân Kỹ sư 4.5 năm</p>
              <span className="text-[11px] text-[#adc6ff]">Tích lũy 152 tín chỉ</span>
            </div>
            <div className="p-4 rounded-lg bg-[#1b1b1f] border border-[#272a34]">
              <span className="text-xs text-[#8c909f]">Chuẩn đầu ra ngoại ngữ</span>
              <p className="text-sm font-semibold text-white mt-1">IELTS 6.0 / TOEIC 650</p>
              <span className="text-[11px] text-emerald-400">Đạt chuẩn quốc tế</span>
            </div>
            <div className="p-4 rounded-lg bg-[#1b1b1f] border border-[#272a34]">
              <span className="text-xs text-[#8c909f]">Phòng nghiên cứu Lab</span>
              <p className="text-sm font-semibold text-white mt-1">04 Lab thực hành cao cấp</p>
              <span className="text-[11px] text-[#8c909f]">Mở 24/7 cho sinh viên</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
