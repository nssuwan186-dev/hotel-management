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
    alert('เช็คอินสำเร็จ!');
  };

  const handleCheckOut = (room) => {
    if (!window.confirm(`ยืนยันเช็คเอาท์ห้อง ${room.id}?`)) return;

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

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredRooms.map(room => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room)}
            className={`${getStatusColor(room.status)} p-4 rounded-2xl shadow-lg text-left text-white h-32 relative hover:shadow-xl transition-all`}
          >
            <div className="flex justify-between items-start">
              <span className="font-black text-2xl">{room.id}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded uppercase font-bold">
                {room.status}
              </span>
            </div>
            <p className="text-xs mt-2 opacity-90 font-semibold">
              {room.guest || `฿${room.price}`}
            </p>
            <p className="text-xs mt-1 opacity-75">{room.type}</p>
          </button>
        ))}
      </div>

      {activeRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveRoom(null)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">ROOM {activeRoom.id}</h2>
                  <p className="text-sm opacity-90 mt-1">{activeRoom.type} • ฿{activeRoom.price}</p>
                </div>
                <button 
                  onClick={() => setActiveRoom(null)} 
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
                >
                  <X />
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeRoom.status === 'ว่าง' && (
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowCheckInForm(true)} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                  >
                    <UserPlus /> เช็คอิน / ลงทะเบียน
                  </button>
                </div>
              )}
              
              {activeRoom.status === 'มีแขก' && (
                <div className="space-y-3">
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
                    className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all"
                  >
                    <LogOut /> เช็คเอาท์ (Check-out)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCheckInForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCheckInForm(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">เช็คอิน</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล *"
                value={checkInForm.guestName}
                onChange={(e) => setCheckInForm({...checkInForm, guestName: e.target.value})}
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="tel"
                placeholder="เบอร์โทร *"
                value={checkInForm.phone}
                onChange={(e) => setCheckInForm({...checkInForm, phone: e.target.value})}
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCheckInForm(false)} className="flex-1 px-4 py-2 border rounded-xl">
                ยกเลิก
              </button>
              <button onClick={handleCheckIn} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl">
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
