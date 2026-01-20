import React from 'react';

const Guests = ({ guests }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ฐานข้อมูลลูกค้า ({guests.length} คน)</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
          เพิ่มลูกค้าใหม่
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">ชื่อ-นามสกุล</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">เบอร์โทร</th>
                <th className="text-left p-4 text-xs font-black text-slate-600 uppercase">อีเมล</th>
                <th className="text-center p-4 text-xs font-black text-slate-600 uppercase">ห้อง</th>
                <th className="text-center p-4 text-xs font-black text-slate-600 uppercase">เช็คอิน</th>
                <th className="text-center p-4 text-xs font-black text-slate-600 uppercase">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, idx) => (
                <tr key={guest.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="p-4 font-bold text-sm">{guest.name}</td>
                  <td className="p-4 text-sm">{guest.phone}</td>
                  <td className="p-4 text-sm text-slate-600">{guest.email || '-'}</td>
                  <td className="p-4 text-center font-bold">{guest.room || '-'}</td>
                  <td className="p-4 text-center text-sm">{guest.check_in}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${guest.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                      {guest.status === 'active' ? 'อยู่ระหว่างพัก' : 'เช็คเอาท์แล้ว'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Guests;
