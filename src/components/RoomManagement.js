import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Wrench, CheckCircle, AlertTriangle, User, Phone, Calendar, Zap, Droplets } from 'lucide-react';

const RoomManagement = ({ rooms, setRooms, roomType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
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

  // ข้อมูลห้องตาม Technical Specification
  const [roomData, setRoomData] = useState([
    // ห้องรายวัน
    { id: "101", status: "ว่าง", price: 400, type: "รายวัน", floor: 1, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" },
    { id: "102", status: "มีแขก", price: 450, type: "รายวัน", floor: 1, guest: "นายสมชาย ใจดี", phone: "081-234-5678", checkIn: "2026-01-20", elecStart: 1500, waterStart: 300, maintenance: "" },
    { id: "103", status: "ทำความสะอาด", price: 400, type: "รายวัน", floor: 1, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" },
    { id: "104", status: "ซ่อมบำรุง", price: 500, type: "รายวัน", floor: 1, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "แอร์เสีย ไม่เย็น" },
    
    // ห้องรายเดือน
    { id: "201", status: "มีแขก", price: 3500, type: "รายเดือน", floor: 2, guest: "นางสาวมาลี สวย", phone: "082-345-6789", checkIn: "2026-01-01", elecStart: 2100, waterStart: 450, maintenance: "" },
    { id: "202", status: "ว่าง", price: 3500, type: "รายเดือน", floor: 2, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" },
    { id: "203", status: "มีแขก", price: 3800, type: "รายเดือน", floor: 2, guest: "นายวิชัย รวย", phone: "083-456-7890", checkIn: "2025-12-15", elecStart: 1800, waterStart: 380, maintenance: "" }
  ]);

  // กรองห้องตามประเภท (รายวัน/รายเดือน)
  const filteredRooms = roomData.filter(room => {
    const matchesType = roomType === 'daily' ? room.type === 'รายวัน' : room.type === 'รายเดือน';
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.guest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    
    return matchesType && matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ว่าง': return 'bg-green-100 text-green-800 border-green-200';
      case 'มีแขก': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ทำความสะอาด': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ซ่อมบำรุง': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCheckIn = (room) => {
    setSelectedRoom(room);
    setShowCheckInForm(true);
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

  const submitCheckIn = () => {
    if (!checkInForm.guestName || !checkInForm.phone) {
      alert('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    setRoomData(prev => prev.map(room => 
      room.id === selectedRoom.id 
        ? {
            ...room,
            status: 'มีแขก',
            guest: checkInForm.guestName,
            phone: checkInForm.phone,
            checkIn: checkInForm.checkInDate,
            elecStart: checkInForm.elec,
            waterStart: checkInForm.water
          }
        : room
    ));

    setShowCheckInForm(false);
    setSelectedRoom(null);
  };

  const handleCheckOut = (room) => {
    if (confirm(`ต้องการเช็คเอาท์ห้อง ${room.id} หรือไม่?`)) {
      setRoomData(prev => prev.map(r => 
        r.id === room.id 
          ? { ...r, status: 'ทำความสะอาด', guest: '', phone: '', checkIn: '', elecStart: 0, waterStart: 0 }
          : r
      ));
    }
  };

  const changeRoomStatus = (roomId, newStatus) => {
    setRoomData(prev => prev.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🏨 ห้องพัก{roomType === 'daily' ? 'รายวัน' : 'รายเดือน'}
          </h2>
          <p className="text-sm text-gray-500">
            จัดการห้องพัก{roomType === 'daily' ? 'รายวัน' : 'รายเดือน'} ทั้งหมด
          </p>
        </div>
      </div>

      {/* ค้นหาและกรอง */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาหมายเลขห้องหรือชื่อแขก..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="ว่าง">ว่าง</option>
              <option value="มีแขก">มีแขก</option>
              <option value="ทำความสะอาด">ทำความสะอาด</option>
              <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
            </select>
          </div>
        </div>
      </div>

      {/* รายการห้อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">ห้อง {room.id}</h3>
                  <p className="text-sm text-gray-500">ชั้น {room.floor} • ฿{room.price.toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>

              {room.guest ? (
                <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gray-600" />
                    <span className="text-sm font-semibold">{room.guest}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-600" />
                    <span className="text-sm">{room.phone || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-600" />
                    <span className="text-sm">เข้าพัก: {room.checkIn || "-"}</span>
                  </div>
                  {(room.elecStart > 0 || room.waterStart > 0) && (
                    <div className="flex gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Zap size={12} />
                        ไฟ: {room.elecStart || "-"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets size={12} />
                        น้ำ: {room.waterStart || "-"}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center text-gray-500">
                  <span className="text-sm">ไม่มีผู้เข้าพัก</span>
                </div>
              )}

              {room.maintenance && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800">
                    <Wrench size={14} />
                    <span className="text-sm font-semibold">ซ่อมบำรุง</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{room.maintenance}</p>
                </div>
              )}

              <div className="flex gap-2">
                {room.status === 'ว่าง' && (
                  <button
                    onClick={() => handleCheckIn(room)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold"
                  >
                    เช็คอิน
                  </button>
                )}
                
                {room.status === 'มีแขก' && (
                  <button
                    onClick={() => handleCheckOut(room)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold"
                  >
                    เช็คเอาท์
                  </button>
                )}

                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  <Eye size={16} />
                </button>

                <select
                  value={room.status}
                  onChange={(e) => changeRoomStatus(room.id, e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="ว่าง">ว่าง</option>
                  <option value="มีแขก">มีแขก</option>
                  <option value="ทำความสะอาด">ทำความสะอาด</option>
                  <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ฟอร์มเช็คอิน */}
      {showCheckInForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold">เช็คอินห้อง {selectedRoom?.id}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  value={checkInForm.guestName}
                  onChange={(e) => setCheckInForm({...checkInForm, guestName: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="กรอกชื่อ-นามสกุล"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">เบอร์โทร *</label>
                <input
                  type="tel"
                  value={checkInForm.phone}
                  onChange={(e) => setCheckInForm({...checkInForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="081-234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">เลขบัตรประชาชน</label>
                <input
                  type="text"
                  value={checkInForm.idCard}
                  onChange={(e) => setCheckInForm({...checkInForm, idCard: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1-2345-67890-12-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">มิเตอร์ไฟเริ่ม</label>
                  <input
                    type="number"
                    value={checkInForm.elec}
                    onChange={(e) => setCheckInForm({...checkInForm, elec: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">มิเตอร์น้ำเริ่ม</label>
                  <input
                    type="number"
                    value={checkInForm.water}
                    onChange={(e) => setCheckInForm({...checkInForm, water: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">หมายเหตุ</label>
                <textarea
                  value={checkInForm.note}
                  onChange={(e) => setCheckInForm({...checkInForm, note: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="หมายเหตุเพิ่มเติม"
                />
              </div>
            </div>
            
            <div className="p-6 border-t flex gap-3">
              <button
                onClick={() => setShowCheckInForm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={submitCheckIn}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                เช็คอิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
