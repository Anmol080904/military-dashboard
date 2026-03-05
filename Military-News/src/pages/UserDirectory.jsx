import { useSelector } from "react-redux";
import { Shield, Mail, Medal } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useUsers } from "../hooks/useApi";

const UserDirectory = () => {
  const { token } = useSelector((state) => state.auth);
  const { data: users = [], isLoading } = useUsers(token);

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.h1
        variants={childVariants}
        className="text-4xl font-stencil uppercase text-center text-military-100"
      >
        Personnel Directory
      </motion.h1>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center p-10 border-2 border-dashed border-military-600 rounded-sm bg-military-box gap-4">
          <div className="w-12 h-12 border-4 border-military-700 border-t-military-400 rounded-full animate-spin" />
          <p className="font-mono uppercase tracking-widest text-blue-400 animate-pulse">
            DECRYPTING AGENT PROFILES...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-military flex flex-col group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-military-700/50 flex items-center justify-center border border-military-500 text-military-100 group-hover:bg-military-500 transition-colors">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-military-100 font-stencil tracking-wider group-hover:text-yellow-400 transition-colors">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-military-400 font-mono">
                    <Medal size={12} />{" "}
                    <span className="uppercase">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-military-600 border-dashed pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-military-500" />
                  <span className="font-mono text-military-300 group-hover:text-military-100 transition-colors">
                    {user.email}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatedPage>
  );
};

export default UserDirectory;
