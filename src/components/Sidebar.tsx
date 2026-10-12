import React from 'react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard' },
    { id: 'quan-ly-sinh-vien', label: 'Quản lý sinh viên', icon: 'school' },
    { id: 'khoa-va-nganh-hoc', label: 'Khoa & Ngành học', icon: 'account_tree' },
    { id: 'hoc-tap-va-diem-so', label: 'Học tập & Điểm số', icon: 'fact_check' },
    { id: 'hoc-phi-va-tai-chinh', label: 'Học phí & Tài chính', icon: 'payments' },
  ];

  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1VjdkqJZTshV5KyuCY-wHTu41BVs9REJ-HP_ibNVtgc0sM2xV2yeFySwWtICCrwDGraoukDsWMCK-tXjvnvx-VlnkhiG9LkLAa1pSKXLrXeGyia0NOWDhGpUtXuya8llqsmcfuCC6Mo0IfSIYwGwColqF9D0wiV_oHCZPQMckKQNILZWKhak39DsibOS0hTo7JQgU93ifi5f5z2ikL3K5WfR-nNbqJamIM2DOpRbW-3qaiZ59rPPlfS4w';
  const profileUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_7ByssQwghBViv55HCgnYl255svphxLtE1MQdJnsjs6OXrYkiD-eNckZAWWquNesYFuQz4BCKW2l6n8Ejj9odSLhvitymSPALonyuji6ZARMKVfmC6kBALsYvy8nM8e2V4Qvtrt--PTlozLWCMGVM-4CG-3xkjRNPI1COMWOMp1qF8PwzN1SczwrYwYEcFG9lL-O7b6FyZ1qWyVb4T2pTgMDkpm7i6JRMOWxnuvU2aocgQRQQLQm2';

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#1b1b1f] z-50 flex flex-col justify-between p-4 shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-r border-[#272a34] transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo brand */}
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="w-9 h-9 rounded-lg bg-[#1f1f23] p-1 flex items-center justify-center border border-[#272a34] shrink-0">
              <img
                src={logoUrl}
                alt="EduCore Logo"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base text-[#e3e2e6] tracking-tight leading-none">
                EduCore
              </span>
              <span className="text-xs text-[#adc6ff] tracking-wide leading-none mt-1 font-medium">
                StudentPortal
              </span>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden ml-auto p-1 text-[#8c909f] hover:text-[#e3e2e6]"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-left group ${
                    isActive
                      ? 'bg-[#4d8eff] text-[#00285d] font-semibold shadow-md shadow-[#4d8eff]/20'
                      : 'text-[#c2c6d6] hover:bg-[#292a2d] hover:text-[#e3e2e6]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
                      isActive ? 'text-[#00285d]' : 'text-[#8c909f] group-hover:text-[#adc6ff]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#272a34]">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-[#ffb4ab] hover:bg-[#93000a]/30 hover:text-[#ffdad6] transition-colors text-left"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>

          {/* User profile card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1f1f23] border border-[#272a34]/80">
            <img
              src={profileUrl}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-[#4d8eff]/30"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-[#e3e2e6] truncate leading-tight">
                Nguyễn Văn An
              </span>
              <span className="text-[11px] text-[#8c909f] truncate leading-tight mt-0.5">
                Quản trị viên / Đào tạo
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
