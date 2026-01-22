import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Phone, User, Calendar, DollarSign, X, Check } from 'lucide-react';

const SmartCheckIn = ({ room, onClose, onCheckIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idCard: '',
    deposit: room?.type === 'monthly' ? 5000 : 1000,
    elecStart: 0,
    waterStart: 0,
    note: ''
  });

  useEffect(() => {
    // โหลดฐานข้อมูลลูกค้า
    const savedCustomers = JSON.parse(localStorage.getItem('hotelCustomers') || '[]');
    setCustomers(savedCustomers);
  }, []);

  useEffect(() => {
    // ค้นหาลูกค้าแบบเรียลไทม์
    if (searchTerm.length >= 2) {
      const filtered = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.idCard.includes(searchTerm)
      );
      setFilteredCustomers(filtered);
      setIsNewCustomer(filtered.length === 0);
    } else {
      setFilteredCustomers([]);
      setIsNewCustomer(false);
    }
  }, [searchTerm, customers]);

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      ...formData,
      name: customer.name,
      phone: customer.phone,
      idCard: customer.idCard
    });
    setSearchTerm(customer.name);
    setFilteredCustomers([]);
  };

  const handleNewCustomer = () => {
    setIsNewCustomer(true);
    setSelectedCustomer(null);
    setFormData({
      ...formData,
      name: searchTerm,
      phone: '',
      idCard: ''
    });
    setFilteredCustomers([]);
  };

  const handleCheckIn = () => {
    if (!formData.name || !formData.phone) {
      alert('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    // สร้าง ID ลูกค้าใหม่ถ้าจำเป็น
    let customerId = selectedCustomer?.id;
    
    if (!selectedCustomer) {
      customerId = 'C' + Date.now();
      const newCustomer = {
        id: customerId,
        name: formData.name,
        phone: formData.phone,
        idCard: formData.idCard,
        type: room.type === 'monthly' ? 'monthly' : 'daily',
        bookingHistory: [],
        createdAt: new Date().toISOString()
      };
      
      // บันทึกลูกค้าใหม่
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      localStorage.setItem('hotelCustomers', JSON.stringify(updatedCustomers));
    }

    // อัปเดตประวัติการพัก
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          bookingHistory: [
            ...customer.bookingHistory,
            {
              roomId: room.id,
              checkIn: new Date().toISOString().split('T')[0],
              deposit: formData.deposit,
              elecStart: formData.elecStart,
              waterStart: formData.waterStart,
              note: formData.note
            }
          ]
        };
      }
      return customer;
    });
    
    localStorage.setItem('hotelCustomers', JSON.stringify(updatedCustomers));

    // ส่งข้อมูลกลับไปอัปเดตห้อง
    onCheckIn({
      customerId,
      customerName: formData.name,
      phone: formData.phone,
      deposit: formData.deposit,
      elecStart: formData.elecStart,
      waterStart: formData.waterStart,
      note: formData.note
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            เช็คอินห้อง {room?.number} 
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({room?.type === 'monthly' ? 'รายเดือน' : 'รายวัน'})
            </span>
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* ค้นหาลูกค้า */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 ค้นหาลูกค้า (ชื่อ/เบอร์โทร/บัตรประชาชน)
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="พิมพ์เพื่อค้นหา..."
            />
          </div>

          {/* รายการลูกค้าที่พบ */}
          {filteredCustomers.length > 0 && (
            <div className="border rounded-xl max-h-40 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => selectCustomer(customer)}
                  className="w-full p-3 text-left hover:bg-blue-50 border-b last:border-b-0 flex items-center gap-3"
                >
                  <User size={16} className="text-blue-600" />
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-gray-500">
                      {customer.phone} • {customer.type === 'monthly' ? 'รายเดือน' : 'รายวัน'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ปุ่มเพิ่มลูกค้าใหม่ */}
          {isNewCustomer && searchTerm.length >= 2 && (
            <button
              onClick={handleNewCustomer}
              className="w-full p-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 flex items-center gap-2 justify-center"
            >
              <UserPlus size={16} />
              เพิ่มลูกค้าใหม่: "{searchTerm}"
            </button>
          )}

          {/* ข้อมูลลูกค้าที่เลือก */}
          {(selectedCustomer || isNewCustomer) && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">ข้อมูลลูกค้า</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  disabled={!!selectedCustomer}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทร</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    disabled={!!selectedCustomer}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เงินมัดจำ</label>
                  <input
                    type="number"
                    value={formData.deposit}
                    onChange={(e) => setFormData({...formData, deposit: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {room?.type !== 'monthly' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เลขไฟ</label>
                    <input
                      type="number"
                      value={formData.elecStart}
                      onChange={(e) => setFormData({...formData, elecStart: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เลขน้ำ</label>
                    <input
                      type="number"
                      value={formData.waterStart}
                      onChange={(e) => setFormData({...formData, waterStart: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="2"
                />
              </div>
            </div>
          )}

          {/* ปุ่มดำเนินการ */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleCheckIn}
              disabled={!formData.name || !formData.phone}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Check size={16} />
              เช็คอิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCheckIn;
