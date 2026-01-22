# Hotel Management System

## 📁 โครงสร้างโปรเจค

```
hotel-management/
├── src/
│   ├── App.js                    # ไฟล์หลัก (Login + Dashboard)
│   ├── index.js                  # Entry point
│   ├── index.css                 # CSS หลัก
│   ├── components/
│   │   └── SimpleDashboard.js    # Dashboard หลัก (ใช้งานจริง)
│   ├── services/                 # API และ Services
│   ├── config/                   # ไฟล์ config
│   ├── docs/                     # เอกสาร
│   └── components/unused/        # Components เก่าที่ไม่ใช้
├── public/                       # Static files
├── build/                        # Production build
└── package.json                  # Dependencies

```

## 🎯 ไฟล์สำคัญที่ใช้งานจริง

### ไฟล์หลัก (ต้องรู้)
- `src/App.js` - ระบบ Login และเรียก SimpleDashboard
- `src/components/SimpleDashboard.js` - Dashboard หลักที่ใช้งานจริง
- `package.json` - Dependencies และ scripts

### ไฟล์รอง
- `src/index.js` - Entry point (ไม่ต้องแก้)
- `src/index.css` - CSS พื้นฐาน (ไม่ต้องแก้)

## 🚀 การใช้งาน

### Development
```bash
npm start          # รันบนเครื่อง localhost:3000
```

### Production
```bash
npm run build      # Build สำหรับ production
npm run deploy     # Deploy ขึ้น GitHub Pages
```

### Login
- Username: `admin`
- Password: `admin123`

## 🔧 การแก้ไข

### เพิ่มฟีเจอร์ใหม่
แก้ไขใน `src/components/SimpleDashboard.js`

### เปลี่ยน Login
แก้ไขใน `src/App.js`

### เพิ่ม Dependencies
```bash
npm install package-name
```

## 📦 Build Size
- JavaScript: ~50 kB
- CSS: ~6 kB
- Total: ~56 kB

## 🌐 Live Demo
https://nssuwan186-dev.github.io/hotel-management
