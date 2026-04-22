import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Eye } from "lucide-react";
import { MOVIES } from "@/constants/data";
import type { Movie } from "@/types";
import ProjectModal from "./ProjectModal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

function MovieCard({ movie, onClick }: { movie: Movie; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Default overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Hover overlay with teal tint */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.75)" }}>
          {/* Teal radial glow */}
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(ellipse at center, #00D4E8 0%, transparent 60%)" }} />
          <div className="relative flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300"
              style={{ border: "2px solid #00D4E8", background: "rgba(0,212,232,0.15)" }}>
              <Play size={20} className="text-rudra-300" fill="currentColor" />
            </div>
            <span className="font-inter text-white text-xs tracking-widest uppercase">
              Watch Trailer
            </span>
          </div>
        </div>

        {/* Genre badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/70 border text-[9px] font-inter tracking-widest uppercase px-2 py-1"
            style={{ borderColor: "rgba(0,212,232,0.4)", color: "#00D4E8" }}>
            {movie.genre.split("/")[0].trim()}
          </span>
        </div>

        {/* View Details */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-white/10 border border-white/30 flex items-center justify-center">
            <Eye size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Info below */}
      <div className="bg-cinema-gray border border-cinema-gray-mid group-hover:border-rudra-500/30 transition-colors duration-300 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-cinzel text-white text-sm font-semibold group-hover:text-rudra-300 transition-colors">
              {movie.title}
            </h3>
            <p className="font-inter text-cinema-text-muted text-xs mt-1">
              {movie.year} · {movie.language}
            </p>
          </div>
          <span className="font-inter text-[10px] text-gold-400 tracking-wide uppercase border border-gold-500/30 px-2 py-0.5 mt-0.5">
            Released
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <section id="films" ref={ref} className="relative py-28 bg-cinema-black overflow-hidden">
      {/* Background — teal ambient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-rudra-500 blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-rudra-400 text-xs tracking-[0.4em] uppercase mb-4 block">
            Our Portfolio
          </span>
          <h2 className="section-heading font-cinzel text-4xl md:text-5xl text-white mb-5">
            <span className="gold-text">Filmography</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Six cinematic journeys. Each one a world of its own. Explore our released productions
            that have captivated audiences across Telangana and beyond.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-6">
          {MOVIES.map((movie, i) => (
            <motion.div
              key={movie.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </section>
  );
}
