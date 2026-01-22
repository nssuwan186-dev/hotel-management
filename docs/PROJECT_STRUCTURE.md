# 🏨 Hotel Management System - Project Structure

โครงสร้างโปรเจคใหม่ถูกจัดระเบียบให้แยกส่วนการทำงานชัดเจน (Frontend, Backend, Data) เพื่อให้ง่ายต่อการดูแลรักษา

## 📁 โครงสร้างโฟลเดอร์ (Directory Structure)

```
hotel-management/
├── frontend/              # 💻 ส่วนหน้าเว็บ (React Web App)
│   ├── src/
│   │   ├── components/    # ไฟล์หน้าจอต่างๆ (Dashboard)
│   │   └── App.js         # จุดเริ่มต้นของ React App
│   ├── public/
│   └── package.json       # Dependencies ของ Frontend
│
├── backend/               # ⚙️ ส่วนหลังบ้าน (Python Systems)
│   ├── bot/
│   │   └── hotel_bot.py   # 🤖 ไฟล์หลัก Telegram Bot
│   └── api/
│       └── server.py      # 🌐 ไฟล์หลัก Web API Server
│
├── data/                  # 💾 ส่วนเก็บข้อมูล (Data Zone)
│   ├── storage/
│   │   └── โรงแรม.db      # 🗄️ ฐานข้อมูล SQLite (Critical!)
│   └── backups/           # 📦 ไฟล์สำรองข้อมูล
│
└── docs/                  # 📚 เอกสารประกอบโครงการ
```

---

## 🔑 ไฟล์สำคัญ (CRITICAL FILES)

หากต้องการแก้ไขระบบ ให้มุ่งเน้นที่ไฟล์เหล่านี้:

### 1. ฐานข้อมูล (Database)
*   **Path:** `/root/hotel-management/data/storage/โรงแรม.db`
*   **หน้าที่:** เก็บข้อมูลผู้เข้าพัก, ห้องพัก, และการจองทั้งหมด
*   **คำเตือน:** เป็นไฟล์หัวใจหลัก ทั้งหน้าเว็บและบอทใช้ไฟล์นี้ร่วมกัน ห้ามลบ!

### 2. บอทเทเลแกรม (Telegram Bot)
*   **Path:** `/root/hotel-management/backend/bot/hotel_bot.py`
*   **หน้าที่:** ระบบโต้ตอบผ่าน Chat, แจ้งเตือนสถานะ, และดูรายงาน
*   **การรัน:** `python3 backend/bot/hotel_bot.py`

### 3. API Server (Backend)
*   **Path:** `/root/hotel-management/backend/api/server.py`
*   **หน้าที่:** เป็นตัวกลางรับ-ส่งข้อมูลระหว่างหน้าเว็บ React และฐานข้อมูล
*   **การรัน:** `python3 backend/api/server.py` (Run ที่ Port 8081)

### 4. หน้าเว็บ (Frontend Dashboard)
*   **Path:** `/root/hotel-management/frontend/src/components/SimpleDashboard.js`
*   **หน้าที่:** หน้าจอหลักสำหรับพนักงานโรงแรม ใช้เช็คอิน/เช็คเอาท์/ดูสถานะห้อง
*   **การรัน:** `cd frontend && npm start` (Run ที่ Port 3000)

---

## 🚀 วิธีเริ่มระบบ (How to Start)

ต้องรัน 3 คำสั่งใน 3 Terminal:

1.  **Start API Server:**
    ```bash
    python3 backend/api/server.py
    ```

2.  **Start Telegram Bot:**
    ```bash
    python3 backend/bot/hotel_bot.py
    ```

3.  **Start Web Frontend:**
    ```bash
    cd frontend
    npm start
    ```
