import { useState, useRef, useEffect } from "react";
import { Search, Bell, Radio, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "../features/notifications/notificationsSlice";

const SEARCH_MENU_ITEMS = [
  {
    label: "Command Center",
    path: "/dashboard",
    keywords: ["dashboard", "home", "command", "center", "main"],
  },
  {
    label: "Troop Roster",
    path: "/players",
    keywords: [
      "troop",
      "roster",
      "players",
      "soldiers",
      "operatives",
      "personnel",
    ],
  },
  {
    label: "Mission Schedule",
    path: "/schedule",
    keywords: ["mission", "schedule", "operations", "directive", "deployment"],
  },
  {
    label: "Mission Logs",
    path: "/history",
    keywords: ["logs", "history", "records", "past", "missions"],
  },
  {
    label: "Commendations",
    path: "/rankings",
    keywords: ["rankings", "commendations", "awards", "medals", "honors"],
  },
  {
    label: "Armory",
    path: "/armory",
    keywords: ["armory", "weapons", "equipment", "arsenal", "gear"],
  },
  {
    label: "Tactical Briefing",
    path: "/briefing",
    keywords: ["briefing", "tactical", "intelligence", "intel", "strategy"],
  },
  {
    label: "Personnel Directory",
    path: "/directory",
    keywords: ["directory", "personnel", "users", "agents", "profiles"],
  },
];

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

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

  const filteredItems = searchQuery.trim()
    ? SEARCH_MENU_ITEMS.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.keywords.some((kw) => kw.includes(q))
        );
      })
    : SEARCH_MENU_ITEMS;

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="relative hidden sm:block" ref={searchRef}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-military-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="block w-64 pl-10 pr-8 py-1.5 bg-military-950 border border-military-700 text-military-100 text-sm focus:border-military-400 focus:outline-none transition-all font-mono placeholder-military-600"
              placeholder="SEARCH DATABASE..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-military-500 hover:text-military-200 transition-colors"
              >
                <X size={14} />
              </button>
            )}

            <div
              className={`absolute top-full left-0 right-0 mt-1 bg-military-950 border border-military-600 shadow-2xl z-50 transform origin-top transition-all duration-200 ease-out ${
                showSearchResults
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-military-800 px-3 py-1.5 border-b border-military-600 flex justify-between items-center">
                <span className="text-xs font-stencil text-military-300 uppercase tracking-wider">
                  Quick Nav
                </span>
                <span className="text-xs font-mono text-military-500">
                  {filteredItems.length} results
                </span>
              </div>
              <div className="max-h-56 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSearchSelect(item.path)}
                      className="w-full text-left px-4 py-2.5 border-b border-military-800 hover:bg-military-900 transition-colors flex items-center gap-3 group"
                    >
                      <Search
                        size={12}
                        className="text-military-600 group-hover:text-military-400 transition-colors"
                      />
                      <span className="text-sm font-mono text-military-300 group-hover:text-military-100 uppercase tracking-wide transition-colors">
                        {item.label}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-center">
                    <p className="text-xs font-mono text-military-500 uppercase">
                      No matching intel found
                    </p>
                  </div>
                )}
              </div>
            </div>
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
