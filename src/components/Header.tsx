import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  notificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenMobileMenu,
  notificationsCount = 3,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const profileUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_7ByssQwghBViv55HCgnYl255svphxLtE1MQdJnsjs6OXrYkiD-eNckZAWWquNesYFuQz4BCKW2l6n8Ejj9odSLhvitymSPALonyuji6ZARMKVfmC6kBALsYvy8nM8e2V4Qvtrt--PTlozLWCMGVM-4CG-3xkjRNPI1COMWOMp1qF8PwzN1SczwrYwYEcFG9lL-O7b6FyZ1qWyVb4T2pTgMDkpm7i6JRMOWxnuvU2aocgQRQQLQm2';

  const mockNotifs = [
    {
      id: 1,
      title: 'Bảng điểm mới được cập nhật',
      desc: 'TS. Đặng Tuấn Minh đã nộp điểm môn INT3105',
      time: '5 phút trước',
    },
    {
      id: 2,
      title: 'Yêu cầu chuyển lớp',
      desc: 'Sinh viên SV24-0892 đề xuất chuyển sang K24-KTPM01',
      time: '32 phút trước',
    },
    {
      id: 3,
      title: 'Sao lưu định kỳ',
      desc: 'Bản sao lưu cơ sở dữ liệu học vụ hoàn tất 100%',
      time: '2 giờ trước',
    },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-[#121316]/85 backdrop-blur-xl border-b border-[#272a34] shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-16 w-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Mobile burger + Breadcrumbs + Search */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-[#c2c6d6] hover:bg-[#1f1f23] transition-colors"
            title="Mở menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="flex items-center gap-2 text-[#c2c6d6] text-xs sm:text-sm">
            <span className="material-symbols-outlined text-base text-[#8c909f]">domain</span>
            <span>Hệ thống</span>
            <span className="text-[#8c909f]">/</span>
            <span className="text-[#e3e2e6] font-semibold">EduCore Admin</span>
          </div>

          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 bg-[#1f1f23] hover:bg-[#292a2d] border border-[#272a34] rounded-lg transition-all text-left group"
          >
            <span className="material-symbols-outlined text-[#8c909f] group-hover:text-[#adc6ff] text-lg">
              search
            </span>
            <span className="text-xs sm:text-sm text-[#8c909f]">
              Tìm mã SV, hồ sơ, lớp học...
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#292a2d] text-[#c2c6d6] font-mono border border-[#424754]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Side: Semester Pill + Notifications + Profile */}
        <div className="flex items-center gap-3 md:gap-4 relative">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#0267b8]/20 text-[#a4c9ff] border border-[#0267b8]/40 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm text-[#adc6ff]">event_note</span>
            <span>Học kỳ II - 2024-2025</span>
          </div>

          {/* Quick Search mobile icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#c2c6d6] hover:text-[#e3e2e6] rounded-lg hover:bg-[#1f1f23] transition-colors"
            title="Tìm kiếm"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Notifications bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#c2c6d6] hover:text-[#e3e2e6] rounded-lg hover:bg-[#1f1f23] transition-colors"
              title="Thông báo"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {notificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse"></span>
              )}
            </button>

            {/* Dropdown menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1b1b1f] border border-[#272a34] rounded-xl shadow-2xl z-50 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#272a34]">
                  <span className="text-xs font-semibold text-[#e3e2e6] uppercase tracking-wider">
                    Thông báo hệ thống
                  </span>
                  <span className="text-[11px] text-[#adc6ff] cursor-pointer hover:underline">
                    Đánh dấu đã đọc
                  </span>
                </div>
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                  {mockNotifs.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-[#1f1f23] hover:bg-[#292a2d] transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#e3e2e6]">{n.title}</span>
                        <span className="text-[10px] text-[#8c909f]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#c2c6d6] mt-0.5 line-clamp-2">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Status Profile */}
          <div className="flex items-center gap-2.5 pl-1 border-l border-[#272a34]">
            <img
              src={profileUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4d8eff]/40"
            />
            <div className="hidden xl:flex flex-col text-right leading-none">
              <span className="text-xs font-semibold text-[#e3e2e6]">
                Nguyễn Văn An
              </span>
              <span className="text-[11px] text-[#adc6ff] mt-1 flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Đang trực tuyến
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
