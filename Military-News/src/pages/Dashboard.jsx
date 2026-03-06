import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  Target,
  Calendar,
  Activity,
  X,
  MapPin,
  Eye,
  EyeOff,
  Loader,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import {
  useTroops,
  useMissions,
  useLogs,
  useCreateTroop,
} from "../hooks/useApi";

const DEPLOYMENT_ZONES = [
  {
    id: "Z1",
    name: "SIACHEN GLACIER",
    x: "72%",
    y: "12%",
    status: "ACTIVE",
    troops: 340,
    color: "#ef4444",
  },
  {
    id: "Z2",
    name: "RAJASTHAN SECTOR",
    x: "28%",
    y: "52%",
    status: "STANDBY",
    troops: 180,
    color: "#eab308",
  },
  {
    id: "Z3",
    name: "EASTERN COMMAND",
    x: "85%",
    y: "45%",
    status: "ACTIVE",
    troops: 520,
    color: "#ef4444",
  },
  {
    id: "Z4",
    name: "WESTERN FRONT",
    x: "18%",
    y: "35%",
    status: "ACTIVE",
    troops: 410,
    color: "#ef4444",
  },
  {
    id: "Z5",
    name: "SOUTHERN NAVAL",
    x: "55%",
    y: "85%",
    status: "PATROL",
    troops: 220,
    color: "#22c55e",
  },
  {
    id: "Z6",
    name: "NORTHERN COMMAND",
    x: "58%",
    y: "18%",
    status: "ACTIVE",
    troops: 680,
    color: "#ef4444",
  },
  {
    id: "Z7",
    name: "CENTRAL HQ",
    x: "50%",
    y: "48%",
    status: "BASE",
    troops: 1200,
    color: "#3b82f6",
  },
];

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: troops = [], isLoading: troopsLoading } = useTroops();
  const { data: missions = [], isLoading: missionsLoading } = useMissions();
  const { data: logs = [], isLoading: logsLoading } = useLogs();
  const createTroop = useCreateTroop();

  const [showRecruitForm, setShowRecruitForm] = useState(false);
  const [showDeployMap, setShowDeployMap] = useState(false);
  const [recruitData, setRecruitData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredZone, setHoveredZone] = useState(null);

  const totalPersonnel = troops.length;
  const currentOps = missions.filter(
    (m) => m.status === "Ongoing" || m.status === "Pending",
  ).length;
  const pendingMissions = missions.filter((m) => m.status === "Pending").length;
  const completedMissions = missions.filter(
    (m) => m.status === "Completed",
  ).length;
  const successRate =
    missions.length > 0
      ? Math.round((completedMissions / missions.length) * 100)
      : 0;

  const isLoading = troopsLoading || missionsLoading || logsLoading;

  const stats = [
    {
      label: "Active Personnel",
      value: isLoading ? "..." : totalPersonnel.toLocaleString(),
      icon: <Users />,
      color: "bg-military-500",
    },
    {
      label: "Current Ops",
      value: isLoading ? "..." : currentOps.toString(),
      icon: <Target />,
      color: "bg-red-700",
    },
    {
      label: "Pending Missions",
      value: isLoading ? "..." : pendingMissions.toString(),
      icon: <Calendar />,
      color: "bg-yellow-600",
    },
    {
      label: "Success Rate",
      value: isLoading ? "..." : `${successRate}%`,
      icon: <Activity />,
      color: "bg-green-600",
    },
  ];

  const handleRecruitSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTroop.mutateAsync({
        name: recruitData.name,
        email: recruitData.email,
        password: recruitData.password,
        role: "soldier",
      });
      setShowRecruitForm(false);
      setRecruitData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Failed to recruit soldier:", error);
      alert(error.response?.data?.detail || "Failed to recruit soldier");
    }
  };

  return (
    <AnimatedPage className="space-y-6">
      <motion.header
        variants={childVariants}
        className="border-b border-military-700 pb-4"
      >
        <h1 className="text-3xl font-stencil text-military-100 uppercase tracking-wider">
          Command Center
        </h1>
        <p className="text-military-400 font-mono text-sm">
          WELCOME BACK, COMMANDER {user?.name?.toUpperCase() || "OPERATIVE"}.
          STATUS REPORT FOLLOWS.
        </p>
      </motion.header>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.15 + idx * 0.1,
              duration: 0.4,
              ease: "easeOut",
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-4 bg-military-800 border border-military-600 rounded-sm flex items-center gap-4 relative overflow-hidden group hover:border-military-400 transition-all cursor-default"
          >
            <div
              className={`p-3 rounded-sm text-white ${stat.color} shadow-lg z-10`}
            >
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
            <div className="z-10">
              <p className="text-xs font-bold text-military-400 uppercase tracking-widest font-stencil">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-military-50 font-mono">
                {stat.value}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-military-900 opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform">
              {React.cloneElement(stat.icon, { size: 64 })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="p-6 bg-military-800 border border-military-600 rounded-sm">
          <h3 className="font-bold text-military-100 mb-4 font-stencil uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Tactical Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {user?.role === "general" || user?.role === "captain" ? (
              <button
                onClick={() => setShowRecruitForm(true)}
                className="p-4 border-2 border-dashed border-military-600 rounded-sm text-sm font-bold text-military-300 hover:border-military-400 hover:text-military-100 hover:bg-military-700 transition-all font-stencil uppercase"
              >
                + Recruit Soldier
              </button>
            ) : (
              <div className="p-4 border-2 border-dashed border-military-700 rounded-sm text-sm text-military-600 font-stencil uppercase opacity-60 cursor-not-allowed flex flex-col items-center justify-center gap-1">
                <span>+ Recruit Soldier</span>
                <span className="text-[10px] font-mono text-red-500/70 normal-case tracking-normal">
                  Requires Captain / General rank
                </span>
              </div>
            )}
            <button
              onClick={() => setShowDeployMap(true)}
              className="p-4 border-2 border-dashed border-military-600 rounded-sm text-sm font-bold text-military-300 hover:border-military-400 hover:text-military-100 hover:bg-military-700 transition-all font-stencil uppercase"
            >
              Deploy Personnel
            </button>
          </div>
        </div>

        <div className="p-6 bg-military-800 border border-military-600 rounded-sm">
          <h3 className="font-bold text-military-100 mb-4 font-stencil uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Recent Intelligence
          </h3>
          {logsLoading ? (
            <div className="flex items-center gap-2 text-military-500 font-mono text-xs">
              <Loader size={14} className="animate-spin" />
              DECRYPTING LOGS...
            </div>
          ) : (
            <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
              {logs.slice(0, 3).map((log, idx) => (
                <div
                  key={log.id || idx}
                  className="border-l-2 border-military-600 pl-3"
                >
                  <p className="text-xs font-mono text-military-500">
                    {log.timestamp} — {log.author}
                  </p>
                  <p className="text-sm font-mono text-military-300 truncate">
                    {log.body}
                  </p>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-xs font-mono text-military-600 uppercase">
                  No intel reports available
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showRecruitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowRecruitForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-md mx-4 bg-military-900 border-2 border-military-600 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-green-600 to-military-900"></div>

              <button
                onClick={() => setShowRecruitForm(false)}
                className="absolute top-3 right-3 text-military-400 hover:text-red-500 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-green-900/30 border border-green-700 rounded-sm">
                    <Users size={24} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-stencil text-military-100 uppercase tracking-wider">
                      Recruit Soldier
                    </h3>
                    <p className="text-xs font-mono text-military-500 uppercase">
                      Role: SOLDIER (Auto-assigned)
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleRecruitSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="text-xs font-mono text-military-400 uppercase ml-1 block mb-1.5">
                      Operative Name
                    </label>
                    <input
                      className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono text-sm placeholder-military-600"
                      placeholder="FULL NAME"
                      value={recruitData.name}
                      onChange={(e) =>
                        setRecruitData({
                          ...recruitData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-military-400 uppercase ml-1 block mb-1.5">
                      Secure Email
                    </label>
                    <input
                      className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono text-sm placeholder-military-600"
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      value={recruitData.email}
                      onChange={(e) =>
                        setRecruitData({
                          ...recruitData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-military-400 uppercase ml-1 block mb-1.5">
                      Access Code
                    </label>
                    <div className="relative">
                      <input
                        className="w-full p-3 pr-12 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono text-sm placeholder-military-600"
                        type={showPassword ? "text" : "password"}
                        placeholder="PASSWORD (MIN 6 CHARS)"
                        value={recruitData.password}
                        onChange={(e) =>
                          setRecruitData({
                            ...recruitData,
                            password: e.target.value,
                          })
                        }
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-military-500 hover:text-military-200 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-military-950 border border-military-700 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-military-500 uppercase">
                      Assigned Role
                    </span>
                    <span className="text-sm font-stencil text-green-500 uppercase tracking-widest">
                      SOLDIER
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={createTroop.isPending}
                    className="w-full py-3 mt-1 bg-green-900/30 border border-green-700 text-green-400 font-stencil uppercase tracking-widest hover:bg-green-800/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {createTroop.isPending
                      ? "PROCESSING ENLISTMENT..."
                      : "CONFIRM RECRUITMENT"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeployMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDeployMap(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full max-w-4xl mx-4 bg-military-900 border-2 border-military-600 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-red-600 to-military-900 animate-pulse"></div>

              <div className="flex items-center justify-between px-6 py-3 border-b border-military-700 bg-military-950">
                <div className="flex items-center gap-3">
                  <Radio size={16} className="text-red-500 animate-pulse" />
                  <h3 className="text-lg font-stencil text-military-100 uppercase tracking-wider">
                    Deploy Personnel — Strategic Map
                  </h3>
                </div>
                <button
                  onClick={() => setShowDeployMap(false)}
                  className="text-military-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div
                  className="relative w-full bg-military-950 border border-military-700 overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="grid"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#7a912a"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  <svg
                    viewBox="0 0 600 400"
                    className="absolute inset-0 w-full h-full opacity-15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M280,20 Q320,30 340,25 Q380,15 400,30 Q430,50 450,45 Q470,40 490,55 Q510,70 520,85 Q530,100 540,130 Q545,150 535,180 Q525,200 530,220 Q535,240 520,260 Q510,270 500,285 Q485,300 470,310 Q450,325 420,340 Q390,350 360,355 Q330,360 300,350 Q280,345 260,355 Q240,360 220,350 Q200,340 180,335 Q160,330 140,320 Q120,305 110,290 Q100,270 95,250 Q90,230 85,210 Q80,190 85,170 Q90,150 100,130 Q115,105 130,90 Q150,70 175,55 Q200,40 220,30 Q250,20 280,20 Z"
                      fill="#4b5320"
                      stroke="#7a912a"
                      strokeWidth="2"
                    />
                    <path
                      d="M310,40 Q340,35 360,45 L365,55 Q340,50 310,55 Z"
                      fill="#5a6328"
                      stroke="#7a912a"
                      strokeWidth="1"
                    />
                    <path
                      d="M420,60 Q440,55 460,65 L455,90 Q435,80 420,75 Z"
                      fill="#5a6328"
                      stroke="#7a912a"
                      strokeWidth="1"
                    />
                  </svg>

                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-military-900/90 border border-military-700 px-3 py-1.5 z-20">
                    <Radio size={10} className="text-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-military-300 uppercase">
                      Live Deployment Grid
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-military-900/90 border border-military-700 px-3 py-2 z-20">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-xs font-mono text-military-400">
                          ACTIVE
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="text-xs font-mono text-military-400">
                          STANDBY
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs font-mono text-military-400">
                          PATROL
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-xs font-mono text-military-400">
                          BASE
                        </span>
                      </div>
                    </div>
                  </div>

                  {DEPLOYMENT_ZONES.map((zone) => (
                    <div
                      key={zone.id}
                      className="absolute z-10 group cursor-pointer"
                      style={{
                        left: zone.x,
                        top: zone.y,
                        transform: "translate(-50%, -50%)",
                      }}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <div className="relative">
                        <div
                          className="w-4 h-4 rounded-full animate-ping absolute inset-0 opacity-40"
                          style={{ backgroundColor: zone.color }}
                        ></div>
                        <div
                          className="w-4 h-4 rounded-full relative z-10 border-2 border-white/30"
                          style={{ backgroundColor: zone.color }}
                        ></div>
                        <MapPin
                          size={16}
                          className="absolute -top-4 left-1/2 -translate-x-1/2"
                          style={{ color: zone.color }}
                        />
                      </div>

                      <AnimatePresence>
                        {hoveredZone === zone.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute top-6 left-1/2 -translate-x-1/2 bg-military-900/95 border border-military-600 px-3 py-2 whitespace-nowrap z-30 shadow-xl"
                          >
                            <p className="text-xs font-stencil text-military-100 uppercase tracking-wider">
                              {zone.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs font-mono text-military-400">
                                {zone.troops} TROOPS
                              </span>
                              <span
                                className="text-xs font-mono font-bold uppercase"
                                style={{ color: zone.color }}
                              >
                                {zone.status}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <svg
                    className="absolute inset-0 w-full h-full z-0 opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="50%"
                      y1="48%"
                      x2="72%"
                      y2="12%"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="48%"
                      x2="85%"
                      y2="45%"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="48%"
                      x2="18%"
                      y2="35%"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="48%"
                      x2="28%"
                      y2="52%"
                      stroke="#eab308"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="48%"
                      x2="55%"
                      y2="85%"
                      stroke="#22c55e"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="48%"
                      x2="58%"
                      y2="18%"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-military-950 border border-military-700 px-3 py-2 text-center">
                    <p className="text-xs font-mono text-military-500">
                      TOTAL ZONES
                    </p>
                    <p className="text-lg font-bold font-mono text-military-100">
                      {DEPLOYMENT_ZONES.length}
                    </p>
                  </div>
                  <div className="bg-military-950 border border-military-700 px-3 py-2 text-center">
                    <p className="text-xs font-mono text-military-500">
                      ACTIVE OPS
                    </p>
                    <p className="text-lg font-bold font-mono text-red-400">
                      {
                        DEPLOYMENT_ZONES.filter((z) => z.status === "ACTIVE")
                          .length
                      }
                    </p>
                  </div>
                  <div className="bg-military-950 border border-military-700 px-3 py-2 text-center">
                    <p className="text-xs font-mono text-military-500">
                      DEPLOYED
                    </p>
                    <p className="text-lg font-bold font-mono text-yellow-400">
                      {DEPLOYMENT_ZONES.reduce(
                        (acc, z) => acc + z.troops,
                        0,
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-military-950 border border-military-700 px-3 py-2 text-center">
                    <p className="text-xs font-mono text-military-500">
                      READINESS
                    </p>
                    <p className="text-lg font-bold font-mono text-green-400">
                      98%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default Dashboard;
