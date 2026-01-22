import React, { useState } from 'react';
import { Camera, Upload, Image, FileText, Trash2, Eye, Plus, Search } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('receipts');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'receipts', name: 'ใบเสร็จ/สลิป', icon: FileText },
    { id: 'rooms', name: 'รูปห้องพัก', icon: Image },
    { id: 'documents', name: 'เอกสาร', icon: Camera }
  ];

  // Sample data
  const sampleFiles = {
    receipts: [
      { id: 1, name: 'ใบเสร็จห้อง 201', date: '2026-01-20', type: 'image', size: '245 KB' },
      { id: 2, name: 'สลิปโอนเงิน_มกราคม', date: '2026-01-19', type: 'image', size: '156 KB' }
    ],
    rooms: [
      { id: 3, name: 'ห้อง 101 - ภายใน', date: '2026-01-18', type: 'image', size: '1.2 MB' },
      { id: 4, name: 'ห้อง 205 - ห้องน้ำ', date: '2026-01-17', type: 'image', size: '890 KB' }
    ],
    documents: [
      { id: 5, name: 'สัญญาเช่า_2026', date: '2026-01-15', type: 'pdf', size: '2.1 MB' },
      { id: 6, name: 'ใบอนุญาต_โรงแรม', date: '2026-01-10', type: 'pdf', size: '1.5 MB' }
    ]
  };

  const currentFiles = sampleFiles[activeTab] || [];
  const filteredFiles = currentFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    alert('อัปโหลดไฟล์สำเร็จ!');
    setShowUploadModal(false);
  };

  const handleDelete = (fileId) => {
    if (confirm('ยืนยันการลบไฟล์นี้?')) {
      alert('ลบไฟล์สำเร็จ!');
    }
  };

  const getFileIcon = (type) => {
    return type === 'image' ? Image : FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">คลังรูปภาพและเอกสาร</h2>
          <p className="text-sm text-gray-500 mt-1">จัดเก็บใบเสร็จ สลิปโอนเงิน รูปห้องพัก และเอกสารต่างๆ</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <Upload size={16} />
          อัปโหลดไฟล์
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="ค้นหาไฟล์..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* File Grid */}
      <div className="bg-white rounded-2xl shadow-sm border">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">
              {currentFiles.length === 0 ? 'ยังไม่มีไฟล์ในหมวดนี้' : 'ไม่พบไฟล์ที่ค้นหา'}
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={file.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="text-blue-600" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.date}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{file.size}</span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(file.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">อัปโหลดไฟล์</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่
                </label>
                <select 
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="receipts">ใบเสร็จ/สลิป</option>
                  <option value="rooms">รูปห้องพัก</option>
                  <option value="documents">เอกสาร</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อไฟล์
                </label>
                <input
                  type="text"
                  placeholder="ระบุชื่อไฟล์"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกไฟล์
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-600">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวาง</p>
                  <p className="text-xs text-gray-500 mt-1">รองรับ: JPG, PNG, PDF (ขนาดไม่เกิน 10MB)</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                อัปโหลด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
