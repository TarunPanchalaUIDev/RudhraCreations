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
      className="relative py-32 bg-cinema-black overflow-hidden"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,232,0.3), rgba(212,175,55,0.2), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-rudra-600 blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-600 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-rudra-400 shadow-[0_0_8px_rgba(0,212,232,0.6)]" />
            <span className="font-inter text-[11px] tracking-[0.5em] uppercase text-rudra-400 font-medium">
              Future Releases
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-rudra-400 shadow-[0_0_8px_rgba(0,212,232,0.6)]" />
          </div>
          <h2 className="font-sora text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 tracking-tight">
            Upcoming <span className="gold-text">Productions</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The cinematic landscape of Rudra Creations continues to evolve. Experience a sneak peek into the groundbreaking stories currently in production.
          </p>
          <div className="section-divider w-32 mx-auto mt-8 opacity-50" />
        </motion.div>

        {/* Upcoming Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UPCOMING_MOVIES.map((movie, i) => (
            <motion.div
              key={movie.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="bg-cinema-gray border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-rudra-500/30">
                {/* Poster Container */}
                <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[2/3] lg:aspect-[2/3]">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-rudra-500" />
                  
                  {/* Genre Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md border border-rudra-500/20 text-[10px] font-inter tracking-[0.2em] uppercase px-3 py-1.5 text-rudra-300">
                      {movie.genre.split("/")[0]}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-inter tracking-widest px-3 py-1.5 flex items-center gap-2">
                       <Clock size={12} className="text-rudra-400" />
                       {movie.year}
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="h-[2px] w-10 bg-gradient-to-r from-rudra-500 to-gold-500 mb-3" />
                    <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-rudra-400">
                      {movie.language}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-sora text-2xl text-white font-semibold mb-4 leading-tight group-hover:text-rudra-300 transition-colors">
                    {movie.title}
                  </h3>

                  <p className="font-inter text-cinema-text-muted text-sm leading-relaxed mb-8 line-clamp-3 opacity-80">
                    {movie.description}
                  </p>

                  <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-cinema-text-muted uppercase tracking-widest">Producer</span>
                      <span className="text-white text-xs font-medium">Rudra Creations</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-[10px] text-cinema-text-muted uppercase tracking-widest">Status</span>
                      <span className="text-gold-500 text-xs font-medium">In Production</span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-inter text-[11px] text-cinema-text-muted tracking-[0.2em] uppercase">
                        Progress
                      </span>
                      <span className="font-inter text-xs font-bold text-rudra-400">
                        {i === 0 ? "75%" : i === 1 ? "40%" : "15%"}
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: i === 0 ? "75%" : i === 1 ? "40%" : "15%" } : {}}
                        transition={{ delay: 0.8 + i * 0.2, duration: 1.5, ease: "circOut" }}
                        className="h-full"
                        style={{ background: "linear-gradient(90deg, #00D4E8, #D4AF37)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mt-24"
        >
          <p className="font-cinzel italic text-cinema-text-muted text-xl md:text-2xl opacity-40 hover:opacity-60 transition-opacity">
            "The magic of cinema is just beginning."
          </p>
          <div className="font-inter text-[10px] tracking-[0.5em] uppercase mt-4 text-rudra-500 font-semibold">
            — Rudra Creations
          </div>
        </motion.div>
      </div>
    </section>
  );
}
