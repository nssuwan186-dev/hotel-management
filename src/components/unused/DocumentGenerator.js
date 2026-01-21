import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, DollarSign, Users, Building, Printer } from 'lucide-react';

const DocumentGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const documentTemplates = {
    'receipt': {
      name: 'ใบเสร็จรับเงิน',
      description: 'ใบเสร็จสำหรับการชำระค่าห้องพัก',
      icon: FileText,
      fields: ['guestName', 'roomNumber', 'amount', 'date', 'services']
    },
    'invoice': {
      name: 'ใบแจ้งหนี้',
      description: 'ใบแจ้งหนี้ค่าห้องพักและบริการ',
      icon: DollarSign,
      fields: ['guestName', 'roomNumber', 'checkIn', 'checkOut', 'services', 'total']
    },
    'checkin_form': {
      name: 'แบบฟอร์มเช็คอิน',
      description: 'แบบฟอร์มลงทะเบียนเข้าพัก',
      icon: Users,
      fields: ['guestName', 'idCard', 'phone', 'address', 'roomNumber', 'date']
    },
    'room_report': {
      name: 'รายงานสถานะห้องพัก',
      description: 'รายงานสถานะห้องพักประจำวัน',
      icon: Building,
      fields: ['date', 'totalRooms', 'occupied', 'available', 'maintenance']
    },
    'financial_report': {
      name: 'รายงานการเงิน',
      description: 'รายงานรายรับ-รายจ่ายประจำเดือน',
      icon: Calendar,
      fields: ['month', 'revenue', 'expenses', 'profit', 'transactions']
    },
    'guest_registration': {
      name: 'ทะเบียนแขก',
      description: 'บันทึกข้อมูลแขกที่เข้าพัก',
      icon: Users,
      fields: ['guestName', 'nationality', 'passport', 'visa', 'purpose']
    }
  };

  const [formData, setFormData] = useState({});

  const generateDocument = async (templateType) => {
    setGenerating(true);
    
    try {
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const doc = await createDocument(templateType, formData);
      downloadDocument(doc, templateType);
      
      alert('สร้างเอกสารสำเร็จ!');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสร้างเอกสาร');
    } finally {
      setGenerating(false);
    }
  };

  const createDocument = async (templateType, data) => {
    const template = documentTemplates[templateType];
    const now = new Date();
    
    // Create HTML document
    const htmlContent = `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        body { font-family: 'Sarabun', Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .hotel-name { font-size: 24px; font-weight: bold; color: #2563eb; }
        .document-title { font-size: 20px; margin-top: 10px; }
        .content { line-height: 1.6; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; display: inline-block; width: 150px; }
        .value { border-bottom: 1px dotted #666; display: inline-block; min-width: 200px; }
        .footer { margin-top: 50px; text-align: right; }
        .signature { margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="hotel-name">Grand Hotel Management System</div>
        <div class="document-title">${template.name}</div>
        <div>วันที่: ${now.toLocaleDateString('th-TH')} เวลา: ${now.toLocaleTimeString('th-TH')}</div>
    </div>
    
    <div class="content">
        ${generateDocumentContent(templateType, data)}
    </div>
    
    <div class="footer">
        <div class="signature">
            <p>ลงชื่อ: ________________________</p>
            <p>ตำแหน่ง: ______________________</p>
            <p>วันที่: ${now.toLocaleDateString('th-TH')}</p>
        </div>
    </div>
</body>
</html>`;

    return htmlContent;
  };

  const generateDocumentContent = (templateType, data) => {
    switch (templateType) {
      case 'receipt':
        return `
          <div class="field">
            <span class="label">ชื่อผู้เข้าพัก:</span>
            <span class="value">${data.guestName || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">หมายเลขห้อง:</span>
            <span class="value">${data.roomNumber || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">จำนวนเงิน:</span>
            <span class="value">${data.amount || '_________________'} บาท</span>
          </div>
          <div class="field">
            <span class="label">วันที่ชำระ:</span>
            <span class="value">${data.date || new Date().toLocaleDateString('th-TH')}</span>
          </div>
          <div class="field">
            <span class="label">รายการ:</span>
            <span class="value">${data.services || 'ค่าห้องพัก'}</span>
          </div>
        `;
      
      case 'checkin_form':
        return `
          <div class="field">
            <span class="label">ชื่อ-นามสกุล:</span>
            <span class="value">${data.guestName || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">เลขบัตรประชาชน:</span>
            <span class="value">${data.idCard || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">เบอร์โทรศัพท์:</span>
            <span class="value">${data.phone || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">ที่อยู่:</span>
            <span class="value">${data.address || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">หมายเลขห้อง:</span>
            <span class="value">${data.roomNumber || '_________________'}</span>
          </div>
          <div class="field">
            <span class="label">วันที่เข้าพัก:</span>
            <span class="value">${data.date || new Date().toLocaleDateString('th-TH')}</span>
          </div>
        `;
      
      case 'room_report':
        return `
          <table>
            <tr><th>รายการ</th><th>จำนวน</th></tr>
            <tr><td>ห้องทั้งหมด</td><td>${data.totalRooms || '30'}</td></tr>
            <tr><td>ห้องที่มีแขก</td><td>${data.occupied || '20'}</td></tr>
            <tr><td>ห้องว่าง</td><td>${data.available || '8'}</td></tr>
            <tr><td>ห้องซ่อมบำรุง</td><td>${data.maintenance || '2'}</td></tr>
          </table>
          <div class="field">
            <span class="label">อัตราการเข้าพัก:</span>
            <span class="value">${Math.round((data.occupied || 20) / (data.totalRooms || 30) * 100)}%</span>
          </div>
        `;
      
      default:
        return '<p>เอกสารมาตรฐาน</p>';
    }
  };

  const downloadDocument = (htmlContent, templateType) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTemplates[templateType].name}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printDocument = (templateType) => {
    const doc = createDocument(templateType, formData);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">สร้างเอกสาร</h2>
          <p className="text-sm text-gray-500 mt-1">สร้างและพิมพ์เอกสารต่างๆ สำหรับโรงแรม</p>
        </div>
      </div>

      {/* Document Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(documentTemplates).map(([key, template]) => {
          const Icon = template.icon;
          return (
            <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedTemplate(key)}
                  className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <FileText size={16} className="inline mr-2" />
                  กรอกข้อมูล
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => generateDocument(key)}
                    disabled={generating}
                    className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                  >
                    <Download size={14} className="inline mr-1" />
                    ดาวน์โหลด
                  </button>
                  <button
                    onClick={() => printDocument(key)}
                    className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Printer size={14} className="inline mr-1" />
                    พิมพ์
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedTemplate('')} />
          <div className="relative bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">
              กรอกข้อมูล - {documentTemplates[selectedTemplate].name}
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {documentTemplates[selectedTemplate].fields.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getFieldLabel(field)}
                  </label>
                  <input
                    type={getFieldType(field)}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={getFieldPlaceholder(field)}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedTemplate('')}
                className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => {
                  generateDocument(selectedTemplate);
                  setSelectedTemplate('');
                }}
                disabled={generating}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                {generating ? 'กำลังสร้าง...' : 'สร้างเอกสาร'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function getFieldLabel(field) {
    const labels = {
      guestName: 'ชื่อผู้เข้าพัก',
      roomNumber: 'หมายเลขห้อง',
      amount: 'จำนวนเงิน',
      date: 'วันที่',
      services: 'รายการบริการ',
      idCard: 'เลขบัตรประชาชน',
      phone: 'เบอร์โทรศัพท์',
      address: 'ที่อยู่',
      checkIn: 'วันที่เช็คอิน',
      checkOut: 'วันที่เช็คเอาท์',
      total: 'ยอดรวม',
      totalRooms: 'ห้องทั้งหมด',
      occupied: 'ห้องที่มีแขก',
      available: 'ห้องว่าง',
      maintenance: 'ห้องซ่อมบำรุง',
      month: 'เดือน',
      revenue: 'รายรับ',
      expenses: 'รายจ่าย',
      profit: 'กำไร',
      transactions: 'จำนวนธุรกรรม',
      nationality: 'สัญชาติ',
      passport: 'หนังสือเดินทาง',
      visa: 'วีซ่า',
      purpose: 'วัตถุประสงค์'
    };
    return labels[field] || field;
  }

  function getFieldType(field) {
    const types = {
      amount: 'number',
      date: 'date',
      checkIn: 'date',
      checkOut: 'date',
      phone: 'tel',
      total: 'number',
      totalRooms: 'number',
      occupied: 'number',
      available: 'number',
      maintenance: 'number',
      revenue: 'number',
      expenses: 'number',
      profit: 'number',
      transactions: 'number'
    };
    return types[field] || 'text';
  }

  function getFieldPlaceholder(field) {
    const placeholders = {
      guestName: 'ชื่อ-นามสกุล',
      roomNumber: '101, 201, 301',
      amount: '0.00',
      services: 'ค่าห้องพัก, บริการเสริม',
      idCard: '1-2345-67890-12-3',
      phone: '02-123-4567',
      address: 'ที่อยู่ปัจจุบัน'
    };
    return placeholders[field] || '';
  }
};

export default DocumentGenerator;
