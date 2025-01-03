import React from "react";
import CircularProgress from "./CircularProgress";
import * as motion from "motion/react-client";
const TopLevelInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 z-50">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className="p-8 rounded-lg bg-white/10 border border-green-900/50 flex justify-center gap-7 z-50  h-40"
      >
        <CircularProgress
          percentage={78}
          size={100}
          strokeWidth={20}
          primaryColor="chartreuse"
          secondaryColor="darkgreen"
          backgroundColor="palegreen"
          textColor="black"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="font-normal text-xl text-green-400">{"Voltage"}</p>
          <h1 className="font-bold text-4xl text-white">{220}V</h1>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className="p-8 rounded-lg bg-white/10 border border-green-900/50  gap-7 z-50 h-40"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Average Load Level</span>
          <div>
            <span className="text-xl font-bold text-green-400">12</span>
            <span className="text-gray-500 ml-2">Indoor</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        className="p-8 rounded-lg bg-white/10 border border-green-900/50 z-50 h-40"
      >
        <div className="flex flex-1 items-center justify-center gap-8">
          <div className=" h-24 w-24 flex items-center justify-center rounded-full bg-black">
            <svg
              className="size-9"
              fill="#98FB98"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 88.408 88.408"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <g>
                  {" "}
                  <polygon points="67.41,0 34.256,0 20.999,47.732 34.283,47.732 22.988,88.408 26.967,88.408 65.418,40.674 45.939,40.674 "></polygon>{" "}
                </g>{" "}
              </g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <polygon points="67.41,0 34.256,0 20.999,47.732 34.283,47.732 22.988,88.408 26.967,88.408 65.418,40.674 45.939,40.674 "></polygon>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div>
            <span className="text-white font-semibold text-xl ">
              Total Power Consumption
            </span>
            <h1 className="text-[2.5rem] font-bold text-green-400 ">
              162 Kw/h
            </h1>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopLevelInfo;
