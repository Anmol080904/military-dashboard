import { useState } from "react";
import {
  Map,
  Clock,
  Target,
  Loader,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import {
  useMissions,
  useCreateMission,
  useUpdateMission,
  useDeleteMission,
} from "../hooks/useApi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

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

const statusIcon = (status) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 size={14} className="text-green-500" />;
    case "Ongoing":
      return <Timer size={14} className="text-yellow-500 animate-pulse" />;
    default:
      return <Clock size={14} className="text-military-400" />;
  }
};

const MissionSchedule = () => {
  const { data: schedules = [], isLoading, error: fetchError } = useMissions();
  const createMission = useCreateMission();
  const updateMission = useUpdateMission();
  const deleteMission = useDeleteMission();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const payload = {
      mission_id: formData.mission_id,
      name: formData.name,
      date: formData.date,
      priority: formData.priority,
      status: formData.status,
      target: formData.target,
    };

    try {
      if (editingId) {
        await updateMission.mutateAsync({ id: editingId, payload });
      } else {
        await createMission.mutateAsync(payload);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail) && detail.length > 0) {
        setError(detail.map((d) => d.msg).join(", "));
      } else {
        setError("Failed to save mission directive. Check inputs.");
      }
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
    setError(null);
  };

  const handleDeleteClick = (mission) => {
    setDeleteTarget(mission);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setError(null);
      await deleteMission.mutateAsync(deleteTarget.id);
    } catch (err) {
      console.error("Failed to delete mission:", err);
      setError("Failed to delete mission directive.");
    } finally {
      setDeleteTarget(null);
    }
  };

  const openCreateForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError(null);
  };

  const filteredSchedules =
    filterPriority === "All"
      ? schedules
      : schedules.filter((m) => m.priority === filterPriority);

  const isSubmitting = createMission.isPending || updateMission.isPending;

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.div
        variants={childVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-military-600 pb-2 gap-3"
      >
        <h1 className="text-4xl font-stencil uppercase">Mission Schedule</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={16} /> NEW MISSION
          </button>
          <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
            <Map size={18} />
            <span>STRATEGIC OVERVIEW</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={childVariants} className="flex gap-2 flex-wrap">
        {["All", ...PRIORITY_OPTIONS].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-widest border transition-all ${
              filterPriority === p
                ? "bg-military-600 border-military-400 text-military-100"
                : "bg-transparent border-military-700 text-military-500 hover:border-military-500 hover:text-military-300"
            }`}
          >
            {p}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-military-500">
          {filteredSchedules.length} DIRECTIVES
        </span>
      </motion.div>

      <AnimatePresence>
        {(error || fetchError) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 bg-red-900/30 border border-red-700 px-4 py-3 text-red-400 font-mono text-sm"
          >
            <AlertTriangle size={16} />
            {error || "Failed to connect to command server."}
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="absolute top-3 right-3 text-military-400 hover:text-red-500 transition-colors"
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
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="MISSION ID (e.g. OP-ALPHA)"
                value={formData.mission_id}
                onChange={(e) =>
                  setFormData({ ...formData, mission_id: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="MISSION NAME"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="DATE (e.g. 2026-03-15 0600H)"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="TARGET VECTOR"
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
                required
              />
              <select
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none transition-colors"
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
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none transition-colors"
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
                  disabled={isSubmitting}
                  className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSubmitting
                    ? "TRANSMITTING..."
                    : editingId
                      ? "UPDATE DIRECTIVE"
                      : "DEPLOY DIRECTIVE"}
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
            Decrypting mission data...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredSchedules.map((mission, index) => (
              <motion.div
                key={mission.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                whileHover={{
                  borderColor: "rgba(122, 145, 42, 0.6)",
                  transition: { duration: 0.2 },
                }}
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
                      className={`font-bold uppercase tracking-widest px-2 py-1 inline-block border ${
                        mission.priority === "Critical"
                          ? "text-red-500 border-red-500 bg-red-500/10"
                          : mission.priority === "Medium"
                            ? "text-yellow-500 border-yellow-500 bg-yellow-500/10"
                            : "text-green-500 border-green-500 bg-green-500/10"
                      }`}
                    >
                      {mission.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-military-500">
                      STATUS
                    </p>
                    <p className="font-bold text-military-300 uppercase tracking-widest bg-military-800 px-2 py-1 inline-flex items-center gap-1.5 border border-military-600">
                      {statusIcon(mission.status)}
                      {mission.status}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(mission)}
                      className="p-1.5 border border-military-600 text-military-400 hover:text-yellow-400 hover:border-yellow-400 transition-colors"
                    >
                      <Pencil size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteClick(mission)}
                      className="p-1.5 border border-military-600 text-military-400 hover:text-red-500 hover:border-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSchedules.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border border-dashed border-military-700"
            >
              <p className="font-mono text-military-500 uppercase">
                No directives found for selected filter
              </p>
            </motion.div>
          )}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteTarget?.name || "this mission directive"}
      />
    </AnimatedPage>
  );
};

export default MissionSchedule;
