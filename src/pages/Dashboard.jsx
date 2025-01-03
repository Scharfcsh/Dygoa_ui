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
  const [roomDetails, setRoomDetails] = useState([]);

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
      <>
      
      
      <div className="grid gap-6 mb-2">
        <div className="fixed  w-full">
          <div className="absolute top-[30rem] left-[30rem] w-[60rem] h-[50rem] bg-green-300 rounded-full mix-blend-multiply filter blur-[130px] opacity-20"></div>
          <div className="absolute left-[-5rem] top-[-10rem] w-[30rem] h-[30rem] bg-purple-400 rounded-full mix-blend-multiply filter blur-[130px] opacity-30"></div>
          <div className="absolute top-0 right-60 w-[30rem] h-[30rem] bg-pink-400 rounded-full mix-blend-multiply filter blur-[130px] opacity-25"></div>
        </div>
        <div className="p-1 rounded-xl ">
          <h2 className="absoulte text-2xl font-semibold text-white mb-4 z-50">
            Floor Overview
          </h2>
          <TopLevelInfo />
        </div>
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 p-1 mt-2">
        {roomDetails.map((element) => (
          <RoomCard
            key={element.id}
            roomName={element.name}
            devices={element.devices}
          />
        ))}
        {/* <RoomCard /> */}
      </div>
      </>
    </HomeLayout>
  );
};

export default DashBoard;
