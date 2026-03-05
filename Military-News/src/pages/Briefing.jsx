import { useState, useEffect, useRef } from "react";
import {
  Map,
  Flag,
  Shield,
  AlertTriangle,
  Radio,
  Clock,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useMissions } from "../hooks/useApi";

const THREAT_LEVELS = [
  {
    level: 1,
    label: "DEFCON 5",
    color: "bg-green-500",
    desc: "Peacetime - Normal readiness",
  },
  {
    level: 2,
    label: "DEFCON 4",
    color: "bg-blue-500",
    desc: "Above normal readiness",
  },
  {
    level: 3,
    label: "DEFCON 3",
    color: "bg-yellow-500",
    desc: "Air Force ready to mobilize in 15 min",
  },
  {
    level: 4,
    label: "DEFCON 2",
    color: "bg-orange-500",
    desc: "Armed Forces ready for deployment",
  },
  {
    level: 5,
    label: "DEFCON 1",
    color: "bg-red-600",
    desc: "Maximum readiness - Nuclear war imminent",
  },
];

const Briefing = () => {
  const { data: allMissions = [], isLoading } = useMissions();
  const [activeTab, setActiveTab] = useState("Critical");
  const [expandedId, setExpandedId] = useState(null);
  const [classified, setClassified] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleClassified = (id) => {
    setClassified((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMissions = allMissions.filter((m) => m.priority === activeTab);

  const priorityCounts = allMissions.reduce((acc, m) => {
    acc[m.priority] = (acc[m.priority] || 0) + 1;
    return acc;
  }, {});

  const criticalCount = priorityCounts["Critical"] || 0;
  const threatLevel =
    criticalCount >= 3
      ? THREAT_LEVELS[4]
      : criticalCount >= 2
        ? THREAT_LEVELS[3]
        : criticalCount >= 1
          ? THREAT_LEVELS[2]
          : THREAT_LEVELS[0];

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 border-4 border-military-700 border-t-military-400 rounded-full animate-spin"></div>
        <p className="font-mono text-military-500 text-xs uppercase animate-pulse">
          Decrypting tactical data...
        </p>
      </div>
    );
  }

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.div variants={childVariants} className="flex justify-center mb-2">
        <motion.div
          animate={{ rotateY: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flag className="text-military-400" size={48} />
        </motion.div>
      </motion.div>

      <motion.h1
        variants={childVariants}
        className="text-4xl font-stencil uppercase text-center text-military-100"
      >
        Tactical Briefing
      </motion.h1>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-military-900 border border-military-600 p-4 rounded-sm flex flex-col items-center">
          <div className="flex items-center gap-2 text-military-500 text-xs font-mono mb-2">
            <Clock size={14} />
            ZULU TIME
          </div>
          <div className="text-2xl font-mono text-military-100 tracking-widest animate-flicker">
            {formatTime(currentTime)}
          </div>
        </div>

        <div
          className={`bg-military-900 border border-military-600 p-4 rounded-sm flex flex-col items-center ${criticalCount > 0 ? "animate-threat-pulse" : ""}`}
        >
          <div className="flex items-center gap-2 text-military-500 text-xs font-mono mb-2">
            <Shield size={14} />
            THREAT ASSESSMENT
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${threatLevel.color} ${criticalCount > 0 ? "animate-pulse" : ""}`}
            />
            <span
              className={`text-xl font-stencil tracking-widest ${criticalCount >= 2 ? "text-red-500" : criticalCount >= 1 ? "text-yellow-500" : "text-green-500"}`}
            >
              {threatLevel.label}
            </span>
          </div>
          <p className="text-xs font-mono text-military-500 mt-2 text-center">
            {threatLevel.desc}
          </p>
        </div>

        <div className="bg-military-900 border border-military-600 p-4 rounded-sm">
          <div className="flex items-center gap-2 text-military-500 text-xs font-mono mb-3">
            <Radio size={14} />
            MISSION BREAKDOWN
          </div>
          <div className="space-y-2">
            {["Critical", "Medium", "Low"].map((p) => {
              const count = priorityCounts[p] || 0;
              const total = allMissions.length || 1;
              return (
                <div key={p} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-military-400 w-16">
                    {p}
                  </span>
                  <div className="flex-1 bg-military-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / total) * 100}%` }}
                      transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full ${p === "Critical" ? "bg-red-500" : p === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}
                    />
                  </div>
                  <span className="text-xs font-mono text-military-300 w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={childVariants}
        className="flex gap-2 border-b border-military-700 pb-2"
      >
        {["Critical", "Medium", "Low"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab
                ? tab === "Critical"
                  ? "border-red-500 text-red-400"
                  : tab === "Medium"
                    ? "border-yellow-500 text-yellow-400"
                    : "border-green-500 text-green-400"
                : "border-transparent text-military-500 hover:text-military-300"
            }`}
          >
            {tab} ({priorityCounts[tab] || 0})
          </button>
        ))}
      </motion.div>

      {filteredMissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-military-900 border border-military-600 p-6 rounded-sm text-center"
        >
          <p className="font-mono text-military-400">
            NO {activeTab.toUpperCase()} DIRECTIVES ACTIVE
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4" ref={scrollRef}>
          <AnimatePresence mode="wait">
            {filteredMissions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="bg-military-900 border border-military-600 rounded-sm relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                    mission.priority === "Critical"
                      ? "from-red-900 via-red-500 to-red-900"
                      : mission.priority === "Medium"
                        ? "from-yellow-900 via-yellow-500 to-yellow-900"
                        : "from-green-900 via-green-500 to-green-900"
                  }`}
                />

                <div
                  className="p-6 cursor-pointer group"
                  onClick={() =>
                    setExpandedId(expandedId === mission.id ? null : mission.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <h2
                      className={`text-xl font-bold font-mono uppercase tracking-widest flex items-center gap-2 ${
                        mission.priority === "Critical"
                          ? "text-red-500"
                          : mission.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      <Map size={24} /> {mission.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleClassified(mission.id);
                        }}
                        className="text-military-500 hover:text-military-300 transition-colors"
                        title={
                          classified[mission.id]
                            ? "Reveal Intel"
                            : "Redact Intel"
                        }
                      >
                        {classified[mission.id] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </motion.button>
                      <motion.div
                        animate={{
                          rotate: expandedId === mission.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} className="text-military-500" />
                      </motion.div>
                    </div>
                  </div>

                  <p className="font-mono text-sm leading-relaxed mt-3 text-military-400">
                    COMMAND DIRECTIVE {mission.mission_id}. All units attached
                    to this operation maintain heightened alert status.
                  </p>
                </div>

                <AnimatePresence>
                  {expandedId === mission.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-military-950 p-4 mx-6 mb-6 border border-military-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="font-mono text-xs text-military-500 mb-1">
                              OBJECTIVE
                            </p>
                            <p className="font-mono text-sm text-red-500 font-bold tracking-widest">
                              {classified[mission.id]
                                ? "█████████████"
                                : mission.target}
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-xs text-military-500 mb-1">
                              ESTIMATED LAUNCH
                            </p>
                            <p className="font-mono text-sm text-military-300">
                              {classified[mission.id]
                                ? "████████████"
                                : mission.date}
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-xs text-military-500 mb-1">
                              STATUS
                            </p>
                            <p className="font-mono text-sm text-yellow-500 font-bold">
                              {classified[mission.id]
                                ? "████████"
                                : mission.status}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-military-700">
                          <p className="font-mono text-xs text-military-600">
                            {classified[mission.id]
                              ? "// ██ THIS INTEL HAS BEEN REDACTED BY COMMAND ██ //"
                              : `// TRANSMISSION VERIFIED. DIRECTIVE ${mission.mission_id} AUTHENTICATED. ALL PERSONNEL STAND BY FOR FURTHER ORDERS. //`}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <motion.div
        variants={childVariants}
        className="mt-auto pt-4 border-t border-military-700 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-military-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          SECURE CHANNEL ACTIVE
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-military-600">
          <AlertTriangle size={12} />
          CLASSIFICATION: TOP SECRET // SI-TK
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default Briefing;
