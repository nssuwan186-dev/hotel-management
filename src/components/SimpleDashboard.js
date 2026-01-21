import React, { useState } from 'react';
import { 
  Search, Plus, CheckCircle, Wrench, 
  User, Phone, Calendar, Zap, Droplets, DollarSign,
  Building2, TrendingUp, Users, Edit, Save, X
} from 'lucide-react';

const SimpleDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);

  // ข้อมูลห้อง
  const [roomData, setRoomData] = useState([
    { id: "101", status: "ว่าง", price: 400, type: "รายวัน", guest: "", phone: "", checkIn: "", elec: 0, water: 0 },
    { id: "102", status: "มีแขก", price: 450, type: "รายวัน", guest: "นายสมชาย ใจดี", phone: "081-234-5678", checkIn: "2026-01-20", elec: 1500, water: 300 },
    { id: "201", status: "มีแขก", price: 3500, type: "รายเดือน", guest: "นางสาวมาลี สวย", phone: "082-345-6789", checkIn: "2026-01-01", elec: 2100, water: 450 },
    { id: "202", status: "ว่าง", price: 3500, type: "รายเดือน", guest: "", phone: "", checkIn: "", elec: 0, water: 0 }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, room: "102", amount: 450, date: "2026-01-20", description: "ค่าห้องรายวัน" },
    { id: 2, room: "201", amount: 3500, date: "2026-01-01", description: "ค่าห้องรายเดือน" }
  ]);

  const filteredRooms = roomData.filter(room => 
    room.id.includes(searchTerm) || room.guest.includes(searchTerm)
  );

  const stats = {
    totalRooms: roomData.length,
    occupiedRooms: roomData.filter(r => r.status === 'มีแขก').length,
    availableRooms: roomData.filter(r => r.status === 'ว่าง').length,
    todayIncome: transactions.filter(t => t.date === new Date().toISOString().split('T')[0])
                            .reduce((sum, t) => sum + t.amount, 0)
  };

  const updateRoom = (roomId, field, value) => {
    setRoomData(prev => prev.map(room => 
      room.id === roomId ? { ...room, [field]: value } : room
    ));
  };

  const quickCheckIn = (roomId) => {
    const name = prompt('ชื่อผู้เข้าพัก:');
    const phone = prompt('เบอร์โทร:');
    if (name && phone) {
      updateRoom(roomId, 'status', 'มีแขก');
      updateRoom(roomId, 'guest', name);
      updateRoom(roomId, 'phone', phone);
      updateRoom(roomId, 'checkIn', new Date().toISOString().split('T')[0]);
    }
  };

  const quickCheckOut = (roomId) => {
    if (confirm('เช็คเอาท์ห้องนี้?')) {
      updateRoom(roomId, 'status', 'ว่าง');
      updateRoom(roomId, 'guest', '');
      updateRoom(roomId, 'phone', '');
      updateRoom(roomId, 'checkIn', '');
    }
  };

  const quickPayment = (room) => {
    const amount = prompt(`รับชำระห้อง ${room.id}:`, room.price);
    if (amount) {
      const newTransaction = {
        id: Date.now(),
        room: room.id,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        description: `ค่าห้อง ${room.id}`
      };
      setTransactions(prev => [newTransaction, ...prev]);
      alert(`บันทึกการรับชำระ ฿${amount} แล้ว`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏨 Hotel Management</h1>
          <p className="text-gray-500">จัดการง่าย ใช้งานสะดวก</p>
        </div>
        <div className="text-right">
          <div className="font-semibold">{new Date().toLocaleDateString('th-TH')}</div>
        </div>
      </div>

      {/* สถิติ */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ห้องทั้งหมด</p>
              <p className="text-2xl font-bold">{stats.totalRooms}</p>
            </div>
            <Building2 className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">มีแขก</p>
              <p className="text-2xl font-bold text-blue-600">{stats.occupiedRooms}</p>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ห้องว่าง</p>
              <p className="text-2xl font-bold text-green-600">{stats.availableRooms}</p>
            </div>
            <CheckCircle className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">รายได้วันนี้</p>
              <p className="text-2xl font-bold text-purple-600">฿{stats.todayIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-purple-400" size={24} />
          </div>
        </div>
      </div>

      {/* ค้นหา */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ค้นหาห้องหรือชื่อแขก..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* รายการห้อง */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">รายการห้องพัก</h3>
        </div>
        <div className="divide-y">
          {filteredRooms.map((room) => (
            <div key={room.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-blue-600">{room.id}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{room.type}</span>
                      <span className="text-green-600 font-bold">฿{room.price.toLocaleString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        room.status === 'ว่าง' ? 'bg-green-100 text-green-800' :
                        room.status === 'มีแขก' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {room.status}
                      </span>
                    </div>
                    
                    {room.guest && (
                      <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          {editingRoom === room.id ? (
                            <input 
                              type="text" 
                              value={room.guest}
                              onChange={(e) => updateRoom(room.id, 'guest', e.target.value)}
                              className="border rounded px-2 py-1 text-sm"
                              onBlur={() => setEditingRoom(null)}
                              autoFocus
                            />
                          ) : (
                            <span onClick={() => setEditingRoom(room.id)} className="cursor-pointer hover:text-blue-600">
                              {room.guest}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span>{room.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>เข้าพัก: {room.checkIn}</span>
                        </div>
                        {(room.elec > 0 || room.water > 0) && (
                          <div className="flex gap-3">
                            <div className="flex items-center gap-1">
                              <Zap size={12} />
                              <span>ไฟ: {room.elec}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets size={12} />
                              <span>น้ำ: {room.water}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {room.status === 'ว่าง' && (
                    <button 
                      onClick={() => quickCheckIn(room.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 flex items-center gap-1"
                    >
                      <Plus size={14} /> เช็คอิน
                    </button>
                  )}
                  
                  {room.status === 'มีแขก' && (
                    <>
                      <button 
                        onClick={() => quickCheckOut(room.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 flex items-center gap-1"
                      >
                        <CheckCircle size={14} /> เช็คเอาท์
                      </button>
                      <button 
                        onClick={() => quickPayment(room)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 flex items-center gap-1"
                      >
                        <DollarSign size={14} /> รับชำระ
                      </button>
                    </>
                  )}
                  
                  <button 
                    onClick={() => {
                      const issue = prompt('รายละเอียดการซ่อม:');
                      if (issue) alert(`บันทึกการแจ้งซ่อมห้อง ${room.id}: ${issue}`);
                    }}
                    className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 flex items-center gap-1"
                  >
                    <Wrench size={14} /> แจ้งซ่อม
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* รายการธุรกรรม */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">💰 รายการธุรกรรมล่าสุด</h3>
        </div>
        <div className="divide-y">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold">ห้อง {transaction.room}</div>
                <div className="text-sm text-gray-500">{transaction.description}</div>
                <div className="text-xs text-gray-400">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+฿{transaction.amount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
