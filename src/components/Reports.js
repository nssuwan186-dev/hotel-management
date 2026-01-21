import React, { useState } from 'react';
import { FileText, Building2, Users, ChevronRight, Download, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const reportTypes = [
    {
      id: 'financial',
      title: 'รายงานรายรับ-รายจ่าย',
      description: 'ดูสรุปการเงินประจำเดือน',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'occupancy',
      title: 'รายงานการเข้าพัก',
      description: 'สรุปอัตราการเข้าพักห้อง',
      icon: Building2,
      color: 'emerald'
    },
    {
      id: 'guests',
      title: 'รายงานลูกค้า',
      description: 'สถิติและข้อมูลลูกค้า',
      icon: Users,
      color: 'purple'
    },
    {
      id: 'maintenance',
      title: 'รายงานการซ่อมบำรุง',
      description: 'สรุปรายการแจ้งซ่อมและค่าใช้จ่าย',
      icon: BarChart3,
      color: 'orange'
    }
  ];

  const generateReport = (reportId) => {
    alert(`กำลังสร้างรายงาน: ${reportTypes.find(r => r.id === reportId)?.title}`);
    setSelectedReport(null);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 group-hover:text-blue-600',
      emerald: 'text-emerald-600 group-hover:text-emerald-600',
      purple: 'text-purple-600 group-hover:text-purple-600',
      orange: 'text-orange-600 group-hover:text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">รายงาน</h2>
        <p className="text-sm text-gray-500 mt-1">สร้างและดาวน์โหลดรายงานต่างๆ</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase">รายรับวันนี้</p>
              <p className="text-2xl font-black text-blue-600 mt-1">฿2,500</p>
            </div>
            <TrendingUp className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase">อัตราเข้าพัก</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">75%</p>
            </div>
            <Building2 className="text-emerald-400" size={24} />
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-600 uppercase">ลูกค้าใหม่</p>
              <p className="text-2xl font-black text-purple-600 mt-1">12</p>
            </div>
            <Users className="text-purple-400" size={24} />
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-orange-600 uppercase">รายการซ่อม</p>
              <p className="text-2xl font-black text-orange-600 mt-1">3</p>
            </div>
            <BarChart3 className="text-orange-400" size={24} />
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={getColorClasses(report.color)} size={32} />
                <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="font-bold text-lg">{report.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{report.description}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">รายงานล่าสุด</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { name: 'รายงานรายรับ-รายจ่าย มกราคม 2026', date: '2026-01-20', size: '245 KB' },
              { name: 'รายงานการเข้าพัก สัปดาห์ที่ 3', date: '2026-01-19', size: '156 KB' },
              { name: 'รายงานลูกค้า ประจำเดือน', date: '2026-01-18', size: '89 KB' }
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Generation Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedReport(null)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">{selectedReport.title}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ช่วงวันที่
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">วันที่เริ่ม</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">วันที่สิ้นสุด</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปแบบไฟล์
                </label>
                <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel (.xlsx)</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => generateReport(selectedReport.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Download size={16} />
                สร้างรายงาน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
          <h3 className="font-bold text-lg">รายงานลูกค้า</h3>
          <p className="text-sm text-slate-500 mt-1">วิเคราะห์ข้อมูลลูกค้า</p>
        </button>
      </div>
    </div>
  );
};

export default Reports;
