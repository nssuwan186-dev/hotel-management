import React, { useState } from 'react';
import { 
  Search, Plus, Eye, Edit, Wrench, CheckCircle, AlertTriangle, 
  User, Phone, Calendar, Zap, Droplets, Receipt, FileText, 
  Camera, DollarSign, Users, Settings, X, Building2, TrendingUp,
  Clock, Wallet, CreditCard, Upload, Download, BarChart3
} from 'lucide-react';

const CompleteDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // ข้อมูลห้อง
  const [roomData, setRoomData] = useState([
    { id: "101", status: "ว่าง", price: 400, type: "รายวัน", floor: 1, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" },
    { id: "102", status: "มีแขก", price: 450, type: "รายวัน", floor: 1, guest: "นายสมชาย ใจดี", phone: "081-234-5678", checkIn: "2026-01-20", elecStart: 1500, waterStart: 300, maintenance: "" },
    { id: "103", status: "ทำความสะอาด", price: 400, type: "รายวัน", floor: 1, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" },
    { id: "201", status: "มีแขก", price: 3500, type: "รายเดือน", floor: 2, guest: "นางสาวมาลี สวย", phone: "082-345-6789", checkIn: "2026-01-01", elecStart: 2100, waterStart: 450, maintenance: "" },
    { id: "202", status: "ว่าง", price: 3500, type: "รายเดือน", floor: 2, guest: "", phone: "", checkIn: "", elecStart: 0, waterStart: 0, maintenance: "" }
  ]);

  // ข้อมูลการเงิน
  const [transactions, setTransactions] = useState([
    { id: 1, room: "102", type: "รับชำระ", amount: 450, date: "2026-01-20", description: "ค่าห้องรายวัน" },
    { id: 2, room: "201", type: "รับชำระ", amount: 3500, date: "2026-01-01", description: "ค่าห้องรายเดือน" }
  ]);

  // ฟอร์มข้อมูล
  const [formData, setFormData] = useState({
    guestName: '', phone: '', idCard: '', email: '', deposit: 0,
    checkInDate: new Date().toISOString().split('T')[0],
    elec: 0, water: 0, note: '', amount: 0, description: '',
    paymentType: 'cash', transferSlip: null
  });

  const filteredRooms = roomData.filter(room => {
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.guest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  const openModal = (modalType, room = null) => {
    setActiveModal(modalType);
    setSelectedRoom(room);
    if (room) {
      setFormData({
        guestName: room.guest || '',
        phone: room.phone || '',
        checkInDate: room.checkIn || new Date().toISOString().split('T')[0],
        elec: room.elecStart || 0,
        water: room.waterStart || 0,
        note: '', amount: room.price || 0, description: `ค่าห้อง ${room.id}`,
        paymentType: 'cash', transferSlip: null
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRoom(null);
    setFormData({
      guestName: '', phone: '', idCard: '', email: '', deposit: 0,
      checkInDate: new Date().toISOString().split('T')[0],
      elec: 0, water: 0, note: '', amount: 0, description: '',
      paymentType: 'cash', transferSlip: null
    });
  };

  const handleSubmit = () => {
    if (activeModal === 'checkin') {
      if (!formData.guestName || !formData.phone) {
        alert('กรุณากรอกชื่อและเบอร์โทรศัพท์');
        return;
      }
      setRoomData(prev => prev.map(room => 
        room.id === selectedRoom.id 
          ? { ...room, status: 'มีแขก', guest: formData.guestName, phone: formData.phone, 
              checkIn: formData.checkInDate, elecStart: formData.elec, waterStart: formData.water }
          : room
      ));
    } else if (activeModal === 'checkout') {
      setRoomData(prev => prev.map(room => 
        room.id === selectedRoom.id 
          ? { ...room, status: 'ทำความสะอาด', guest: '', phone: '', checkIn: '', elecStart: 0, waterStart: 0 }
          : room
      ));
    } else if (activeModal === 'payment') {
      const newTransaction = {
        id: Date.now(),
        room: selectedRoom.id,
        type: 'รับชำระ',
        amount: parseFloat(formData.amount),
        date: new Date().toISOString().split('T')[0],
        description: formData.description,
        paymentType: formData.paymentType
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
    closeModal();
  };

  // สถิติ
  const stats = {
    totalRooms: roomData.length,
    occupiedRooms: roomData.filter(r => r.status === 'มีแขก').length,
    availableRooms: roomData.filter(r => r.status === 'ว่าง').length,
    maintenanceRooms: roomData.filter(r => r.status === 'ซ่อมบำรุง').length,
    todayIncome: transactions.filter(t => t.date === new Date().toISOString().split('T')[0])
                            .reduce((sum, t) => sum + t.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏨 Hotel Management System</h1>
          <p className="text-gray-500">จัดการโรงแรมครบวงจรในหน้าเดียว</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">วันที่</div>
          <div className="font-semibold">{new Date().toLocaleDateString('th-TH')}</div>
        </div>
      </div>

      {/* สถิติ */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ห้องทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRooms}</p>
            </div>
            <Building2 className="text-gray-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">มีแขก</p>
              <p className="text-2xl font-bold text-blue-600">{stats.occupiedRooms}</p>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ห้องว่าง</p>
              <p className="text-2xl font-bold text-green-600">{stats.availableRooms}</p>
            </div>
            <CheckCircle className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">ซ่อมบำรุง</p>
              <p className="text-2xl font-bold text-red-600">{stats.maintenanceRooms}</p>
            </div>
            <Wrench className="text-red-400" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">รายได้วันนี้</p>
              <p className="text-2xl font-bold text-purple-600">฿{stats.todayIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-purple-400" size={24} />
          </div>
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

      {/* รายการห้อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">ห้อง {room.id}</h3>
                  <p className="text-sm text-gray-500">{room.type} • ฿{room.price.toLocaleString()}</p>
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
                </div>
              ) : (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center text-gray-500">
                  <span className="text-sm">ไม่มีผู้เข้าพัก</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {room.status === 'ว่าง' && (
                  <button onClick={() => openModal('checkin', room)} 
                          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                    <Plus size={14} /> เช็คอิน
                  </button>
                )}
                {room.status === 'มีแขก' && (
                  <>
                    <button onClick={() => openModal('checkout', room)}
                            className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                      <CheckCircle size={14} /> เช็คเอาท์
                    </button>
                    <button onClick={() => openModal('payment', room)}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                      <DollarSign size={14} /> รับชำระ
                    </button>
                  </>
                )}
                <button onClick={() => openModal('maintenance', room)}
                        className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                  <Wrench size={14} /> แจ้งซ่อม
                </button>
                <button onClick={() => openModal('details', room)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600">
                  <Eye size={14} /> รายละเอียด
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* รายการธุรกรรมล่าสุด */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">💰 รายการธุรกรรมล่าสุด</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">ห้อง {transaction.room}</div>
                <div className="text-sm text-gray-500">{transaction.description}</div>
                <div className="text-xs text-gray-400">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">+฿{transaction.amount.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{transaction.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {activeModal === 'checkin' && 'เช็คอิน'}
                {activeModal === 'checkout' && 'เช็คเอาท์'}
                {activeModal === 'payment' && 'รับชำระเงิน'}
                {activeModal === 'maintenance' && 'แจ้งซ่อม'}
                {activeModal === 'details' && 'รายละเอียดห้อง'}
                {selectedRoom && ` - ห้อง ${selectedRoom.id}`}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {activeModal === 'checkin' && (
              <div className="space-y-4">
                <input type="text" placeholder="ชื่อผู้เข้าพัก *" value={formData.guestName}
                       onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                       className="w-full p-3 border rounded-lg" required />
                <input type="tel" placeholder="เบอร์โทร *" value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       className="w-full p-3 border rounded-lg" required />
                <input type="text" placeholder="เลขบัตรประชาชน" value={formData.idCard}
                       onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                       className="w-full p-3 border rounded-lg" />
                <input type="email" placeholder="อีเมล" value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full p-3 border rounded-lg" />
                <input type="date" value={formData.checkInDate}
                       onChange={(e) => setFormData({...formData, checkInDate: e.target.value})}
                       className="w-full p-3 border rounded-lg" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="มิเตอร์ไฟ" value={formData.elec}
                         onChange={(e) => setFormData({...formData, elec: e.target.value})}
                         className="p-3 border rounded-lg" />
                  <input type="number" placeholder="มิเตอร์น้ำ" value={formData.water}
                         onChange={(e) => setFormData({...formData, water: e.target.value})}
                         className="p-3 border rounded-lg" />
                </div>
                <input type="number" placeholder="เงินมัดจำ" value={formData.deposit}
                       onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                       className="w-full p-3 border rounded-lg" />
                <textarea placeholder="หมายเหตุ" value={formData.note}
                          onChange={(e) => setFormData({...formData, note: e.target.value})}
                          className="w-full p-3 border rounded-lg h-20" />
              </div>
            )}

            {activeModal === 'payment' && (
              <div className="space-y-4">
                <input type="number" placeholder="จำนวนเงิน *" value={formData.amount}
                       onChange={(e) => setFormData({...formData, amount: e.target.value})}
                       className="w-full p-3 border rounded-lg" required />
                <textarea placeholder="รายละเอียด" value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full p-3 border rounded-lg h-20" />
                <select value={formData.paymentType}
                        onChange={(e) => setFormData({...formData, paymentType: e.target.value})}
                        className="w-full p-3 border rounded-lg">
                  <option value="cash">เงินสด</option>
                  <option value="transfer">โอนเงิน</option>
                  <option value="card">บัตรเครดิต</option>
                </select>
                {formData.paymentType === 'transfer' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">อัพโหลดสลิปโอนเงิน</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                )}
              </div>
            )}

            {activeModal === 'maintenance' && (
              <div className="space-y-4">
                <select className="w-full p-3 border rounded-lg">
                  <option>ระดับความเร่งด่วน</option>
                  <option value="low">ต่ำ</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="high">สูง</option>
                  <option value="urgent">เร่งด่วน</option>
                </select>
                <textarea placeholder="รายละเอียดการซ่อม *" value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full p-3 border rounded-lg h-24" required />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">ถ่ายรูปปัญหา (ถ้ามี)</p>
                </div>
              </div>
            )}

            {activeModal === 'details' && selectedRoom && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>ห้อง:</strong> {selectedRoom.id}</div>
                  <div><strong>ราคา:</strong> ฿{selectedRoom.price.toLocaleString()}</div>
                  <div><strong>ประเภท:</strong> {selectedRoom.type}</div>
                  <div><strong>สถานะ:</strong> {selectedRoom.status}</div>
                  <div><strong>ผู้เข้าพัก:</strong> {selectedRoom.guest || '-'}</div>
                  <div><strong>เบอร์โทร:</strong> {selectedRoom.phone || '-'}</div>
                  <div><strong>วันเข้าพัก:</strong> {selectedRoom.checkIn || '-'}</div>
                  <div><strong>มิเตอร์ไฟ:</strong> {selectedRoom.elecStart || '-'}</div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} 
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                ยกเลิก
              </button>
              {activeModal !== 'details' && (
                <button onClick={handleSubmit}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  บันทึก
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteDashboard;
