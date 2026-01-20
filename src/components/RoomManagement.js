import React, { useState } from 'react';
import { 
  Search, UserPlus, LogOut, Wrench, RotateCcw, X, Save,
  Phone, Zap, Droplets, User, CreditCard
} from 'lucide-react';

const RoomManagement = ({ rooms, setRooms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeRoom, setActiveRoom] = useState(null);
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [checkInForm, setCheckInForm] = useState({
    guestName: '',
    phone: '',
    idCard: '',
    email: '',
    deposit: 0,
    checkInDate: new Date().toISOString().split('T')[0],
    elec: 0,
    water: 0,
    note: ''
  });

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.includes(searchTerm) || 
                         (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ว่าง': return 'bg-emerald-500';
      case 'มีแขก': return 'bg-blue-600';
      case 'ทำความสะอาด': return 'bg-amber-500';
      case 'ซ่อมบำรุง': return 'bg-rose-600';
      default: return 'bg-gray-500';
    }
  };

  const updateRoom = (roomId, updates) => {
    const updatedRooms = rooms.map(room => 
      room.id === roomId ? { ...room, ...updates } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem('hotelRooms', JSON.stringify(updatedRooms));
  };

  const handleCheckIn = () => {
    if (!checkInForm.guestName || !checkInForm.phone) {
      alert('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    updateRoom(activeRoom.id, {
      status: 'มีแขก',
      guest: checkInForm.guestName,
      phone: checkInForm.phone,
      checkIn: checkInForm.checkInDate,
      elecStart: checkInForm.elec,
      waterStart: checkInForm.water
    });

    setActiveRoom(null);
    setShowCheckInForm(false);
    resetForm();
    alert('เช็คอินสำเร็จ!');
  };

  const handleCheckOut = (room) => {
    if (!confirm(`ยืนยันเช็คเอาท์ห้อง ${room.id}?`)) return;

    updateRoom(room.id, {
      status: 'ทำความสะอาด',
      guest: null,
      phone: null,
      checkIn: null,
      elecStart: 0,
      waterStart: 0
    });

    alert('เช็คเอาท์สำเร็จ!');
  };

  const handleMaintenance = (room) => {
    const issue = prompt('ระบุปัญหา/รายละเอียดการซ่อม:');
    if (!issue) return;

    updateRoom(room.id, {
      status: 'ซ่อมบำรุง',
      maintenance: issue
    });

    alert('บันทึกรายการแจ้งซ่อมสำเร็จ!');
  };

  const resetForm = () => {
    setCheckInForm({
      guestName: '',
      phone: '',
      idCard: '',
      email: '',
      deposit: 0,
      checkInDate: new Date().toISOString().split('T')[0],
      elec: 0,
      water: 0,
      note: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="ค้นหาห้อง หรือ ชื่อแขก..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="ว่าง">ห้องว่าง</option>
          <option value="มีแขก">มีแขก</option>
          <option value="ทำความสะอาด">ทำความสะอาด</option>
          <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
        </select>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredRooms.map(room => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room)}
            className={`${getStatusColor(room.status)} p-4 rounded-2xl shadow-lg text-left text-white h-32 relative active:scale-95 transition-all hover:shadow-xl`}
          >
            <div className="flex justify-between items-start">
              <span className="font-black text-2xl">{room.id}</span>
              <span className="text-[10px] bg-white/20 px-2 py-1 rounded uppercase font-bold">
                {room.status}
              </span>
            </div>
            <p className="text-xs mt-2 opacity-90 font-semibold">
              {room.guest || `฿${room.price}`}
            </p>
            <p className="text-[10px] mt-1 opacity-75">{room.type}</p>
          </button>
        ))}
      </div>

      {/* Room Action Modal */}
      {activeRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => {setActiveRoom(null); setShowCheckInForm(false);}} />
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">ROOM {activeRoom.id}</h2>
                  <p className="text-sm opacity-90 mt-1">{activeRoom.type} • ฿{activeRoom.price}</p>
                </div>
                <button 
                  onClick={() => {setActiveRoom(null); setShowCheckInForm(false);}} 
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {!showCheckInForm ? (
                <div className="space-y-3">
                  {activeRoom.status === 'ว่าง' && (
                    <>
                      <button 
                        onClick={() => setShowCheckInForm(true)} 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-95"
                      >
                        <UserPlus /> เช็คอิน / ลงทะเบียน
                      </button>
                      <button 
                        onClick={() => handleMaintenance(activeRoom)} 
                        className="w-full bg-rose-50 text-rose-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-rose-100 transition-all active:scale-95"
                      >
                        <Wrench /> แจ้งซ่อมบำรุง
                      </button>
                    </>
                  )}
                  {activeRoom.status === 'มีแขก' && (
                    <>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl mb-4 border-2 border-blue-200">
                        <p className="text-xs text-blue-600 font-black uppercase mb-2">ผู้เข้าพัก</p>
                        <p className="text-lg font-black text-blue-900">{activeRoom.guest}</p>
                        <div className="flex items-center gap-2 mt-2 text-blue-700">
                          <Phone size={14} />
                          <span className="text-sm font-semibold">{activeRoom.phone}</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">เช็คอิน: {activeRoom.checkIn}</p>
                      </div>
                      <button 
                        onClick={() => handleCheckOut(activeRoom)} 
                        className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-95"
                      >
                        <LogOut /> เช็คเอาท์ (Check-out)
                      </button>
                    </>
                  )}
                  {(activeRoom.status === 'ทำความสะอาด' || activeRoom.status === 'ซ่อมบำรุง') && (
                    <button 
                      onClick={() => updateRoom(activeRoom.id, { status: 'ว่าง' })} 
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all active:scale-95"
                    >
                      <RotateCcw /> งานเสร็จสิ้น → ห้องว่าง
                    </button>
                  )}
                </div>
              ) : (
                <CheckInForm 
                  checkInForm={checkInForm}
                  setCheckInForm={setCheckInForm}
                  onSubmit={handleCheckIn}
                  onCancel={() => setShowCheckInForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckInForm = ({ checkInForm, setCheckInForm, onSubmit, onCancel }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-500 uppercase">ชื่อ-นามสกุล *</label>
        <input 
          type="text" 
          className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
          placeholder="ชื่อลูกค้า" 
          value={checkInForm.guestName}
          onChange={e => setCheckInForm({...checkInForm, guestName: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-500 uppercase">เบอร์โทร *</label>
        <input 
          type="tel" 
          className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
          placeholder="0xx-xxx-xxxx" 
          value={checkInForm.phone}
          onChange={e => setCheckInForm({...checkInForm, phone: e.target.value})} 
        />
      </div>
    </div>
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-500 uppercase">เลขบัตรประชาชน</label>
      <input 
        type="text" 
        className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
        placeholder="เลขบัตร 13 หลัก" 
        value={checkInForm.idCard}
        onChange={e => setCheckInForm({...checkInForm, idCard: e.target.value})}
      />
    </div>
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-500 uppercase">อีเมล</label>
      <input 
        type="email" 
        className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
        placeholder="email@example.com" 
        value={checkInForm.email}
        onChange={e => setCheckInForm({...checkInForm, email: e.target.value})}
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-black text-emerald-600 uppercase">เงินมัดจำ (฿)</label>
        <input 
          type="number" 
          className="w-full p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl font-bold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" 
          placeholder="0.00" 
          value={checkInForm.deposit}
          onChange={e => setCheckInForm({...checkInForm, deposit: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-500 uppercase">วันที่เข้าพัก</label>
        <input 
          type="date" 
          className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
          value={checkInForm.checkInDate}
          onChange={e => setCheckInForm({...checkInForm, checkInDate: e.target.value})}
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 border-t-2 pt-4">
      <div className="space-y-1">
        <label className="text-[10px] font-black text-orange-600 uppercase flex items-center gap-1">
          <Zap size={12} /> มิเตอร์ไฟเริ่ม
        </label>
        <input 
          type="number" 
          className="w-full p-3 bg-orange-50 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" 
          placeholder="0" 
          value={checkInForm.elec}
          onChange={e => setCheckInForm({...checkInForm, elec: e.target.value})}
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1">
          <Droplets size={12} /> มิเตอร์น้ำเริ่ม
        </label>
        <input 
          type="number" 
          className="w-full p-3 bg-blue-50 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
          placeholder="0" 
          value={checkInForm.water}
          onChange={e => setCheckInForm({...checkInForm, water: e.target.value})}
        />
      </div>
    </div>
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-500 uppercase">หมายเหตุ</label>
      <textarea 
        className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" 
        rows="2"
        placeholder="บันทึกเพิ่มเติม..."
        value={checkInForm.note}
        onChange={e => setCheckInForm({...checkInForm, note: e.target.value})}
      ></textarea>
    </div>
    <div className="flex gap-3 mt-6">
      <button 
        onClick={onCancel}
        className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl hover:bg-slate-50 font-bold"
      >
        ยกเลิก
      </button>
      <button 
        onClick={onSubmit}
        disabled={!checkInForm.guestName || !checkInForm.phone}
        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="inline mr-2" size={16} />
        บันทึกและเปิดห้อง
      </button>
    </div>
    {(!checkInForm.guestName || !checkInForm.phone) && (
      <p className="text-xs text-rose-600 text-center">* กรุณากรอกชื่อและเบอร์โทรศัพท์</p>
    )}
  </div>
);
};

export default RoomManagement;
