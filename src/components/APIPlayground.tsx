import { useState } from "react";
import { Play, Loader2 } from "lucide-react";

type Endpoint = {
  id: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  sample: () => Promise<unknown>;
};

const ENDPOINTS: Endpoint[] = [
  {
    id: "health",
    method: "GET",
    path: "/api/health",
    description: "Liveness probe — returns service status and uptime.",
    sample: async () => ({
      status: "ok",
      uptime_seconds: Math.floor(Math.random() * 100000) + 12000,
      version: "1.4.2",
      timestamp: new Date().toISOString(),
    }),
  },
  {
    id: "review",
    method: "POST",
    path: "/api/v1/review",
    description: "Submit a code snippet for AI analysis. Streams structured findings.",
    sample: async () => ({
      review_id: crypto.randomUUID(),
      language: "typescript",
      complexity_score: 7.2,
      issues: [
        { severity: "warning", line: 14, message: "Avoid mutating function parameters." },
        { severity: "info", line: 22, message: "Consider extracting this branch into a helper." },
      ],
      suggestions: ["Add input validation with zod before the loop."],
      tokens_used: 412,
    }),
  },
  {
    id: "rate",
    method: "GET",
    path: "/api/v1/rate-limit",
    description: "Inspect your current rate limit window.",
    sample: async () => ({
      limit: 60,
      remaining: 47,
      reset_in_seconds: 38,
      bucket: "user:demo",
    }),
  },
];

export default function APIPlayground() {
  const [active, setActive] = useState<Endpoint>(ENDPOINTS[0]);
  const [body, setBody] = useState<string>(`{
  "language": "typescript",
  "code": "function add(a, b) { return a + b }"
}`);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [latency, setLatency] = useState<number | null>(null);

  async function run() {
    setLoading(true);
    setResponse("");
    const start = performance.now();
    // Simulated network delay for realism — endpoints are demo stubs
    await new Promise((r) => setTimeout(r, 380 + Math.random() * 320));
    try {
      const data = await active.sample();
      setResponse(JSON.stringify(data, null, 2));
      setLatency(Math.round(performance.now() - start));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass overflow-hidden">
      {/* Endpoint tabs */}
      <div className="border-b border-[hsl(var(--glass-border))] flex flex-wrap">
        {ENDPOINTS.map((ep) => (
          <button
            key={ep.id}
            onClick={() => {
              setActive(ep);
              setResponse("");
              setLatency(null);
            }}
            className={`px-4 py-3 text-xs font-mono flex items-center gap-2 border-r border-[hsl(var(--glass-border))] transition-colors ${
              active.id === ep.id ? "bg-[hsl(var(--glass-hover))] text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                ep.method === "GET" ? "bg-emerald-500/15 text-emerald-300" : "bg-indigo-500/15 text-indigo-300"
              }`}
            >
              {ep.method}
            </span>
            {ep.path}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-body">{active.description}</p>

        {active.method === "POST" && (
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium block mb-2">
              Request body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              className="w-full font-mono text-xs bg-[hsl(var(--input))] border border-[hsl(var(--glass-border))] rounded-lg p-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
        )}

        <button
          onClick={run}
          disabled={loading}
          className="gradient-btn !py-2 !px-4 text-sm flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {loading ? "Sending…" : "Send Request"}
        </button>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              Response
            </label>
            {latency !== null && (
              <span className="text-[11px] text-muted-foreground font-mono">
                200 OK · {latency}ms
              </span>
            )}
          </div>
          <pre className="bg-black/40 border border-[hsl(var(--glass-border))] rounded-lg p-4 text-xs text-emerald-200/90 font-mono overflow-auto max-h-72 min-h-[120px]">
            {response || (loading ? "// awaiting response…" : "// click Send Request to see live output")}
          </pre>
        </div>
      </div>
    </div>
  );
}
