import { motion } from "framer-motion";
import { Instagram, Youtube, Heart, ChevronUp } from "lucide-react";
import { COMPANY_INFO } from "@/constants/data";
import logo from "@/assets/logo.png";

const FOOTER_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Filmography", href: "#films" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-cinema-darker overflow-hidden">
      {/* Top teal-gold divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-rudra-500/60 to-transparent" />
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mt-px" />

      {/* Ambient glow */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-48 rounded-full bg-rudra-500 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-32 rounded-full bg-gold-500 blur-[80px]" />
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Rudra Creations" className="h-20 w-20 object-contain" />
              <div>
                <span className="font-cinzel font-bold text-white text-base tracking-widest block">
                  RUDRA
                </span>
                <span
                  className="font-inter text-[9px] tracking-[0.35em] uppercase"
                  style={{
                    background: "linear-gradient(90deg,#00D4E8,#D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CREATIONS
                </span>
              </div>
            </div>
            <p className="font-playfair italic text-cinema-text-muted text-base mb-4 leading-relaxed">
              "Crafting Stories that Inspire"
            </p>
            <p className="font-inter text-cinema-text-muted text-xs leading-relaxed">
              A premier Telugu film production house based in Nanakramguda, Hyderabad. Founded by
              Deepak with a vision to elevate Telugu cinema on the world stage.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-cinzel text-rudra-400 text-xs tracking-[0.3em] uppercase mb-6">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => navTo(link.href)}
                  className="font-inter text-cinema-text-muted text-sm hover:text-rudra-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-cinzel text-rudra-400 text-xs tracking-[0.3em] uppercase mb-6">
              Connect With Us
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-cinema-gray-mid hover:border-rudra-500 flex items-center justify-center text-cinema-text-muted hover:text-rudra-400 transition-all duration-300 hover:bg-rudra-500/10"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={COMPANY_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-cinema-gray-mid hover:border-crimson-500 flex items-center justify-center text-cinema-text-muted hover:text-crimson-400 transition-all duration-300 hover:bg-crimson-600/5"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-inter text-[10px] text-cinema-text-muted tracking-widest uppercase">
                Location
              </p>
              <p className="font-inter text-cinema-text-muted text-sm leading-relaxed">
                {COMPANY_INFO.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-cinema-text-muted text-xs tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} Rudra Creations. All Rights Reserved. Founded by{" "}
            <span className="text-gold-500">Deepak</span>.
          </p>

          <div className="flex items-center gap-1 font-inter text-cinema-text-muted text-xs">
            Made with <Heart size={11} className="text-crimson-500 mx-1" fill="currentColor" /> in
            Hyderabad
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="w-10 h-10 border border-rudra-500/30 hover:border-rudra-500 flex items-center justify-center text-cinema-text-muted hover:text-rudra-400 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
