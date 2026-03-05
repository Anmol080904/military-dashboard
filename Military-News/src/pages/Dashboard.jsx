import React from "react";
import { useSelector } from "react-redux";
import { Users, Target, Calendar, Activity } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    {
      label: "Active Personnel",
      value: "125478",
      icon: <Users />,
      color: "bg-military-500",
    },
    {
      label: "Current Ops",
      value: "65",
      icon: <Target />,
      color: "bg-red-700",
    },
    {
      label: "Pending Missions",
      value: "458",
      icon: <Calendar />,
      color: "bg-yellow-600",
    },
    {
      label: "Success Rate",
      value: "75%",
      icon: <Activity />,
      color: "bg-green-600",
    },
  ];

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
            <button className="p-4 border-2 border-dashed border-military-600 rounded-sm text-sm font-bold text-military-300 hover:border-military-400 hover:text-military-100 hover:bg-military-700 transition-all font-stencil uppercase">
              + Recruit Soldier
            </button>
            <button className="p-4 border-2 border-dashed border-military-600 rounded-sm text-sm font-bold text-military-300 hover:border-military-400 hover:text-military-100 hover:bg-military-700 transition-all font-stencil uppercase">
              Deploy Unit
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatedPage>
  );
};

export default Dashboard;
