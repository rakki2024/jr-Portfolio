import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Gallery", href: "#gallery" },
  { label: "Journey", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 2,
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#top"
          className="group flex items-center gap-1 transition-transform duration-300 hover:scale-105"
        >
          <span className="text-display text-2xl tracking-tight text-foreground">JR</span>

          <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A44B] shadow-[0_0_10px_rgba(212,164,75,0.7)] transition-all duration-300 group-hover:scale-125" />
        </a>

        {/* Navigation */}
        <nav
          className={`hidden md:flex items-center gap-1 rounded-full px-2 py-2 transition-all ${
            scrolled ? "glass" : ""
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </motion.header>
  );
}
