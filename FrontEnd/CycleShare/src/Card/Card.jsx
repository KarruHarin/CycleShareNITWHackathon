import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CycleCard = ({ cycle }) => {
    const navigate  = useNavigate()
  const {id, image, name, costPerHour, description } = cycle;

  
  return (
    <div className="w-full max-w-xs rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-200 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-indigo-600 font-semibold mt-4">Cost per hour: ₹{costPerHour}</p>
        <button onClick={() => navigate(`/cycles/${id}`)} className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CycleCard;
