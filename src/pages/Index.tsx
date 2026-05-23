import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Code, Database, Cpu, Server, Shield, Layers, Sparkles, Download } from "lucide-react";
import { projects } from "@/data/portfolio";
import ArchDiagram from "@/components/ArchDiagram";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stats = [
  { value: "40+", label: "Projects Delivered" },
  { value: "15+", label: "AI Integrations Built" },
  { value: "8+", label: "Production Systems" },
  { value: "20+", label: "Technologies Mastered" },
];

const techStack = [
  { name: "React", icon: Code, category: "Frontend" },
  { name: "Next.js", icon: Layers, category: "Frontend" },
  { name: "TypeScript", icon: Code, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Express", icon: Server, category: "Backend" },
  { name: "FastAPI", icon: Server, category: "Backend" },
  { name: "OpenAI", icon: Sparkles, category: "AI/ML" },
  { name: "Pinecone", icon: Cpu, category: "AI/ML" },
  { name: "PostgreSQL", icon: Database, category: "Databases" },
  { name: "MongoDB", icon: Database, category: "Databases" },
  { name: "Redis", icon: Database, category: "Databases" },
  { name: "JWT", icon: Shield, category: "Auth" },
  { name: "OAuth 2.0", icon: Shield, category: "Auth" },
];

const Index = () => {
  const featured = projects.slice(0, 3);
  const teaserProject = projects[0];

  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />

      {/* Hero */}
      <section className="section-padding min-h-[92vh] flex flex-col items-center justify-center text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 text-xs font-medium text-body mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Fullstack Engineer · Open to opportunities
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            Fullstack Engineer.
            <br />
            <span className="gradient-text">Crafting mondern web plafrorms </span>
            <br />
            and AI-automated systems
          </h1>

          <p className="text-lg md:text-xl text-body max-w-2xl mx-auto mb-10 leading-relaxed">
            From backend architecture to AI-driven workflows-i craft seamless interfaces that eliminate friction 
            <br className="hidden md:block" />
            and scale ideas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projects" className="gradient-btn flex items-center gap-2">
              View My Work <ArrowRight size={18} />
            </Link>
            <a href="/Joseph_Akujieze_Resume.pdf" download className="glass-btn flex items-center gap-2">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </motion.div>
      </section>

      {/* Stats 
      <section className="section-padding py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-hover p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
      */}

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Projects</h2>
              <p className="text-body">Systems I've designed, built, and shipped to production.</p>
            </div>
            <Link to="/projects" className="text-sm text-accent hover:text-foreground transition-colors flex items-center gap-1">
              All projects <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <motion.div key={p.slug} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/projects/${p.slug}`} className="block glass-hover p-6 h-full group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[hsl(var(--glass-border))] bg-black/20 mb-5">
                    <img
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-md">{p.category}</span>
                    <div className="flex gap-2">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground"><Github size={14} /></a>
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground"><ExternalLink size={14} /></a>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-body mb-4 leading-relaxed">{p.description}</p>
                  <div className="text-xs text-muted-foreground mb-4 italic">→ {p.impact}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Thinking Teaser */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-8">
            <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">System thinking</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Architecture is the product.</h2>
            <p className="text-body max-w-2xl">
              Every project ships with a layered architecture breakdown — click through the layers
              to see the engineering decisions behind the UI.
            </p>
          </motion.div>

          <ArchDiagram layers={teaserProject.architecture} />

          <div className="mt-6">
            <Link to={`/projects/${teaserProject.slug}`} className="text-sm text-accent hover:text-foreground inline-flex items-center gap-1">
              See the full architecture breakdown <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Technology Stack</h2>
            <p className="text-body">The tools I reach for daily — across frontend, backend, AI, and data.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-hover p-4 text-center"
              >
                <tech.icon className="mx-auto mb-2 text-accent" size={22} />
                <div className="text-xs font-medium text-foreground">{tech.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
