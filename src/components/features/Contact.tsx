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
    // console.log("Form submitted:", data);

    // 1) Send email via EmailJS
    if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY.includes("your_public_key_here")) {
      setEmailError("EmailJS is not fully configured (Public Key missing). Please use 'Send via Email App' or WhatsApp.");
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

      // console.log("EmailJS result:", emailResult);

      if (emailResult.status !== 200) {
        throw new Error("Delivery failed");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setEmailError("Instant email delivery failed. Please use 'Send via Email App' or WhatsApp instead.");
      setSubmitting(false);
      return;
    }

    // 2) Open WhatsApp with pre-filled message
    const whatsappMsg = `Hello Rudhra Creations,\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\n\nMessage:\n${data.message}`;
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
    "input-cinema w-full px-4 py-3.5 rounded-none text-sm font-inter transition-all duration-300";

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 bg-cinema-black overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute inset-0 opacity-6 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-gold-600 blur-[180px]" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-crimson-700 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-inter text-gold-500 text-xs tracking-[0.4em] uppercase mb-4 block">
            Let's Collaborate
          </span>
          <h2 className="section-heading font-cinzel text-4xl md:text-5xl text-white mb-4">
            Get In <span className="gold-text">Touch</span>
          </h2>
          <p className="font-inter text-cinema-text-muted text-base max-w-xl mx-auto leading-relaxed mt-4">
            Have a story worth telling? A project to propose? A dream to produce? We'd love to
            hear from you.
          </p>
          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-cinzel text-white text-xl font-semibold mb-3">
                Rudhra Creations
              </h3>
              <div className="h-px w-10 bg-gold-500 mb-6" />
              <p className="font-inter text-cinema-text-muted text-sm leading-relaxed">
                Based in the heart of Hyderabad's film district — we are always open to new
                stories, partnerships, and creative collaborations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: COMPANY_INFO.location,
                  color: "text-gold-500",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: COMPANY_INFO.whatsapp,
                  color: "text-green-400",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: COMPANY_INFO.phone,
                  color: "text-blue-400",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: COMPANY_INFO.email,
                  color: "text-gold-500",
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 border border-cinema-gray-mid flex items-center justify-center shrink-0 ${color}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="font-inter text-[10px] text-cinema-text-muted tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    <p className="font-inter text-white text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Quick Link */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Rudhra%20Creations%2C%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-5 py-3 hover:bg-[#25D366]/20 transition-all duration-300 font-inter text-sm tracking-wide"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="cinema-card p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-5"
                >
                  <div className="w-16 h-16 border-2 border-gold-500 flex items-center justify-center">
                    <CheckCircle size={32} className="text-gold-500" />
                  </div>
                  <h3 className="font-cinzel text-white text-2xl">Message Sent!</h3>
                  <p className="font-inter text-cinema-text-muted text-sm leading-relaxed max-w-sm">
                    Your message has been emailed to us and WhatsApp has opened with a pre-filled
                    message. We'll get back to you shortly — thank you for reaching out!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="gold-btn px-6 py-2.5 text-xs font-cinzel tracking-widest mt-2"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Email error banner */}
                  {emailError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-crimson-900/30 border border-crimson-600/40 text-crimson-400 px-4 py-3 text-sm font-inter"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      {emailError}
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="font-inter text-[10px] tracking-widest text-cinema-text-muted uppercase block mb-2">
                        Full Name <span className="text-crimson-500">*</span>
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder="Your Full Name"
                        className={inputClass}
                      />
                      {errors.fullName && (
                        <p className="font-inter text-crimson-400 text-xs mt-1.5">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-inter text-[10px] tracking-widest text-cinema-text-muted uppercase block mb-2">
                        Email Address <span className="text-crimson-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                      {errors.email && (
                        <p className="font-inter text-crimson-400 text-xs mt-1.5">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="font-inter text-[10px] tracking-widest text-cinema-text-muted uppercase block mb-2">
                        Phone Number
                        <span className="text-cinema-text-muted ml-1">(optional)</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-inter text-[10px] tracking-widest text-cinema-text-muted uppercase block mb-2">
                      Your Message <span className="text-crimson-500">*</span>
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your project, idea, or inquiry..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && (
                      <p className="font-inter text-crimson-400 text-xs mt-1.5">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="gold-btn flex items-center justify-center gap-3 px-8 py-4 font-cinzel text-sm tracking-widest flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>

                    <a
                      href={generateMailtoLink(getValues())}
                      onMouseEnter={(e) => {
                        // Update the link just before the user clicks/hovers
                        (e.currentTarget as HTMLAnchorElement).href = generateMailtoLink(getValues());
                      }}
                      className="flex items-center justify-center gap-3 px-6 py-4 border border-gold-500/40 text-gold-500 hover:bg-gold-500/10 transition-all duration-300 font-inter text-sm tracking-wide"
                    >
                      <Mail size={16} />
                      Send via Email App
                    </a>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Rudhra%20Creations`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-4 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 font-inter text-sm tracking-wide flex-1"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>

                  <p className="font-inter text-[11px] text-cinema-text-muted text-center leading-relaxed">
                    If instant submission fails, use <strong>Send via Email App</strong> or <strong>WhatsApp</strong>.
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
