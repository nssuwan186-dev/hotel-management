import React from 'react';

const Maintenance = ({ maintenanceList }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">รายการแจ้งซ่อม ({maintenanceList.length} รายการ)</h2>
        <button className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700">
          แจ้งซ่อมใหม่
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <p className="text-xs font-black text-amber-600 uppercase">รอดำเนินการ</p>
          <p className="text-3xl font-black text-amber-600 mt-2">
            {maintenanceList.filter(m => m.status === 'รอดำเนินการ').length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
          <p className="text-xs font-black text-blue-600 uppercase">กำลังดำเนินการ</p>
          <p className="text-3xl font-black text-blue-600 mt-2">
            {maintenanceList.filter(m => m.status === 'กำลังดำเนินการ').length}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
          <p className="text-xs font-black text-emerald-600 uppercase">เสร็จสิ้น</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">
            {maintenanceList.filter(m => m.status === 'เสร็จสิ้น').length}
          </p>
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
