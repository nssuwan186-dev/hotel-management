import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, CheckCircle, Wrench, 
  User, Phone, Calendar, Zap, Droplets, DollarSign,
  Building2, TrendingUp, Users, Edit, Save, X, RefreshCw
} from 'lucide-react';

const SimpleDashboard = ({ activeModule = 'DASHBOARD' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const API_URL = 'http://localhost:8081';

  // Load data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/data?table=ห้องพัก`);
      const data = await response.json();
      
      // Load guests to map names
      const guestResponse = await fetch(`${API_URL}/api/data?table=ผู้เข้าพัก`);
      const guestData = await guestResponse.json();
      const activeGuests = guestData.filter(g => g.สถานะ === 'เข้าพัก');
      
      // Map DB data to UI format
      const mappedData = data.map(room => {
        const guest = activeGuests.find(g => g.ห้อง === room.เลขห้อง);
        return {
          id: room.เลขห้อง,
          status: room.สถานะ === 'มีผู้เข้าพัก' ? 'มีแขก' : room.สถานะ,
          price: room.ราคา,
          type: room.ประเภท,
          guest: guest ? guest.ชื่อ : "",
          phone: guest ? guest.โทรศัพท์ : "",
          checkIn: guest ? guest.วันเช็คอิน : "",
          elec: 0, 
          water: 0
        };
      });
      
      setRoomData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRooms = roomData.filter(room => 
    room.id.includes(searchTerm) || (room.guest && room.guest.includes(searchTerm))
  );

  const stats = {
    totalRooms: roomData.length,
    occupiedRooms: roomData.filter(r => r.status === 'มีแขก').length,
    availableRooms: roomData.filter(r => r.status === 'ว่าง').length,
    todayIncome: transactions.filter(t => t.date === new Date().toISOString().split('T')[0])
                            .reduce((sum, t) => sum + t.amount, 0)
  };

  const quickCheckIn = async (roomId) => {
    const name = prompt('ชื่อผู้เข้าพัก:');
    if (!name) return;
    
    const phone = prompt('เบอร์โทร:');
    if (!phone) return;

    try {
      const response = await fetch(`${API_URL}/api/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          name,
          phone
        })
      });
      
      if (response.ok) {
        alert('เช็คอินสำเร็จ!');
        fetchData(); // Refresh data
      } else {
        alert('เกิดข้อผิดพลาดในการเช็คอิน');
      }
    } catch (error) {
      console.error("Error checking in:", error);
      alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    }
  };

  const quickCheckOut = async (roomId) => {
    if (confirm('ยืนยันการเช็คเอาท์ห้องนี้?')) {
      try {
        const response = await fetch(`${API_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomId })
        });
        
        if (response.ok) {
          alert('เช็คเอาท์สำเร็จ!');
          fetchData(); // Refresh data
        } else {
          alert('เกิดข้อผิดพลาดในการเช็คเอาท์');
        }
      } catch (error) {
        console.error("Error checking out:", error);
        alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
      }
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
      alert(`บันทึกการรับชำระ ฿${amount} แล้ว (ระบบบัญชีกำลังพัฒนา)`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {activeModule === 'DASHBOARD' && '🏨 Hotel Management'}
            {loading && <span className="text-sm font-normal text-gray-500 flex items-center gap-1"><RefreshCw className="animate-spin" size={16}/> กำลังโหลด...</span>}
          </h1>
          <p className="text-gray-500">
            ระบบจัดการโรงแรม (เชื่อมต่อฐานข้อมูลแล้ว)
          </p>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={fetchData} className="p-2 hover:bg-gray-100 rounded-full text-gray-600" title="รีเฟรชข้อมูล">
                <RefreshCw size={20} />
            </button>
            <div className="text-right">
                <div className="font-semibold">{new Date().toLocaleDateString('th-TH')}</div>
            </div>
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
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">รายการห้องพัก</h3>
          <span className="text-xs text-gray-500">ข้อมูลจาก: SQLite Database</span>
        </div>
        <div className="divide-y">
          {filteredRooms.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
                <p>ไม่พบข้อมูลห้องพัก หรือกำลังเชื่อมต่อฐานข้อมูล...</p>
                <button onClick={fetchData} className="mt-4 text-blue-600 hover:underline">ลองใหม่</button>
            </div>
          ) : (
            filteredRooms.map((room) => (
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
                            <span className="font-medium text-gray-900">{room.guest}</span>
                            </div>
                            <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{room.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>เข้าพัก: {room.checkIn}</span>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                    {room.status === 'ว่าง' && (
                        <button 
                        onClick={() => quickCheckIn(room.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 flex items-center gap-1 shadow-sm"
                        >
                        <Plus size={14} /> เช็คอิน
                        </button>
                    )}
                    
                    {room.status === 'มีแขก' && (
                        <>
                        <button 
                            onClick={() => quickCheckOut(room.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 flex items-center gap-1 shadow-sm"
                        >
                            <CheckCircle size={14} /> เช็คเอาท์
                        </button>
                        <button 
                            onClick={() => quickPayment(room)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 flex items-center gap-1 shadow-sm"
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
                        className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 flex items-center gap-1 shadow-sm"
                    >
                        <Wrench size={14} /> แจ้งซ่อม
                    </button>
                    </div>
                </div>
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;