import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';
import { useContext } from 'react';
import { userContext } from '../context/userContext';

const CycleDetails = () => {
  const { cycleId } = useParams();
  const [cycleDetails, setCycleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(userContext)
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    startTime: '',
    endTime: '',
    bookingDate: new Date().toISOString().split('T')[0]
  });
  const [totalCost, setTotalCost] = useState(0);

  const id = localStorage.getItem("id")
  console.log("FrontEnd ",cycleId);
  
  useEffect(() => {
    const fetchCycleDetails = async () => {
      console.log(cycleId);
      
      try {
        const response = await axios.post('http://localhost:8000/cycle/details', {cycleId });
        
        if (response.data.statusCode === 200) {
          setCycleDetails(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch cycle details');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchCycleDetails();
  }, [cycleId]);

  const calculateTotalCost = (start, end) => {
    if (!start || !end || !cycleDetails) return 0;
    const startTime = new Date(`${bookingData.bookingDate} ${start}`);
    const endTime = new Date(`${bookingData.bookingDate} ${end}`);
    const diffHours = Math.max(0, (endTime - startTime) / (1000 * 60 * 60));
    return diffHours * cycleDetails.pricing.perHour;
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    const updatedBookingData = {
      ...bookingData,
      [name]: value
    };
    setBookingData(updatedBookingData);

    if (updatedBookingData.startTime && updatedBookingData.endTime) {
      const cost = calculateTotalCost(updatedBookingData.startTime, updatedBookingData.endTime);
      setTotalCost(cost);
    }
  };

  const handleBooking = async () => {
    try {
      const bookingPayload = {
        lender: cycleDetails.owner._id,
        tenant: id, // Replace with actual user ID from auth context
        cycle: cycleId,
        bookingDate: bookingData.bookingDate,
        bookingTimeSlot: {
          startTime: `${bookingData.bookingDate}T${bookingData.startTime}`,
          endTime: `${bookingData.bookingDate}T${bookingData.endTime}`
        },
        bookingCost: totalCost
      };

      const response = await axios.post(
        'http://localhost:8000/booking/bookACycle',
        bookingPayload
      );

      if (response.data.success) {
        alert('Booking request sent successfully!');
      } else {
        alert(response.data.message || 'Booking failed');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!cycleDetails) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cycle Details Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">{cycleDetails.cycleDetails.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < cycleDetails.reviews.stats.averageRating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>({cycleDetails.reviews.stats.totalReviews} reviews)</span>
            </div>

            <img 
              src="/api/placeholder/600/400" 
              alt="Cycle"
              className="w-full rounded-lg mb-4"
            />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>{cycleDetails.location.booking}</p>
              </div>

              <div>
                <h3 className="font-semibold">Pricing</h3>
                <div className="flex gap-4">
                  <p>₹{cycleDetails.pricing.perHour}/hour</p>
                  <p>₹{cycleDetails.pricing.perDay}/day</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Owner Details</h3>
                <p>Name: {cycleDetails.owner.username}</p>
                <p>College: {cycleDetails.owner.college}</p>
                <p>Rating: {cycleDetails.owner.rating}</p>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Book Now</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  value={bookingData.bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleDateTimeChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={bookingData.startTime}
                    onChange={handleDateTimeChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-2">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={bookingData.endTime}
                    onChange={handleDateTimeChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold">₹{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!bookingData.startTime || !bookingData.endTime || totalCost === 0}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 
                          disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {cycleDetails.reviews.recent.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{review.from.username}</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleDetails;