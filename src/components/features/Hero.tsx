import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, Clapperboard } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import shivaEye from "@/assets/shiva-eye.png";

const SLIDES = [
  {
    image: heroBg,
    tagline: "Crafting Stories that Inspire",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop&auto=format",
    tagline: "Where Vision Meets the Silver Screen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop&auto=format",
    tagline: "Every Frame, a Masterpiece",
  },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  isTeal: i % 3 === 0,
  size: Math.random() > 0.7 ? 2 : 1,
}));

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px] overflow-hidden flex items-center justify-center"
    >
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[currentSlide].image}
            alt="Rudra Creations Hero"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer cinematic overlay */}
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
          {/* Teal ambient */}
          <div
            className="absolute inset-0 opacity-12"
            style={{
              background:
                "radial-gradient(ellipse at 65% 25%, rgba(0,212,232,0.25) 0%, transparent 55%)",
            }}
          />
          {/* Gold ambient from bottom */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(ellipse at 30% 90%, rgba(212,175,55,0.3) 0%, transparent 50%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.isTeal ? "bg-rudra-400" : "bg-gold-500"}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [-12, 12, -12], opacity: [0.1, 0.55, 0.1] }}
            transition={{ delay: p.delay, duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Top/bottom cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Vertical slide indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-px bg-gradient-to-b from-transparent to-rudra-500"
        />
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 ${i === currentSlide ? "scale-150" : ""
              }`}
            style={{
              width: i === currentSlide ? 8 : 6,
              height: i === currentSlide ? 8 : 6,
              borderRadius: "50%",
              background: i === currentSlide ? "#00D4E8" : "rgba(255,255,255,0.25)",
              boxShadow: i === currentSlide ? "0 0 8px rgba(0,212,232,0.6)" : "none",
            }}
          />
        ))}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-px bg-gradient-to-t from-transparent to-rudra-500"
        />
      </div>

      {/* Right side slide counter */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-20">
        <span className="font-cinzel text-rudra-400 text-xs">0{currentSlide + 1}</span>
        <div className="w-px h-12 bg-cinema-gray-mid" />
        <span className="font-cinzel text-cinema-text-muted text-xs">0{SLIDES.length}</span>
      </div>

      {/* ── MAIN CONTENT LAYOUT ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">

        {/* Left / Center — Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="flex justify-center mb-4 lg:hidden"
          >
            <img
              src={logo}
              alt="Rudra Creations"
              className="h-28 w-28 md:h-36 md:w-36 object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 24px rgba(0,212,232,0.5)) drop-shadow(0 0 50px rgba(212,175,55,0.25))",
              }}
            />
          </motion.div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="h-px w-10" style={{ background: "#00D4E8" }} />
            <span
              className="font-inter text-xs tracking-[0.4em] uppercase"
              style={{ color: "#00D4E8" }}
            >
              Since 2018 · Hyderabad
            </span>
            <div className="h-px w-10" style={{ background: "#00D4E8" }} />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
            className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-wide mb-3"
          >
            <span className="gold-text">RUDRA</span>
            <br />
            <span className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.45em] mt-1 block">
              CREATIONS
            </span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="h-px my-5 self-center lg:self-start"
            style={{
              width: "240px",
              background:
                "linear-gradient(90deg, transparent, #00D4E8, #D4AF37, #00D4E8, transparent)",
            }}
          />

          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="font-playfair italic text-xl md:text-2xl text-white/85 mb-8 max-w-lg"
            >
              "{SLIDES[currentSlide].tagline}"
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          >
            <button
              onClick={() =>
                document.querySelector("#films")?.scrollIntoView({ behavior: "smooth" })
              }
              className="gold-btn flex items-center gap-3 px-8 py-4 font-cinzel text-sm tracking-widest"
            >
              <Play size={15} fill="currentColor" />
              View Our Films
            </button>
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-3 px-8 py-4 font-cinzel text-sm tracking-widest transition-all duration-300 group"
              style={{ borderColor: "#00D4E8", border: "2px solid #00D4E8", color: "#00D4E8", background: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#00D4E8";
                (e.currentTarget as HTMLButtonElement).style.color = "#000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#00D4E8";
              }}
            >
              <Clapperboard size={15} />
              Work With Us
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex gap-8 mt-10 pt-8 border-t border-white/10"
          >
            {[
              { num: "6+", label: "Films" },
              { num: "12+", label: "Awards" },
              { num: "7 Yrs", label: "Legacy" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="font-cinzel text-xl font-bold gold-text">{num}</p>
                <p
                  className="font-inter text-[10px] tracking-widest uppercase mt-0.5"
                  style={{ color: "rgba(160,160,160,0.7)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Shiva Eye artwork (no-bg PNG, desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.4, ease: "easeOut" }}
          className="hidden lg:flex flex-1 justify-end items-center relative"
          style={{ maxWidth: 520 }}
        >
          {/* Glow behind the artwork */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(0,212,232,0.18) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <motion.img
            src={shivaEye}
            alt="Rudra — The Divine Eye"
            className="relative w-full max-w-[480px] object-contain"
            style={{
              filter:
                "drop-shadow(0 0 40px rgba(0,212,232,0.35)) drop-shadow(0 0 80px rgba(0,212,232,0.15))",
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating teal ring accent */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,232,0.25) 0%, transparent 70%)" }}
            animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.8, 1.1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Mobile Shiva Eye — smaller, centered behind text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center lg:hidden pointer-events-none"
        >
          <img
            src={shivaEye}
            alt=""
            aria-hidden
            className="w-72 h-72 object-contain"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,212,232,0.5))" }}
          />
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-rudra-400 transition-colors"
      >
        <span className="font-inter text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={17} />
        </motion.div>
      </motion.button>
    </section>
  );
}
