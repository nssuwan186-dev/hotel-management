import React from 'react';
import { Users, Building2, TrendingUp, TrendingDown, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-slate-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  const roomStats = stats.rooms;
  const financial = stats.financial;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">ห้องทั้งหมด</p>
              <p className="text-3xl font-black mt-1">{roomStats.total_rooms}</p>
            </div>
            <Building2 className="text-slate-400" size={32} />
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase">มีแขก</p>
              <p className="text-3xl font-black mt-1 text-blue-600">{roomStats.occupied}</p>
              <p className="text-xs text-blue-500 mt-1">{roomStats.occupancy_rate}% อัตราเข้าพัก</p>
            </div>
            <Users className="text-blue-400" size={32} />
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-600 font-bold uppercase">ห้องว่าง</p>
              <p className="text-3xl font-black mt-1 text-emerald-600">{roomStats.available}</p>
            </div>
            <CheckCircle className="text-emerald-400" size={32} />
          </div>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-600 font-bold uppercase">กำลังทำความสะอาด</p>
              <p className="text-3xl font-black mt-1 text-amber-600">{roomStats.cleaning}</p>
            </div>
            <Clock className="text-amber-400" size={32} />
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={24} />
            <h3 className="font-bold text-lg">รายรับเดือนนี้</h3>
          </div>
          <p className="text-4xl font-black">฿{financial.monthly_revenue.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-2">อัปเดตแบบเรียลไทม์</p>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown size={24} />
            <h3 className="font-bold text-lg">รายจ่ายเดือนนี้</h3>
          </div>
          <p className="text-4xl font-black">฿{financial.monthly_expense.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-2">กำไรสุทธิ: ฿{financial.net_profit.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Clock size={20} />
          กิจกรรมล่าสุด
        </h3>
        <div className="space-y-3">
          {stats.recent_activity.slice(0, 5).map(trans => (
            <div key={trans.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${trans.type === 'รายรับ' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {trans.type === 'รายรับ' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
                <div>
                  <p className="font-bold text-sm">{trans.description}</p>
                  <p className="text-xs text-slate-500">{trans.date} • {trans.category}</p>
                </div>
              </div>
              <p className={`font-black ${trans.type === 'รายรับ' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trans.type === 'รายรับ' ? '+' : ''}฿{Math.abs(trans.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Alerts */}
      {stats.maintenance_alerts.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-800">
            <AlertCircle size={20} />
            การแจ้งซ่อมที่รอดำเนินการ ({stats.maintenance_alerts.length})
          </h3>
          <div className="space-y-2">
            {stats.maintenance_alerts.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                <div>
                  <p className="font-bold text-sm">ห้อง {item.room}: {item.issue}</p>
                  <p className="text-xs text-slate-500">รายงานเมื่อ: {item.report_date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.priority === 'สูง' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
