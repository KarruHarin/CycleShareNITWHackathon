import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import cycleShareLogo from '../assets/cycleShareLogo.jpg';
import logo from '../assets/logo.svg'

const CycleCard = ({ cycle }) => {
    const navigate  = useNavigate()
   

  
  return (
    <div className="w-full max-w-xs rounded-lg shadow-lg overflow-hidden bg-white transition-transform duration-200 hover:scale-105">
      <img src={cycleShareLogo} alt={name} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{cycle.cycleDetails.cycleCompany}</h3>
        <p className="text-gray-600 text-sm mt-2">{cycle.rating}</p>
        <p className="text-indigo-600 font-semibold mt-4">Cost per hour: ₹{cycle.costPerHour}</p>
        <button onClick={() => navigate(`/cycles/${cycle._id}`)} className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CycleCard;
