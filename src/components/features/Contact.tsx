import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Send, MessageCircle, CheckCircle, Mail, MapPin, AlertCircle, Phone } from "lucide-react";
import { COMPANY_INFO } from "@/constants/data";
import type { ContactFormData } from "@/types";

const EMAILJS_SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID || "") as string;
const EMAILJS_TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "") as string;
const EMAILJS_PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "") as string;

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Contact Inquiry from ${data.fullName}`);
    const body = encodeURIComponent(
      `Name: ${data.fullName}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || "Not provided"}\n\n` +
      `Message:\n${data.message}`
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setEmailError(null);

    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY.includes("your_public_key_here")) {
      setEmailError("EmailJS is not fully configured. Please use 'Send via Email App' or WhatsApp.");
      setSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: data.fullName,
        from_email: data.email,
        phone: data.phone || "Not provided",
        message: data.message,
        to_email: COMPANY_INFO.email,
        reply_to: data.email,
      };

      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (emailResult.status !== 200) {
        throw new Error("Delivery failed");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setEmailError("Instant email delivery failed. Please use 'Send via Email App' or WhatsApp instead.");
      setSubmitting(false);
      return;
    }

    // Open WhatsApp
    const whatsappMsg = `Hello Rudra Creations,\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\nMessage:\n${data.message}`;
    const encodedMsg = encodeURIComponent(whatsappMsg);
    const waNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;
    window.open(waUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  const inputClass =
    "w-full bg-cinema-gray/50 border border-white/5 px-4 py-4 rounded-sm text-sm font-inter text-white placeholder:text-white/20 focus:outline-none focus:border-rudra-500/50 focus:bg-cinema-gray/80 transition-all duration-300";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 bg-cinema-black overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-rudra-700/20 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-700/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-rudra-500/30" />
            <span className="font-inter text-[11px] tracking-[0.6em] uppercase text-rudra-400 font-bold">
              Connect With Us
            </span>
            <div className="h-[1px] w-12 bg-rudra-500/30" />
          </div>
          <h2 className="font-sora text-4xl md:text-5xl lg:text-7xl text-white font-bold mb-8 tracking-tighter">
            Get In <span className="gold-text">Touch</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every great collaboration begins with a conversation. Reach out to discuss your next cinematic masterpiece.
          </p>
          <div className="section-divider w-40 mx-auto mt-10 opacity-30" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <div className="space-y-12">
              <div>
                <h3 className="font-sora text-2xl text-white font-bold mb-4">Rudra Creations</h3>
                <div className="h-[2px] w-12 bg-gradient-to-r from-rudra-500 to-gold-500 mb-8" />
                <p className="font-inter text-cinema-text-muted text-sm leading-relaxed mb-10 opacity-80">
                  Headquartered in Hyderabad's vibrant film district. We are dedicated to pioneering stories that resonate across boundaries.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: MapPin, label: "Studio Location", value: COMPANY_INFO.location, color: "text-rudra-400" },
                  { icon: MessageCircle, label: "Business WhatsApp", value: COMPANY_INFO.whatsapp, color: "text-[#25D366]" },
                  { icon: Mail, label: "Official Email", value: COMPANY_INFO.email, color: "text-gold-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white/5 border border-white/10 group-hover:border-rudra-500/50 transition-all duration-500 rounded-sm">
                      <Icon size={20} className={color} />
                    </div>
                    <div>
                      <p className="font-inter text-[10px] text-cinema-text-muted tracking-[0.2em] uppercase mb-1.5 opacity-60">
                        {label}
                      </p>
                      <p className="font-inter text-white text-sm font-medium tracking-wide">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp Link */}
              <div className="pt-10 border-t border-white/10">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Rudra%20Creations%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] px-6 py-4 hover:bg-[#25D366]/20 transition-all duration-300 font-inter text-[13px] tracking-widest uppercase font-bold rounded-sm shadow-[0_10px_30px_rgba(37,211,102,0.1)] group"
                >
                  <MessageCircle size={20} className="transition-transform group-hover:scale-110" />
                  Quick Chat
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="bg-cinema-gray/30 border border-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              {/* Subtle top gradient */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rudra-500/50 to-transparent" />
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-6"
                >
                  <div className="w-20 h-20 flex items-center justify-center bg-rudra-500/10 border border-rudra-500/30 rounded-full mb-4">
                    <CheckCircle size={40} className="text-rudra-400" />
                  </div>
                  <h3 className="font-sora text-3xl text-white font-bold">Message Received</h3>
                  <p className="font-inter text-cinema-text-muted text-base leading-relaxed max-w-sm opacity-80">
                    We've received your inquiry. A member of our production team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="gold-btn px-10 py-3.5 text-[11px] font-sora tracking-[0.2em] uppercase mt-4"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 px-6 py-4 bg-red-950/20 border border-red-500/30 text-red-400 text-sm font-inter rounded-sm"
                    >
                      <AlertCircle size={20} className="shrink-0" />
                      {emailError}
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                       <label className="font-inter text-[11px] tracking-[0.2em] text-white/60 uppercase font-bold block mb-3">
                        Full Name <span className="text-rudra-500">*</span>
                      </label>
                      <input {...register("fullName")} placeholder="T Gautam Leela Varma" className={inputClass} />
                      {errors.fullName && (
                        <p className="font-inter text-red-500 text-[11px] mt-2 font-medium tracking-wide uppercase">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="font-inter text-[11px] tracking-[0.2em] text-white/60 uppercase font-bold block mb-3">
                        Email Address <span className="text-rudra-500">*</span>
                      </label>
                      <input {...register("email")} type="email" placeholder="official@rudra.com" className={inputClass} />
                      {errors.email && (
                        <p className="font-inter text-red-500 text-[11px] mt-2 font-medium tracking-wide uppercase">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="font-inter text-[11px] tracking-[0.2em] text-white/60 uppercase font-bold block mb-3">
                        Phone Number
                      </label>
                      <input {...register("phone")} type="tel" placeholder="+91 XXXX XXX XXX" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="font-inter text-[11px] tracking-[0.2em] text-white/60 uppercase font-bold block mb-3">
                      Project Details <span className="text-rudra-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Share your vision or proposal with us..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && (
                      <p className="font-inter text-red-500 text-[11px] mt-2 font-medium tracking-wide uppercase">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="gold-btn flex items-center justify-center gap-4 px-10 py-5 font-sora text-[13px] font-bold tracking-[0.2em] uppercase flex-1 w-full disabled:opacity-60 transition-all group shadow-[0_15px_30px_rgba(212,175,55,0.15)] hover:shadow-gold-500/30"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          Submit Inquiry
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                       <a
                        href={generateMailtoLink(getValues())}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).href = generateMailtoLink(getValues()); }}
                        className="flex items-center justify-center gap-3 px-6 py-5 border border-white/10 text-white/60 hover:text-rudra-400 hover:border-rudra-500/50 hover:bg-white/5 transition-all duration-300 font-inter text-[11px] tracking-widest uppercase font-bold flex-1 sm:flex-initial"
                      >
                        <Mail size={16} />
                        Email
                      </a>
                      
                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Rudra%20Creations`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-5 border border-white/10 text-white/60 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-white/5 transition-all duration-300 font-inter text-[11px] tracking-widest uppercase font-bold flex-1 sm:flex-initial"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <p className="font-inter text-[10px] text-cinema-text-muted text-center tracking-[0.1em] opacity-40">
                    By submitting, you agree to our terms of cinematic collaboration.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
