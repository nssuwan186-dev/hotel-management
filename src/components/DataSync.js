import React, { useState } from 'react';
import { Cloud, Download, Upload, RefreshCw, Database, FileSpreadsheet, RotateCcw } from 'lucide-react';

const DataSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const syncData = async (dataType) => {
    setSyncing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSync(new Date().toLocaleString('th-TH'));
    setSyncing(false);
    alert(`ซิงค์ข้อมูล${dataType}สำเร็จ!`);
  };

  const exportToSheets = async () => {
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSyncing(false);
    alert('ส่งออกข้อมูลไป Google Sheets สำเร็จ!');
  };

  const importFromSheets = async () => {
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSyncing(false);
    alert('นำเข้าข้อมูลจาก Google Sheets สำเร็จ!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ซิงค์ข้อมูลและสำรอง</h2>
          <p className="text-sm text-gray-500 mt-1">จัดการข้อมูลกับ Google Sheets และระบบสำรอง</p>
        </div>
        {lastSync && (
          <div className="text-sm text-gray-500">
            ซิงค์ล่าสุด: {lastSync}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={exportToSheets}
          disabled={syncing}
          className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors disabled:opacity-50"
        >
          <Upload className="text-blue-600" size={24} />
          <div className="text-left">
            <p className="font-bold text-blue-900">ส่งออกข้อมูล</p>
            <p className="text-xs text-blue-600">Export to Google Sheets</p>
          </div>
        </button>

        <button
          onClick={importFromSheets}
          disabled={syncing}
          className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors disabled:opacity-50"
        >
          <Download className="text-green-600" size={24} />
          <div className="text-left">
            <p className="font-bold text-green-900">นำเข้าข้อมูล</p>
            <p className="text-xs text-green-600">Import from Google Sheets</p>
          </div>
        </button>

        <button
          onClick={() => syncData('ทั้งหมด')}
          disabled={syncing}
          className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors disabled:opacity-50"
        >
          <RotateCcw className="text-purple-600" size={24} />
          <div className="text-left">
            <p className="font-bold text-purple-900">ซิงค์อัตโนมัติ</p>
            <p className="text-xs text-purple-600">Auto Sync All Data</p>
          </div>
        </button>
      </div>

      {/* Data Categories */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Database size={20} />
            หมวดหมู่ข้อมูล
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { name: 'ข้อมูลห้องพัก', type: 'rooms', icon: '🏨', count: '30 ห้อง' },
            { name: 'ข้อมูลลูกค้า', type: 'guests', icon: '👥', count: '156 คน' },
            { name: 'ข้อมูลการเงิน', type: 'finance', icon: '💰', count: '89 รายการ' },
            { name: 'ข้อมูลการซ่อม', type: 'maintenance', icon: '🔧', count: '12 รายการ' }
          ].map((item) => (
            <div key={item.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.count}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => syncData(item.name)}
                  disabled={syncing}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  {syncing ? <RefreshCw size={14} className="animate-spin" /> : 'ซิงค์'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Sheets Integration */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FileSpreadsheet size={20} />
            Google Sheets Integration
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">การตั้งค่า</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spreadsheet ID
                  </label>
                  <input
                    type="text"
                    placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="AIzaSyC4sjQn..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  บันทึกการตั้งค่า
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">สถานะการเชื่อมต่อ</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">เชื่อมต่อสำเร็จ</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• อัปเดตล่าสุด: 5 นาทีที่แล้ว</p>
                  <p>• ข้อมูลซิงค์: 245 รายการ</p>
                  <p>• สถานะ: ทำงานปกติ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Backup Settings */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Cloud size={20} />
            การสำรองข้อมูลอัตโนมัติ
          </h3>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                ความถี่ในการสำรอง
              </label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="realtime">Real-time</option>
                <option value="hourly">ทุกชั่วโมง</option>
                <option value="daily">ทุกวัน</option>
                <option value="weekly">ทุกสัปดาห์</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                จำนวนการสำรองที่เก็บ
              </label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="10">10 ครั้งล่าสุด</option>
                <option value="30">30 ครั้งล่าสุด</option>
                <option value="100">100 ครั้งล่าสุด</option>
                <option value="unlimited">ไม่จำกัด</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                การแจ้งเตือน
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">แจ้งเตือนเมื่อสำเร็จ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">แจ้งเตือนเมื่อล้มเหลว</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              บันทึกการตั้งค่า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSync;
