import React, { useEffect, useState } from "react";
import axios from "axios";

function GridDashboard() {
  const [gridDetails, setGridDetails] = useState(null);

  // Fetch grid details
  async function getGridDetails() {
    try {
      const response = await axios.get("http://localhost:3001/api/grids/details");
      setGridDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("unable to get grid details in dashboard", error?.message);
    }
  }

  useEffect(() => {
    getGridDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Grid Dashboard</h1>
      {gridDetails ? (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {gridDetails.name}
          </h2>
          <p className="text-gray-600 mb-6">
            <span className="font-bold">Total Wattage:</span> {gridDetails.totalWattage} W
          </p>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Subgrids</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {gridDetails.subgrids.map((subgrid) => (
              <div
                key={subgrid._id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {subgrid.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  <span className="font-bold">Total Wattage:</span> {subgrid.totalWattage} W
                </p>
                <h5 className="font-semibold text-gray-700 mb-2">Buildings</h5>
                <ul className="space-y-2">
                  {subgrid.buildings.map((building) => (
                    <li
                      key={building._id}
                      className="bg-white border border-gray-300 rounded-md p-3"
                    >
                      <p className="text-gray-800 font-semibold">
                        {building.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Wattage:</span>{" "}
                        {building.wattage} W
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Status:</span>{" "}
                        {building.status ? (
                          <span className="text-green-600 font-semibold">Active</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Inactive</span>
                        )}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Priority:</span> {building.priority}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading grid details...</p>
      )}
    </div>
  );
}

export default GridDashboard;
