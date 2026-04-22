import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Calendar, Clapperboard } from "lucide-react";
import { UPCOMING_MOVIES } from "@/constants/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function UpcomingProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="upcoming"
      ref={ref}
      className="relative py-28 bg-cinema-darker overflow-hidden"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,232,0.5), rgba(212,175,55,0.3), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-6 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rudra-600 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gold-600 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00D4E8" }} />
            <span className="font-inter text-xs tracking-[0.4em] uppercase" style={{ color: "#00D4E8" }}>
              Coming Soon
            </span>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00D4E8" }} />
          </div>
          <h2 className="section-heading font-cinzel text-4xl md:text-5xl text-white mb-4">
            Upcoming <span className="gold-text">Productions</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base max-w-xl mx-auto leading-relaxed mt-4">
            The next chapter of Rudra Creations is being written. Here's a glimpse of what's
            coming to the silver screen.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Upcoming Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {UPCOMING_MOVIES.map((movie, i) => (
            <motion.div
              key={movie.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group relative overflow-hidden"
            >
              <div className="cinema-card overflow-hidden h-full">
                {/* Poster */}
                <div className="relative overflow-hidden h-[340px]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker via-black/30 to-transparent" />
                  {/* Teal glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at 50% 80%, #00D4E8 0%, transparent 60%)" }} />

                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="text-white text-[9px] font-cinzel tracking-widest uppercase px-3 py-1.5 flex items-center gap-1.5"
                      style={{ background: "rgba(0,212,232,0.2)", border: "1px solid rgba(0,212,232,0.5)", color: "#00D4E8" }}>
                      <Clock size={10} />
                      {movie.year}
                    </div>
                  </div>

                  {/* Cinematic overlay text */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-px w-8 mb-3"
                      style={{ background: "linear-gradient(90deg,#00D4E8,#D4AF37)" }} />
                    <span className="font-inter text-[10px] tracking-widest uppercase" style={{ color: "#00D4E8" }}>
                      {movie.genre}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-cinzel text-xl text-white font-bold mb-3 group-hover:text-rudra-300 transition-colors leading-tight">
                    {movie.title}
                  </h3>

                  <p className="font-inter text-cinema-text-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {movie.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cinema-text-muted">
                      <Calendar size={12} className="text-rudra-400" />
                      <span className="font-inter text-xs">{movie.language}</span>
                    </div>
                    <div className="flex items-center gap-2 text-cinema-text-muted">
                      <Clapperboard size={12} className="text-gold-500" />
                      <span className="font-inter text-xs">{movie.director}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-inter text-[10px] text-cinema-text-muted tracking-widest uppercase">
                        Production
                      </span>
                      <span className="font-inter text-[10px]" style={{ color: "#00D4E8" }}>
                        {i === 0 ? "75%" : i === 1 ? "40%" : "15%"}
                      </span>
                    </div>
                    <div className="h-0.5 bg-cinema-gray-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: i === 0 ? "75%" : i === 1 ? "40%" : "15%" } : {}}
                        transition={{ delay: 0.5 + i * 0.2, duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #00D4E8, #D4AF37)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tease footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center mt-14"
        >
          <p className="font-playfair italic text-cinema-text-muted text-lg">
            "The greatest stories are yet to be told."
          </p>
          <div className="font-inter text-[10px] tracking-[0.4em] uppercase mt-2" style={{ color: "#00D4E8" }}>
            — Rudra Creations
          </div>
        </motion.div>
      </div>
    </section>
  );
}
