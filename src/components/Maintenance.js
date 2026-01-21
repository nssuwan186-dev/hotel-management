import React, { useState } from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle, Plus, Calendar, User, Building } from 'lucide-react';

const Maintenance = ({ maintenanceList = [] }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMaintenance, setNewMaintenance] = useState({
    room: '',
    issue: '',
    priority: 'ปานกลาง',
    reporter: '',
    description: ''
  });

  const filteredList = maintenanceList.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const handleAddMaintenance = () => {
    if (!newMaintenance.room || !newMaintenance.issue) {
      alert('กรุณากรอกห้องและปัญหาที่พบ');
      return;
    }
    
    alert('บันทึกรายการแจ้งซ่อมสำเร็จ!');
    setShowAddForm(false);
    setNewMaintenance({
      room: '',
      issue: '',
      priority: 'ปานกลาง',
      reporter: '',
      description: ''
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'สูง': return 'bg-red-100 text-red-800';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800';
      case 'ต่ำ': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'รอดำเนินการ': return 'bg-amber-100 text-amber-800';
      case 'กำลังดำเนินการ': return 'bg-blue-100 text-blue-800';
      case 'เสร็จสิ้น': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">รายการแจ้งซ่อม</h2>
          <p className="text-sm text-gray-500 mt-1">จำนวนรายการทั้งหมด {maintenanceList.length} รายการ</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          <Plus size={16} />
          แจ้งซ่อมใหม่
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase">รอดำเนินการ</p>
              <p className="text-3xl font-black text-amber-600 mt-2">
                {maintenanceList.filter(m => m.status === 'รอดำเนินการ').length}
              </p>
            </div>
            <Clock className="text-amber-400" size={32} />
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase">กำลังดำเนินการ</p>
              <p className="text-3xl font-black text-blue-600 mt-2">
                {maintenanceList.filter(m => m.status === 'กำลังดำเนินการ').length}
              </p>
            </div>
            <Wrench className="text-blue-400" size={32} />
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase">เสร็จสิ้น</p>
              <p className="text-3xl font-black text-emerald-600 mt-2">
                {maintenanceList.filter(m => m.status === 'เสร็จสิ้น').length}
              </p>
            </div>
            <CheckCircle className="text-emerald-400" size={32} />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">กรองตามสถานะ:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="รอดำเนินการ">รอดำเนินการ</option>
          <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
          <option value="เสร็จสิ้น">เสร็จสิ้น</option>
        </select>
      </div>

      {/* Maintenance List */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="text-center py-12">
            <Wrench className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">
              {maintenanceList.length === 0 ? 'ยังไม่มีรายการแจ้งซ่อม' : 'ไม่พบรายการที่ตรงกับเงื่อนไข'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ห้อง</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ปัญหา</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">ความสำคัญ</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">สถานะ</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ผู้แจ้ง</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">วันที่แจ้ง</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-gray-400" />
                        <span className="font-bold text-lg">{item.room}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-sm">{item.issue}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User size={14} className="text-gray-400" />
                        {item.reporter}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {item.report_date}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <select 
                        value={item.status}
                        onChange={(e) => {
                          // Update status logic would go here
                          alert(`อัปเดตสถานะเป็น: ${e.target.value}`);
                        }}
                        className="px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option value="รอดำเนินการ">รอดำเนินการ</option>
                        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Maintenance Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">แจ้งซ่อมใหม่</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="หมายเลขห้อง (เช่น 101, 205) *"
                value={newMaintenance.room}
                onChange={(e) => setNewMaintenance({...newMaintenance, room: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="ปัญหาที่พบ (เช่น แอร์เสีย, ก๊อกน้ำรั่ว) *"
                value={newMaintenance.issue}
                onChange={(e) => setNewMaintenance({...newMaintenance, issue: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={newMaintenance.priority}
                onChange={(e) => setNewMaintenance({...newMaintenance, priority: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="ต่ำ">ความสำคัญต่ำ</option>
                <option value="ปานกลาง">ความสำคัญปานกลาง</option>
                <option value="สูง">ความสำคัญสูง</option>
              </select>
              <input
                type="text"
                placeholder="ผู้แจ้ง (เช่น แม่บ้าน, ลูกค้า)"
                value={newMaintenance.reporter}
                onChange={(e) => setNewMaintenance({...newMaintenance, reporter: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="รายละเอียดเพิ่มเติม"
                value={newMaintenance.description}
                onChange={(e) => setNewMaintenance({...newMaintenance, description: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows="3"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddMaintenance}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
        </div>
      </div>

      <div className="space-y-3">
        {maintenanceList.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-black text-lg">ห้อง {item.room}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === 'สูง' ? 'bg-rose-100 text-rose-600' : 
                    item.priority === 'ปานกลาง' ? 'bg-amber-100 text-amber-600' : 
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'รอดำเนินการ' ? 'bg-amber-100 text-amber-600' : 
                    item.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-600' : 
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-700 font-semibold">{item.issue}</p>
                <p className="text-xs text-slate-500 mt-2">รายงานโดย: {item.reporter} • {item.report_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
