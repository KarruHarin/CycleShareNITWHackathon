import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Cycle() {
    const { cycleId } = useParams();
    const [cycle, setCycle] = useState(null);
    const [hours, setHours] = useState(1);
    const [totalCost, setTotalCost] = useState(0);
    const demoCycle = {
        id: '4',
        image: 'https://via.placeholder.com/150x100?text=Cycle+4',
        name: 'Electric Bike',
        costPerHour: 80,
        description: 'An eco-friendly electric bike, perfect for effortless commutes.'
      }
    useEffect(() => {
      const selectedCycle = demoCycle;
      if (selectedCycle) {
        setCycle(selectedCycle);
        setTotalCost(selectedCycle.costPerHour);
      }
    }, [cycleId]);
  
    const handleHoursChange = (e) => {
      const rentalHours = parseInt(e.target.value);
      setHours(rentalHours);
      setTotalCost(rentalHours * (cycle ? cycle.costPerHour : 0));
    };
  
    if (!cycle) return <p>Loading...</p>;
  
    return (
      <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
        <img src={cycle.image} alt={cycle.name} className="w-full h-64 object-cover rounded-lg" />
        <h1 className="text-2xl font-semibold mt-4">{cycle.name}</h1>
        <p className="text-gray-700 mt-2">{cycle.description}</p>
        <p className="text-indigo-600 font-bold mt-4">Cost per hour: ₹{cycle.costPerHour}</p>
  
        <div className="mt-6">
          <label htmlFor="hours" className="block text-gray-600 font-semibold">
            Rental Hours:
          </label>
          <input
            type="number"
            id="hours"
           placeholder='1'
            value={hours}
            onChange={handleHoursChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
  
        <p className="text-xl font-semibold mt-4">
          Total Cost: <span className="text-indigo-600">₹{totalCost}</span>
        </p>
  
        <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition duration-200">
          Confirm Rental
        </button>
      </div>
    );
  };
  


export default Cycle
