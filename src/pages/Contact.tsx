import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Mail, Loader2 } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch("https://formspree.io/f/mykvpglw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", company: "", message: "" });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        const errorMessage = data.errors 
          ? data.errors.map((err: any) => err.message).join(", ") 
          : (data.error || "Something went wrong. Please try again.");
        setError(errorMessage);
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />

      <section className="section-padding pt-28">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Have a project in mind? Let's build something great together.
            </p>
          </motion.div>

          <div className="mb-8 inline-flex items-center gap-2 glass px-4 py-1.5 text-xs font-medium text-body">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Open to fullstack / AI engineering roles
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="md:col-span-2 glass p-6 space-y-4"
            >
              <AnimatePresence mode="wait">
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                  >
                    Thank you! Your message has been sent successfully. I will get back to you soon.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={submitting}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full glass px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={submitting}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full glass px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Company</label>
                <input
                  type="text"
                  name="company"
                  disabled={submitting}
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full glass px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Project Description</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  disabled={submitting}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full glass px-4 py-2.5 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="gradient-btn flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
                  "Message Sent ✓"
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </motion.form>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <a href="https://github.com/josephdev934" target="_blank" rel="noopener noreferrer" className="glass-hover p-4 flex items-center gap-3 group">
                <Github size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <div className="text-sm font-medium">GitHub</div>
                  <div className="text-xs text-muted-foreground">View my code</div>
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="glass-hover p-4 flex items-center gap-3 group">
                <Linkedin size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <div className="text-sm font-medium">LinkedIn</div>
                  <div className="text-xs text-muted-foreground">Connect with me</div>
                </div>
              </a>
              <a href="mailto:akujiezejoseph@gmail.com" className="glass-hover p-4 flex items-center gap-3 group">
                <Mail size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-xs text-muted-foreground">akujiezejoseph@gmail.com</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
