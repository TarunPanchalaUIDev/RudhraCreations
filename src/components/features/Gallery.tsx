import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_IMAGES } from "@/constants/data";
import type { GalleryImage } from "@/types";

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" ref={ref} className="relative py-32 bg-cinema-black overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-rudra-700/20 blur-[150px]" />
        <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-gold-700/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-rudra-500/50" />
            <span className="font-inter text-[11px] tracking-[0.6em] uppercase text-rudra-400 font-bold">
              Production Still
            </span>
            <div className="h-px w-8 bg-rudra-500/50" />
          </div>
          <h2 className="font-sora text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 tracking-tight">
            The <span className="gold-text">Gallery</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Witness the meticulous craft behind every production. From set designs to candid moments, explor our visual journey through the lens.
          </p>
          <div className="section-divider w-32 mx-auto mt-8 opacity-40" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-sm"
              onClick={() => setLightbox(img)}
            >
              <div className="relative overflow-hidden bg-cinema-gray">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-all duration-1000 group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100 ${
                    img.span === "wide"
                      ? "h-56"
                      : img.span === "tall"
                      ? "h-80"
                      : "h-48"
                  }`}
                />

                {/* Hover UI */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60 backdrop-blur-[2px]">
                   {/* Radial Glow */}
                   <div className="absolute inset-0 opacity-30"
                    style={{ background: "radial-gradient(circle at center, #00D4E8 0%, transparent 70%)" }} />
                    
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full border border-rudra-500/50 flex items-center justify-center mb-4 bg-rudra-500/10"
                      >
                        <ZoomIn size={20} className="text-rudra-300" />
                      </motion.div>
                      <p className="font-sora text-white text-xs tracking-widest uppercase mb-1">View Scene</p>
                      <div className="h-px w-6 bg-gold-500" />
                   </div>
                </div>

                {/* Constant Caption Info (Minimal) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-inter text-white text-[10px] tracking-widest uppercase">{img.caption}</p>
                </div>

                {/* Border Frame */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-rudra-500/30 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

function LightboxModal({ image, onClose }: { image: GalleryImage | null; onClose: () => void; }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-16 right-0 sm:-right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-rudra-400 transition-all hover:rotate-90"
            >
              <X size={32} />
            </button>

            {/* Image Container */}
            <div className="relative group w-full bg-cinema-gray shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
              <img
                src={image.src.replace(/w=\d+&h=\d+/, "w=1600&h=1200")}
                alt={image.alt}
                className="w-full h-auto max-h-[80vh] object-contain block mx-auto"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                       <div className="h-px w-10 bg-rudra-500 mb-4" />
                       <h3 className="font-sora text-white text-2xl font-bold tracking-tight">{image.caption}</h3>
                       <p className="font-inter text-cinema-text-muted text-xs tracking-widest uppercase mt-2">Production Spotlight · Phase {image.id}</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2">
                       <span className="font-inter text-white text-[10px] tracking-[0.3em] uppercase">Rudra Originals</span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

