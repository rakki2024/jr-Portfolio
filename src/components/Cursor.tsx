import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 rounded-full bg-accent mix-blend-difference"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.2 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-accent/60 mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 28 : 16),
          y: pos.y - (hovering ? 28 : 16),
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.4 }}
      />
    </>
  );
}
