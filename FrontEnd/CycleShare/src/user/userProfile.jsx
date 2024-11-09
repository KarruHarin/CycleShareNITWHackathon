import React, { useState } from 'react';
import { Star, Mail, User as UserIcon, MapPin, Bike } from 'lucide-react';

const UserProfile = () => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews, setReviews] = useState([
    { id: 1, reviewer: "Alice", rating: 4, comment: "Great experience!", date: "2024-02-15" },
    { id: 2, reviewer: "Bob", rating: 5, comment: "Very reliable renter", date: "2024-02-10" }
  ]);

  const userData = {
    username: "John Doe",
    email: "john@example.com",
    college: "MIT",
    rating: 4,
    isVerified: true,
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReviewObj = {
      id: reviews.length + 1,
      reviewer: "Current User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReviewObj, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-black">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-black" />
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold text-black">{userData.username}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                {renderStars(userData.rating)}
                <span className="text-gray-600">({userData.rating}/5)</span>
              </div>
              {userData.isVerified && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Verified User
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Details */}
          <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-black">
            <h2 className="text-xl font-bold text-black mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-black" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-black" />
                <span>{userData.college}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bike className="w-5 h-5 text-black" />
                <span>Has Bicycle Available</span>
              </div>
            </div>
          </div>

          {/* Add Review */}
          <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-black">
            <h2 className="text-xl font-bold text-black mb-4">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newReview.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
              <textarea
                className="w-full p-2 border-2 border-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="3"
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-yellow-50 py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-black">
          <h2 className="text-xl font-bold text-black mb-6">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b-2 border-gray-100 pb-4 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <p className="font-semibold">{review.reviewer}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;