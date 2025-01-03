import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { Sun, Wind, Zap, Battery, Power, AlertTriangle } from 'lucide-react'
import HomeLayout from '../component/HomeLayout'


const EcoGridDashboard = () => {

  const [gridDetails, setGridDetails] = useState({
    name: "Greenville Eco Grid",
    totalWattage: 10000,
    subgrids: [
      {
        _id: "1",
        name: "Downtown District",
        totalWattage: 6000,
        buildings: [
          { _id: "101", name: "City Hall", wattage: 2000, status: true, priority: 1 },
          { _id: "102", name: "Central Library", wattage: 1500, status: true, priority: 2 },
          { _id: "103", name: "Community Center", wattage: 2500, status: true, priority: 3 },
        ]
      },
      {
        _id: "2",
        name: "Residential Area",
        totalWattage: 4000,
        buildings: [
          { _id: "201", name: "Apartment Complex A", wattage: 1500, status: true, priority: 2 },
          { _id: "202", name: "Apartment Complex B", wattage: 1500, status: true, priority: 2 },
          { _id: "203", name: "Smart Homes", wattage: 1000, status: true, priority: 3 },
        ]
      }
    ]
  })
  const [currentEnergy, setCurrentEnergy] = useState(0)

  async function getGridDetails() {
    try {
      const response = await axios.get(`https://shot-attacks-indicators-valve.trycloudflare.com/api/grids/details/67785a7ebae3aae905565775`);
      setGridDetails(response.data);
    } catch (e) {
      console.log("Error in getting the grid details : ", e?.payload?.message);
    }
  }

  const getProduction = async() => {
    try {
      console.log("getting production");
      const response = await axios.get(`https://shot-attacks-indicators-valve.trycloudflare.com/api/grids/production`);
      console.log(response);
      const production = response?.data.production;
      setCurrentEnergy(production)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getGridDetails();
      getProduction();
    }, 1000)
    return () => clearInterval(interval)
  }, [])



  const getStatusIcon = (status) => {
    return status ? (
      <Zap className="w-5 h-5 text-green-500" />
    ) : (
      <Power className="w-5 h-5 text-red-500" />
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800'
      case 2: return 'bg-yellow-100 text-yellow-800'
      case 3: return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleDemandColor = (currentEnergy, totalWattage) => {
    const percentage = (totalWattage / currentEnergy) * 100;
    if (percentage < 65) {
      return 'bg-green-500 text-green-800';
    } else if (percentage < 85) {
      return 'bg-yellow-500 text-yellow-800';
    } else {
      return 'bg-red-600 text-red-800';
    }
  }

  const toggleBuildingStatus = (subgridId, buildingId) => {
    setGridDetails(prevDetails => ({
      ...prevDetails,
      subgrids: prevDetails.subgrids.map(subgrid =>
        subgrid._id === subgridId ? {
          ...subgrid,
          buildings: subgrid.buildings.map(building =>
            building._id === buildingId ? { ...building, status: !building.status } : building
          )
        } : subgrid
      )
    }))
  }

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <header className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold text-green-800 mb-2"> All grids Live Details</h1>
        <div className="flex justify-center items-center space-x-4 text-green-600">
          <Sun className="w-6 h-6 animate-spin-slow" />
          <Wind className="w-6 h-6 animate-bounce" />
          <Battery className="w-6 h-6 animate-pulse" />
        </div>
      </header>

        {gridDetails ? (
          <div className="max-w-9xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 rounded-md">
              <h2 className="text-3xl font-semibold font-serif text-gray-800 mb-4">
                {/* {gridDetails.name} */}
                Central Grid
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-lg">
                  <span className="font-bold">Current Production:</span> {currentEnergy} W
                </p>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Total demand:</span>
                  <span className="text-2xl font-bold text-green-600">{Math.round(gridDetails.totalWattage)} W</span>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={toggleDemandColor(currentEnergy, gridDetails.totalWattage) + " h-full transition-all duration-500 ease-in-out "}
                  style={{ width: `${(gridDetails.totalWattage / currentEnergy) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-green-900 overflow-auto h-[70vh]">
              <h3 className="text-2xl font-semibold text-white mb-6">Subgrids</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridDetails.subgrids.map((subgrid) => (
                  <div
                    key={subgrid._id}
                    className="bg-gray-50 rounded-lg shadow-md p-6"
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                      {subgrid.name}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      <span className="font-bold">Total Wattage:</span> {subgrid.totalWattage} W
                    </p>
                    <h5 className="font-semibold text-gray-700 mb-3">Buildings</h5>
                    <ul className="space-y-3">
                      {subgrid.buildings.map((building) => (
                        <li
                          key={building._id}
                          className="bg-white rounded-md p-4 shadow transition duration-300 ease-in-out hover:shadow-md"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-gray-800 font-semibold">{building.name}</p>
                            <button
                              onClick={() => toggleBuildingStatus(subgrid._id, building._id)}
                              className="focus:outline-none"
                            >
                              {getStatusIcon(building.status)}
                            </button>
                          </div>
                          <p className="text-gray-600">
                            <span className="font-bold">Wattage:</span> {building.wattage} W
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(building.priority)}`}>
                              Priority {building.priority}
                            </span>
                            {!building.status && (
                              <span className="flex items-center text-xs text-orange-600">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Load Shed
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>
    </HomeLayout>
  )
}

export default EcoGridDashboard