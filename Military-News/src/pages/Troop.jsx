import { useState, useEffect } from "react";
import { Shield, UserSearch, Loader, Plus, X } from "lucide-react";
import axios from "axios";
import API_BASE from "../config/api";

const emptyTroop = { name: "", email: "", password: "", role: "soldier" };
const ROLE_OPTIONS = ["soldier", "captain", "general"];

const Troop = () => {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyTroop);

  const fetchTroops = async () => {
    try {
      const response = await axios.get(`${API_BASE}/troops`);
      setRoster(response.data);
    } catch (error) {
      console.error("Failed to fetch troops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTroops();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/troops`, formData);
      setShowForm(false);
      setFormData(emptyTroop);
      setLoading(true);
      await fetchTroops();
    } catch (error) {
      console.error("Failed to deploy troop:", error);
      alert(error.response?.data?.detail || "Failed to deploy troop");
    }
  };

  return (
    <div className="flex flex-col h-full text-military-300 gap-6">
      <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
        <h1 className="text-4xl font-stencil uppercase">Troop Roster</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setFormData(emptyTroop);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-colors"
          >
            <Plus size={16} /> DEPLOY TROOP
          </button>
          <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
            <UserSearch size={18} />
            <span>CLASSIFICATION: LEVEL 5</span>
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
            DEPLOY NEW OPERATIVE
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="OPERATIVE NAME"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              type="email"
              placeholder="SECURE EMAIL"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              type="password"
              placeholder="ACCESS CODE"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <select
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-colors"
              >
                DEPLOY OPERATIVE
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roster.map((operative, index) => (
            <div
              key={operative.id || index}
              className="card-military flex flex-col group transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-military-700/50 flex items-center justify-center border border-military-500 text-military-100 group-hover:bg-military-500 transition-colors">
                  <Shield size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-military-100 font-stencil tracking-wider group-hover:text-yellow-400">
                    {operative.name}
                  </h3>
                  <p className="text-xs text-military-400 font-mono">
                    ID: {operative.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm border-t border-military-600 border-dashed pt-4">
                <div>
                  <p className="text-xs font-mono text-military-500">RANK</p>
                  <p className="font-bold text-military-100 uppercase">
                    {operative.rank}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-military-500">
                    SPECIALTY
                  </p>
                  <p className="font-bold text-military-100 uppercase">
                    {operative.specialty}
                  </p>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-xs font-mono text-military-500">STATUS</p>
                  <p
                    className={`font-bold uppercase font-mono tracking-widest ${
                      operative.status === "MIA"
                        ? "text-red-500 animate-pulse"
                        : operative.status === "ON BASE"
                          ? "text-military-300"
                          : "text-yellow-500"
                    }`}
                  >
                    {operative.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Troop;
