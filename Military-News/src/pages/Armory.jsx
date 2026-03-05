import { Target } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useArmory } from "../hooks/useApi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

const Armory = () => {
  const { data: weapons = [], isLoading } = useArmory();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 border-4 border-military-700 border-t-military-400 rounded-full animate-spin"></div>
        <p className="font-mono text-military-500 text-xs uppercase animate-pulse">
          Loading armory inventory...
        </p>
      </div>
    );
  }

  const statusCounts = weapons.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + curr.qty;
    return acc;
  }, {});

  const typeCounts = weapons.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + curr.qty;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(74, 222, 128, 0.6)",
          "rgba(250, 204, 21, 0.6)",
          "rgba(96, 165, 250, 0.6)",
          "rgba(248, 113, 113, 0.6)",
        ],
        borderColor: [
          "rgba(74, 222, 128, 1)",
          "rgba(250, 204, 21, 1)",
          "rgba(96, 165, 250, 1)",
          "rgba(248, 113, 113, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: "Asset Classes",
        data: Object.values(typeCounts),
        backgroundColor: "rgba(234, 179, 8, 0.6)",
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#9ca3af",
          font: { family: '"Courier New", droidsansmono, monospace' },
        },
      },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
          font: { family: '"Courier New", droidsansmono, monospace' },
        },
        grid: { color: "rgba(75, 83, 32, 0.3)" },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          font: { family: '"Courier New", droidsansmono, monospace' },
          stepSize: 1,
        },
        grid: { color: "rgba(75, 83, 32, 0.3)" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#9ca3af",
          font: { family: '"Courier New", droidsansmono, monospace' },
        },
      },
    },
  };

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.h1
        variants={childVariants}
        className="text-4xl font-stencil uppercase text-center text-military-100"
      >
        Division Armory
      </motion.h1>

      <motion.div
        variants={childVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card-military"
        >
          <h2 className="text-xl font-bold text-military-100 font-stencil tracking-wider mb-4 border-b border-military-600 pb-2">
            Asset Status Distribution
          </h2>
          <div className="h-64 flex justify-center items-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card-military"
        >
          <h2 className="text-xl font-bold text-military-100 font-stencil tracking-wider mb-4 border-b border-military-600 pb-2">
            Asset Classes
          </h2>
          <div className="h-64 flex justify-center items-center">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>
      </motion.div>

      <motion.h2
        variants={childVariants}
        className="text-2xl font-stencil uppercase text-military-100 mb-2 border-b-2 border-military-600 pb-2"
      >
        Equipment Roster
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weapons.map((w, index) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.06, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="card-military group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-military-100 group-hover:text-yellow-400 transition-colors">
                  {w.name}
                </h3>
                <p className="text-xs text-military-400 font-mono">
                  CLASS: {w.type}
                </p>
              </div>
              <Target
                className="text-military-500 group-hover:text-red-500 transition-colors"
                size={28}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span
                className={`badge-classified ${w.status === "READY" ? "border-green-500 text-green-500" : ""}`}
              >
                {w.status}
              </span>
              <span className="text-military-100 font-mono font-bold">
                QTY: {w.qty}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default Armory;
