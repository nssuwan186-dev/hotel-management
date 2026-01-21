import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Eye, Users, Clock } from 'lucide-react';

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    // โหลดข้อมูลการจอง
    const mockBookings = {
      '2024-01-21': [
        { id: 1, room: 'A102', guest: 'นายสมชาย ใจดี', time: '14:00', type: 'checkin' },
        { id: 2, room: 'B205', guest: 'นางสาวมาลี สวย', time: '15:30', type: 'checkin' }
      ],
      '2024-01-22': [
        { id: 3, room: 'A105', guest: 'นายวิชัย รวย', time: '12:00', type: 'checkout' }
      ],
      '2024-01-25': [
        { id: 4, room: 'A201', guest: 'นางสมหญิง ดี', time: '16:00', type: 'checkin' }
      ]
    };
    setBookings(mockBookings);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // เพิ่มวันว่างก่อนวันที่ 1
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // เพิ่มวันในเดือน
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getBookingsForDate = (day) => {
    if (!day) return [];
    const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    return bookings[dateKey] || [];
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">🗓️ ปฏิทินการจอง</h2>
        <button 
          onClick={() => setShowBookingForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <Plus size={16} />
          จองใหม่
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-sm border">
        {/* Calendar Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayBookings = getBookingsForDate(day);
              const isToday = day && 
                new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all ${
                    day 
                      ? isToday 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'hover:bg-gray-50 border-gray-200'
                      : 'border-transparent'
                  }`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{day}</div>
                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((booking) => (
                          <div 
                            key={booking.id} 
                            className={`text-xs p-1 rounded text-white ${
                              booking.type === 'checkin' ? 'bg-green-500' : 'bg-orange-500'
                            }`}
                          >
                            {booking.room}
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <div className="text-xs text-gray-500">+{dayBookings.length - 2} อื่นๆ</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold">
              📅 กิจกรรมวันที่ {selectedDate} {monthNames[currentDate.getMonth()]}
            </h3>
          </div>
          <div className="p-6">
            {getBookingsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getBookingsForDate(selectedDate).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        booking.type === 'checkin' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold">{booking.guest}</p>
                        <p className="text-sm text-gray-600">
                          ห้อง {booking.room} • {booking.time} • 
                          {booking.type === 'checkin' ? ' เช็คอิน' : ' เช็คเอาท์'}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                      <Eye size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>ไม่มีกิจกรรมในวันนี้</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
