import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

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

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  isTeal: i % 3 === 0,
}));

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[currentSlide].image}
            alt="Rudra Creations Hero"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay with teal tint */}
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          {/* Teal ambient */}
          <div className="absolute inset-0 opacity-10"
            style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(0,212,232,0.3) 0%, transparent 60%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Particles — alternating gold and teal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute w-1 h-1 rounded-full ${p.isTeal ? "bg-rudra-400" : "bg-gold-500"} opacity-30`}
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic Lines */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

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
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "bg-rudra-400 scale-125" : "bg-white/30"
            }`}
          />
        ))}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-px bg-gradient-to-t from-transparent to-rudra-500"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-4"
        >
          <img
            src={logo}
            alt="Rudra Creations"
            className="h-40 w-40 md:h-48 md:w-48 object-contain drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,212,232,0.4)) drop-shadow(0 0 60px rgba(212,175,55,0.2))" }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="inline-flex items-center gap-3 mb-5"
        >
          <div className="h-px w-12 bg-rudra-500" />
          <span className="font-inter text-rudra-400 text-xs tracking-[0.4em] uppercase">
            Since 2018 · Hyderabad
          </span>
          <div className="h-px w-12 bg-rudra-500" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-wide"
        >
          <span className="gold-text">RUDRA</span>
          <br />
          <span className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.4em]">
            CREATIONS
          </span>
        </motion.h1>

        {/* Decorative Line — teal to gold */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="w-64 h-px mx-auto my-5"
          style={{ background: "linear-gradient(90deg, transparent, #00D4E8, #D4AF37, #00D4E8, transparent)" }}
        />

        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="font-playfair italic text-xl md:text-2xl lg:text-3xl text-white/90 mb-10"
          >
            "{SLIDES[currentSlide].tagline}"
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.querySelector("#films")?.scrollIntoView({ behavior: "smooth" })}
            className="gold-btn flex items-center gap-3 px-8 py-4 font-cinzel text-sm tracking-widest"
          >
            <Play size={16} fill="currentColor" />
            View Our Films
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 px-8 py-4 font-cinzel text-sm tracking-widest border-2 text-rudra-400 hover:text-black transition-all duration-300 group"
            style={{ borderColor: "#00D4E8", background: "transparent" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#00D4E8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            Work With Us
          </button>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-rudra-400 transition-colors group"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
