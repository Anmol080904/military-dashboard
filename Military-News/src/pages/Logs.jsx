import { useState } from "react";
import { Terminal as TerminalIcon, X, Loader, Plus } from "lucide-react";
import Terminal from "react-console-emulator";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useLogs, useCreateLog } from "../hooks/useApi";

const emptyLog = { log_id: "", timestamp: "", author: "", body: "" };

const Logs = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyLog);

  const { data: logs = [], isLoading } = useLogs();
  const createLog = useCreateLog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLog.mutateAsync(formData);
      setShowForm(false);
      setFormData(emptyLog);
    } catch (error) {
      console.error("Failed to create log:", error);
      alert(error.response?.data?.detail || "Failed to create log");
    }
  };

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.div
        variants={childVariants}
        className="flex justify-between items-end border-b-2 border-military-600 pb-2"
      >
        <h1 className="text-4xl font-stencil uppercase">Mission Logs</h1>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormData(emptyLog);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-colors"
          >
            <Plus size={16} /> NEW LOG
          </motion.button>
          <div
            className="flex items-center gap-2 text-military-400 font-mono text-sm cursor-pointer hover:text-military-200 transition-colors"
            onClick={() => setIsTerminalOpen(true)}
          >
            <TerminalIcon size={18} />
            <span>SYSTEM TERMINAL</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, height: "auto", scaleY: 1 }}
            exit={{ opacity: 0, height: 0, scaleY: 0.8 }}
            transition={{ duration: 0.3 }}
            className="card-military relative origin-top"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-military-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-stencil text-military-100 mb-4 uppercase">
              NEW ACTION LOG
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="LOG ID (e.g. LOG-993)"
                value={formData.log_id}
                onChange={(e) =>
                  setFormData({ ...formData, log_id: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="TIMESTAMP (e.g. 03-05-2026 14:00:00)"
                value={formData.timestamp}
                onChange={(e) =>
                  setFormData({ ...formData, timestamp: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="AUTHOR (e.g. MAJOR Vikram Singh)"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
              <textarea
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none md:col-span-2 min-h-[80px] transition-colors"
                placeholder="LOG BODY"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                required
                rows={3}
              />
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={createLog.isPending}
                  className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-colors disabled:opacity-50"
                >
                  {createLog.isPending ? "TRANSMITTING..." : "SUBMIT LOG ENTRY"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <Loader className="animate-spin text-military-400" size={48} />
          <p className="text-military-500 font-mono text-xs animate-pulse uppercase">
            Retrieving mission logs...
          </p>
        </div>
      ) : (
        <motion.div
          variants={childVariants}
          className="bg-military-layout border border-military-600 p-4 rounded-sm font-mono text-sm space-y-6 overflow-y-auto max-h-[70vh] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] custom-scrollbar"
        >
          {logs.map((log, index) => (
            <motion.div
              key={log.id || index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border-l-4 border-military-500 pl-4 relative group"
            >
              <div className="absolute w-2 h-2 bg-military-300 -left-[11px] top-1 group-hover:bg-yellow-400 transition-colors"></div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 text-military-400 text-xs">
                <span className="bg-military-800 px-2 py-0.5 border border-military-700">
                  {log.log_id || log.id}
                </span>
                <span>{log.timestamp}</span>
                <span className="text-military-100 font-bold tracking-widest">
                  {log.author}
                </span>
              </div>
              <p className="text-military-50 leading-relaxed font-mono">
                {`> ${log.body}`}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        variants={childVariants}
        className="mt-auto pt-4 border-t border-military-700 text-xs font-mono text-military-500 flex items-center gap-2"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        TERMINAL CONNECTION SECURE. AWAITING INPUT...
      </motion.div>

      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-black border border-military-400 w-full max-w-4xl h-[70vh] flex flex-col font-mono shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              <div className="flex justify-between items-center bg-military-900 border-b border-military-500 p-2 text-military-300 text-sm">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={16} />
                  <span>SECURE SHELL - MILITARY OS v4.2.1</span>
                </div>
                <button
                  onClick={() => setIsTerminalOpen(false)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div
                className="flex-1 w-full h-full relative"
                style={{ display: "flex" }}
              >
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <Terminal
                    commands={{
                      connect: {
                        description: "Establish secure connection",
                        fn: () =>
                          "Connection to military mainframe established...",
                      },
                      ping: {
                        description: "Ping the remote server",
                        fn: () => "PONG",
                      },
                      status: {
                        description: "Check system status",
                        fn: () => "All systems nominal.",
                      },
                    }}
                    welcomeMessage={
                      'Welcome to Military OS v4.2.1. Type "help" for a list of commands.'
                    }
                    promptLabel={"OPERATIVE@HQ:~$"}
                    autoFocus
                    style={{
                      height: "100%",
                      background: "black",
                      borderRadius: "0px",
                    }}
                    contentStyle={{ color: "#4ade80" }}
                    inputStyle={{ color: "#4ade80" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default Logs;
