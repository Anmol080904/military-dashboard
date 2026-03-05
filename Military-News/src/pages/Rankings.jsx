import { useEffect, useState } from "react";
import axios from "axios";
import { Award } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";

const Rankings = () => {
  const [commendations, setCommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommendations = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setCommendations(response.data.slice(0, 18));
      } catch (error) {
        console.error("Error fetching commendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommendations();
  }, []);

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.h1
        variants={childVariants}
        className="text-4xl font-stencil uppercase text-center"
      >
        Commendations List
      </motion.h1>
      {loading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-military-700 border-t-yellow-500 rounded-full animate-spin" />
          <p className="font-mono uppercase tracking-widest text-yellow-500 animate-pulse">
            DECRYPTING COMMENDATION DATA...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commendations.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-military flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-military-100 group-hover:text-yellow-400 transition-colors">
                    OP: {user.name}
                  </h3>
                  <p className="text-xs text-military-400 font-mono">
                    CALLSIGN: {user.username}
                  </p>
                </div>
                <Award className="text-yellow-500" size={28} />
              </div>
              <div className="text-sm border-t border-military-600 border-dashed pt-4 mt-2">
                <p>
                  <span className="text-military-400">EMAIL:</span> {user.email}
                </p>
                <p>
                  <span className="text-military-400">BASE:</span>{" "}
                  {user.address.city}
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="badge-classified">HONORED PRIORITY</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
};

export default Rankings;
