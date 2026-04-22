import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Film, Globe } from "lucide-react";
import type { Movie } from "@/types";

interface ProjectModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function ProjectModal({ movie, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [movie]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cinema-dark shadow-2xl"
            style={{ border: "1px solid rgba(0,212,232,0.25)" }}
          >
            {/* Top teal accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 z-10"
              style={{ background: "linear-gradient(90deg, transparent, #00D4E8, #D4AF37, transparent)" }} />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#00D4E8"; (e.currentTarget as HTMLButtonElement).style.color = "#00D4E8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-5 gap-0">
              {/* Poster */}
              <div className="md:col-span-2 relative overflow-hidden min-h-[280px]">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cinema-dark/60 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 flex flex-col gap-5">
                {/* Badge */}
                <div className="inline-flex">
                  <span className="text-[10px] font-inter tracking-widest uppercase px-3 py-1"
                    style={{ background: "rgba(0,212,232,0.1)", border: "1px solid rgba(0,212,232,0.3)", color: "#00D4E8" }}>
                    {movie.genre}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-cinzel text-3xl font-bold text-white mb-1">{movie.title}</h3>
                  <div className="h-px w-16 mt-3"
                    style={{ background: "linear-gradient(90deg, #00D4E8, #D4AF37)" }} />
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: "Year", value: movie.year, teal: true },
                    { icon: Globe, label: "Language", value: movie.language, teal: false },
                    { icon: User, label: "Director", value: movie.director, teal: true },
                    { icon: Film, label: "Cast", value: movie.cast, teal: false },
                  ].map(({ icon: Icon, label, value, teal }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon size={14} className={teal ? "text-rudra-400" : "text-gold-500"} style={{ marginTop: "2px", flexShrink: 0 }} />
                      <div>
                        <p className="font-inter text-[10px] text-cinema-text-muted tracking-widest uppercase">
                          {label}
                        </p>
                        <p className="font-inter text-white text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="font-inter text-cinema-text-muted text-sm leading-relaxed border-t border-white/10 pt-5">
                  {movie.description}
                </p>

                {/* YouTube Trailer */}
                {movie.youtubeId && (
                  <div className="relative w-full pt-[56.25%] bg-black"
                    style={{ border: "1px solid rgba(0,212,232,0.15)" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${movie.youtubeId}?rel=0&modestbranding=1`}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
