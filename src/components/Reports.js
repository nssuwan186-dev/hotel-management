import React from 'react';
import { FileText, Building2, Users, ChevronRight } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <button className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all text-left group">
          <div className="flex items-center justify-between mb-3">
            <FileText className="text-blue-600" size={32} />
            <ChevronRight className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg">รายงานรายรับ-รายจ่าย</h3>
          <p className="text-sm text-slate-500 mt-1">ดูสรุปการเงินประจำเดือน</p>
        </button>

        <button className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all text-left group">
          <div className="flex items-center justify-between mb-3">
            <Building2 className="text-emerald-600" size={32} />
            <ChevronRight className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg">รายงานการเข้าพัก</h3>
          <p className="text-sm text-slate-500 mt-1">สรุปอัตราการเข้าพักห้อง</p>
        </button>

        <button className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all text-left group">
          <div className="flex items-center justify-between mb-3">
            <Users className="text-purple-600" size={32} />
            <ChevronRight className="text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
          <h3 className="font-bold text-lg">รายงานลูกค้า</h3>
          <p className="text-sm text-slate-500 mt-1">วิเคราะห์ข้อมูลลูกค้า</p>
        </button>
      </div>
    </div>
  );
};

export default Reports;
