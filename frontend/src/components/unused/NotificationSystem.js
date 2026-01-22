import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    // Load existing notifications
    loadNotifications();
    
    // Set up real-time notification listener
    const interval = setInterval(checkForNewNotifications, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    const saved = JSON.parse(localStorage.getItem('hotelNotifications') || '[]');
    setNotifications(saved);
  };

  const checkForNewNotifications = () => {
    // Simulate real-time notifications
    const now = new Date();
    const randomEvents = [
      {
        type: 'booking',
        title: 'การจองใหม่',
        message: 'มีการจองห้อง 205 สำหรับวันที่ ' + now.toLocaleDateString('th-TH'),
        icon: 'info',
        priority: 'medium'
      },
      {
        type: 'maintenance',
        title: 'แจ้งซ่อมใหม่',
        message: 'ห้อง 301 แจ้งปัญหาเครื่องปรับอากาศ',
        icon: 'warning',
        priority: 'high'
      },
      {
        type: 'payment',
        title: 'ได้รับการชำระเงิน',
        message: 'ได้รับการชำระเงินจากห้อง 102 จำนวน ฿2,500',
        icon: 'success',
        priority: 'low'
      },
      {
        type: 'checkin',
        title: 'แขกเช็คอิน',
        message: 'คุณสมชาย ใจดี เช็คอินห้อง 201',
        icon: 'info',
        priority: 'medium'
      }
    ];

    // Random chance to create notification
    if (Math.random() < 0.3) {
      const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      addNotification(event);
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };

    const updated = [newNotification, ...notifications].slice(0, 50); // Keep only 50 latest
    setNotifications(updated);
    localStorage.setItem('hotelNotifications', JSON.stringify(updated));

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('hotelNotifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('hotelNotifications', JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('hotelNotifications', JSON.stringify(updated));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'error': return <AlertTriangle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-blue-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {showPanel && (
          <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-900">การแจ้งเตือน</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    อ่านทั้งหมด
                  </button>
                )}
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="mx-auto mb-2 opacity-50" size={32} />
                  <p>ไม่มีการแจ้งเตือน</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'bg-blue-50' : 'bg-white'
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.icon)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                title="ทำเครื่องหมายว่าอ่านแล้ว"
                              >
                                <Check size={12} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              title="ลบการแจ้งเตือน"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock size={10} className="text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {new Date(notification.timestamp).toLocaleString('th-TH')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Hook for adding notifications from other components
export const useNotifications = () => {
  const addNotification = (notification) => {
    const event = new CustomEvent('addNotification', { detail: notification });
    window.dispatchEvent(event);
  };

  return { addNotification };
};

export default NotificationSystem;
