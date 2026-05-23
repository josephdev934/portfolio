import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Cog, Database, Cpu, ChevronRight, BarChart2, Layers, PieChart, Briefcase, GitBranch, ShieldCheck, HardDrive, Zap } from "lucide-react";
import type { ArchLayer } from "@/data/portfolio";

const ICONS = {
  frontend: Monitor,
  api: Server,
  logic: Cog,
  database: Database,
  ai: Cpu,
  data: BarChart2,
  ui: Layers,
  charts: PieChart,
  portfolio: Briefcase,
  state: GitBranch,
  auth: ShieldCheck,
  backend: HardDrive,
  functions: Zap,
} as const;

const TINTS = {
  frontend: "from-indigo-500/20 to-indigo-500/5",
  api: "from-blue-500/20 to-blue-500/5",
  logic: "from-violet-500/20 to-violet-500/5",
  database: "from-emerald-500/20 to-emerald-500/5",
  ai: "from-cyan-500/20 to-cyan-500/5",
  data: "from-amber-500/20 to-amber-500/5",
  ui: "from-pink-500/20 to-pink-500/5",
  charts: "from-orange-500/20 to-orange-500/5",
  portfolio: "from-teal-500/20 to-teal-500/5",
  state: "from-yellow-500/20 to-yellow-500/5",
  auth: "from-red-500/20 to-red-500/5",
  backend: "from-green-500/20 to-green-500/5",
  functions: "from-purple-500/20 to-purple-500/5",
} as const;

export default function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
      <div className="space-y-3">
        {layers.map((layer, i) => {
          const Icon = ICONS[layer.key] || Cpu;
          const isActive = active === i;
          return (
            <motion.button
              key={layer.key}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`w-full text-left glass p-4 flex items-center gap-3 transition-all duration-300 ${
                isActive ? "border-primary/50 shadow-[0_0_30px_-6px_hsl(239_84%_67%/0.4)]" : "hover:border-[hsl(239_84%_67%/0.25)]"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${TINTS[layer.key]} border border-[hsl(var(--glass-border))] flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={isActive ? "text-primary" : "text-body"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">{layer.title}</div>
                <div className="text-xs text-muted-foreground truncate">{layer.summary}</div>
              </div>
              <ChevronRight size={14} className={`flex-shrink-0 transition-transform ${isActive ? "text-primary translate-x-0.5" : "text-muted-foreground"}`} />
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={active ?? "none"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="glass p-6 lg:sticky lg:top-24 h-fit"
      >
        {active !== null && layers[active] && (
          <>
            <div className="text-xs uppercase tracking-wider text-accent font-medium mb-2">
              Layer {active + 1} of {layers.length}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{layers[active].title}</h3>
            <p className="text-sm text-body leading-relaxed">{layers[active].details}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}
