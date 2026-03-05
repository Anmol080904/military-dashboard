import { useState } from "react";
import { Search, Bell, Radio } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../features/notifications/notificationsSlice";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { hasUnreadNotifications } = useSelector(
    (state) => state.notifications,
  );
  const dispatch = useDispatch();

  const indianArmyNews = [
    "CORPS OF ENGINEERS DEPLOYS NEW BRIDGING EQUIPMENT AT BORDER.",
    "DRDO SUCCESSFULLY TEST-FIRES NEXT-GEN TACTICAL MISSILE.",
    "JOINT EXERCISE 'YUDH ABHYAS' COMMENCES IN RAJASTHAN SECTOR.",
    "NEW MOUNTAIN WARFARE TRAINING FACILITY INAUGURATED IN LADAKH.",
  ];

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    if (hasUnreadNotifications) {
      dispatch(clearNotifications());
    }
  };

  return (
    <header className="w-full bg-military-900 border-b border-military-700 px-6 py-2">
      <div className="flex items-center justify-between mx-auto max-w-7xl relative">
        <div className="flex items-center gap-4 overflow-hidden border border-military-700 bg-military-950 px-4 py-1 rounded-sm w-1/2">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-red-600 animate-pulse" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider font-stencil">
              INTEL
            </span>
          </div>
          <p className="text-sm text-military-300 truncate font-mono uppercase tracking-tight">
            ALPHA TEAM DEPLOYED TO SECTOR 7 • BRAVO TEAM REQUESTING AIR SUPPORT
            • MISSION FLIGHT 303 RTB
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-military-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-1.5 bg-military-950 border border-military-700 text-military-100 text-sm focus:border-military-400 focus:outline-none transition-all font-mono placeholder-military-600"
              placeholder="SEARCH DATABASE..."
            />
          </div>

          <div className="relative">
            <button
              className="relative p-2 text-military-400 hover:text-military-200 transition-colors"
              onClick={handleBellClick}
            >
              <Bell size={20} />
              {hasUnreadNotifications && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-military-900"></span>
              )}
            </button>
            <div
              className={`absolute right-0 mt-2 w-80 bg-military-950 border border-military-600 shadow-2xl rounded-sm z-50 transform origin-top-right transition-all duration-300 ease-out ${
                showNotifications
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-military-800 px-4 py-2 border-b border-military-600 flex justify-between items-center">
                <h3 className="text-military-100 font-stencil tracking-wider uppercase">
                  LATEST INTEL
                </h3>
                <span className="text-xs text-military-400 font-mono bg-military-900 px-2 py-0.5 rounded-sm">
                  TOP SECRET
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {indianArmyNews.map((news, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 border-b border-military-800 hover:bg-military-900 transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-mono text-military-300 leading-relaxed">
                      {news}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
