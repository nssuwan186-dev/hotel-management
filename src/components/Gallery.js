import React from 'react';
import { Camera } from 'lucide-react';

const Gallery = () => {
  return (
    <div className="text-center p-8 text-slate-500">
      <Camera size={64} className="mx-auto mb-4 opacity-20" />
      <h2 className="text-xl font-bold mb-2">โมดูลคลังรูปภาพ</h2>
      <p>สำหรับจัดเก็บใบเสร็จ สลิปโอนเงิน รูปห้องพัก และเอกสารต่างๆ</p>
      <p className="text-sm mt-2 opacity-75">กำลังพัฒนา...</p>
    </div>
  );
};

export default Gallery;
