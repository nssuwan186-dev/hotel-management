import React from 'react';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';

const Finance = ({ transactions }) => {
  const totalRevenue = transactions.filter(t => t.type === 'รายรับ').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'รายจ่าย').reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalRevenue - totalExpense;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90 font-bold">รายรับทั้งหมด</p>
          <p className="text-3xl font-black mt-2">฿{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90 font-bold">รายจ่ายทั้งหมด</p>
          <p className="text-3xl font-black mt-2">฿{totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90 font-bold">กำไรสุทธิ</p>
          <p className="text-3xl font-black mt-2">฿{netProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-lg">รายการธุรกรรม</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100">
            <Download size={16} /> ส่งออก Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">วันที่</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">ประเภท</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">หมวดหมู่</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">รายละเอียด</th>
                <th className="text-right p-4 text-xs font-black text-slate-600 uppercase">จำนวนเงิน</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 20).map((trans, idx) => (
                <tr key={trans.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-4 text-sm">{trans.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${trans.type === 'รายรับ' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {trans.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{trans.category}</td>
                  <td className="p-4 text-sm">{trans.description}</td>
                  <td className={`p-4 text-right font-black ${trans.type === 'รายรับ' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trans.type === 'รายรับ' ? '+' : ''}฿{Math.abs(trans.amount).toLocaleString()}
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

export default Finance;
