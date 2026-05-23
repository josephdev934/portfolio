import { motion } from "framer-motion";
import { Code, Server, Cpu, Layout } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: Code,
    title: "Fullstack Web Development",
    description: "Custom web applications, responsive UI, REST APIs — from prototype to production.",
    deliverables: ["Type-safe end-to-end", "Auth + RBAC", "Testing + CI"],
  },
  {
    icon: Cpu,
    title: "AI Platform Development",
    description: "LLM integrations, RAG systems, AI-powered features, and intelligent automation.",
    deliverables: ["RAG pipelines", "Vector search", "Streaming + tool calling", "Cost & rate controls"],
  },
  {
    icon: Server,
    title: "Backend & API Architecture",
    description: "Node.js / FastAPI services, schema design, auth systems, and performance work.",
    deliverables: ["REST or GraphQL", "Caching + rate limits", "Observability", "OpenAPI docs"],
  },
  {
    icon: Layout,
    title: "Frontend Engineering",
    description: "React / Next.js interfaces, design systems, real-time UX, and performance.",
    deliverables: ["Component libraries", "Streaming UIs", "A11y + perf budgets"],
  },
];

const Services = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Services</span>
            </h1>
            <p className="text-body text-lg mb-12 max-w-2xl">
              Senior engineering services for teams shipping AI-powered web products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-hover p-6">
                <s.icon className="text-accent mb-4" size={30} />
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-body mb-4 leading-relaxed">{s.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.deliverables.map((d) => (
                    <span key={d} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-[hsl(var(--glass-border))]">
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
