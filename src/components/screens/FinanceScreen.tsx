import React from 'react';

interface FinanceScreenProps {
  onTriggerToast: (title: string, message: string, isError?: boolean) => void;
}

export const FinanceScreen: React.FC<FinanceScreenProps> = ({ onTriggerToast }) => {
  const receipts = [
    {
      id: 'INV-2025-001',
      studentName: 'Nguyễn Minh Anh (SV202401)',
      amount: '12,500,000 đ',
      method: 'Cổng trực tuyến VNPAY',
      time: '12/02/2025 09:15',
      status: 'Đã hoàn tất',
    },
    {
      id: 'INV-2025-002',
      studentName: 'Trần Hoàng Nam (SV202402)',
      amount: '12,500,000 đ',
      method: 'Chuyển khoản BIDV',
      time: '12/02/2025 10:45',
      status: 'Đã hoàn tất',
    },
    {
      id: 'INV-2025-003',
      studentName: 'Phạm Đức Huy (SV202404)',
      amount: '6,250,000 đ',
      method: 'Thanh toán trực tiếp',
      time: '14/02/2025 14:20',
      status: 'Đang xử lý',
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 md:p-6 lg:p-8 gap-6 text-[#e3e2e6] text-left">
      {/* Banner */}
      <div className="rounded-xl bg-[#1f1f23] border border-[#272a34] p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
              Tài chính & Học vụ
            </span>
            <span className="text-xs text-[#8c909f]">• Quyết toán HK2 2024-2025</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Học phí & Tài chính Sinh viên
          </h1>
          <p className="text-xs sm:text-sm text-[#8c909f] mt-1">
            Quản lý công nợ học phí, biên lai thu học phí điện tử và chính sách học bổng khuyến khích.
          </p>
        </div>

        <button
          onClick={() => onTriggerToast('Đối soát tự động', 'Đang thực hiện đối soát với cổng thanh toán ngân hàng...')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-md shrink-0"
        >
          <span className="material-symbols-outlined text-lg">sync</span>
          <span>Đối soát thanh toán</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Tổng học phí đã thu</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            14.280.000.000 đ
          </div>
          <span className="text-[11px] text-[#adc6ff]">96.2% kế hoạch học kỳ</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Học phí chưa hoàn tất</span>
          <div className="text-2xl font-bold text-[#ffb4ab] font-mono mt-1">
            542.000.000 đ
          </div>
          <span className="text-[11px] text-[#8c909f]">43 sinh viên gia hạn</span>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1b1f] border border-[#272a34]">
          <span className="text-xs text-[#8c909f]">Quỹ học bổng khuyến khích</span>
          <div className="text-2xl font-bold text-[#adc6ff] font-mono mt-1">
            1.200.000.000 đ
          </div>
          <span className="text-[11px] text-emerald-400">96 suất học bổng toàn phần</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-[#1b1b1f] border border-[#272a34] overflow-hidden shadow-md">
        <div className="p-4 bg-[#1f1f23] border-b border-[#272a34] flex items-center justify-between">
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Giao dịch học phí gần đây
          </span>
          <span className="text-xs text-[#8c909f]">Hóa đơn điện tử e-Invoice</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0d0e11] text-[#8c909f] font-semibold border-b border-[#272a34]">
                <th className="py-3 px-4">Mã hóa đơn</th>
                <th className="py-3 px-4">Sinh viên</th>
                <th className="py-3 px-4">Số tiền</th>
                <th className="py-3 px-4">Hình thức thanh toán</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#272a34] text-[#e3e2e6]">
              {receipts.map((r) => (
                <tr key={r.id} className="hover:bg-[#1f1f23] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#adc6ff]">{r.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{r.studentName}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{r.amount}</td>
                  <td className="py-3.5 px-4 text-[#c2c6d6]">{r.method}</td>
                  <td className="py-3.5 px-4 font-mono text-[#8c909f]">{r.time}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400">
                      {r.status}
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
