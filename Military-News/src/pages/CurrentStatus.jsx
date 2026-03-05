import { useState, useEffect } from "react";
import {
  Shield,
  Radio,
  Wifi,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Satellite,
  Crosshair,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useMissions, useLogs } from "../hooks/useApi";

const DEFCON_LEVELS = [
  {
    level: 5,
    label: "DEFCON 5",
    color: "#22c55e",
    bg: "from-green-900/40 to-green-950/20",
    text: "text-green-500",
    desc: "Peacetime — Normal readiness",
  },
  {
    level: 4,
    label: "DEFCON 4",
    color: "#3b82f6",
    bg: "from-blue-900/40 to-blue-950/20",
    text: "text-blue-500",
    desc: "Above normal readiness — Intelligence watch",
  },
  {
    level: 3,
    label: "DEFCON 3",
    color: "#eab308",
    bg: "from-yellow-900/40 to-yellow-950/20",
    text: "text-yellow-500",
    desc: "Air Force ready to mobilize in 15 mins",
  },
  {
    level: 2,
    label: "DEFCON 2",
    color: "#f97316",
    bg: "from-orange-900/40 to-orange-950/20",
    text: "text-orange-500",
    desc: "Armed Forces ready for deployment",
  },
  {
    level: 1,
    label: "DEFCON 1",
    color: "#ef4444",
    bg: "from-red-900/40 to-red-950/20",
    text: "text-red-500",
    desc: "Maximum readiness — Nuclear war imminent",
  },
];

const CurrentStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [acknowledged, setAcknowledged] = useState(false);
  const [systemChecks, setSystemChecks] = useState([
    { name: "SATCOM UPLINK", status: "checking" },
    { name: "RADAR ARRAY", status: "checking" },
    { name: "CIPHER DIVISION", status: "checking" },
    { name: "COMMS RELAY", status: "checking" },
    { name: "THREAT DETECTION", status: "checking" },
  ]);

  const { data: missions = [] } = useMissions();
  const { data: logs = [] } = useLogs();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const delays = [800, 1400, 2000, 2600, 3200];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        setSystemChecks((prev) =>
          prev.map((check, idx) =>
            idx === i ? { ...check, status: "online" } : check,
          ),
        );
      }, delay);
    });
  }, []);

  const criticalCount = missions.filter(
    (m) => m.priority === "Critical",
  ).length;
  const ongoingCount = missions.filter((m) => m.status === "Ongoing").length;
  const pendingCount = missions.filter((m) => m.status === "Pending").length;

  const defconIndex =
    criticalCount >= 3
      ? 4
      : criticalCount >= 2
        ? 3
        : criticalCount >= 1
          ? 2
          : 0;
  const currentDefcon = DEFCON_LEVELS[defconIndex];

  const activeMissions = missions.filter((m) => m.status !== "Completed");
  const recentLogs = logs.slice(0, 3);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <AnimatedPage className="space-y-6">
      <motion.header
        variants={childVariants}
        className="border-b-2 border-military-600 pb-4 mb-2 relative"
      >
        <div className="absolute top-0 right-0 w-48 h-1 bg-gradient-to-l from-military-500 to-transparent" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-military-100 font-stencil tracking-widest uppercase">
              Strategic Command
              <span className="block text-sm text-military-400 font-mono mt-2 normal-case tracking-normal">
                Global Threat Level Assessment
              </span>
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-2xl font-mono text-military-100 tracking-widest animate-flicker">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs font-mono text-military-500">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div
          className={`bg-gradient-to-br ${currentDefcon.bg} border-2 border-military-600 rounded-sm overflow-hidden flex flex-col items-center justify-center p-8 h-72 shadow-lg relative ${criticalCount > 0 ? "animate-threat-pulse" : ""}`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="w-1.5 h-1.5 bg-military-500 rounded-full animate-ping" />
            <span className="w-1.5 h-1.5 bg-military-500 rounded-full" />
          </div>

          <h2 className="text-military-400 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield size={16} />
            Current Readiness State
          </h2>

          <motion.div
            key={currentDefcon.label}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-6xl font-stencil font-bold tracking-widest mb-2 ${currentDefcon.text} ${criticalCount > 0 ? "animate-pulse" : ""}`}
          >
            {currentDefcon.label}
          </motion.div>

          <p className="text-military-300 font-mono text-xs text-center mt-4 uppercase max-w-xs border-t border-military-700 pt-4">
            {currentDefcon.desc}
          </p>

          <div className="flex gap-1 mt-4">
            {DEFCON_LEVELS.map((d, i) => (
              <motion.div
                key={d.level}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`w-6 h-3 rounded-sm border ${i <= defconIndex ? "opacity-100" : "opacity-20"}`}
                style={{
                  backgroundColor: i <= defconIndex ? d.color : "transparent",
                  borderColor: d.color,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="bg-military-800 border-2 border-military-600 rounded-sm p-6 shadow-lg h-72 overflow-hidden flex flex-col">
          <h2 className="text-military-100 font-stencil text-xl uppercase tracking-wider mb-4 border-b border-military-700 pb-2 flex items-center gap-2">
            <Crosshair size={18} className="text-red-500" />
            Active Directives
          </h2>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-sm">
            {activeMissions.length === 0 ? (
              <p className="text-military-500 text-center py-4">
                NO ACTIVE DIRECTIVES
              </p>
            ) : (
              activeMissions.map((mission, i) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 text-military-300"
                >
                  <span
                    className={`mt-1 ${mission.priority === "Critical" ? "text-red-500" : mission.priority === "Medium" ? "text-yellow-500" : "text-military-500"}`}
                  >
                    [{">"}]
                  </span>
                  <div className="flex-1">
                    <span className="font-bold text-military-100">
                      {mission.name}
                    </span>
                    <span className="text-xs text-military-500 ml-2">
                      ({mission.status})
                    </span>
                    <p className="text-xs text-military-500 mt-0.5">
                      TARGET: {mission.target} | {mission.date}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          {
            label: "Total Missions",
            value: missions.length,
            icon: <Crosshair size={16} />,
            color: "text-military-300",
          },
          {
            label: "Active Ops",
            value: ongoingCount,
            icon: <Activity size={16} />,
            color: "text-yellow-500",
          },
          {
            label: "Pending",
            value: pendingCount,
            icon: <Clock size={16} />,
            color: "text-blue-400",
          },
          {
            label: "Critical",
            value: criticalCount,
            icon: <AlertTriangle size={16} />,
            color: criticalCount > 0 ? "text-red-500" : "text-green-500",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            whileHover={{ y: -3 }}
            className="bg-military-800 border border-military-600 rounded-sm p-4 text-center"
          >
            <div className="flex justify-center mb-2 text-military-500">
              {stat.icon}
            </div>
            <p className={`text-2xl font-bold font-mono ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-xs font-mono text-military-500 uppercase mt-1">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={childVariants}
        className="bg-military-800 border-2 border-military-600 rounded-sm p-6 shadow-lg"
      >
        <h2 className="text-military-100 font-stencil text-xl uppercase tracking-wider mb-4 border-b border-military-700 pb-2 flex items-center gap-2">
          <Satellite size={18} className="text-blue-400" />
          System Diagnostics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {systemChecks.map((check, i) => (
            <motion.div
              key={check.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="bg-military-900 border border-military-700 p-3 rounded-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                {check.status === "checking" ? (
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                ) : (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-glow-pulse" />
                )}
                <span className="text-xs font-mono text-military-300 uppercase">
                  {check.name}
                </span>
              </div>
              <p
                className={`text-xs font-mono font-bold uppercase tracking-widest ${check.status === "checking" ? "text-yellow-500 animate-pulse" : "text-green-500"}`}
              >
                {check.status === "checking" ? "SCANNING..." : "OPERATIONAL"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={childVariants}
        className="bg-military-800 border-2 border-military-600 rounded-sm p-6 shadow-lg"
      >
        <h2 className="text-military-100 font-stencil text-xl uppercase tracking-wider mb-4 border-b border-military-700 pb-2 flex items-center gap-2">
          <Radio size={18} className="text-yellow-500" />
          Intelligence Briefing
        </h2>

        {recentLogs.length > 0 ? (
          <div className="space-y-3 font-mono text-sm">
            {recentLogs.map((log, i) => (
              <motion.div
                key={log.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="border-l-2 border-military-500 pl-3"
              >
                <p className="text-military-300 leading-relaxed">{log.body}</p>
                <p className="text-xs text-military-600 mt-1">
                  — {log.author} | {log.timestamp}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-military-300 leading-relaxed">
            Global satellite surveillance indicates increased movement in
            contested regions. All personnel are advised to review updated
            engagement protocols. Reconnaissance drones returning with visual
            data; awaiting decryption by cipher division.
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-military-700 pt-4">
          <span className="text-xs font-mono text-military-500 flex items-center gap-2">
            <Wifi size={12} className="text-green-500" />
            LAST UPDATED: {formatTime(currentTime)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAcknowledged(true)}
            disabled={acknowledged}
            className={`font-mono text-xs px-4 py-2 uppercase tracking-widest border transition-all flex items-center gap-2 ${
              acknowledged
                ? "bg-green-900/30 border-green-700 text-green-500 cursor-default"
                : "bg-military-700 hover:bg-military-600 text-military-100 border-military-500"
            }`}
          >
            {acknowledged ? (
              <>
                <CheckCircle2 size={14} /> ACKNOWLEDGED
              </>
            ) : (
              "Acknowledge"
            )}
          </motion.button>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default CurrentStatus;
