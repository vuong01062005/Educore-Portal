import React, { useState } from 'react';
import { MOCK_GRADES_LIST } from '../../data/mockData';

interface GradesScreenProps {
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const GradesScreen: React.FC<GradesScreenProps> = ({ onTriggerToast }) => {
  const [selectedSemester, setSelectedSemester] = useState('2024-2');
  const [grades, setGrades] = useState(MOCK_GRADES_LIST);

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 gap-6 text-[#e3e2e6] text-left">
      {/* Banner */}
      <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#4d8eff]/20 text-[#adc6ff] text-[11px] font-bold uppercase tracking-wider">
              Khảo thí & Đảm bảo chất lượng
            </span>
            <span className="text-xs text-[#8c909f]">• Học kỳ II (2024-2025)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Học tập & Điểm số
          </h1>
          <p className="text-xs sm:text-sm text-[#8c909f] mt-1">
            Bảng điểm học phần, phê duyệt điểm thi giữa kỳ/cuối kỳ và tính điểm trung bình GPA chuẩn hệ 4.0.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#292a2d] border border-[#424754] text-xs font-semibold text-white focus:outline-none"
          >
            <option value="2024-2">Học kỳ II - 2024-2025</option>
            <option value="2024-1">Học kỳ I - 2024-2025</option>
            <option value="2023-2">Học kỳ II - 2023-2024</option>
          </select>

          <button
            onClick={() => onTriggerToast('Khóa sổ điểm', 'Đã lưu và khóa sổ điểm học kỳ hiện tại.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4d8eff] text-[#00285d] font-semibold text-xs hover:bg-[#2563eb] hover:text-white transition-all shadow-md shrink-0"
          >
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Khóa sổ điểm</span>
          </button>
        </div>
      </div>

      {/* Grade Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Điểm trung bình học kỳ</span>
          <div className="text-2xl font-bold text-[#adc6ff] font-mono mt-1">3.48 / 4.0</div>
          <span className="text-[11px] text-emerald-400">Xếp loại: Giỏi</span>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Số tín chỉ đăng ký</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">15 Tín chỉ</div>
          <span className="text-[11px] text-[#8c909f]">5 học phần chính thức</span>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Tỷ lệ qua môn</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">100%</div>
          <span className="text-[11px] text-[#8c909f]">Không có môn nợ</span>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Điểm rèn luyện dự kiến</span>
          <div className="text-2xl font-bold text-[#b4c5ff] font-mono mt-1">88 / 100</div>
          <span className="text-[11px] text-[#adc6ff]">Xếp loại Tốt</span>
        </div>
      </div>

      {/* Grade table */}
      <div className="rounded-xl bg-[#1b1b1f] border border-[#272a34] overflow-hidden shadow-md">
        <div className="p-4 bg-[#1f1f23] border-b border-[#272a34] flex items-center justify-between">
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Bảng điểm các học phần HK2 (2024-2025)
          </span>
          <span className="text-xs text-[#8c909f]">Cập nhật từ Phòng Khảo thí</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0d0e11] text-[#8c909f] font-semibold border-b border-[#272a34]">
                <th className="py-3 px-4">Mã môn</th>
                <th className="py-3 px-4">Tên học phần</th>
                <th className="py-3 px-4 text-center">Tín chỉ</th>
                <th className="py-3 px-4">Giảng viên phụ trách</th>
                <th className="py-3 px-4 text-center">Giữa kỳ</th>
                <th className="py-3 px-4 text-center">Cuối kỳ</th>
                <th className="py-3 px-4 text-center">Tổng kết</th>
                <th className="py-3 px-4 text-center">Điểm chữ</th>
                <th className="py-3 px-4 text-center">Kết quả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272a34] text-[#e3e2e6]">
              {grades.map((g) => (
                <tr key={g.courseCode} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#adc6ff]">
                    {g.courseCode}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {g.courseName}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">{g.credits}</td>
                  <td className="py-3.5 px-4 text-[#c2c6d6]">{g.lecturer}</td>
                  <td className="py-3.5 px-4 text-center font-mono">{g.midterm}</td>
                  <td className="py-3.5 px-4 text-center font-mono">{g.final}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-white">
                    {g.total}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-[#292a2d] text-[#adc6ff] font-bold font-mono">
                      {g.letterGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400">
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
