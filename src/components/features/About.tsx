import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Film, Users, Star } from "lucide-react";
import founderImg from "@/assets/founder.jpg";

const STATS = [
  { icon: Film, value: "6+", label: "Films Produced" },
  { icon: Award, value: "12+", label: "Awards Won" },
  { icon: Users, value: "500+", label: "Crew Members" },
  { icon: Star, value: "7 Yrs", label: "Of Excellence" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-28 bg-cinema-dark overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-rudra-500 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-600 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <span className="font-inter text-rudra-400 text-xs tracking-[0.4em] uppercase mb-4 block">
            Our Story
          </span>
          <h2 className="section-heading font-cinzel text-4xl md:text-5xl text-white mb-5">
            About <span className="gold-text">Rudra Creations</span>
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Founder Image */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative group">
              {/* Decorative frame — teal + gold */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-rudra-500/30 z-0" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 z-0" />

              <div className="relative z-10 overflow-hidden">
                <img
                  src={founderImg}
                  alt="Deepak — Founder of Rudra Creations"
                  className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                {/* Teal glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 80%, #00D4E8 0%, transparent 60%)" }} />

                {/* Founder Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-px w-12 mb-3"
                    style={{ background: "linear-gradient(90deg,#00D4E8,#D4AF37)" }} />
                  <p className="font-cinzel text-white text-xl font-bold">Deepak</p>
                  <p className="font-inter text-rudra-400 text-xs tracking-widest uppercase">
                    Founder & Director
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <div className="space-y-8">
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <h3 className="font-playfair text-2xl md:text-3xl text-white mb-5 leading-relaxed">
                A Production House Born from{" "}
                <span className="text-rudra-400 italic">Passion</span> for Cinema
              </h3>
              <p className="font-inter text-cinema-text-muted text-base leading-[1.9] mb-5">
                Founded by <strong className="text-white">Deepak</strong> in 2018,{" "}
                <strong className="text-gold-500">Rudra Creations</strong> emerged from a dream — to
                tell Telugu stories with the grandeur they deserve. Based in the vibrant city of
                Hyderabad at <span className="text-rudra-400">Nanakramguda</span>, we have grown from
                a passionate team of filmmakers into one of Tollywood's most promising production
                houses.
              </p>
              <p className="font-inter text-cinema-text-muted text-base leading-[1.9]">
                Each film we produce is more than entertainment — it's a cultural statement. We
                believe in stories that transcend barriers, touch hearts, and leave a lasting
                imprint on the audience's soul. From action epics to intimate dramas, our portfolio
                reflects the rich tapestry of Telugu life and heritage.
              </p>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-5"
            >
              {[
                {
                  title: "Our Vision",
                  text: "To be the benchmark of Telugu cinematic excellence — producing films that compete on the world stage while staying rooted in our culture.",
                  color: "border-rudra-500",
                  accent: "text-rudra-400",
                },
                {
                  title: "Our Mission",
                  text: "To nurture authentic stories, empower creative talent, and deliver cinematic experiences that resonate with every Telugu heart.",
                  color: "border-gold-500",
                  accent: "text-gold-500",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`glass-card p-5 border-l-2 ${item.color} rounded-sm`}
                >
                  <h4 className={`font-cinzel text-sm tracking-widest uppercase ${item.accent} mb-3`}>
                    {item.title}
                  </h4>
                  <p className="font-inter text-cinema-text-muted text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className="cinema-card p-8 text-center group cursor-default"
            >
              <div className={`w-12 h-12 border flex items-center justify-center mx-auto mb-5 transition-all duration-300 ${
                i % 2 === 0
                  ? "border-rudra-500/30 group-hover:border-rudra-500 group-hover:bg-rudra-500/5"
                  : "border-gold-500/30 group-hover:border-gold-500 group-hover:bg-gold-500/5"
              }`}>
                <Icon size={22} className={i % 2 === 0 ? "text-rudra-400" : "text-gold-500"} />
              </div>
              <p className="font-cinzel text-4xl font-black gold-text mb-2">{value}</p>
              <p className="font-inter text-cinema-text-muted text-xs tracking-widest uppercase">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
