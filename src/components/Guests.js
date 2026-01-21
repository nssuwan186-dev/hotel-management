import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Calendar, User, Edit, Trash2 } from 'lucide-react';

const Guests = ({ guests = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    email: '',
    idCard: '',
    address: ''
  });

  const filteredGuests = guests.filter(guest => 
    guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone?.includes(searchTerm) ||
    guest.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.phone) {
      alert('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }
    
    // Add guest logic would go here
    alert('เพิ่มลูกค้าสำเร็จ!');
    setShowAddForm(false);
    setNewGuest({ name: '', phone: '', email: '', idCard: '', address: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ฐานข้อมูลลูกค้า</h2>
          <p className="text-sm text-gray-500 mt-1">จำนวนลูกค้าทั้งหมด {guests.length} คน</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={16} />
          เพิ่มลูกค้าใหม่
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ค้นหาลูกค้า (ชื่อ, เบอร์โทร, อีเมล)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Guest List */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {filteredGuests.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">
              {guests.length === 0 ? 'ยังไม่มีข้อมูลลูกค้า' : 'ไม่พบลูกค้าที่ค้นหา'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ชื่อ-นามสกุล</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">เบอร์โทร</th>
                  <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">อีเมล</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">ห้อง</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">เช็คอิน</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">สถานะ</th>
                  <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, idx) => (
                  <tr key={guest.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                          {guest.name?.charAt(0) || 'G'}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{guest.name}</p>
                          <p className="text-xs text-gray-500">{guest.idCard || 'ไม่ระบุ'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-gray-400" />
                        {guest.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-400" />
                        {guest.email || '-'}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-bold">
                        {guest.room || '-'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {guest.check_in || '-'}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        guest.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {guest.status === 'active' ? 'เข้าพัก' : 'ไม่ได้เข้าพัก'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Guest Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">เพิ่มลูกค้าใหม่</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล *"
                value={newGuest.name}
                onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="tel"
                placeholder="เบอร์โทรศัพท์ *"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="อีเมล"
                value={newGuest.email}
                onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="เลขบัตรประชาชน"
                value={newGuest.idCard}
                onChange={(e) => setNewGuest({...newGuest, idCard: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <textarea
                placeholder="ที่อยู่"
                value={newGuest.address}
                onChange={(e) => setNewGuest({...newGuest, address: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows="3"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddGuest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guests;
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
