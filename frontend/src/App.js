import React, { useState } from 'react';
import { Building2, User, Lock, AlertCircle, Menu, X, LogOut, LayoutDashboard, Users, DollarSign, FileText, Wrench } from 'lucide-react';
import SimpleDashboard from './components/SimpleDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('DASHBOARD');

  const MODULES = [
    { id: 'DASHBOARD', title: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'ROOMS', title: 'จัดการห้องพัก', icon: Building2 },
    { id: 'GUESTS', title: 'จัดการลูกค้า', icon: Users },
    { id: 'FINANCE', title: 'การเงิน', icon: DollarSign },
    { id: 'REPORTS', title: 'รายงาน', icon: FileText },
    { id: 'MAINTENANCE', title: 'แจ้งซ่อม', icon: Wrench }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl font-black text-lg hover:shadow-lg transition-all"
              >
                เข้าสู่ระบบ
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
    <div className="min-h-screen bg-slate-100 flex">
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
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
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
                isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
              }`}>
                {m.title}
              </span>
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 p-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold transition-all ${
              isSidebarOpen ? 'opacity-100' : 'opacity-100'
            }`}
            title="ออกจากระบบ"
          >
            <LogOut size={16} />
            <span className={`transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
            }`}>
              ออกจากระบบ
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 cursor-pointer hover:bg-blue-200 transition-colors">
              A
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <SimpleDashboard activeModule={activeModule} />
        </main>
      </div>
    </div>
  );
};

export default App;
