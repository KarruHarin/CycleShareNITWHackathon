import React, { useState, useEffect } from 'react';
import { Notification } from './Notification';
import { useSocket } from '../context/SocketContext';

export const NotificationContainer = () => {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification) => {
      const id = Date.now();

      switch (notification.type) {
        case 'new_booking_request': {
          const newNotification = {
            id,
            title: notification.title,
            message: `${notification.message}\nStart: ${new Date(notification.bookingDetails.startTime).toLocaleString()}\nEnd: ${new Date(notification.bookingDetails.endTime).toLocaleString()}`,
            type: 'info',
            actions: (
              <>
                <button 
                  onClick={() => handleBookingResponse(notification.bookingDetails.bookingId, 'accepted')}
                  className="accept-button"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleBookingResponse(notification.bookingDetails.bookingId, 'rejected')}
                  className="reject-button"
                >
                  Reject
                </button>
              </>
            )
          };
          setNotifications(prev => [...prev, newNotification]);
          break;
        }
        case 'booking_confirmed': {
          const newNotification = {
            id,
            title: notification.title,
            message: notification.message,
            type: 'success'
          };
          setNotifications(prev => [...prev, newNotification]);
          // Auto remove success notifications after 5 seconds
          setTimeout(() => removeNotification(id), 5000);
          break;
        }
        case 'booking_rejected': {
          const newNotification = {
            id,
            title: notification.title,
            message: notification.message,
            type: 'error'
          };
          setNotifications(prev => [...prev, newNotification]);
          // Auto remove error notifications after 5 seconds
          setTimeout(() => removeNotification(id), 5000);
          break;
        }
      }
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};