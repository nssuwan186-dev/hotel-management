import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, LineChart, Calendar, Filter, Download } from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [chartType, setChartType] = useState('revenue');

  // Sample analytics data
  const analyticsData = {
    revenue: {
      total: 125000,
      growth: 12.5,
      data: [45000, 52000, 48000, 61000, 55000, 67000, 72000]
    },
    occupancy: {
      rate: 78.5,
      growth: 8.2,
      data: [65, 72, 68, 75, 82, 79, 85]
    },
    guests: {
      total: 342,
      growth: 15.3,
      data: [45, 52, 48, 61, 55, 67, 72]
    }
  };

  const chartData = [
    { name: 'ม.ค.', value: 45000 },
    { name: 'ก.พ.', value: 52000 },
    { name: 'มี.ค.', value: 48000 },
    { name: 'เม.ย.', value: 61000 },
    { name: 'พ.ค.', value: 55000 },
    { name: 'มิ.ย.', value: 67000 },
    { name: 'ก.ค.', value: 72000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">วิเคราะห์ข้อมูลและแนวโน้มธุรกิจ</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="7days">7 วันล่าสุด</option>
            <option value="30days">30 วันล่าสุด</option>
            <option value="90days">90 วันล่าสุด</option>
            <option value="1year">1 ปีล่าสุด</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">รายรับรวม</p>
              <p className="text-2xl font-bold mt-1">฿{analyticsData.revenue.total.toLocaleString()}</p>
              <p className="text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} />
                +{analyticsData.revenue.growth}% จากเดือนที่แล้ว
              </p>
            </div>
            <BarChart3 size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">อัตราเข้าพัก</p>
              <p className="text-2xl font-bold mt-1">{analyticsData.occupancy.rate}%</p>
              <p className="text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} />
                +{analyticsData.occupancy.growth}% จากเดือนที่แล้ว
              </p>
            </div>
            <PieChart size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">จำนวนแขก</p>
              <p className="text-2xl font-bold mt-1">{analyticsData.guests.total}</p>
              <p className="text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} />
                +{analyticsData.guests.growth}% จากเดือนที่แล้ว
              </p>
            </div>
            <LineChart size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">ADR (ราคาเฉลี่ย)</p>
              <p className="text-2xl font-bold mt-1">฿1,850</p>
              <p className="text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} />
                +5.2% จากเดือนที่แล้ว
              </p>
            </div>
            <Calendar size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">แนวโน้มรายรับ</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                    style={{ height: `${(item.value / 80000) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">อัตราการเข้าพัก</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {analyticsData.occupancy.data.map((rate, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
                    style={{ height: `${rate}%` }}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">รายละเอียดการวิเคราะห์</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">ประสิทธิภาพห้องพัก</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ห้องที่ได้รับความนิยม</span>
                  <span className="font-medium">Deluxe (45%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ระยะเวลาเข้าพักเฉลี่ย</span>
                  <span className="font-medium">2.3 วัน</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">อัตราการกลับมาใหม่</span>
                  <span className="font-medium">32%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">ข้อมูลลูกค้า</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ลูกค้าใหม่</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ลูกค้าเก่า</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">คะแนนความพึงพอใจ</span>
                  <span className="font-medium">4.7/5</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">การเงิน</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">กำไรสุทธิ</span>
                  <span className="font-medium text-green-600">฿45,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ต้นทุนดำเนินงาน</span>
                  <span className="font-medium text-red-600">฿80,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ROI</span>
                  <span className="font-medium">36%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">การพยากรณ์และแนะนำ</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">พยากรณ์เดือนหน้า</h4>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">รายรับคาดการณ์</p>
                  <p className="text-lg font-bold text-blue-600">฿135,000</p>
                  <p className="text-xs text-blue-600">เพิ่มขึ้น 8% จากเดือนนี้</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm font-medium text-emerald-900">อัตราเข้าพักคาดการณ์</p>
                  <p className="text-lg font-bold text-emerald-600">82%</p>
                  <p className="text-xs text-emerald-600">เพิ่มขึ้น 3.5% จากเดือนนี้</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">คำแนะนำ</h4>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm font-medium text-yellow-900">เพิ่มโปรโมชั่นวันธรรมดา</p>
                  <p className="text-xs text-yellow-700">อัตราเข้าพักวันธรรมดาต่ำกว่าเป้าหมาย 15%</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <p className="text-sm font-medium text-green-900">ขยายบริการเสริม</p>
                  <p className="text-xs text-green-700">ลูกค้าสนใจบริการ spa และ fitness</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm font-medium text-purple-900">ปรับปรุงห้องประเภท Standard</p>
                  <p className="text-xs text-purple-700">คะแนนความพึงพอใจต่ำกว่าประเภทอื่น</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
