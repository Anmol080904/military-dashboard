import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  History,
  Medal,
  CalendarDays,
  BookUser,
  Map,
  Swords,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Command Center",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Personnel Directory",
      path: "/directory",
      icon: <BookUser size={20} />,
    },
    { name: "Troop Roster", path: "/players", icon: <Users size={20} /> },
    {
      name: "Mission Schedule",
      path: "/schedule",
      icon: <CalendarDays size={20} />,
    },
    { name: "Mission Logs", path: "/history", icon: <History size={20} /> },
    { name: "Commendations", path: "/rankings", icon: <Medal size={20} /> },
    { name: "Armory", path: "/armory", icon: <Swords size={20} /> },
    { name: "Tactical Briefing", path: "/briefing", icon: <Map size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-military-900 border-r border-military-700 transition-colors duration-300">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group border-l-4
              ${
                isActive
                  ? "bg-military-800 border-l-military-400 text-military-100 font-bold tracking-wider"
                  : "border-l-transparent text-military-300 hover:bg-military-800 hover:text-military-100"
              }
            `}
          >
            <span className="transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </span>
            <span className="text-sm font-stencil uppercase">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-military-700">
        <div
          className={`p-4 border-2 border-military-500 bg-military-800 text-military-100 relative overflow-hidden ${user?.email === "anmol6@gmail.com" && user?.password === "123456" ? "cursor-pointer hover:bg-military-700 transition-colors" : ""}`}
          onClick={() =>
            user?.email === "anmol6@gmail.com" &&
            user?.password === "123456" &&
            navigate("/current-status")
          }
        >
          <div className="absolute top-0 right-0 p-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs font-mono opacity-80 uppercase">
            Current Status
          </p>
          <p className="text-sm font-bold font-stencil uppercase text-red-500">
            DEFCON 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
