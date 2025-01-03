import React, { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Building2,
  Home,
  LogOut,
  Settings,
  Store,
  Users,
} from "lucide-react";

import RoomDetails from "../hooks/useGetRoomsDetails.js";
import TopLevelInfo from "./TopLevelInfo.jsx";

const HomeLayout = ({ children }) => {
  const [roomDetails, setRoomDetails] = useState([]);
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
    <>
      <div className="h-screen bg-black">
        <div className="flex flex-1 h-screen">
          {/* Sidebar */}
          <aside className="h-screen w-64 bg-black backdrop-blur-sm p-6 z-50">
            <div className="flex items-center gap-2 mb-8">
              <h1 className="text-green-400 text-2xl font-bold">Grid</h1>
            </div>

            <div className="space-y-1">
              <h2 className="text-white text-xs font-semibold mb-2 px-4">
                Account Management
              </h2>
              <NavLink href="/" icon={<Activity size={20} />} active>
                Dashboard
              </NavLink>
              <NavLink href="/account" icon={<Home size={20} />}>
                Account
              </NavLink>
              <NavLink href="/user" icon={<Users size={20} />}>
                User
              </NavLink>
            </div>

            <div className="space-y-1 mt-8">
              <h2 className="text-white text-xs font-semibold mb-2 px-4">
                Organization Utilities
              </h2>
              <NavLink href="/organizations" icon={<Building2 size={20} />}>
                Organization
              </NavLink>
              <NavLink href="/store" icon={<Store size={20} />}>
                Store
              </NavLink>
              <NavLink href="/grids" icon={<BarChart3 size={20} />}>
                Grid
              </NavLink>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <NavLink href="/setting" icon={<Settings size={20} />}>
                Settings
              </NavLink>
              <NavLink href="/logout" icon={<LogOut size={20} />}>
                Logout
              </NavLink>
            </div>
          </aside>
          {/* right side of the dashboard*/}
          <div className=" w-full relative overflow-hidden">
            {/* Header right*/}
            <div className="relative flex justify-end items-center h-16 z-50 p-6 w-full bg-black">
              <div className="flex items-center gap-4">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isAdmin
                      ? "bg-green-500/90 text-black font-medium"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                  onClick={() => setIsAdmin(!isAdmin)}
                >
                  {isAdmin ? "Admin" : "User"}
                </button>
              </div>
            </div>

            {/* Main Content */}

            <main className="flex flex-col h-screen w-full p-8 overflow-y-scroll custom-scrollbar bg-gradient-to-br from-green-950 to-black rounded-3xl">
              {/* Hero Section */}

              

              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
