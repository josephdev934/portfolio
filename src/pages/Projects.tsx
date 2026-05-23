import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/portfolio";

const filters: ("All" | ProjectCategory)[] = ["All", "Fullstack", "AI Platform", "Web Apps", "Frontend"];

const Projects = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />

      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-body text-lg mb-10">Systems I've designed, built, and shipped.</p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === f
                    ? "bg-primary/15 border border-primary/40 text-foreground"
                    : "glass text-body hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link to={`/projects/${project.slug}`} className="block glass-hover p-6 h-full group">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[hsl(var(--glass-border))] bg-black/20 mb-5">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[11px] font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-md">{project.category}</span>
                      <div className="flex gap-2">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground"><Github size={16} /></a>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-foreground"><ExternalLink size={16} /></a>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-body mb-3 leading-relaxed">{project.description}</p>
                    <div className="text-xs text-muted-foreground italic mb-4">→ {project.impact}</div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="text-xs text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      View architecture <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
