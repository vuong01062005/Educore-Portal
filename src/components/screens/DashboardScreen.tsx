import React, { useState } from 'react';
import { Student, Faculty, ActivityItem } from '../../types';
import { QuickActionType } from '../modals/QuickActionModal';

interface DashboardScreenProps {
  students: Student[];
  faculties: Faculty[];
  activities: ActivityItem[];
  onOpenAddStudent: () => void;
  onOpenQuickAction: (type: QuickActionType) => void;
  onSelectStudent: (student: Student) => void;
  onNavigateToStudents: () => void;
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  students,
  faculties,
  activities,
  onOpenAddStudent,
  onOpenQuickAction,
  onSelectStudent,
  onNavigateToStudents,
  onTriggerToast,
}) => {
  const [facultyFilter, setFacultyFilter] = useState<'all' | 'daihoc' | 'clc'>('all');

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'active').length;
  const k18Count = students.filter((s) => s.cohort.includes('18')).length;
  const excellentCount = students.filter((s) => s.gpa >= 3.2).length;
  const excellentPct = totalStudents > 0 ? ((excellentCount / totalStudents) * 100).toFixed(1) : '28.4';

  const recentStudents = students.slice(0, 4);

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 gap-6 md:gap-8 text-[#e3e2e6]">
      {/* Top Welcome & System Status Bar */}
      <div className="relative overflow-hidden rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 md:p-6 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#4d8eff]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-left">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#292a2d] text-[#adc6ff] text-xs font-semibold border border-[#424754]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4d8eff] animate-ping" />
                Hệ thống ổn định • Đồng bộ lúc 09:42
              </span>
              <span className="text-xs text-[#8c909f]">Kỳ học 2024-2025 (HK2)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#e3e2e6] tracking-tight mt-1">
              Xin chào, Quản trị viên Nguyễn Văn An! 👋
            </h1>
            <p className="text-sm text-[#8c909f] max-w-2xl leading-relaxed">
              Chào mừng quay trở lại cổng quản trị EduCore. Hiện tại có 98.4% hồ sơ sinh viên đã hoàn tất thủ tục kỳ mới.
            </p>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onOpenQuickAction('lookup')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] border border-[#424754] text-[#e3e2e6] text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-lg text-[#a4c9ff]">tune</span>
              <span>Bộ lọc nhanh</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenQuickAction('report')}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] border border-[#424754] text-[#e3e2e6] text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-lg text-[#adc6ff]">download</span>
              <span>Xuất báo cáo (CSV/PDF)</span>
            </button>
            <button
              type="button"
              onClick={onOpenAddStudent}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4d8eff] hover:bg-[#2563eb] text-[#00285d] hover:text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#4d8eff]/20 transition-all"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              <span>+ Thêm sinh viên mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="relative group overflow-hidden rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md hover:shadow-xl hover:bg-[#292a2d] transition-all duration-300 text-left">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#adc6ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                Tổng số sinh viên
              </span>
              <span className="text-3xl font-bold text-[#e3e2e6] font-mono">1,248</span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#adc6ff]/10 text-[#adc6ff] flex items-center justify-center shadow-inner border border-[#adc6ff]/20">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 bg-[#1b1b1f]/60 -mx-5 -mb-5 px-5 py-2.5 border-t border-[#272a34]">
            <span className="inline-flex items-center text-[#adc6ff] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
              +12.4%
            </span>
            <span className="text-[11px] text-[#8c909f]">so với học kỳ I</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group overflow-hidden rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md hover:shadow-xl hover:bg-[#292a2d] transition-all duration-300 text-left">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#a4c9ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                Đang theo học
              </span>
              <span className="text-3xl font-bold text-[#e3e2e6] font-mono">1,180</span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#0267b8]/20 text-[#a4c9ff] flex items-center justify-center shadow-inner border border-[#0267b8]/40">
              <span className="material-symbols-outlined text-2xl">how_to_reg</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 bg-[#1b1b1f]/60 -mx-5 -mb-5 px-5 py-2.5 border-t border-[#272a34]">
            <span className="text-[11px] text-[#8c909f]">Tỷ lệ chuyên cần kỳ này</span>
            <span className="text-xs font-semibold text-[#a4c9ff] font-mono">94.5%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group overflow-hidden rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md hover:shadow-xl hover:bg-[#292a2d] transition-all duration-300 text-left">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#b4c5ff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                Lớp học & Ngành
              </span>
              <span className="text-3xl font-bold text-[#e3e2e6] font-mono">36 / 08</span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#618bff]/15 text-[#b4c5ff] flex items-center justify-center shadow-inner border border-[#618bff]/30">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 bg-[#1b1b1f]/60 -mx-5 -mb-5 px-5 py-2.5 border-t border-[#272a34]">
            <span className="text-[11px] text-[#8c909f]">36 lớp hành chính thuộc 8 khoa</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative group overflow-hidden rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md hover:shadow-xl hover:bg-[#292a2d] transition-all duration-300 text-left">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#4d8eff] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#8c909f] uppercase tracking-wider">
                Tỷ lệ Xuất sắc / Giỏi
              </span>
              <span className="text-3xl font-bold text-[#e3e2e6] font-mono">28.4%</span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center shadow-inner border border-[#4d8eff]/30">
              <span className="material-symbols-outlined text-2xl">military_tech</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 bg-[#1b1b1f]/60 -mx-5 -mb-5 px-5 py-2.5 border-t border-[#272a34]">
            <span className="inline-flex items-center text-[#adc6ff] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm mr-0.5">arrow_upward</span>
              354 SV
            </span>
            <span className="text-[11px] text-[#8c909f]">GPA &gt; 3.2/4.0</span>
          </div>
        </div>
      </div>

      {/* Analytical & Operational Dashboard Core */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Faculty Distribution & Compact Table */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Faculty Distribution & Analytics Box */}
          <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 md:p-6 shadow-md flex flex-col gap-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#272a34]">
              <div>
                <h2 className="text-lg font-bold text-[#e3e2e6]">Phân bố sinh viên theo Khoa viện</h2>
                <p className="text-xs text-[#8c909f]">
                  Mật độ sinh viên chính quy đang hoạt động năm học 2024-2025
                </p>
              </div>
              <div className="flex items-center gap-1 self-start sm:self-auto bg-[#1b1b1f] p-1 rounded-lg border border-[#272a34]">
                <button
                  type="button"
                  onClick={() => setFacultyFilter('all')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    facultyFilter === 'all'
                      ? 'bg-[#1f1f23] text-white shadow-sm border border-[#272a34]'
                      : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  Tất cả ngành
                </button>
                <button
                  type="button"
                  onClick={() => setFacultyFilter('daihoc')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    facultyFilter === 'daihoc'
                      ? 'bg-[#1f1f23] text-white shadow-sm border border-[#272a34]'
                      : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  Đại học
                </button>
                <button
                  type="button"
                  onClick={() => setFacultyFilter('clc')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    facultyFilter === 'clc'
                      ? 'bg-[#1f1f23] text-white shadow-sm border border-[#272a34]'
                      : 'text-[#8c909f] hover:text-white'
                  }`}
                >
                  Chất lượng cao
                </button>
              </div>
            </div>

            {/* Bars & Donut Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Faculty 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#e3e2e6] font-medium">Công nghệ thông tin</span>
                    <span className="text-[#adc6ff] font-semibold font-mono">412 SV (33.0%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#1b1b1f] rounded-full overflow-hidden border border-[#272a34]">
                    <div className="h-full bg-[#adc6ff] rounded-full transition-all duration-700" style={{ width: '33%' }} />
                  </div>
                </div>

                {/* Faculty 2 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#e3e2e6] font-medium">Kỹ thuật phần mềm</span>
                    <span className="text-[#a4c9ff] font-semibold font-mono">295 SV (23.6%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#1b1b1f] rounded-full overflow-hidden border border-[#272a34]">
                    <div className="h-full bg-[#a4c9ff] rounded-full transition-all duration-700" style={{ width: '23.6%' }} />
                  </div>
                </div>

                {/* Faculty 3 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#e3e2e6] font-medium">Kinh tế số & TMĐT</span>
                    <span className="text-[#b4c5ff] font-semibold font-mono">230 SV (18.4%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#1b1b1f] rounded-full overflow-hidden border border-[#272a34]">
                    <div className="h-full bg-[#b4c5ff] rounded-full transition-all duration-700" style={{ width: '18.4%' }} />
                  </div>
                </div>

                {/* Faculty 4 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#e3e2e6] font-medium">Ngoại ngữ & Biên phiên dịch</span>
                    <span className="text-[#8c909f] font-semibold font-mono">185 SV (14.8%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#1b1b1f] rounded-full overflow-hidden border border-[#272a34]">
                    <div className="h-full bg-[#8c909f] rounded-full transition-all duration-700" style={{ width: '14.8%' }} />
                  </div>
                </div>

                {/* Faculty 5 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#e3e2e6] font-medium">Truyền thông đa phương tiện</span>
                    <span className="text-[#8c909f] font-semibold font-mono">126 SV (10.2%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#1b1b1f] rounded-full overflow-hidden border border-[#272a34]">
                    <div className="h-full bg-[#38393c] rounded-full transition-all duration-700" style={{ width: '10.2%' }} />
                  </div>
                </div>
              </div>

              {/* Donut SVG Visualization */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#1b1b1f]/70 rounded-xl border border-[#272a34] relative">
                <svg className="w-40 h-40 -rotate-90 transform" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-[#292a2d]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4.5"
                  />
                  {/* Segment 1 CNTT: 33% */}
                  <path
                    className="text-[#adc6ff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="33, 100"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  />
                  {/* Segment 2 KTPM: 24% */}
                  <path
                    className="text-[#a4c9ff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="24, 100"
                    strokeDashoffset="-33"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  />
                  {/* Segment 3 Kinh tế số: 18% */}
                  <path
                    className="text-[#b4c5ff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="18, 100"
                    strokeDashoffset="-57"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-2xl font-bold text-[#e3e2e6] leading-none font-mono">
                    1,248
                  </span>
                  <span className="text-[11px] text-[#8c909f] mt-1">Tổng quy mô</span>
                </div>

                <div className="flex items-center justify-center gap-4 mt-3 w-full text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#8c909f]">
                    <span className="w-2 h-2 rounded-full bg-[#adc6ff]" />
                    CNTT
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#8c909f]">
                    <span className="w-2 h-2 rounded-full bg-[#a4c9ff]" />
                    KTPM
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#8c909f]">
                    <span className="w-2 h-2 rounded-full bg-[#b4c5ff]" />
                    Kinh tế số
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Recent Enrolled Students Table */}
          <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] overflow-hidden shadow-md text-left">
            <div className="p-5 flex items-center justify-between border-b border-[#272a34]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#adc6ff] text-2xl">
                  badge
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#e3e2e6]">
                    Sinh viên mới nhập học gần đây
                  </h3>
                  <p className="text-xs text-[#8c909f]">
                    Danh sách ghi danh đợt xét tuyển bổ sung đợt 2
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onNavigateToStudents}
                className="inline-flex items-center gap-1 text-[#adc6ff] hover:text-white text-xs font-semibold transition-colors"
              >
                <span>Xem toàn bộ</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1b1b1f] text-[#8c909f] uppercase tracking-wider font-semibold border-b border-[#272a34]">
                    <th className="py-3 px-5">Mã SV</th>
                    <th className="py-3 px-4">Họ và Tên</th>
                    <th className="py-3 px-4">Lớp & Ngành</th>
                    <th className="py-3 px-4">Hồ sơ</th>
                    <th className="py-3 px-4">Ngày nhập học</th>
                    <th className="py-3 px-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#272a34] text-[#e3e2e6]">
                  {recentStudents.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() => onSelectStudent(student)}
                      className="hover:bg-[#292a2d]/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-5 font-semibold text-[#adc6ff] font-mono">
                        {student.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-7 h-7 rounded-full object-cover ring-1 ring-[#272a34]"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#292a2d] text-[#e3e2e6] flex items-center justify-center font-bold text-[10px]">
                              {student.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="font-semibold text-white group-hover:text-[#adc6ff] transition-colors">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#c2c6d6]">
                        {student.studentClass}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            student.dossierStatus === 'Đã hoàn tất'
                              ? 'bg-[#adc6ff]/10 text-[#adc6ff]'
                              : student.dossierStatus === 'Chờ duyệt ảnh'
                              ? 'bg-[#0267b8]/20 text-[#a4c9ff]'
                              : 'bg-[#93000a]/30 text-[#ffb4ab]'
                          }`}
                        >
                          {student.dossierStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#8c909f] font-mono">
                        {student.enrolledDate}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectStudent(student);
                          }}
                          className="p-1 rounded hover:bg-[#292a2d] text-[#8c909f] hover:text-white"
                        >
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Actions & Live Stream Logs */}
        <div className="xl:col-span-4 flex flex-col gap-6 text-left">
          {/* Quick Action Deck */}
          <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#272a34]">
              <h3 className="text-sm font-bold text-[#e3e2e6] uppercase tracking-wider">
                Thao tác nhanh
              </h3>
              <span className="material-symbols-outlined text-[#adc6ff] text-xl">bolt</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenQuickAction('lookup')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#292a2d] hover:bg-[#343538] border border-[#272a34] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">person_search</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-[#adc6ff] transition-colors">
                      Tra cứu hồ sơ cấp tốc
                    </span>
                    <span className="text-[11px] text-[#8c909f]">Quét qua số CCCD / Mã SV</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8c909f] group-hover:text-[#adc6ff] transition-colors text-lg">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenQuickAction('report')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#292a2d] hover:bg-[#343538] border border-[#272a34] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0267b8]/20 text-[#a4c9ff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-[#a4c9ff] transition-colors">
                      Báo cáo tổng kết học kỳ
                    </span>
                    <span className="text-[11px] text-[#8c909f]">Thống kê điểm & rèn luyện</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8c909f] group-hover:text-[#a4c9ff] transition-colors text-lg">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenQuickAction('broadcast')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#292a2d] hover:bg-[#343538] border border-[#272a34] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#618bff]/20 text-[#b4c5ff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-[#b4c5ff] transition-colors">
                      Gửi thông báo hàng loạt
                    </span>
                    <span className="text-[11px] text-[#8c909f]">Email sinh viên & phụ huynh</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8c909f] group-hover:text-[#b4c5ff] transition-colors text-lg">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenQuickAction('backup')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#292a2d] hover:bg-[#343538] border border-[#272a34] text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#38393c] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">database</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white group-hover:text-[#adc6ff] transition-colors">
                      Sao lưu dữ liệu học tập
                    </span>
                    <span className="text-[11px] text-[#8c909f]">Snapshot hệ thống đám mây</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8c909f] group-hover:text-white transition-colors text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>

          {/* Live Operational Activity Log */}
          <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-5 shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#272a34]">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#e3e2e6] uppercase tracking-wider">
                  Hoạt động gần đây
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#1b1b1f] text-[#adc6ff] text-[10px] font-semibold border border-[#272a34]">
                  Trực tiếp
                </span>
              </div>
              <button
                type="button"
                onClick={() => onTriggerToast('Làm mới hoạt động', 'Dữ liệu hoạt động hệ thống đã được đồng bộ mới nhất.')}
                className="text-[#8c909f] hover:text-white p-1 rounded transition-colors"
                title="Làm mới"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
              </button>
            </div>

            <div className="relative flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-0.5 before:bg-[#292a2d]">
              {activities.map((item) => (
                <div key={item.id} className="relative flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 border border-[#272a34]"
                    style={{
                      backgroundColor: `${item.color}25`,
                      color: item.color,
                    }}
                  >
                    <span className="material-symbols-outlined text-base">
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-[#e3e2e6] truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#8c909f] shrink-0 font-mono">
                        {item.timeAgo}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8c909f] mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
