import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Check, Lightbulb, Zap } from "lucide-react";
import { projects } from "@/data/portfolio";
import ArchDiagram from "@/components/ArchDiagram";
import APIPlayground from "@/components/APIPlayground";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-padding pt-28 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 spotlight pointer-events-none" />

      <section className="section-padding pt-28">
        <div className="max-w-5xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <span className="text-[11px] font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-md">{project.category}</span>
              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="glass-btn !py-2 !px-4 text-sm flex items-center gap-2">
                  <Github size={14} /> GitHub
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="gradient-btn !py-2 !px-4 text-sm flex items-center gap-2">
                  <ExternalLink size={14} /> Live Demo
                </a>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-body text-lg mb-8 leading-relaxed">{project.longDescription}</p>

            {project.image && (
              <div className="relative mb-12 rounded-xl overflow-hidden glass p-2.5 border border-white/10 shadow-2xl group/image">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur opacity-30 group-hover/image:opacity-50 transition duration-1000 group-hover/image:duration-200" />
                <div className="relative bg-background/50 rounded-lg overflow-hidden border border-white/5">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full aspect-[16/10] md:aspect-[16/9] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="glass p-5">
              <div className="text-[11px] uppercase tracking-wider text-accent font-medium mb-2">Problem</div>
              <p className="text-sm text-body">{project.problem}</p>
            </div>
            <div className="glass p-5">
              <div className="text-[11px] uppercase tracking-wider text-accent font-medium mb-2">Solution</div>
              <p className="text-sm text-body">{project.solution}</p>
            </div>
            <div className="glass p-5">
              <div className="text-[11px] uppercase tracking-wider text-accent font-medium mb-2">Impact</div>
              <p className="text-sm text-body">{project.impact}</p>
            </div>
          </div>

          {/* Architecture */}
          <div className="mb-14">
            <div className="mb-6">
              <div className="text-[11px] uppercase tracking-wider text-accent font-medium mb-2">System architecture</div>
              <h2 className="text-2xl md:text-3xl font-bold">Click any layer to explore the engineering.</h2>
            </div>
            <ArchDiagram layers={project.architecture} />
          </div>

          {/* API Playground */}
          {project.hasPlayground && (
            <div className="mb-14">
              <div className="mb-6 flex items-center gap-2">
                <Zap size={18} className="text-accent" />
                <h2 className="text-2xl md:text-3xl font-bold">Live API Playground</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Demo endpoints with simulated responses — same shape as production.
              </p>
              <APIPlayground />
            </div>
          )}

          {/* Features */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-5">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <div key={f} className="glass p-4 text-sm flex items-start gap-3">
                  <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-body">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-5">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-[hsl(var(--glass-border))]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges + Lessons */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div>
              <h2 className="text-xl font-bold mb-4">Engineering Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="glass p-3 text-sm text-body flex gap-2">
                    <span className="text-accent">→</span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-accent" /> Lessons Learned
              </h2>
              <ul className="space-y-2">
                {project.lessons.map((l, i) => (
                  <li key={i} className="glass p-3 text-sm text-body">
                    “{l}”
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
