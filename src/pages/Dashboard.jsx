import React, { useEffect, useState } from "react";
import HomeLayout from "../component/HomeLayout";


import TopLevelInfo from "../component/TopLevelInfo.jsx";
import EnergyGraph from "../component/EnergyGraph";
import ProgressiveLine from "../component/ProgressiveLine.jsx";
import AssignedToSelect from "../component/AssignedToSelect.jsx";
import RoomCard from "../component/RoomCard.jsx";
import RoomDetails from "../hooks/useGetRoomsDetails.js";

import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [roomDetails, setRoomDetails]  = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const data = await RoomDetails();
      if (data) {
        setRoomDetails(data);
      }
    };

    fetchRoomDetails();
  }, []);
  
  const [selectedOption, setSelectedOption] = useState({
    type: "Demand v/s Production",
  });
  const [isAdmin, setIsAdmin] = useState(true);

  const NavLink = ({ href, icon, children, active }) => (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        active
          ? "text-green-400 bg-green-500/10"
          : "text-gray-400 hover:text-green-400 hover:bg-green-500/10"
      }`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );

  return (
    <HomeLayout>
      <TopLevelInfo/>
       {/* Placeholder for Dashboard */}
       <div className=" relative h-4/5 rounded-xl bg-white/10 border border-green-900 z-50">
                <AssignedToSelect
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                {selectedOption.type === "Demand v/s Production" ? (
                  // <EnergyGraph /> 
                  ""
                ) : (
                  <ProgressiveLine />
                )}
              </div>

              {/* Room detail section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 p-1 mt-2"
              
              >
                {roomDetails.map((element) => (
                  <RoomCard key={element.id} roomName={element.name} devices={element.devices}/>
                ))}
                {/* <RoomCard /> */}
              </div>
    </HomeLayout>
  );
};

export default DashBoard;
