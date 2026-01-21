import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Building2, CircleDollarSign, Users, 
  FileText, ShieldAlert, Camera, Menu, X, LogOut,
  User, Lock, AlertCircle, CheckCircle, Database, BarChart3, Settings, Receipt
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import RoomManagement from './components/RoomManagement';
import Finance from './components/Finance';
import Guests from './components/Guests';
import Reports from './components/Reports';
import Maintenance from './components/Maintenance';
import Gallery from './components/Gallery';
import DataSync from './components/DataSync';
import Analytics from './components/Analytics';
import SystemSettings from './components/SystemSettings';
import SlipManager from './components/SlipManager';

const App = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // App State
  const MODULES = [
    { id: 'DASHBOARD', title: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'ROOMS', title: 'จัดการห้องพัก', icon: Building2 },
    { id: 'FINANCE', title: 'บัญชีและการเงิน', icon: CircleDollarSign },
    { id: 'GUESTS', title: 'ฐานข้อมูลลูกค้า', icon: Users },
    { id: 'SLIPS', title: 'จัดการสลิป OCR', icon: Receipt },
    { id: 'REPORTS', title: 'รายงาน', icon: FileText },
    { id: 'MAINTENANCE', title: 'แจ้งซ่อม', icon: ShieldAlert },
    { id: 'GALLERY', title: 'รูปภาพ/สลิป', icon: Camera },
    { id: 'DATASYNC', title: 'ซิงค์ข้อมูล', icon: Database },
    { id: 'ANALYTICS', title: 'Analytics', icon: BarChart3 },
    { id: 'SETTINGS', title: 'ตั้งค่าระบบ', icon: Settings }
  ];

  const [activeModule, setActiveModule] = useState('DASHBOARD');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data State
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('hotelAuth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setCurrentUser(authData.user);
      setIsAuthenticated(true);
      loadAllData();
    }

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial sidebar state based on screen size
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadAllData = () => {
    // Initialize with sample data
    const sampleRooms = Array.from({ length: 30 }, (_, i) => {
      const floor = Math.floor(i / 10) + 1;
      const roomNum = (i % 10) + 1;
      const roomId = `${floor}${roomNum.toString().padStart(2, '0')}`;
      
      return {
        id: roomId,
        status: 'ว่าง',
        price: 500,
        type: 'รายวัน',
        floor: floor,
        guest: null,
        phone: null,
        checkIn: null,
        elecStart: 0,
        waterStart: 0,
        maintenance: null
      };
    });

    setRooms(sampleRooms);
    
    // Sample stats
    setDashboardStats({
      rooms: {
        total_rooms: 30,
        occupied: 8,
        available: 20,
        cleaning: 1,
        maintenance: 1,
        occupancy_rate: 27
      },
      financial: {
        monthly_revenue: 45000,
        monthly_expense: 25000,
        net_profit: 20000
      },
      recent_activity: [
        { id: 1, type: 'รายรับ', description: 'ชำระค่าห้อง 201', amount: 500, date: '2026-01-20', category: 'ค่าห้องพัก' },
        { id: 2, type: 'รายจ่าย', description: 'ซ่อมแอร์ห้อง 305', amount: -2500, date: '2026-01-19', category: 'ซ่อมบำรุง' }
      ],
      maintenance_alerts: [
        { id: 1, room: '305', issue: 'เครื่องปรับอากาศเสีย', priority: 'สูง', report_date: '2026-01-19' }
      ]
    });

    setTransactions([
      { id: 1, date: '2026-01-20', type: 'รายรับ', category: 'ค่าห้องพัก', amount: 500, description: 'ชำระค่าห้อง 201' },
      { id: 2, date: '2026-01-19', type: 'รายจ่าย', category: 'ซ่อมบำรุง', amount: -2500, description: 'ซ่อมแอร์ห้อง 305' }
    ]);

    setGuests([
      { id: 1, name: 'สมชาย ใจดี', phone: '081-234-5678', email: 'somchai@email.com', room: '201', check_in: '2026-01-18', status: 'active' }
    ]);

    setMaintenanceList([
      { id: 1, room: '305', issue: 'เครื่องปรับอากาศเสีย', priority: 'สูง', status: 'รอดำเนินการ', report_date: '2026-01-19', reporter: 'แม่บ้าน' }
    ]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    // Simple authentication
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      const user = { id: 1, username: 'admin', full_name: 'ผู้ดูแลระบบ', role: 'admin' };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('hotelAuth', JSON.stringify({ user }));
      loadAllData();
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('hotelAuth');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setRooms([]);
    setGuests([]);
    setTransactions([]);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <Building2 size={64} className="mx-auto mb-4" />
            <h1 className="text-3xl font-black">HOTEL PRO</h1>
            <p className="text-sm opacity-90 mt-2">ระบบจัดการโรงแรม</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-2">
                  <User size={14} className="inline mr-1" />
                  ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="admin"
                  required
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase block mb-2">
                  <Lock size={14} className="inline mr-1" />
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-3 text-rose-600 text-sm">
                  <AlertCircle size={16} className="inline mr-2" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-black text-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>ทดสอบด้วย: <strong>admin</strong> / <strong>admin123</strong></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex text-slate-900">
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:w-16'
      }`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className={`transition-opacity duration-300 ${isSidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
            <span className="font-black text-xl">HOTEL PRO</span>
            <p className="text-xs text-slate-400 mt-1">Management System</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-slate-800 rounded-lg lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {MODULES.map(m => (
            <button 
              key={m.id} 
              onClick={() => {
                setActiveModule(m.id); 
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }} 
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group ${
                activeModule === m.id 
                  ? 'bg-blue-600 shadow-lg' 
                  : 'hover:bg-slate-800'
              }`}
              title={m.title}
            >
              <m.icon size={20} className="flex-shrink-0" /> 
              <span className={`font-semibold transition-opacity duration-300 ${
                isSidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 lg:opacity-0'
              }`}>
                {m.title}
              </span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className={`mb-3 p-3 bg-slate-800 rounded-xl transition-all duration-300 ${
            isSidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 lg:opacity-0'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 flex-shrink-0">
                {currentUser?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{currentUser?.full_name}</p>
                <p className="text-xs text-slate-400">{currentUser?.role}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 p-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold transition-all ${
              isSidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 lg:opacity-0'
            }`}
            title="ออกจากระบบ"
          >
            <LogOut size={16} />
            <span className={`transition-opacity duration-300 ${
              isSidebarOpen || window.innerWidth >= 1024 ? 'opacity-100' : 'opacity-0 lg:opacity-0'
            }`}>
              ออกจากระบบ
            </span>
          </button>
        </div>
      </div>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Menu />
            </button>
            <div>
              <h1 className="font-bold text-lg">{MODULES.find(m => m.id === activeModule)?.title}</h1>
              <p className="text-xs text-slate-500">
                {new Date().toLocaleDateString('th-TH', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          {activeModule === 'DASHBOARD' && <Dashboard stats={dashboardStats} />}
          {activeModule === 'ROOMS' && <RoomManagement rooms={rooms} setRooms={setRooms} />}
          {activeModule === 'FINANCE' && <Finance transactions={transactions} />}
          {activeModule === 'GUESTS' && <Guests guests={guests} />}
          {activeModule === 'SLIPS' && <SlipManager />}
          {activeModule === 'REPORTS' && <Reports />}
          {activeModule === 'MAINTENANCE' && <Maintenance maintenanceList={maintenanceList} />}
          {activeModule === 'GALLERY' && <Gallery />}
          {activeModule === 'DATASYNC' && <DataSync />}
          {activeModule === 'ANALYTICS' && <Analytics />}
          {activeModule === 'SETTINGS' && <SystemSettings />}
        </main>
      </div>
    </div>
  );
};

export default App;
