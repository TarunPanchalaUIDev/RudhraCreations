import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { COMPANY_INFO } from "@/constants/data";

export default function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-cinema-darker py-20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,232,0.4), rgba(212,175,55,0.2), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6"
        >
          <div>
            <span className="font-inter text-xs tracking-[0.4em] uppercase mb-3 block" style={{ color: "#00D4E8" }}>
              Find Us
            </span>
            <h2 className="section-heading font-cinzel text-3xl md:text-4xl text-white">
              Our <span className="gold-text">Location</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center"
              style={{ background: "rgba(0,212,232,0.08)", border: "1px solid rgba(0,212,232,0.3)" }}>
              <MapPin size={18} style={{ color: "#00D4E8" }} />
            </div>
            <div>
              <p className="font-inter text-white text-sm font-medium">Rudra Creations</p>
              <p className="font-inter text-cinema-text-muted text-xs">{COMPANY_INFO.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          {/* Map Frame */}
          <div className="relative overflow-hidden"
            style={{ border: "1px solid rgba(0,212,232,0.2)" }}>
            {/* Teal corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 z-10"
              style={{ borderTop: "2px solid #00D4E8", borderLeft: "2px solid #00D4E8" }} />
            <div className="absolute top-0 right-0 w-8 h-8 z-10"
              style={{ borderTop: "2px solid #D4AF37", borderRight: "2px solid #D4AF37" }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 z-10"
              style={{ borderBottom: "2px solid #D4AF37", borderLeft: "2px solid #D4AF37" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 z-10"
              style={{ borderBottom: "2px solid #00D4E8", borderRight: "2px solid #00D4E8" }} />

            <iframe
              src={COMPANY_INFO.mapEmbedUrl}
              title="Rudra Creations Location — Nanakramguda, Hyderabad"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>

          {/* Get Directions */}
          <div className="flex justify-end mt-4">
            <a
              href="https://maps.google.com/?q=Nanakramguda,Hyderabad,Telangana,India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-sm transition-colors group px-5 py-2.5"
              style={{ color: "#00D4E8", border: "1px solid rgba(0,212,232,0.3)" }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00D4E8"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,212,232,0.05)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,212,232,0.3)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              <Navigation size={14} className="group-hover:translate-x-0.5 transition-transform" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
