import { useState } from "react";
import {
  Shield,
  UserSearch,
  Loader,
  Plus,
  X,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { childVariants } from "../utils/animationVariants";
import { useTroops, useCreateTroop, useDeleteTroop } from "../hooks/useApi";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const emptyTroop = { name: "", email: "", password: "", role: "soldier" };
const ROLE_OPTIONS = ["soldier", "captain", "general"];

const Troop = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyTroop);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data: roster = [], isLoading } = useTroops();
  const createTroop = useCreateTroop();
  const deleteTroop = useDeleteTroop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTroop.mutateAsync(formData);
      setShowForm(false);
      setFormData(emptyTroop);
    } catch (error) {
      console.error("Failed to deploy troop:", error);
      alert(error.response?.data?.detail || "Failed to deploy troop");
    }
  };

  const handleDeleteClick = (operative) => {
    setDeleteTarget(operative);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteTroop.mutateAsync(deleteTarget.id);
    } catch (error) {
      console.error("Failed to remove troop:", error);
      alert(error.response?.data?.detail || "Failed to remove troop");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <AnimatedPage className="flex flex-col h-full text-military-300 gap-6">
      <motion.div
        variants={childVariants}
        className="flex justify-between items-end border-b-2 border-military-600 pb-2"
      >
        <h1 className="text-4xl font-stencil uppercase">Troop Roster</h1>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormData(emptyTroop);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-military-700 border border-military-500 text-military-100 font-mono text-sm hover:bg-military-600 transition-colors"
          >
            <Plus size={16} /> DEPLOY TROOP
          </motion.button>
          <div className="flex items-center gap-2 text-military-400 font-mono text-sm">
            <UserSearch size={18} />
            <span>CLASSIFICATION: LEVEL 5</span>
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
              DEPLOY NEW OPERATIVE
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                placeholder="OPERATIVE NAME"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                type="email"
                placeholder="SECURE EMAIL"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <div className="relative">
                <input
                  className="w-full bg-military-950 border border-military-600 px-3 py-2 pr-10 text-military-100 font-mono text-sm placeholder-military-600 focus:border-military-400 focus:outline-none transition-colors"
                  type={showPassword ? "text" : "password"}
                  placeholder="ACCESS CODE"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-military-500 hover:text-military-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <select
                className="bg-military-950 border border-military-600 px-3 py-2 text-military-100 font-mono text-sm focus:border-military-400 focus:outline-none transition-colors"
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
                  disabled={createTroop.isPending}
                  className="w-full py-2 bg-military-600 border border-military-400 text-military-100 font-stencil uppercase tracking-widest hover:bg-military-500 transition-colors disabled:opacity-50"
                >
                  {createTroop.isPending ? "DEPLOYING..." : "DEPLOY OPERATIVE"}
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
            Decrypting personnel files...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roster.map((operative, index) => (
            <motion.div
              key={operative.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-military flex flex-col group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-military-700/50 flex items-center justify-center border border-military-500 text-military-100 group-hover:bg-military-500 transition-colors">
                  <Shield size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-military-100 font-stencil tracking-wider group-hover:text-yellow-400 transition-colors">
                    {operative.name}
                  </h3>
                  <p className="text-xs text-military-400 font-mono">
                    ID: {operative.display_id || operative.id}
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

              <div className="flex gap-2 mt-4 pt-3 border-t border-military-600 border-dashed">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteClick(operative)}
                  className="p-1.5 border border-military-600 text-military-400 hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deleteTarget?.name || "this operative"}
      />
    </AnimatedPage>
  );
};

export default Troop;
