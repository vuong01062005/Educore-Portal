import React, { useState } from 'react';
import { Student } from '../../types';

export type QuickActionType =
  | 'lookup'
  | 'report'
  | 'broadcast'
  | 'backup'
  | null;

interface QuickActionModalProps {
  type: QuickActionType;
  isOpen: boolean;
  students: Student[];
  onClose: () => void;
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
  onOpenStudentDetail: (student: Student) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  type,
  isOpen,
  students,
  onClose,
  onTriggerToast,
  onOpenStudentDetail,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [recipientGroup, setRecipientGroup] = useState('all');

  if (!isOpen || !type) return null;

  // 1. Quick Lookup
  if (type === 'lookup') {
    const matched = searchKey.trim()
      ? students.filter(
          (s) =>
            s.id.toLowerCase().includes(searchKey.toLowerCase()) ||
            s.identityCard.includes(searchKey.trim()) ||
            s.phone.includes(searchKey.trim()) ||
            s.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      : [];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-lg bg-[#1b1b1f] border border-[#272a34] rounded-2xl shadow-2xl overflow-hidden p-6 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#272a34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4d8eff]/20 text-[#adc6ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">person_search</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Tra cứu hồ sơ cấp tốc</h3>
                <p className="text-xs text-[#8c909f]">Quét nhanh qua số CCCD / Mã SV / Số điện thoại</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-[#8c909f] hover:text-white">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              autoFocus
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Nhập số CCCD (VD: 001205...), Mã SV (VD: SV202401) hoặc Họ tên..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#1f1f23] border border-[#272a34] text-white text-sm focus:outline-none focus:border-[#4d8eff]"
            />
          </div>

          <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
            {searchKey.trim() && matched.length === 0 && (
              <p className="text-xs text-[#8c909f] text-center py-6">
                Không tìm thấy dữ liệu hồ sơ phù hợp.
              </p>
            )}

            {matched.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onClose();
                  onOpenStudentDetail(s);
                }}
                className="p-3 rounded-xl bg-[#1f1f23] hover:bg-[#292a2d] border border-[#272a34] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{s.name}</div>
                  <div className="text-xs text-[#8c909f]">
                    {s.id} • CCCD: {s.identityCard} • Lớp: {s.studentClass}
                  </div>
                </div>
                <span className="text-xs text-[#adc6ff] font-medium flex items-center gap-1">
                  Xem chi tiết
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            ))}

