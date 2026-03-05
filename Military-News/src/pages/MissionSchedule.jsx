import { useState, useEffect } from "react";
import {
  Map,
  Clock,
  Target,
  Loader,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import axios from "axios";
import API_BASE from "../config/api";

const PRIORITY_OPTIONS = ["Critical", "Medium", "Low"];
const STATUS_OPTIONS = ["Pending", "Ongoing", "Completed"];

const emptyForm = {
  mission_id: "",
  name: "",
  date: "",
  priority: "Medium",
  status: "Pending",
  target: "",
};

const MissionSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchMissions = async () => {
    try {
      const response = await axios.get(`${API_BASE}/missions`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Failed to fetch missions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/missions/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE}/missions`, formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setLoading(true);
      await fetchMissions();
    } catch (error) {
      console.error("Failed to save mission:", error);
      alert(error.response?.data?.detail || "Failed to save mission");
    }
  };

  const handleEdit = (mission) => {
    setFormData({
      mission_id: mission.mission_id,
      name: mission.name,
      date: mission.date,
      priority: mission.priority,
      status: mission.status,
      target: mission.target,
    });
    setEditingId(mission.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Confirm deletion of this mission directive?")) return;
    try {
      await axios.delete(`${API_BASE}/missions/${id}`);
      setLoading(true);
      await fetchMissions();
    } catch (error) {
      console.error("Failed to delete mission:", error);
    }
  };

  const openCreateForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col h-full text-military-300 gap-6">
      <div className="flex justify-between items-end border-b-2 border-military-600 pb-2">
        <h1 className="text-4xl font-stencil uppercase">Mission Schedule</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-colors"
          >
            <Plus size={16} /> NEW MISSION
          </button>
          <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
            <Map size={18} />
            <span>STRATEGIC OVERVIEW</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card-military relative">
          <button
            onClick={() => {
              setShowForm(false);
              setEditingId(null);
            }}
            className="absolute top-3 right-3 text-military-400 hover:text-red-500"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-stencil text-military-100 mb-4 uppercase">
            {editingId ? "UPDATE DIRECTIVE" : "NEW DIRECTIVE"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="MISSION ID (e.g. OP-ALPHA)"
              value={formData.mission_id}
              onChange={(e) =>
                setFormData({ ...formData, mission_id: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="MISSION NAME"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="DATE (e.g. 2026-03-15 0600H)"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
            <input
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none"
              placeholder="TARGET VECTOR"
              value={formData.target}
              onChange={(e) =>
                setFormData({ ...formData, target: e.target.value })
              }
              required
            />
            <select
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-colors"
              >
                {editingId ? "UPDATE DIRECTIVE" : "DEPLOY DIRECTIVE"}
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
        <div className="space-y-4">
          {schedules.map((mission, index) => (
            <div
              key={mission.id || index}
              className="card-military flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
            >
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <div className="flex items-center gap-2 mb-1">
                  <Target size={18} className="text-red-500" />
                  <h3 className="text-lg font-bold text-military-100 font-stencil tracking-wider">
                    {mission.name}
                  </h3>
                </div>
                <p className="text-xs text-military-400 font-mono">
                  OP IDENTIFIER:{" "}
                  <span className="text-yellow-400">
                    {mission.mission_id || mission.id}
                  </span>
                </p>
                <p className="text-xs text-military-400 font-mono flex items-center gap-1 mt-1">
                  <Clock size={12} />
                  DEPLOYMENT: {mission.date}
                </p>
              </div>

              <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-military-600 border-dashed pt-3 md:pt-0 md:pl-4 flex flex-col gap-2">
                <div>
                  <p className="text-xs font-mono text-military-500">
                    TARGET VECTOR
                  </p>
                  <p className="font-bold text-military-100 uppercase">
                    {mission.target}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-military-500">
                    PRIORITY
                  </p>
                  <p
                    className={`font-bold uppercase tracking-widest px-2 py-1 inline-block border ${mission.priority === "Critical" ? "text-red-500 border-red-500 bg-red-500/10" : mission.priority === "Medium" ? "text-yellow-500 border-yellow-500 bg-yellow-500/10" : "text-green-500 border-green-500 bg-green-500/10"}`}
                  >
                    {mission.priority}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-military-500">STATUS</p>
                  <p className="font-bold text-military-300 uppercase tracking-widest bg-military-800 px-2 py-1 inline-block border border-military-600">
                    {mission.status}
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(mission)}
                    className="p-1.5 border border-military-600 text-military-400 hover:text-yellow-400 hover:border-yellow-400 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(mission.id)}
                    className="p-1.5 border border-military-600 text-military-400 hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionSchedule;
