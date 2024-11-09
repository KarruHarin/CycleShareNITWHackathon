import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const AddCycleForm = () => {
  const [formData, setFormData] = useState({
    cycleDetails: {
      cycleImage: '',
      color: '',
      model: '',
      gearCount: '',
      cycleCompany: ''
    },
    condition: {
      brakesWorking: true,
      hasAirInTires: true,
      chainCondition: 'Good'
    },
    bookingLocation: '',
    returningLocation: '',
    costPerHour: '',
    costPerDay: '',
    isAvailable: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-amber-400 px-6 py-4">
          <h1 className="text-2xl font-bold text-black">Add New Cycle</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Cycle Details Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black border-b border-amber-200 pb-2">
              Cycle Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cycle Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.cycleDetails.cycleImage}
                  onChange={(e) => handleInputChange('cycleDetails', 'cycleImage', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.cycleDetails.color}
                  onChange={(e) => handleInputChange('cycleDetails', 'color', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.cycleDetails.model}
                  onChange={(e) => handleInputChange('cycleDetails', 'model', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gear Count
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.cycleDetails.gearCount}
                  onChange={(e) => handleInputChange('cycleDetails', 'gearCount', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cycle Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.cycleDetails.cycleCompany}
                  onChange={(e) => handleInputChange('cycleDetails', 'cycleCompany', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Condition Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black border-b border-amber-200 pb-2">
              Condition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-400 border-amber-200 rounded focus:ring-amber-400"
                  checked={formData.condition.brakesWorking}
                  onChange={(e) => handleInputChange('condition', 'brakesWorking', e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">
                  Brakes Working
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-400 border-amber-200 rounded focus:ring-amber-400"
                  checked={formData.condition.hasAirInTires}
                  onChange={(e) => handleInputChange('condition', 'hasAirInTires', e.target.checked)}
                />
                <label className="text-sm font-medium text-gray-700">
                  Tires Inflated
                </label>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chain Condition
                </label>
                <select
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  value={formData.condition.chainCondition}
                  onChange={(e) => handleInputChange('condition', 'chainCondition', e.target.value)}
                >
                  <option value="Good">Good</option>
                  <option value="Needs Lubrication">Needs Lubrication</option>
                  <option value="Worn Out">Worn Out</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location and Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black border-b border-amber-200 pb-2">
              Location & Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={formData.bookingLocation}
                    onChange={(e) => handleInputChange(null, 'bookingLocation', e.target.value)}
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Returning Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={formData.returningLocation}
                    onChange={(e) => handleInputChange(null, 'returningLocation', e.target.value)}
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Per Hour ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.costPerHour}
                  onChange={(e) => handleInputChange(null, 'costPerHour', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Per Day ($)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={formData.costPerDay}
                  onChange={(e) => handleInputChange(null, 'costPerDay', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-amber-400 border-amber-200 rounded focus:ring-amber-400"
              checked={formData.isAvailable}
              onChange={(e) => handleInputChange(null, 'isAvailable', e.target.checked)}
            />
            <label className="text-sm font-medium text-gray-700">
              Available for Rent
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-4 rounded-md transition-colors duration-200"
          >
            Add Cycle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCycleForm;