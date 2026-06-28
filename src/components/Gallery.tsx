import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/data/gallery";
type GalleryProps = {
  featured?: boolean;
};

export function Gallery({ featured = false }: GalleryProps) {
  const [open, setOpen] = useState<string | null>(null);

  const images = featured ? galleryImages.slice(0, 6) : galleryImages;

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl font-serif">
          Graphite <em className="text-gradient-gold italic">Gallery</em>
        </h1>

        <p className="mx-auto mt-6 mb-12 max-w-2xl text-muted-foreground leading-8">
          Sketching is where I slow down and refine observation, patience, and precision. These
          qualities influence how I approach software engineering.
        </p>
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px] md:gap-4">
        {images.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => setOpen(g.src)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border border-border ${g.span}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute bottom-5 left-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <h3 className="text-lg font-serif text-white">{g.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {featured && (
        <div className="mt-12 text-center">
          <a
            href="/gallery"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 transition hover:border-accent hover:text-accent"
          >
            View Complete Gallery →
          </a>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setOpen(null)}
              className="glass absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              src={open}
              className="max-h-[88vh] max-w-[88vw] rounded-2xl object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
