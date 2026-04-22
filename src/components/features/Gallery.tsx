import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/constants/data";
import type { GalleryImage } from "@/types";

function LightboxModal({
  image,
  onClose,
}: {
  image: GalleryImage | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00D4E8"; (e.currentTarget as HTMLButtonElement).style.color = "#00D4E8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            >
              <X size={18} />
            </button>
            <img
              src={image.src.replace("w=400&h=400", "w=1200&h=800").replace("w=600&h=400", "w=1200&h=800").replace("w=400&h=500", "w=800&h=1000")}
              alt={image.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-cinzel text-white text-sm">{image.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" ref={ref} className="relative py-28 bg-cinema-dark overflow-hidden">
      {/* Teal ambient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-rudra-500 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-60 h-60 rounded-full bg-gold-500 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-xs tracking-[0.4em] uppercase mb-4 block" style={{ color: "#00D4E8" }}>
            Behind The Lens
          </span>
          <h2 className="section-heading font-cinzel text-4xl md:text-5xl text-white mb-4">
            The <span className="gold-text">Gallery</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base max-w-lg mx-auto leading-relaxed mt-4">
            A glimpse into the world behind the screen — where every frame begins before the camera
            rolls.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden"
              onClick={() => setLightbox(img)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    img.span === "wide"
                      ? "h-56"
                      : img.span === "tall"
                      ? "h-80"
                      : "h-48"
                  }`}
                />

                {/* Hover Overlay — teal tinted */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                  style={{ background: "rgba(0,20,30,0.75)" }}>
                  <div className="absolute inset-0 opacity-20"
                    style={{ background: "radial-gradient(ellipse at center, #00D4E8 0%, transparent 60%)" }} />
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center"
                      style={{ border: "1px solid #00D4E8" }}>
                      <ZoomIn size={16} style={{ color: "#00D4E8" }} />
                    </div>
                    <p className="font-inter text-white text-xs tracking-widest uppercase">
                      View
                    </p>
                  </div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-inter text-white text-xs tracking-wide">{img.caption}</p>
                </div>

                {/* Teal border reveal */}
                <div className="absolute inset-0 border opacity-0 group-hover:opacity-40 transition-opacity duration-400"
                  style={{ borderColor: "#00D4E8" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
