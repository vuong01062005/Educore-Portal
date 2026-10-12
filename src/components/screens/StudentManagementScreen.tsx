import React, { useState, useMemo } from 'react';
import { Student } from '../../types';

interface StudentManagementScreenProps {
  students: Student[];
  onOpenAddModal: () => void;
  onOpenEditModal: (student: Student) => void;
  onOpenDeleteModal: (student: Student) => void;
  onOpenDetailModal: (student: Student) => void;
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const StudentManagementScreen: React.FC<StudentManagementScreenProps> = ({
  students,
  onOpenAddModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenDetailModal,
  onTriggerToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const itemsPerPage = 6;

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.phone.includes(searchTerm);

      const matchFaculty =
        facultyFilter === 'all' || s.facultyId === facultyFilter;

      const matchClass =
        classFilter === 'all' || s.studentClass === classFilter;

      const matchStatus =
        statusFilter === 'all' || s.status === statusFilter;

      return matchSearch && matchFaculty && matchClass && matchStatus;
    });
  }, [students, searchTerm, facultyFilter, classFilter, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast('Đã làm mới dữ liệu', 'Danh sách hồ sơ sinh viên đã được cập nhật.');
    }, 500);
  };

  // Export to Excel / CSV
  const handleExportCSV = () => {
    const headers = 'Mã SV,Họ và tên,Email,Lớp,Số điện thoại,Trạng thái,GPA\n';
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.studentClass}","${s.phone}","${
            s.status === 'active' ? 'Đang học' : 'Bảo lưu'
          }","${s.gpa}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `EduCore_SinhVien_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onTriggerToast(
      'Xuất file thành công',
      `Đã tải xuống danh sách ${filteredStudents.length} hồ sơ sinh viên.`
    );
  };

  // Telemetry counts
  const activeCount = students.filter((s) => s.status === 'active').length;
  const pausedCount = students.filter((s) => s.status === 'paused').length;
  const k18Count = students.filter((s) => s.cohort.includes('18')).length;
  const completeDossierCount = students.filter((s) => s.dossierStatus === 'Đã hoàn tất').length;
  const completePct = ((completeDossierCount / (students.length || 1)) * 100).toFixed(1);

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 gap-6 md:gap-8 text-[#e3e2e6]">
      {/* Top Ambient Glow Line & Header Card */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#1b1b1f] border border-[#272a34] p-5 md:p-6 shadow-xl text-left">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#4d8eff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-24 w-64 h-64 bg-[#0267b8]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
          {/* Title & Metric Badge */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-[#4d8eff] text-[#00285d] font-bold text-[11px] uppercase tracking-wider">
                Hệ thống đào tạo
              </span>
              <span className="text-[#8c909f] text-xs">• Cập nhật 2 phút trước</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#e3e2e6] tracking-tight">
                Quản lý Sinh viên
              </h1>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1f23] border border-[#272a34] text-[#a4c9ff] text-xs font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#4d8eff] animate-pulse" />
                <span>
                  Tổng số:{' '}
                  <strong className="text-white font-semibold font-mono">
                    1,248
                  </strong>{' '}
                  sinh viên
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="group relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#4d8eff] text-[#00285d] hover:bg-[#2563eb] hover:text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#4d8eff]/20 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">
                person_add
              </span>
              <span>+ Thêm sinh viên mới</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] border border-[#272a34] text-[#e3e2e6] transition-colors text-xs sm:text-sm font-medium shadow-sm"
            >
              <span className="material-symbols-outlined text-lg text-[#a4c9ff]">
                file_download
              </span>
              <span>Xuất Excel</span>
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              title="Làm mới dữ liệu"
              className="flex items-center justify-center p-2.5 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] border border-[#272a34] text-[#8c909f] hover:text-white transition-colors shadow-sm"
            >
              <span
                className={`material-symbols-outlined text-lg ${
                  isRefreshing ? 'rotate-180 transition-transform duration-500' : ''
                }`}
              >
                refresh
              </span>
            </button>
          </div>
        </div>

        {/* Search & Filter Ribbon */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-2.5 mt-5 pt-4 border-t border-[#272a34]">
          {/* Search Input */}
          <div className="md:col-span-6 lg:col-span-7 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#8c909f] text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm theo Họ tên hoặc Mã sinh viên (VD: SV202401, Nguyễn Văn A...)"
              className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#1f1f23] border border-[#272a34] text-[#e3e2e6] text-xs sm:text-sm placeholder:text-[#8c909f] focus:outline-none focus:border-[#4d8eff] focus:bg-[#292a2d] transition-all shadow-sm"
            />
          </div>

          {/* Department / Faculty Filter */}
          <div className="md:col-span-3 lg:col-span-3 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#a4c9ff] text-lg pointer-events-none">
              domain
            </span>
            <select
              value={facultyFilter}
              onChange={(e) => {
                setFacultyFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-8 py-2.5 rounded-lg bg-[#1f1f23] border border-[#272a34] text-[#e3e2e6] text-xs sm:text-sm appearance-none focus:outline-none focus:border-[#4d8eff] cursor-pointer shadow-sm"
            >
              <option value="all">Tất cả Khoa & Viện</option>
              <option value="cntt">Khoa Công nghệ Thông tin</option>
              <option value="ktpm">Khoa Kỹ thuật Phần mềm</option>
              <option value="httt">Khoa Hệ thống Thông tin</option>
              <option value="attt">Khoa An toàn Thông tin</option>
              <option value="kinhteso">Khoa Kinh tế số & TMĐT</option>
              <option value="ngoaingu">Khoa Ngoại ngữ</option>
              <option value="truyenthong">Khoa Truyền thông</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 text-[#8c909f] text-base pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Class / Group Filter */}
          <div className="md:col-span-3 lg:col-span-2 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#b4c5ff] text-lg pointer-events-none">
              groups
            </span>
            <select
              value={classFilter}
              onChange={(e) => {
                setClassFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-8 py-2.5 rounded-lg bg-[#1f1f23] border border-[#272a34] text-[#e3e2e6] text-xs sm:text-sm appearance-none focus:outline-none focus:border-[#4d8eff] cursor-pointer shadow-sm"
            >
              <option value="all">Tất cả Lớp</option>
              <option value="K18-CNTT1">K18-CNTT1</option>
              <option value="K18-CNTT2">K18-CNTT2</option>
              <option value="K18-KTPM1">K18-KTPM1</option>
              <option value="K18-KTPM2">K18-KTPM2</option>
              <option value="K19-HTTT1">K19-HTTT1</option>
              <option value="K19-ATTT">K19-ATTT</option>
              <option value="K24-CNTT01">K24-CNTT01</option>
              <option value="K24-KTPM02">K24-KTPM02</option>
              <option value="K24-KTSo01">K24-KTSo01</option>
              <option value="K24-NN03">K24-NN03</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 text-[#8c909f] text-base pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry Bento Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34] flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-xs text-[#8c909f]">Đang theo học</span>
            <span className="text-xl md:text-2xl font-bold text-[#e3e2e6] mt-0.5 font-mono">
              1,184
            </span>
            <span className="text-[11px] text-[#adc6ff] mt-0.5 font-medium">
              94.8% tổng số
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#4d8eff]/20 border border-[#4d8eff]/30 flex items-center justify-center text-[#adc6ff]">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34] flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-xs text-[#8c909f]">Bảo lưu kết quả</span>
            <span className="text-xl md:text-2xl font-bold text-[#e3e2e6] mt-0.5 font-mono">
              64
            </span>
            <span className="text-[11px] text-[#a4c9ff] mt-0.5 font-medium">
              5.2% tổng số
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#1f1f23] border border-[#272a34] flex items-center justify-center text-[#a4c9ff]">
            <span className="material-symbols-outlined text-xl">pause_circle</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34] flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-xs text-[#8c909f]">Sinh viên K18</span>
            <span className="text-xl md:text-2xl font-bold text-[#e3e2e6] mt-0.5 font-mono">
              720
            </span>
            <span className="text-[11px] text-[#8c909f] mt-0.5 font-medium">
              Khóa 2022-2026
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#1f1f23] border border-[#272a34] flex items-center justify-center text-[#b4c5ff]">
            <span className="material-symbols-outlined text-xl">badge</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34] flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-xs text-[#8c909f]">Tỷ lệ hoàn thành hồ sơ</span>
            <span className="text-xl md:text-2xl font-bold text-[#adc6ff] mt-0.5 font-mono">
              99.2%
            </span>
            <span className="text-[11px] text-[#adc6ff] mt-0.5 font-medium">
              1,238 hồ sơ chuẩn
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#1f1f23] border border-[#272a34] flex items-center justify-center text-[#adc6ff]">
            <span className="material-symbols-outlined text-xl">verified</span>
          </div>
        </div>
      </div>

      {/* Main Student Data Table Container */}
      <div className="rounded-xl bg-[#1b1b1f] border border-[#272a34] shadow-xl overflow-hidden flex flex-col text-left">
        {/* Table Header Info Bar */}
        <div className="px-4 py-3 bg-[#1f1f23] border-b border-[#272a34] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a4c9ff] text-base">
              format_list_bulleted
            </span>
            <span className="text-xs font-semibold text-[#e3e2e6] tracking-wide uppercase">
              Danh sách hồ sơ sinh viên chính quy ({filteredStudents.length} hồ sơ)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8c909f]">
            <button
              onClick={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                statusFilter === 'active' ? 'bg-[#0267b8]/30 text-white' : 'hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#4d8eff]" />
              <span>Đang học</span>
            </button>
            <button
              onClick={() => setStatusFilter(statusFilter === 'paused' ? 'all' : 'paused')}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                statusFilter === 'paused' ? 'bg-[#93000a]/40 text-white' : 'hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab]" />
              <span>Bảo lưu</span>
            </button>
          </div>
        </div>

        {/* Responsive Table Area */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#0d0e11] text-[#8c909f] font-semibold text-[11px] uppercase tracking-wider border-b border-[#272a34]">
                <th className="py-3.5 px-4" scope="col">Mã sinh viên</th>
                <th className="py-3.5 px-4" scope="col">Họ và tên</th>
                <th className="py-3.5 px-4" scope="col">Email</th>
                <th className="py-3.5 px-4" scope="col">Lớp</th>
                <th className="py-3.5 px-4" scope="col">Số điện thoại</th>
                <th className="py-3.5 px-4" scope="col">Trạng thái</th>
                <th className="py-3.5 px-4 text-right" scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272a34] text-[#e3e2e6]">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#8c909f]">
                    Không tìm thấy sinh viên nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => {
                  const isPaused = student.status === 'paused';
                  return (
                    <tr
                      key={student.id}
                      onClick={() => onOpenDetailModal(student)}
                      className="group hover:bg-[#1f1f23] transition-colors cursor-pointer"
                    >
                      {/* Student ID */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#1f1f23] border border-[#272a34] text-[#adc6ff] font-mono text-xs font-semibold tracking-wider">
                          {student.id}
                        </span>
                      </td>

                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#272a34]"
                            />
                          ) : (
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                isPaused
                                  ? 'bg-[#343538] text-[#c2c6d6]'
                                  : 'bg-[#4d8eff]/20 text-[#adc6ff] border border-[#4d8eff]/30'
                              }`}
                            >
                              {student.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-semibold text-white leading-snug group-hover:text-[#adc6ff] transition-colors">
                              {student.name}
                            </span>
                            <span
                              className={`text-[11px] ${
                                isPaused ? 'text-[#ffb4ab]' : 'text-[#8c909f]'
                              }`}
                            >
                              {isPaused
                                ? student.statusLabel || 'Tạm ngưng học kỳ II'
                                : `${student.cohort} • ${student.gender}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#8c909f] font-mono text-xs">
                        {student.email}
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#1f1f23] border border-[#272a34] text-[#a4c9ff] text-xs font-medium">
                          {student.studentClass}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#8c909f] font-mono text-xs">
                        {student.phone}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isPaused ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#93000a]/20 border border-[#93000a]/30 text-[#ffb4ab] text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                            Bảo lưu
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0267b8]/20 border border-[#0267b8]/30 text-[#a4c9ff] text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4d8eff]" />
                            Đang học
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => onOpenDetailModal(student)}
                            title="Xem chi tiết"
                            className="p-1.5 rounded-md text-[#8c909f] hover:text-white hover:bg-[#292a2d] transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenEditModal(student)}
                            title="Chỉnh sửa hồ sơ"
                            className="p-1.5 rounded-md text-[#a4c9ff] hover:text-white hover:bg-[#0267b8]/30 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">edit_note</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenDeleteModal(student)}
                            title="Xóa sinh viên"
                            className="p-1.5 rounded-md text-[#ffb4ab] hover:text-[#ffdad6] hover:bg-[#93000a]/40 transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#1b1b1f] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#272a34]">
          <div className="text-xs text-[#8c909f]">
            Hiển thị{' '}
            <span className="text-white font-semibold font-mono">
              {filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredStudents.length)}
            </span>{' '}
            của{' '}
            <span className="text-white font-semibold font-mono">
              1,248
            </span>{' '}
            sinh viên (lọc: {filteredStudents.length})
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1.5 rounded-md bg-[#1f1f23] text-[#c2c6d6] hover:text-white hover:bg-[#292a2d] disabled:opacity-30 transition-colors flex items-center gap-1 border border-[#272a34]"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
              <span>Trước</span>
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-md text-xs font-semibold flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-[#4d8eff] text-[#00285d] font-bold shadow-sm'
                      : 'bg-[#1f1f23] text-[#c2c6d6] hover:text-white hover:bg-[#292a2d] border border-[#272a34]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <span className="px-1 text-[#8c909f] text-xs">...</span>

            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              className="w-8 h-8 rounded-md bg-[#1f1f23] text-[#c2c6d6] hover:text-white hover:bg-[#292a2d] border border-[#272a34] text-xs flex items-center justify-center"
            >
              208
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1.5 rounded-md bg-[#1f1f23] text-[#c2c6d6] hover:text-white hover:bg-[#292a2d] disabled:opacity-30 transition-colors flex items-center gap-1 border border-[#272a34]"
            >
              <span>Sau</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