            {!searchKey.trim() && (
              <p className="text-xs text-[#8c909f] text-center py-6">
                Vui lòng nhập từ khóa tìm kiếm để truy xuất ngay lập tức.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Semester Report
  if (type === 'report') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-lg bg-[#1b1b1f] border border-[#272a34] rounded-2xl shadow-2xl overflow-hidden p-6 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#272a34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0267b8]/30 text-[#a4c9ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">assignment_turned_in</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Báo cáo tổng kết học kỳ</h3>
                <p className="text-xs text-[#8c909f]">Thống kê điểm & phân loại rèn luyện HK2 2024-2025</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-[#8c909f] hover:text-white">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="py-4 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34] flex justify-between">
              <span className="text-[#8c909f]">Tổng sinh viên đánh giá:</span>
              <strong className="text-white font-mono">{students.length} sinh viên</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34] flex justify-between">
              <span className="text-[#8c909f]">Tỷ lệ Xuất sắc & Giỏi:</span>
              <strong className="text-[#adc6ff] font-mono">28.4% (354 SV)</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34] flex justify-between">
              <span className="text-[#8c909f]">Tỷ lệ chuyên cần toàn viện:</span>
              <strong className="text-emerald-400 font-mono">94.5%</strong>
            </div>
            <div className="p-3 rounded-xl bg-[#1f1f23] border border-[#272a34] flex justify-between">
              <span className="text-[#8c909f]">Tỷ lệ cảnh báo học vụ:</span>
              <strong className="text-[#ffb4ab] font-mono">1.8% (Cần lưu ý)</strong>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#272a34]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1f23] text-[#c2c6d6] hover:bg-[#292a2d] text-xs font-medium"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onTriggerToast('Xuất báo cáo thành công', 'File EduCore_BaoCao_HK2.pdf đã được tải xuống.');
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4d8eff] text-[#00285d] hover:bg-[#2563eb] hover:text-white text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Tải file PDF/CSV</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Broadcast Email
  if (type === 'broadcast') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-lg bg-[#1b1b1f] border border-[#272a34] rounded-2xl shadow-2xl overflow-hidden p-6 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#272a34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#618bff]/20 text-[#b4c5ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Gửi thông báo hàng loạt</h3>
                <p className="text-xs text-[#8c909f]">Hệ thống gửi thư điện tử học vụ tự động</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-[#8c909f] hover:text-white">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onTriggerToast(
                'Gửi thông báo thành công',
                `Đã gửi thư tới nhóm đối tượng được chọn (${students.length} người nhận).`
              );
              onClose();
            }}
            className="mt-4 space-y-3"
          >
            <div>
              <label className="text-xs font-semibold text-[#c2c6d6]">Nhóm người nhận</label>
              <select
                value={recipientGroup}
                onChange={(e) => setRecipientGroup(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1f1f23] border border-[#272a34] text-white text-xs focus:outline-none"
              >
                <option value="all">Toàn bộ sinh viên toàn viện</option>
                <option value="k18">Chỉ sinh viên Khóa 18</option>
                <option value="k19">Chỉ sinh viên Khóa 19</option>
                <option value="k24">Tân sinh viên Khóa 24</option>
                <option value="warning">Sinh viên đang có cảnh báo học vụ</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#c2c6d6]">Tiêu đề thông báo *</label>
              <input
                type="text"
                required
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                placeholder="[EduCore] Nhắc nhở hạn nộp học phí và đăng ký học kỳ mới..."
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1f1f23] border border-[#272a34] text-white text-xs focus:outline-none focus:border-[#4d8eff]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#c2c6d6]">Nội dung văn bản *</label>
              <textarea
                rows={4}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Kính gửi các bạn sinh viên, Phòng Đào tạo xin thông báo..."
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1f1f23] border border-[#272a34] text-white text-xs focus:outline-none focus:border-[#4d8eff]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#272a34]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#1f1f23] text-[#c2c6d6] hover:bg-[#292a2d] text-xs font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#4d8eff] text-[#00285d] hover:bg-[#2563eb] hover:text-white text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>Gửi thông báo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 4. Backup snapshot
  if (type === 'backup') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-full max-w-md bg-[#1b1b1f] border border-[#272a34] rounded-2xl shadow-2xl overflow-hidden p-6 text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#272a34]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#38393c] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">database</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Sao lưu dữ liệu học tập</h3>
                <p className="text-xs text-[#8c909f]">Snapshot cơ sở dữ liệu học vụ đám mây</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-[#8c909f] hover:text-white">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="py-4 space-y-3 text-xs">
            <p className="text-[#c2c6d6] leading-relaxed">
              Bạn đang chuẩn bị tạo bản sao lưu toàn bộ cơ sở dữ liệu học vụ gồm:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8c909f]">
              <li>Hồ sơ {students.length} sinh viên hiện hành</li>
              <li>Bảng điểm thi và học phần các khoa</li>
              <li>Giao dịch học phí và định danh SSO</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#272a34]">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1f1f23] text-[#c2c6d6] hover:bg-[#292a2d] text-xs font-medium"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                onTriggerToast(
                  'Sao lưu hoàn tất',
                  'Bản sao lưu EDUCORE_SNAPSHOT_2025.bak đã được ghi nhận trên Cloud Storage.'
                );
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-base">cloud_download</span>
              <span>Bắt đầu sao lưu ngay</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
