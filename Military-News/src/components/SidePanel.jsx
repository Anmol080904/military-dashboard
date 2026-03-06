import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";

const SidePanel = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-military-900 border-l-2 border-military-600 shadow-2xl shadow-black/50 flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-yellow-600 to-military-900"></div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-military-700 bg-military-950">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-military-800 border border-military-600 rounded-sm">
                  <ShieldAlert size={20} className="text-yellow-500" />
                </div>
                <h2 className="text-lg font-stencil text-military-100 uppercase tracking-wider">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-military-400 hover:text-red-500 hover:bg-military-800 transition-colors rounded-sm border border-transparent hover:border-military-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
