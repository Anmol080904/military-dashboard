import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, ShieldAlert } from "lucide-react";

const SECRET_CODE = "YESDELETE123456";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (code !== SECRET_CODE) {
      setError("INVALID SECRET CODE. ACCESS DENIED.");
      return;
    }
    setError("");
    setCode("");
    onConfirm();
  };

  const handleClose = () => {
    setCode("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-md mx-4 bg-military-900 border-2 border-red-800 shadow-2xl shadow-red-900/30 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900 animate-pulse"></div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-military-400 hover:text-red-500 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-900/30 border border-red-700 rounded-sm">
                  <ShieldAlert size={28} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-stencil text-red-400 uppercase tracking-wider">
                    CONFIRM DELETION
                  </h3>
                  <p className="text-xs font-mono text-military-500 uppercase">
                    Authorization Required
                  </p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-800 px-4 py-3 mb-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={16}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm font-mono text-red-300 leading-relaxed">
                    You are about to permanently delete{" "}
                    <span className="text-red-400 font-bold">{itemName}</span>.
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-mono text-military-400 uppercase ml-1 block mb-2">
                  Enter Secret Code to Confirm
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  placeholder="ENTER SECRET CODE..."
                  className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-red-500 focus:outline-none font-mono text-sm placeholder-military-600 tracking-wider"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-2 ml-1 font-mono uppercase flex items-center gap-1"
                  >
                    <AlertTriangle size={12} /> {error}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 bg-military-800 border border-military-600 text-military-300 font-stencil uppercase tracking-widest text-sm hover:bg-military-700 transition-colors"
                >
                  ABORT
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-2.5 bg-red-900/50 border border-red-700 text-red-400 font-stencil uppercase tracking-widest text-sm hover:bg-red-800 hover:text-red-200 transition-colors"
                >
                  EXECUTE DELETE
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
