import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';

const Cycle = () => {
  const { cycleId } = useParams();
  const [cycle, setCycle] = useState(null);
  const [bookingData, setBookingData] = useState({
    startTime: '',
    endTime: '',
    bookingDate: new Date().toISOString().split('T')[0],
  });
  const [totalCost, setTotalCost] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, user: "Alex", rating: 5, comment: "Excellent bike! Very smooth ride.", date: "2024-03-15" },
    { id: 2, user: "Sarah Benerjee", rating: 4, comment: "Great experience overall.", date: "2024-03-10" }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const demoCycle = {
    id: '4',
    image: '/api/placeholder/800/400',
    name: 'Electric Bike',
    costPerHour: 80,
    description: 'An eco-friendly electric bike, perfect for effortless commutes.'
  };

  useEffect(() => {
    const selectedCycle = demoCycle;
    if (selectedCycle) {
      setCycle(selectedCycle);
    }
  }, [cycleId]);

  const calculateTotalCost = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffHours = (endTime - startTime) / (1000 * 60 * 60);
    return diffHours * cycle.costPerHour;
  };

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    const updatedBookingData = {
      ...bookingData,
      [name]: value
    };
    setBookingData(updatedBookingData);

    if (updatedBookingData.startTime && updatedBookingData.endTime) {
      const fullStartTime = `${updatedBookingData.bookingDate}T${updatedBookingData.startTime}`;
      const fullEndTime = `${updatedBookingData.bookingDate}T${updatedBookingData.endTime}`;
      const cost = calculateTotalCost(fullStartTime, fullEndTime);
      setTotalCost(cost);
    }
  };

  const handleBooking = async () => {
    const bookingPayload = {
      cycle: cycleId,
      bookingDate: bookingData.bookingDate,
      bookingTimeSlot: {
        startTime: `${bookingData.bookingDate}T${bookingData.startTime}`,
        endTime: `${bookingData.bookingDate}T${bookingData.endTime}`
      },
      bookingCost: totalCost,
      hireProgress: "Booked",
      // These would typically come from auth context
      lender: "DEMO_LENDER_ID",
      tenant: "DEMO_TENANT_ID"
    };

    try {
      // This would be your API call
      console.log("Booking payload:", bookingPayload);
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking");
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReviewObj = {
      id: reviews.length + 1,
      user: "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReviewObj, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  if (!cycle) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <div className="bg-yellow-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src={cycle.image} alt={cycle.name} className="rounded-lg shadow-md w-full h-auto" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-black mb-4">{cycle.name}</h1>
              <p className="text-gray-800 text-lg mb-6">{cycle.description}</p>
              <p className="text-2xl font-bold text-black mb-6">₹{cycle.costPerHour} per hour</p>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Book Your Ride</h3>
                
                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-gray-800 font-semibold mb-2">
                    Booking Date:
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={bookingData.bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={handleDateTimeChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">
                      Start Time:
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={bookingData.startTime}
                      onChange={handleDateTimeChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">
                      End Time:
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={bookingData.endTime}
                      onChange={handleDateTimeChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                <p className="text-2xl font-bold mb-4">
                  Total Cost: <span className="text-black">₹{totalCost.toFixed(2)}</span>
                </p>
                <button 
                  onClick={handleBooking}
                  className="w-full py-3 bg-black text-yellow-50 rounded-md font-bold hover:bg-gray-800 transition duration-200"
                  disabled={!bookingData.startTime || !bookingData.endTime}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-black mb-8">Reviews</h2>

        {/* Write Review */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 mb-2">Rating:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-2xl"
                  >
                    <Star
                      className={star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      size={24}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your experience..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500 mb-4"
              rows="4"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-yellow-50 rounded-md font-semibold hover:bg-gray-800 transition duration-200"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg">{review.user}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-600 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-800">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cycle;