import React, { useState, useEffect } from 'react';
import { Student } from '../../types';

interface StudentModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit';
  initialData?: Student | null;
  onClose: () => void;
  onSave: (student: Partial<Student>) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentClass, setStudentClass] = useState('K18-CNTT1');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'active' | 'paused'>('active');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [cohort, setCohort] = useState('Khóa 18');
  const [facultyId, setFacultyId] = useState('cntt');
  const [address, setAddress] = useState('Hà Nội');
  const [gpa, setGpa] = useState(3.5);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setCode(initialData.id);
      setName(initialData.name);
      setEmail(initialData.email);
      setStudentClass(initialData.studentClass);
      setPhone(initialData.phone);
      setStatus(initialData.status === 'paused' ? 'paused' : 'active');
      setGender(initialData.gender);
      setCohort(initialData.cohort);
      setFacultyId(initialData.facultyId || 'cntt');
      setAddress(initialData.address || 'Hà Nội');
      setGpa(initialData.gpa || 3.5);
    } else if (mode === 'add') {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      setCode(`SV24-${randomSuffix}`);
      setName('');
      setEmail('');
      setStudentClass('K18-CNTT1');
      setPhone('');
      setStatus('active');
      setGender('Nam');
      setCohort('Khóa 18');
      setFacultyId('cntt');
      setAddress('');
      setGpa(3.5);
    }
  }, [mode, initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const facultyNames: Record<string, string> = {
      cntt: 'Khoa Công nghệ Thông tin',
      ktpm: 'Khoa Kỹ thuật Phần mềm',
      httt: 'Khoa Hệ thống Thông tin',
      attt: 'Khoa An toàn Thông tin',
      kinhteso: 'Khoa Kinh tế số & TMĐT',
      ngoaingu: 'Khoa Ngoại ngữ & Biên phiên dịch',
      truyenthong: 'Khoa Truyền thông đa phương tiện',
    };

    onSave({
      id: code,
      name,
      email: email || `${code.toLowerCase()}@student.edu.vn`,
      studentClass,
      phone,
      status,
      statusLabel: status === 'active' ? 'Đang học' : 'Bảo lưu',
      gender,
      cohort,
      facultyId,
      facultyName: facultyNames[facultyId] || 'Khoa Công nghệ Thông tin',
      address: address || 'Chưa cập nhật',
      gpa: Number(gpa),
      identityCard: initialData?.identityCard || '00120500' + Math.floor(1000 + Math.random() * 9000),
      enrolledDate: initialData?.enrolledDate || '15/02/2025',
      tuitionStatus: initialData?.tuitionStatus || 'paid',
      dossierStatus: initialData?.dossierStatus || 'Đã hoàn tất',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-xl bg-[#1b1b1f] border border-[#272a34] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-[#1f1f23] border-b border-[#272a34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#4d8eff] text-[#00285d] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">
                {mode === 'edit' ? 'edit_note' : 'person_add'}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-base font-semibold text-[#e3e2e6]">
                {mode === 'edit' ? 'Chỉnh sửa thông tin sinh viên' : 'Thêm sinh viên mới'}
              </h3>
              <span className="text-xs text-[#8c909f]">
                Hệ thống thông tin quản lý sinh viên EduCore
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-md text-[#8c909f] hover:text-[#e3e2e6] hover:bg-[#292a2d] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-left max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">
                Mã sinh viên *
              </label>
              <input
                type="text"
                value={code}
                disabled={mode === 'edit'}
                onChange={(e) => setCode(e.target.value)}
                placeholder="VD: SV202407"
                required
                className={`px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] font-mono text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors ${
                  mode === 'edit' ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">
                Họ và tên *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#c2c6d6]">
              Email sinh viên *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@student.edu.vn"
              required
              className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Class */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">
                Lớp sinh hoạt *
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              >
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
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">Giới tính</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Nam' | 'Nữ')}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            {/* Cohort */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">Khóa học</label>
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              >
                <option value="Khóa 18">Khóa 18 (2022-2026)</option>
                <option value="Khóa 19">Khóa 19 (2023-2027)</option>
                <option value="Khóa 24">Khóa 24 (2024-2028)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">
                Số điện thoại *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 xxx xxx"
                required
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] font-mono text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">
                Trạng thái đào tạo
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'paused')}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              >
                <option value="active">Đang học</option>
                <option value="paused">Bảo lưu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Faculty */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">Khoa / Viện đào tạo</label>
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
              >
                <option value="cntt">Khoa Công nghệ Thông tin</option>
                <option value="ktpm">Khoa Kỹ thuật Phần mềm</option>
                <option value="httt">Khoa Hệ thống Thông tin</option>
                <option value="attt">Khoa An toàn Thông tin</option>
                <option value="kinhteso">Khoa Kinh tế số & TMĐT</option>
                <option value="ngoaingu">Khoa Ngoại ngữ & Biên phiên dịch</option>
                <option value="truyenthong">Khoa Truyền thông đa phương tiện</option>
              </select>
            </div>

            {/* GPA */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#c2c6d6]">Điểm GPA tích lũy (Hệ 4.0)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={gpa}
                onChange={(e) => setGpa(parseFloat(e.target.value) || 0)}
                className="px-3 py-2 rounded-lg bg-[#1f1f23] text-[#e3e2e6] text-sm border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors font-mono"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#272a34]">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg bg-[#1f1f23] text-[#c2c6d6] hover:text-[#e3e2e6] hover:bg-[#292a2d] transition-colors text-sm font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#4d8eff] text-[#00285d] font-semibold text-sm hover:bg-[#2563eb] hover:text-white shadow-lg shadow-[#4d8eff]/20 transition-all"
            >
              <span className="material-symbols-outlined text-lg">check</span>
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
