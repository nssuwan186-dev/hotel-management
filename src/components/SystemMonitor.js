import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Database, HardDrive, Cpu, MemoryStick, Activity, AlertTriangle } from 'lucide-react';

const SystemMonitor = () => {
  const [systemStats, setSystemStats] = useState({
    online: true,
    uptime: '99.9%',
    responseTime: 45,
    activeUsers: 3,
    dataSize: 2.3,
    lastBackup: new Date().toISOString(),
    errors: 0,
    warnings: 2
  });

  const [realTimeData, setRealTimeData] = useState({
    cpu: 25,
    memory: 68,
    storage: 45,
    network: 'connected'
  });

  useEffect(() => {
    // Simulate real-time monitoring
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        storage: prev.storage + (Math.random() * 0.1),
        network: Math.random() > 0.95 ? 'disconnected' : 'connected'
      }));

      setSystemStats(prev => ({
        ...prev,
        responseTime: Math.max(20, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 20)),
        activeUsers: Math.max(1, Math.min(10, prev.activeUsers + Math.floor((Math.random() - 0.5) * 2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, thresholds) => {
    if (value < thresholds.good) return 'text-green-600';
    if (value < thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value, thresholds) => {
    if (value < thresholds.good) return 'bg-green-500';
    if (value < thresholds.warning) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">ตรวจสอบระบบ</h2>
        <p className="text-sm text-gray-500 mt-1">ติดตามสถานะและประสิทธิภาพของระบบแบบเรียลไทม์</p>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">สถานะระบบ</p>
              <div className="flex items-center gap-2 mt-1">
                {systemStats.online ? (
                  <Wifi className="text-green-500" size={16} />
                ) : (
                  <WifiOff className="text-red-500" size={16} />
                )}
                <span className={`font-bold ${systemStats.online ? 'text-green-600' : 'text-red-600'}`}>
                  {systemStats.online ? 'ออนไลน์' : 'ออฟไลน์'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Uptime</p>
              <p className="text-lg font-bold text-green-600 mt-1">{systemStats.uptime}</p>
            </div>
            <Activity className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Response Time</p>
              <p className={`text-lg font-bold mt-1 ${getStatusColor(systemStats.responseTime, {good: 50, warning: 100})}`}>
                {systemStats.responseTime}ms
              </p>
            </div>
            <Database className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">ผู้ใช้ออนไลน์</p>
              <p className="text-lg font-bold text-blue-600 mt-1">{systemStats.activeUsers}</p>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>
      </div>

      {/* Real-time Performance */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">ประสิทธิภาพแบบเรียลไทม์</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="text-blue-500" size={16} />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className={`text-sm font-bold ${getStatusColor(realTimeData.cpu, {good: 50, warning: 80})}`}>
                  {realTimeData.cpu.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(realTimeData.cpu, {good: 50, warning: 80})}`}
                  style={{ width: `${realTimeData.cpu}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemoryStick className="text-purple-500" size={16} />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <span className={`text-sm font-bold ${getStatusColor(realTimeData.memory, {good: 60, warning: 85})}`}>
                  {realTimeData.memory.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(realTimeData.memory, {good: 60, warning: 85})}`}
                  style={{ width: `${realTimeData.memory}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="text-green-500" size={16} />
                  <span className="text-sm font-medium">Storage Usage</span>
                </div>
                <span className={`text-sm font-bold ${getStatusColor(realTimeData.storage, {good: 70, warning: 90})}`}>
                  {realTimeData.storage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(realTimeData.storage, {good: 70, warning: 90})}`}
                  style={{ width: `${realTimeData.storage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold">การแจ้งเตือนระบบ</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {systemStats.warnings > 0 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="text-yellow-600" size={20} />
                <div>
                  <p className="font-medium text-yellow-900">คำเตือน: Memory usage สูง</p>
                  <p className="text-sm text-yellow-700">การใช้งาน Memory อยู่ที่ {realTimeData.memory.toFixed(1)}%</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-green-900">ระบบทำงานปกติ</p>
                <p className="text-sm text-green-700">การสำรองข้อมูลล่าสุด: {new Date(systemStats.lastBackup).toLocaleString('th-TH')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
