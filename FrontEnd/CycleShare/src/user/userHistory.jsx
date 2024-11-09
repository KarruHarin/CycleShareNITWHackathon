import React, { useState } from 'react';
import { MapPin, Clock, User, Bike, CreditCard, Calendar } from 'lucide-react';

const BookingHistory = () => {
  // Sample data - replace with actual data from your backend
  const [bookings, setBookings] = useState([
    {
      id: 1,
      lender: "John Doe",
      tenant: "Jane Smith",
      cycle: {
        model: "Mountain Bike Pro",
        cycleDetails: {
          color: "Red",
          cycleCompany: "Trek"
        }
      },
      bookingDate: new Date("2024-11-09"),
      hireProgress: "Completed",
      bookingTimeSlot: {
        startTime: new Date("2024-11-10T10:00:00"),
        endTime: new Date("2024-11-10T16:00:00")
      },
      bookingCost: 45.00
    },
    {
      id: 2,
      lender: "Alice Johnson",
      tenant: "Bob Wilson",
      cycle: {
        model: "City Cruiser",
        cycleDetails: {
          color: "Blue",
          cycleCompany: "Giant"
        }
      },
      bookingDate: new Date("2024-11-08"),
      hireProgress: "Booked",
      bookingTimeSlot: {
        startTime: new Date("2024-11-12T09:00:00"),
        endTime: new Date("2024-11-12T18:00:00")
      },
      bookingCost: 65.00
    }
  ]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-amber-400 rounded-t-lg px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-black">Your Booking History</h1>
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Status Bar */}
              <div className={`px-4 py-2 text-sm font-semibold ${
                booking.hireProgress === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {booking.hireProgress}
              </div>

              {/* Main Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* Cycle Details */}
                    <div className="flex items-start space-x-3">
                      <Bike className="w-5 h-5 text-amber-500 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.cycle.model}</h3>
                        <p className="text-sm text-gray-600">
                          {booking.cycle.cycleDetails.cycleCompany} • {booking.cycle.cycleDetails.color}
                        </p>
                      </div>
                    </div>

                    {/* Users */}
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-amber-500 mt-1" />
                      <div>
                        <div className="text-sm">
                          <span className="text-gray-600">Lender:</span>
                          <span className="ml-2 font-medium">{booking.lender}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Tenant:</span>
                          <span className="ml-2 font-medium">{booking.tenant}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Cost */}
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold text-gray-900">
                        ${booking.bookingCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Booking Date */}
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-600">Booking Date</p>
                        <p className="font-medium">{formatDate(booking.bookingDate)}</p>
                      </div>
                    </div>

                    {/* Time Slot */}
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-amber-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Time Slot</p>
                        <p className="font-medium">
                          {formatTime(booking.bookingTimeSlot.startTime)} - {formatTime(booking.bookingTimeSlot.endTime)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.bookingTimeSlot.startTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    View Details
                  </button>
                  {booking.hireProgress === 'Booked' && (
                    <button 
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-gray-500 text-lg">
              No bookings found
            </div>
            <p className="text-gray-400 mt-2">
              Your booking history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;