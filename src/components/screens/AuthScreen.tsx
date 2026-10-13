import React, { useState } from 'react';

interface AuthScreenProps {
  onLoginSuccess: () => void;
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Register state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const logoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1VjdkqJZTshV5KyuCY-wHTu41BVs9REJ-HP_ibNVtgc0sM2xV2yeFySwWtICCrwDGraoukDsWMCK-tXjvnvx-VlnkhiG9LkLAa1pSKXLrXeGyia0NOWDhGpUtXuya8llqsmcfuCC6Mo0IfSIYwGwColqF9D0wiV_oHCZPQMckKQNILZWKhak39DsibOS0hTo7JQgU93ifi5f5z2ikL3K5WfR-nNbqJamIM2DOpRbW-3qaiZ59rPPlfS4w';

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          rememberMe,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        onTriggerToast('Đăng nhập thất bại', data.error || 'Đã có lỗi xảy ra.', true);
        return;
      }

      onTriggerToast(
        'Đăng nhập thành công!',
        `Xin chào ${data.fullName}, đang chuyển hướng đến Dashboard...`
      );
      setTimeout(() => onLoginSuccess(), 800);
    } catch {
      onTriggerToast('Lỗi kết nối', 'Không thể kết nối tới máy chủ.', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (regPassword.length < 8) {
      onTriggerToast('Mật khẩu quá ngắn', 'Mật khẩu phải có ít nhất 8 ký tự.', true);
      return;
    }

    if (regPassword !== regConfirmPassword) {
      onTriggerToast(
        'Lỗi xác nhận',
        'Mật khẩu và xác nhận mật khẩu không trùng khớp!',
        true
      );
      return;
    }
    if (!agreeTerms) {
      onTriggerToast(
        'Yêu cầu đồng ý quy chế',
        'Vui lòng tích chọn đồng ý với Quy chế sử dụng.',
        true
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regFullName,
          email: regEmail,
          password: regPassword,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        onTriggerToast('Đăng ký thất bại', data.error || 'Đã có lỗi xảy ra.', true);
        return;
      }
      onTriggerToast(
        'Đăng ký hoàn tất',
        'Tài khoản hồ sơ sinh viên đã được tạo. Vui lòng đăng nhập để tiếp tục.'
      );

      setActiveTab('login');
      setLoginEmail(regEmail);
      setLoginPassword('');
    } catch {
      onTriggerToast('Lỗi kết nối', 'Không thể kết nối tới máy chủ.', true);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('login');
      setLoginEmail(regEmail);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#e3e2e6] flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Subtle Ambient Glow Backdrop Layers */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#4d8eff]/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#0267b8]/25 rounded-full blur-[120px] pointer-events-none -z-10" />

      <main className="w-full max-w-md">
        <div className="flex flex-col w-full relative items-center justify-center py-4">
          {/* Central Authentication Card */}
          <div className="w-full max-w-md bg-[#1b1b1f] border border-[#272a34] rounded-xl shadow-2xl p-6 md:p-8 flex flex-col relative overflow-hidden">
            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4d8eff] to-transparent opacity-80" />

            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#1f1f23] border border-[#272a34] flex items-center justify-center p-2.5 mb-3 shadow-md relative group">
                <div className="absolute inset-0 rounded-xl bg-[#4d8eff]/10 blur-sm" />
                <img
                  src={logoUrl}
                  alt="EduCore Logo"
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h1 className="text-xl font-bold text-[#e3e2e6] tracking-tight">
                EduCore Portal
              </h1>
              <p className="text-xs text-[#8c909f] mt-1 max-w-xs">
                Hệ thống Quản lý Đào tạo & Hồ sơ Sinh viên
              </p>
            </div>

            {/* Segmented Tab Navigation */}
            <div className="grid grid-cols-2 p-1 bg-[#0d0e11] rounded-lg mb-6 relative border border-[#272a34]">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`py-2 rounded-md text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'text-[#00285d] bg-[#4d8eff] shadow-sm font-semibold'
                    : 'text-[#8c909f] hover:text-[#e3e2e6]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>Đăng nhập</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`py-2 rounded-md text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'text-[#00285d] bg-[#4d8eff] shadow-sm font-semibold'
                    : 'text-[#8c909f] hover:text-[#e3e2e6]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Đăng ký</span>
              </button>
            </div>

            {/* Tab 1: Đăng nhập Form */}
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#c2c6d6] flex items-center justify-between">
                    <span>Email học viện / công vụ</span>
                    <span className="text-[#adc6ff] text-[11px]">@educore.edu.vn</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin@educore.edu.vn"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] focus:bg-[#292a2d] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#c2c6d6]">Mật khẩu</label>
                    <button
                      type="button"
                      onClick={() =>
                        onTriggerToast(
                          'Khôi phục mật khẩu',
                          'Liên kết đã được gửi tới email quản trị của bạn!'
                        )
                      }
                      className="text-[11px] text-[#adc6ff] hover:text-white transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-[18px]">
                      lock
                    </span>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-9 pr-10 py-2.5 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] focus:bg-[#292a2d] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 text-[#8c909f] hover:text-[#e3e2e6] p-1"
                      title="Ẩn / hiện mật khẩu"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showLoginPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-[#1f1f23] border-[#272a34] text-[#4d8eff] accent-[#4d8eff] cursor-pointer"
                    />
                    <span className="text-xs text-[#8c909f]">
                      Ghi nhớ đăng nhập trên thiết bị này
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full py-2.5 px-4 bg-[#4d8eff] hover:bg-[#2563eb] active:scale-[0.99] transition-all rounded-lg text-xs sm:text-sm font-semibold text-[#00285d] hover:text-white flex items-center justify-center gap-2 shadow-lg shadow-[#4d8eff]/20 disabled:opacity-50"
                >
                  <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập cổng đào tạo'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                {/* Institutional Quick Roles Hint */}
                <div className="mt-2 p-2.5 rounded-lg bg-[#1f1f23] border border-[#272a34] flex items-center gap-2.5 text-[#8c909f]">
                  <span className="material-symbols-outlined text-[#adc6ff] text-[18px] shrink-0">
                    verified_user
                  </span>
                  <span className="text-[11px] leading-tight">
                    Hỗ trợ xác thực SSO định danh giảng viên, quản trị viên & học viên toàn viện.
                  </span>
                </div>
              </form>
            ) : (
              /* Tab 2: Đăng ký Form */
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#c2c6d6]">Họ và tên</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-[18px]">
                      badge
                    </span>
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Nguyễn Minh Thảo"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#c2c6d6]">
                    Email trường / công vụ
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#8c909f] text-[18px]">
                      alternate_email
                    </span>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="admin.thao@educore.edu.vn"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#c2c6d6]">Mật khẩu</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2.5 text-[#8c909f] text-[18px]">
                        key
                      </span>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-8 pr-8 py-2 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2 text-[#8c909f] hover:text-[#e3e2e6] p-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {showRegPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#c2c6d6]">Xác nhận</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-2.5 text-[#8c909f] text-[18px]">
                        lock_reset
                      </span>
                      <input
                        type={showRegConfirm ? 'text' : 'password'}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-8 pr-8 py-2 bg-[#1f1f23] rounded-lg text-xs sm:text-sm text-[#e3e2e6] placeholder:text-[#8c909f] border border-[#272a34] focus:outline-none focus:border-[#4d8eff] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirm(!showRegConfirm)}
                        className="absolute right-2 text-[#8c909f] hover:text-[#e3e2e6] p-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {showRegConfirm ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded bg-[#1f1f23] border-[#272a34] text-[#4d8eff] accent-[#4d8eff] cursor-pointer"
                    />
                    <span className="text-[11px] text-[#8c909f] leading-tight">
                      Tôi đồng ý với Quy chế sử dụng và Chính sách bảo mật dữ liệu học vụ EduCore.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 w-full py-2.5 px-4 bg-[#4d8eff] hover:bg-[#2563eb] active:scale-[0.99] transition-all rounded-lg text-xs sm:text-sm font-semibold text-[#00285d] hover:text-white flex items-center justify-center gap-2 shadow-lg shadow-[#4d8eff]/20 disabled:opacity-50"
                >
                  <span>{isLoading ? 'Đang khởi tạo...' : 'Tạo tài khoản hồ sơ mới'}</span>
                  <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                </button>
              </form>
            )}
          </div>

          {/* Operational Footer & Helpdesk Meta */}
          <div className="mt-6 flex flex-col items-center text-center gap-2 w-full max-w-md px-2">
            <div className="flex items-center gap-4 text-[#8c909f] text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#adc6ff]">
                  headset_mic
                </span>
                Hotline: (024) 3869-2244
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#adc6ff]">
                  contact_support
                </span>
                daotao@educore.edu.vn
              </span>
            </div>
            <p className="text-[11px] text-[#8c909f]">
              © 2025 EduCore Academic Management System. Bảo mật cấp độ 3.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
