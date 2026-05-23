import { motion } from "framer-motion";
import { Code, Cpu, Layers, Zap, Award, GitBranch, Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const expertise = [
  {
    icon: Code,
    title: "Fullstack Engineering",
    description: "End-to-end product engineering with type-safe contracts from DB to UI.",
    skills: ["React", "Next.js", "Node.js", "Express", "TypeScript"],
  },
  {
    icon: Cpu,
    title: "AI Systems & Automation",
    description: "LLM integration, RAG pipelines, vector search, and AI agents that ship to production.",
    skills: ["OpenAI", "LangChain", "Pinecone", "RAG", "Prompt Engineering"],
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Distributed systems, API design, schema modelling, auth, and observability.",
    skills: ["Microservices", "REST/GraphQL", "PostgreSQL", "Redis", "JWT/OAuth"],
  },
];

const timeline = [
  { year: "2026", role: "AI Automation Engineer", focus: "Zapier, n8n & Base 444", stack: "Zapier · n8n · Base 444" },
  { year: "2025", role: "Fullstack Engineer", focus: "Production APIs at scale", stack: "Node.js · Express · Redis · Postgres" },
  { year: "2024", role: "Frontend Engineer", focus: "Component systems ", stack: "React · TypeScript · Tailwind" },
];

const differentiators = [
  { icon: Layers, title: "System Design", text: "I think in layers and contracts before I touch a file." },
  { icon: Cpu, title: "AI Depth", text: "Real production AI — not just a wrapper around chat." },
  { icon: GitBranch, title: "Full Ownership", text: "Schema, API, UI, deploy. I own the product." },
  { icon: Zap, title: "Scalability", text: "Caching, rate limits, indexes — boring done right." },
];

const About = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />

      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-body text-lg max-w-xl">Engineer. Systems thinker. AI builder.</p>
          </motion.div>

          {/* Bio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-5">
              <p className="text-body leading-relaxed"> <span className="gradient-text font-semibold text-xl" >Hi im Joseph Akujieze</span> <br />
                A fullstack engineer who designs intelligent systems end-to-end —
                from PostgreSQL schemas, through Node and FastAPI services, all the way up to
                React interfaces with streaming AI inference.
              </p>
              <p className="text-body leading-relaxed">
                My focus is AI-driven automation workflows that streamline business operations,
                eliminate repetitive tasks, and scale efficiency.
              </p>
              <p className="text-body leading-relaxed">
                I value clean contracts, small surface areas, and code that can be deleted.
                The best architecture is the one your team can still reason about in 12 months.
              </p>
              <div className="pt-4">
                <a href="/Joseph_Akujieze_Resume.pdf" download className="gradient-btn inline-flex items-center gap-2">
                  <Download size={18} /> Download Resume
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="flex items-start justify-center w-full">
              <div className="group overflow-hidden rounded-2xl w-full max-w-[340px] md:max-w-[420px] aspect-[3/4] relative">
                <img
                  src="/joseph.jpg"
                  alt="Joseph Akujieze"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Expertise */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Core Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {expertise.map((item, i) => (
                <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-hover p-6">
                  <item.icon className="text-accent mb-4" size={28} />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-body mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Engineering Timeline</h2>
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <motion.div key={t.year} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-hover p-5 grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1fr] gap-4 items-center">
                  <div className="text-2xl font-bold gradient-text">{t.year}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.role}</div>
                    <div className="text-xs text-muted-foreground">{t.focus}</div>
                  </div>
                  <div className="text-xs text-body font-mono hidden md:block">{t.stack}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Differentiators */}
          <div>
            <div className="mb-8">
              <Award className="text-accent mb-3" size={28} />
              <h2 className="text-3xl font-bold mb-2">What I bring</h2>
              <p className="text-body">"Most engineers write code. I design systems."</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {differentiators.map((d, i) => (
                <motion.div key={d.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-hover p-5">
                  <d.icon className="text-accent mb-3" size={22} />
                  <h3 className="text-sm font-semibold mb-1">{d.title}</h3>
                  <p className="text-xs text-body leading-relaxed">{d.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
