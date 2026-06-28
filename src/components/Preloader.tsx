import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.7, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
            style={{ originY: 0 }}
            className="absolute inset-x-0 top-0 h-px bg-accent"
          />
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-display text-7xl text-foreground"
            >
              J
            </motion.span>
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-display text-7xl text-foreground"
            >
              R
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
