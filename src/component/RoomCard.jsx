import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ roomName,devices }) => {

  const navigate = useNavigate();

  const colour = "#76e5b1";
  const power = devices
  .filter(device => device.status === "on")
  .reduce((acc, device) => acc + device.wattage, 0);
  
  return (
    <div className="flex flex-1 items-center justify-center gap-4 p-8 rounded-lg bg-white/10 border border-green-900/50 z-50"
    onClick={() => navigate("/grids")}
    >
      <div className="w-full" >
        <h1 className="text-white font-medium">{roomName}</h1>
        <p className={`text-[${colour}]`}>{length} Devices</p>
      </div>
      <div className=" ">
        <svg
          width="145"
          height="145"
          viewBox="-20.625 -20.625 206 206"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: "rotate(-90deg)",
            border: `3px solid ${colour}`,
            borderRadius: "100%",
          }}
        >
          <circle
            r="80.5"
            cx="82.5"
            cy="82.5"
            stroke={colour}
            strokeWidth="21"
            strokeLinecap="round"
            strokeDashoffset="214px"
            fill="transparent"
            strokeDasharray="455.3px"
          ></circle>
          <text
            x="55px"
            y="99px"
            fill="#6bdba7"
            fontSize="52px"
            fontWeight="bold"
            style={{ transform: "rotate(90deg) translate(0px, -161px)" }}
          >
            {power}
          </text>
        </svg>
      </div>
      <div></div>
    </div>
  );
};

export default RoomCard;
