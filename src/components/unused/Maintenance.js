import React, { useState } from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle, Plus, Calendar, User, Building } from 'lucide-react';

const Maintenance = ({ maintenanceList = [] }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredList = maintenanceList.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const handleAddMaintenance = () => {
    alert('บันทึกรายการแจ้งซ่อมสำเร็จ!');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="text-center py-12">
            <Wrench className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">ยังไม่มีรายการแจ้งซ่อม</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {filteredList.map((item) => (
              <div key={item.id} className="border rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">ห้อง {item.room}</h3>
                    <p className="text-sm text-gray-600">{item.issue}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.reporter} • {item.report_date}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.status === 'รอดำเนินการ' ? 'bg-amber-100 text-amber-800' :
                    item.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">แจ้งซ่อมใหม่</h3>
            <div className="space-y-4">
              <input type="text" placeholder="หมายเลขห้อง" className="w-full p-3 border rounded-xl" />
              <input type="text" placeholder="ปัญหาที่พบ" className="w-full p-3 border rounded-xl" />
              <select className="w-full p-3 border rounded-xl">
                <option value="ต่ำ">ความสำคัญต่ำ</option>
                <option value="ปานกลาง">ความสำคัญปานกลาง</option>
                <option value="สูง">ความสำคัญสูง</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 border rounded-xl">
                ยกเลิก
              </button>
              <button onClick={handleAddMaintenance} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl">
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
