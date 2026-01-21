import React, { useState, useEffect } from 'react';
import { Users, Shield, Key, UserPlus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: 'staff',
    permissions: [],
    active: true
  });

  const roles = {
    'admin': {
      name: 'ผู้ดูแลระบบ',
      permissions: ['all'],
      color: 'red'
    },
    'manager': {
      name: 'ผู้จัดการ',
      permissions: ['rooms', 'guests', 'finance', 'reports', 'maintenance', 'analytics'],
      color: 'blue'
    },
    'staff': {
      name: 'พนักงาน',
      permissions: ['rooms', 'guests', 'maintenance'],
      color: 'green'
    },
    'accountant': {
      name: 'นักบัญชี',
      permissions: ['finance', 'reports', 'analytics'],
      color: 'purple'
    },
    'receptionist': {
      name: 'พนักงานต้อนรับ',
      permissions: ['rooms', 'guests'],
      color: 'yellow'
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
    if (savedUsers.length === 0) {
      // Create default admin user
      const defaultUsers = [
        {
          id: 1,
          username: 'admin',
          fullName: 'ผู้ดูแลระบบ',
          email: 'admin@hotel.com',
          phone: '02-123-4567',
          role: 'admin',
          permissions: ['all'],
          active: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('hotelUsers', JSON.stringify(defaultUsers));
    } else {
      setUsers(savedUsers);
    }
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.fullName) {
      alert('กรุณากรอกข้อมูลที่จำเป็น');
      return;
    }

    const user = {
      id: Date.now(),
      ...newUser,
      permissions: roles[newUser.role].permissions,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('hotelUsers', JSON.stringify(updatedUsers));
    
    setShowAddForm(false);
    setNewUser({
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'staff',
      permissions: [],
      active: true
    });
    
    alert('เพิ่มผู้ใช้สำเร็จ!');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user, password: '' });
    setShowAddForm(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { 
            ...user, 
            ...newUser, 
            permissions: roles[newUser.role].permissions,
            password: newUser.password || user.password 
          }
        : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('hotelUsers', JSON.stringify(updatedUsers));
    
    setShowAddForm(false);
    setEditingUser(null);
    setNewUser({
      username: '',
      password: '',
      fullName: '',
      email: '',
      phone: '',
      role: 'staff',
      permissions: [],
      active: true
    });
    
    alert('อัปเดตผู้ใช้สำเร็จ!');
  };

  const handleDeleteUser = (userId) => {
    if (!confirm('ยืนยันการลบผู้ใช้นี้?')) return;
    
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('hotelUsers', JSON.stringify(updatedUsers));
    
    alert('ลบผู้ใช้สำเร็จ!');
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('hotelUsers', JSON.stringify(updatedUsers));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">จัดการผู้ใช้งาน</h2>
          <p className="text-sm text-gray-500 mt-1">จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={16} />
          เพิ่มผู้ใช้ใหม่
        </button>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(roles).map(([roleKey, role]) => {
          const count = users.filter(user => user.role === roleKey && user.active).length;
          return (
            <div key={roleKey} className={`bg-${role.color}-50 p-4 rounded-xl border border-${role.color}-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-bold text-${role.color}-600 uppercase`}>{role.name}</p>
                  <p className={`text-2xl font-black text-${role.color}-600 mt-1`}>{count}</p>
                </div>
                <Shield className={`text-${role.color}-400`} size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">รายชื่อผู้ใช้งาน ({users.length} คน)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ผู้ใช้</th>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ตำแหน่ง</th>
                <th className="text-left p-4 text-xs font-bold text-gray-600 uppercase">ติดต่อ</th>
                <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">สถานะ</th>
                <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">เข้าใช้ล่าสุด</th>
                <th className="text-center p-4 text-xs font-bold text-gray-600 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{user.fullName}</p>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold bg-${roles[user.role].color}-100 text-${roles[user.role].color}-800`}>
                      {roles[user.role].name}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <p>{user.email}</p>
                    <p className="text-gray-500">{user.phone}</p>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        user.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.active ? 'ใช้งาน' : 'ปิดใช้งาน'}
                    </button>
                  </td>
                  <td className="p-4 text-center text-sm">
                    {user.lastLogin 
                      ? new Date(user.lastLogin).toLocaleDateString('th-TH')
                      : 'ยังไม่เคยเข้าใช้'
                    }
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      {user.username !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => {
            setShowAddForm(false);
            setEditingUser(null);
          }} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้ *"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  disabled={editingUser}
                />
                <input
                  type="password"
                  placeholder={editingUser ? "รหัสผ่านใหม่" : "รหัสผ่าน *"}
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล *"
                value={newUser.fullName}
                onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="อีเมล"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="tel"
                  placeholder="เบอร์โทร"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {Object.entries(roles).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-sm font-medium text-gray-700 mb-2">สิทธิ์การเข้าถึง:</p>
                <div className="flex flex-wrap gap-2">
                  {roles[newUser.role].permissions.map(permission => (
                    <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {permission === 'all' ? 'ทั้งหมด' : permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingUser(null);
                }}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={editingUser ? handleUpdateUser : handleAddUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                {editingUser ? 'อัปเดต' : 'เพิ่มผู้ใช้'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
