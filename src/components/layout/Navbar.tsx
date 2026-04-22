import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Films", href: "#films" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  // Prevent multiple active tabs: ensure only one is active at a time

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let foundSection = "";
      
      // Find the section closest to the top of the viewport
      let closestDistance = Infinity;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY - 120;
          
          // Check if section is in view (within viewport)
          if (rect.top <= 150 && rect.bottom > 150) {
            const distance = Math.abs(rect.top - 120);
            if (distance < closestDistance) {
              closestDistance = distance;
              foundSection = section;
            }
          }
        }
      }
      
      // Only update if we found a visible section
      if (foundSection) {
        setActiveSection(foundSection);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Set active section immediately for instant UI feedback
    setActiveSection(href.substring(1));
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-rudra-500/20 py-2 shadow-2xl"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 group active:scale-95 transition-transform"
          >
            <img
              src={logo}
              alt="Rudra Creations Logo"
              className={`object-contain transition-all duration-500 ${scrolled ? "h-12 w-12" : "h-16 w-16 hidden"
                } drop-shadow-[0_0_8px_rgba(0,212,232,0.3)]`}
            />
            <div className="hidden sm:block text-left sm:hidden lg:block">
              <span className="font-cinzel font-bold text-white text-[15px] tracking-widest block leading-none">
                RUDRA
              </span>
              <span
                className="font-inter text-[9px] tracking-[0.35em] uppercase block mt-1"
                style={{
                  background: "linear-gradient(90deg,#00D4E8,#D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CREATIONS
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${activeSection === link.href.substring(1) ? "active" : ""
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-[11px] font-cinzel tracking-[0.2em] uppercase border border-rudra-500/50 text-white hover:bg-rudra-500/10 hover:border-rudra-400 transition-all duration-300 relative overflow-hidden group shadow-[0_0_15px_rgba(0,212,232,0.1)]"
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rudra-600/20 to-gold-600/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-rudra-400 transition-colors p-2 glass-card rounded-full border-white/5"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-black/95 backdrop-blur-2xl p-10 flex flex-col items-center justify-center gap-10 md:hidden border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-rudra-500/30 to-transparent" />

              <div className="text-center">
                <img
                  src={logo}
                  alt="Rudra Creations"
                  className="h-20 w-20 object-contain mx-auto mb-4 drop-shadow-[0_0_15px_rgba(0,212,232,0.4)]"
                />
                <h4 className="font-cinzel text-white text-[10px] tracking-[0.4em] uppercase opacity-60">
                  Rudra Creations
                </h4>
              </div>

              <div className="flex flex-col items-center gap-6 w-full">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-cinzel text-xl tracking-[0.2em] text-white transition-all duration-300 flex flex-col items-center group ${activeSection === link.href.substring(1)
                      ? "text-rudra-400"
                      : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    <span className="uppercase">{link.label}</span>
                    <div
                      className={`h-px bg-gradient-to-r from-rudra-500 to-gold-500 transition-all duration-300 mt-1 ${activeSection === link.href.substring(1)
                        ? "w-12"
                        : "w-0 group-hover:w-8"
                        }`}
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavClick("#contact")}
                className="gold-btn w-full py-4 px-6 text-[11px] uppercase tracking-[0.3em] font-cinzel mt-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Get In Touch
              </motion.button>

              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

