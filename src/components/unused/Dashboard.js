import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, DollarSign, AlertTriangle, 
  TrendingUp, Calendar, Clock, CheckCircle,
  User, Phone, MapPin, Wrench
} from 'lucide-react';

const Dashboard = ({ stats }) => {
  const [dashboardData, setDashboardData] = useState({
    totalRooms: 51,
    occupiedRooms: 38,
    availableRooms: 10,
    cleaningRooms: 2,
    maintenanceRooms: 1,
    monthlyRevenue: 285000,
    monthlyExpenses: 125000,
    netProfit: 160000,
    occupancyRate: Math.round((38 / 51) * 100)
  });

  const [recentActivities] = useState([
    { id: 1, type: 'checkin', message: 'เช็คอิน ห้อง A204 - นายสมชาย ใจดี', time: '10:30' },
    { id: 2, type: 'checkout', message: 'เช็คเอาท์ ห้อง B105 - นางสาวมาลี สวย', time: '09:15' },
    { id: 3, type: 'maintenance', message: 'แจ้งซ่อม ห้อง A102 - แอร์เสีย', time: '08:45' },
    { id: 4, type: 'payment', message: 'รับชำระเงิน ห้อง A206 - ฿3,500', time: '08:20' },
    { id: 5, type: 'cleaning', message: 'ทำความสะอาด ห้อง B203 เสร็จสิ้น', time: '07:50' }
  ]);

  const [maintenanceAlerts] = useState([
    { room: 'A102', issue: 'แอร์เสีย ไม่เย็น', priority: 'high' },
    { room: 'B205', issue: 'ก๊อกน้ำรั่ว', priority: 'medium' }
  ]);

  useEffect(() => {
    // คำนวณข้อมูลแบบเรียลไทม์
    const occupancyRate = Math.round((dashboardData.occupiedRooms / dashboardData.totalRooms) * 100);
    const netProfit = dashboardData.monthlyRevenue - dashboardData.monthlyExpenses;
    
    setDashboardData(prev => ({
      ...prev,
      occupancyRate,
      netProfit
    }));
  }, [dashboardData.occupiedRooms, dashboardData.totalRooms, dashboardData.monthlyRevenue, dashboardData.monthlyExpenses]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkin': return <User className="text-green-600" size={16} />;
      case 'checkout': return <CheckCircle className="text-blue-600" size={16} />;
      case 'maintenance': return <Wrench className="text-red-600" size={16} />;
      case 'payment': return <DollarSign className="text-green-600" size={16} />;
      case 'cleaning': return <CheckCircle className="text-purple-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 แดชบอร์ด</h2>
          <p className="text-sm text-gray-500">ภาพรวมการดำเนินงานแบบเรียลไทม์</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">อัปเดตล่าสุด</p>
          <p className="text-sm font-semibold">{new Date().toLocaleTimeString('th-TH')}</p>
        </div>
      </div>

      {/* สถิติห้องพัก */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ห้องทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.totalRooms}</p>
            </div>
            <Building2 className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ห้องที่มีแขก</p>
              <p className="text-2xl font-bold text-green-600">{dashboardData.occupiedRooms}</p>
              <p className="text-xs text-gray-500">อัตราเข้าพัก {dashboardData.occupancyRate}%</p>
            </div>
            <Users className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ห้องว่าง</p>
              <p className="text-2xl font-bold text-blue-600">{dashboardData.availableRooms}</p>
            </div>
            <CheckCircle className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ทำความสะอาด</p>
              <p className="text-2xl font-bold text-yellow-600">{dashboardData.cleaningRooms}</p>
              <p className="text-xs text-red-600">ซ่อมบำรุง {dashboardData.maintenanceRooms}</p>
            </div>
            <AlertTriangle className="text-yellow-600" size={32} />
          </div>
        </div>
      </div>

      {/* สถิติการเงิน */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">รายรับเดือนนี้</h3>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-green-600">฿{dashboardData.monthlyRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">รายจ่ายเดือนนี้</h3>
            <DollarSign className="text-red-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-red-600">฿{dashboardData.monthlyExpenses.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">กำไรสุทธิ</h3>
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-blue-600">฿{dashboardData.netProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* กิจกรรมล่าสุด */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">🕐 กิจกรรมล่าสุด (5 รายการ)</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* แจ้งเตือนการซ่อม */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">🔧 แจ้งเตือนการซ่อมที่รอดำเนินการ</h3>
          </div>
          <div className="p-6">
            {maintenanceAlerts.length > 0 ? (
              <div className="space-y-3">
                {maintenanceAlerts.map((alert, index) => (
                  <div key={index} className={`flex items-center gap-3 p-4 rounded-lg border-l-4 ${
                    alert.priority === 'high' 
                      ? 'bg-red-50 border-l-red-500' 
                      : 'bg-yellow-50 border-l-yellow-500'
                  }`}>
                    <AlertTriangle className={alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'} size={20} />
                    <div className="flex-1">
                      <p className="font-semibold">ห้อง {alert.room}</p>
                      <p className="text-sm text-gray-600">{alert.issue}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.priority === 'high' ? 'เร่งด่วน' : 'ปานกลาง'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>ไม่มีการซ่อมที่รอดำเนินการ</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
