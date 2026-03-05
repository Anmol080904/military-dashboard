import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, X, Loader, Plus } from "lucide-react";
import Terminal from "react-console-emulator";
import axios from "axios";
import API_BASE from "../config/api";

const emptyLog = { log_id: "", timestamp: "", author: "", body: "" };

const Logs = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyLog);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_BASE}/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/logs`, formData);
      setShowForm(false);
      setFormData(emptyLog);
      setLoading(true);
      await fetchLogs();
    } catch (error) {
      console.error("Failed to create log:", error);
      alert(error.response?.data?.detail || "Failed to create log");
    }
  };

  return (
    <div className="flex flex-col h-full text-military-300 gap-6">
      <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
        <h1 className="text-4xl font-stencil uppercase">Mission Logs</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setFormData(emptyLog);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-colors"
          >
            <Plus size={16} /> NEW LOG
          </button>
          <div
            className="flex items-center gap-2 text-military-400 font-mono text-sm cursor-pointer hover:text-military-200 transition-colors"
            onClick={() => setIsTerminalOpen(true)}
          >
            <TerminalIcon size={18} />
            <span>SYSTEM TERMINAL</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card-military relative">
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
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="LOG ID (e.g. LOG-993)"
              value={formData.log_id}
              onChange={(e) =>
                setFormData({ ...formData, log_id: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="TIMESTAMP (e.g. 03-05-2026 14:00:00)"
              value={formData.timestamp}
              onChange={(e) =>
                setFormData({ ...formData, timestamp: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="AUTHOR (e.g. MAJOR Vikram Singh)"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
            <textarea
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none md:col-span-2 min-h-[80px]"
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
                className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-colors"
              >
                SUBMIT LOG ENTRY
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader className="animate-spin text-military-400" size={48} />
        </div>
      ) : (
        <div className="bg-military-layout border border-military-600 p-4 rounded-sm font-mono text-sm space-y-6 overflow-y-auto max-h-[70vh] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          {logs.map((log, index) => (
            <div
              key={log.id || index}
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
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-military-700 text-xs font-mono text-military-500 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        TERMINAL CONNECTION SECURE. AWAITING INPUT...
      </div>

      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-military-400 w-full max-w-4xl h-[70vh] flex flex-col font-mono shadow-[0_0_30px_rgba(34,197,94,0.2)]">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Logs;
