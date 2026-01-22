import React, { useState, useEffect } from 'react';
import { Wrench, Clock, CheckCircle, AlertTriangle, Plus, Calendar, User, FileText } from 'lucide-react';

const MaintenanceManager = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [cleaningSchedule, setCleaningSchedule] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('maintenance');

  useEffect(() => {
    // โหลดข้อมูลการซ่อมแซม
    const mockMaintenance = [
      {
        id: 1,
        room: 'A102',
        issue: 'แอร์เสีย ไม่เย็น',
        priority: 'high',
        status: 'pending',
        reportedBy: 'นายสมชาย ใจดี',
        reportedDate: '2024-01-20',
        assignedTo: 'ช่างแอร์ - นายวิชัย',
        estimatedCost: 2500,
        description: 'แอร์ห้อง A102 ไม่เย็น เปิดแล้วมีแต่ลมธรรมดา ต้องตรวจสอบน้ำยาแอร์'
      },
      {
        id: 2,
        room: 'B205',
        issue: 'ก๊อกน้ำรั่ว',
        priority: 'medium',
        status: 'in_progress',
        reportedBy: 'แม่บ้าน - นางสาวมาลี',
        reportedDate: '2024-01-19',
        assignedTo: 'ช่างประปา - นายสมศักดิ์',
        estimatedCost: 500,
        description: 'ก๊อกน้ำในห้องน้ำรั่ว น้ำหยดตลอดเวลา'
      },
      {
        id: 3,
        room: 'A206',
        issue: 'หลอดไฟเสีย',
        priority: 'low',
        status: 'completed',
        reportedBy: 'ลูกค้า',
        reportedDate: '2024-01-18',
        assignedTo: 'ช่างไฟ - นายประยุทธ',
        estimatedCost: 150,
        actualCost: 120,
        completedDate: '2024-01-19',
        description: 'หลอดไฟในห้องนอนเสีย'
      }
    ];

    const mockCleaning = [
      {
        id: 1,
        room: 'A101',
        type: 'daily',
        scheduledDate: '2024-01-21',
        scheduledTime: '10:00',
        assignedTo: 'นางสาวสุดา',
        status: 'scheduled',
        tasks: ['ทำความสะอาดห้องน้ำ', 'เปลี่ยนผ้าปูที่นอน', 'ดูดฝุ่น']
      },
      {
        id: 2,
        room: 'B103',
        type: 'deep',
        scheduledDate: '2024-01-21',
        scheduledTime: '14:00',
        assignedTo: 'นางสาวมาลี',
        status: 'in_progress',
        tasks: ['ทำความสะอาดลึก', 'ล้างผนัง', 'ทำความสะอาดแอร์']
      },
      {
        id: 3,
        room: 'A204',
        type: 'checkout',
        scheduledDate: '2024-01-21',
        scheduledTime: '12:00',
        assignedTo: 'นางสาวสุดา',
        status: 'completed',
        tasks: ['ตรวจสอบความเสียหาย', 'ทำความสะอาดทั่วไป', 'เตรียมห้องสำหรับลูกค้าใหม่']
      }
    ];

    setMaintenanceRecords(mockMaintenance);
    setCleaningSchedule(mockCleaning);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'รอดำเนินการ';
      case 'in_progress': return 'กำลังดำเนินการ';
      case 'completed': return 'เสร็จสิ้น';
      case 'scheduled': return 'กำหนดการ';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🔧 การจัดการซ่อมแซมและบำรุงรักษา</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <Plus size={16} />
          เพิ่มรายการใหม่
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
              activeTab === 'maintenance'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🔧 การซ่อมแซม
          </button>
          <button
            onClick={() => setActiveTab('cleaning')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
              activeTab === 'cleaning'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🧹 ตารางทำความสะอาด
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              {maintenanceRecords.map((record) => (
                <div key={record.id} className="border rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">ห้อง {record.room}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(record.priority)}`}>
                          {record.priority === 'high' && 'เร่งด่วน'}
                          {record.priority === 'medium' && 'ปานกลาง'}
                          {record.priority === 'low' && 'ไม่เร่งด่วน'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                          {getStatusText(record.status)}
                        </span>
                      </div>
                      <p className="text-gray-900 font-semibold mb-2">{record.issue}</p>
                      <p className="text-gray-600 text-sm mb-3">{record.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">แจ้งโดย</p>
                      <p className="font-semibold">{record.reportedBy}</p>
                      <p className="text-gray-500 text-xs">{record.reportedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">มอบหมายให้</p>
                      <p className="font-semibold">{record.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ค่าใช้จ่าย</p>
                      <p className="font-semibold">
                        {record.actualCost ? `฿${record.actualCost.toLocaleString()}` : `฿${record.estimatedCost.toLocaleString()} (ประมาณ)`}
                      </p>
                      {record.completedDate && (
                        <p className="text-green-600 text-xs">เสร็จสิ้น: {record.completedDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      อัปเดตสถานะ
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cleaning' && (
            <div className="space-y-4">
              {cleaningSchedule.map((schedule) => (
                <div key={schedule.id} className="border rounded-xl p-6 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">ห้อง {schedule.room}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          schedule.type === 'daily' ? 'text-blue-600 bg-blue-100' :
                          schedule.type === 'deep' ? 'text-purple-600 bg-purple-100' :
                          'text-green-600 bg-green-100'
                        }`}>
                          {schedule.type === 'daily' && 'ทำความสะอาดประจำวัน'}
                          {schedule.type === 'deep' && 'ทำความสะอาดลึก'}
                          {schedule.type === 'checkout' && 'ทำความสะอาดหลังเช็คเอาท์'}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(schedule.status)}`}>
                          {getStatusText(schedule.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {schedule.scheduledDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {schedule.scheduledTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {schedule.assignedTo}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-2">รายการงาน:</p>
                    <div className="flex flex-wrap gap-2">
                      {schedule.tasks.map((task, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                      เสร็จสิ้น
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      แก้ไขกำหนดการ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceManager;
