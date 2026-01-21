import React, { useState } from 'react';
import { Building2, User, Lock, AlertCircle } from 'lucide-react';
import SimpleDashboard from './components/SimpleDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setLoginError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
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
    <div className="min-h-screen bg-slate-100">
      <SimpleDashboard />
    </div>
  );
};

export default App;
