import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, AlertTriangle, TrendingUp, BarChart3, PieChart } from 'lucide-react';

const AdvancedDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    monthlyRevenue: [85000, 92000, 78000, 105000, 98000, 125000],
    occupancyTrend: [65, 72, 68, 85, 78, 82],
    customerCredits: [
      { name: 'นายสมชาย ใจดี', credit: 2500, type: 'positive' },
      { name: 'นางสาวมาลี สวย', debt: -1200, type: 'negative' },
      { name: 'นายวิชัย รวย', credit: 800, type: 'positive' }
    ],
    notifications: [
      { type: 'payment', message: 'ห้อง A204 ค้างชำระค่าเช่า 3 วัน', priority: 'high' },
      { type: 'maintenance', message: 'ห้อง B105 ครบกำหนดตรวจสอบแอร์', priority: 'medium' },
      { type: 'contract', message: 'สัญญาเช่าห้อง A206 หมดอายุใน 7 วัน', priority: 'high' }
    ],
    roomStats: {
      daily: { total: 35, occupied: 28, available: 7, maintenance: 0 },
      monthly: { total: 16, occupied: 14, available: 1, maintenance: 1 }
    }
  });

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 Dashboard ขั้นสูง</h2>
          <p className="text-sm text-gray-500">ภาพรวมและแนวโน้มธุรกิจ</p>
        </div>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">สัปดาห์นี้</option>
          <option value="month">เดือนนี้</option>
          <option value="quarter">ไตรมาสนี้</option>
          <option value="year">ปีนี้</option>
        </select>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            แนวโน้มรายรับ 6 เดือนล่าสุด
          </h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between gap-2">
            {dashboardData.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400"
                  style={{ height: `${(revenue / 125000) * 200}px` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">
                  {['ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][index]}
                </p>
                <p className="text-xs font-bold text-gray-800">
                  ฿{(revenue / 1000).toFixed(0)}K
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Occupancy Stats */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="text-purple-600" size={20} />
              สถิติการเข้าพัก
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">ห้องรายวัน</span>
                <span className="text-sm text-gray-600">
                  {dashboardData.roomStats.daily.occupied}/{dashboardData.roomStats.daily.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${(dashboardData.roomStats.daily.occupied / dashboardData.roomStats.daily.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                อัตราเข้าพัก {Math.round((dashboardData.roomStats.daily.occupied / dashboardData.roomStats.daily.total) * 100)}%
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">ห้องรายเดือน</span>
                <span className="text-sm text-gray-600">
                  {dashboardData.roomStats.monthly.occupied}/{dashboardData.roomStats.monthly.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${(dashboardData.roomStats.monthly.occupied / dashboardData.roomStats.monthly.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                อัตราเข้าพัก {Math.round((dashboardData.roomStats.monthly.occupied / dashboardData.roomStats.monthly.total) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Customer Credits/Debts */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <DollarSign className="text-green-600" size={20} />
              เครดิต/หนี้ลูกค้า
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {dashboardData.customerCredits.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">
                      {customer.type === 'positive' ? 'เครดิต' : 'ค้างชำระ'}
                    </p>
                  </div>
                  <div className={`text-right ${customer.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    <p className="font-bold">
                      {customer.type === 'positive' ? '+' : ''}฿{Math.abs(customer.credit || customer.debt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="text-orange-600" size={20} />
            การแจ้งเตือนสำคัญ
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {dashboardData.notifications.map((notification, index) => (
              <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border-l-4 ${
                notification.priority === 'high' 
                  ? 'bg-red-50 border-l-red-500' 
                  : 'bg-yellow-50 border-l-yellow-500'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  notification.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.type === 'payment' && '💳 การชำระเงิน'}
                    {notification.type === 'maintenance' && '🔧 การบำรุงรักษา'}
                    {notification.type === 'contract' && '📄 สัญญาเช่า'}
                  </p>
                </div>
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  ดำเนินการ
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">⚡ การดำเนินการด่วน</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all flex flex-col items-center gap-2">
              <Calendar size={24} />
              <span className="text-sm font-semibold">ปฏิทินจอง</span>
            </button>
            <button className="p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all flex flex-col items-center gap-2">
              <Users size={24} />
              <span className="text-sm font-semibold">เช็คอินด่วน</span>
            </button>
            <button className="p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all flex flex-col items-center gap-2">
              <DollarSign size={24} />
              <span className="text-sm font-semibold">บันทึกรายรับ</span>
            </button>
            <button className="p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all flex flex-col items-center gap-2">
              <AlertTriangle size={24} />
              <span className="text-sm font-semibold">แจ้งซ่อม</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;
