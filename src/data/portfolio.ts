export type ProjectCategory = "Fullstack" | "AI Platform"| "Web Apps" | "Frontend";

export interface ArchLayer {
  key: "frontend" | "api" | "logic" | "database" | "ai" | "data" | "ui" | "charts" | "portfolio" | "state" | "auth" | "backend" | "functions";
  title: string;
  summary: string;
  details: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  techStack: string[];
  features: string[];
  problem: string;
  solution: string;
  impact: string;
  challenges: string[];
  lessons: string[];
  architecture: ArchLayer[];
  github: string;
  demo: string;
  image: string;
  hasPlayground?: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-code-review",
    title: "Recti-Code",
    description: "An AI-powered tool that analyzes code quality, detects bugs, and suggests improvements in real-time.",
    longDescription:
      "A production-grade platform where developers paste code and receive structured AI feedback — complexity scores, security flags, refactor suggestions — backed by a Node API and PostgreSQL history.",
    category: "AI Platform",
    techStack: ["Next.js", "MongoDB", "Gemini API", "TypeScript"],
    features: [
      "Monaco code editor",
      "Streaming AI feedback",
      "Issue severity scoring",
      "Per-language rule packs",
      "Persistent review history",
      "Rate-limited public API",
    ],
    problem: "Code reviews are slow, inconsistent, and block engineers from shipping.",
    solution: "An AI orchestration layer that runs static checks plus LLM analysis behind a streaming API.",
    impact: "Cuts code review turnaround time by ~60% and surfaces bugs earlier in the loop.",
    challenges: [
      "Designing a streaming response pipeline that survives long LLM calls",
      "Cost control with token budgeting and result caching in Redis",
      "Schema design that keeps every revision auditable",
    ],
    lessons: [
      "Treat the LLM as one untrusted service — validate, cap, and cache its output",
      "A thin orchestration layer beats a fat prompt every time",
    ],
    architecture: [
      { key: "frontend", title: "Frontend Layer", summary: "React + Monaco editor with streaming UI", details: "React SPA with Monaco code editor. Streams tokens via SSE for instant feedback. Optimistic UI keeps the editor responsive while the backend works." },
      { key: "api", title: "API Gateway", summary: "Express REST + SSE, JWT auth, rate limiting", details: "Express.js with JWT auth, per-IP and per-user rate limiting, request validation with Zod, and SSE endpoints for streaming model output." },
      { key: "logic", title: "Business Logic", summary: "Static analysis + LLM orchestration", details: "Pre-analysis runs cheap static checks (lint, complexity). The orchestrator then routes only the suspect spans to the LLM with a tight prompt — saving 70% of tokens." },
      { key: "database", title: "Database Layer", summary: "MongoDB for reviews, ", details: "MongoDB stores users, submissions, and review revisions in a normalized schema." },
      { key: "ai", title: "AI/ML Layer", summary: "OpenAI / Gemini with structured tool-calling", details: "Uses function-calling to force structured JSON output (issues, severity, suggested patch). Falls back to a smaller model on rate limits." },
    ],
    github: "https://github.com/josephdev934/Recti-Code",
    demo: "http://recti-code.netlify.app/",
    image: "/ai-code-review.png",
    hasPlayground: true,
  },
  
  {
    slug: "Timber",
    title: "Timber",
    description: "A real-time fullstack social platform unifying threaded collaboration, instant messaging, and a media-driven content feed.",
    longDescription:
      "Timber is a unified communication and collaboration platform that merges Notion-style threaded commenting, WhatsApp-style private and group messaging, and an Instagram-style media feed into a single real-time ecosystem. Built on a Next.js stack with Socket.IO, Redis, and MongoDB, it delivers instant multi-tab sync, smart caching, and role-based access — all designed to scale.",
    category: "Web Apps",
    techStack: ["Next.js", "Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Cloudinary", "Tailwind CSS"],
    features: [
      "Threaded nested comments (infinite depth)",
      "@mention system with live user resolution",
      "Real-time sync across tabs via Socket.IO",
      "Redis Cache-Aside with smart invalidation",
      "Private & group messaging (in progress)",
      "Media feed with Cloudinary integration (planned)",
      "Role-based permissions (author/admin)",
      "Real-time notification engine",
    ],
    problem: "Modern teams and communities are fragmented across separate tools for docs, chat, and media — with no unified, real-time layer connecting them.",
    solution: "A single platform combining collaborative threading, real-time messaging, and a media feed — backed by a Socket.IO event bus, Redis caching layer, and MongoDB persistence.",
    impact: "Achieved sub-100ms comment sync across concurrent sessions; Redis caching reduced redundant DB reads by over 60% during early load testing.",
    challenges: [
      "Designing a cache invalidation strategy that stays consistent under concurrent write conditions",
      "Hardening Socket.IO room targeting to prevent cross-user event leakage",
      "Stabilizing Next.js App Router API routes under real-time event pressure",
    ],
    lessons: [
      "Cache invalidation is easy to get wrong at the edges — model your invalidation graph before you write a single cache.set()",
      "Socket rooms need ownership semantics from day one; retrofitting isolation is painful",
      "Real-time and REST are complementary, not competing — let REST own state, Socket.IO own events",
    ],
    architecture: [
      { key: "frontend", title: "Frontend Layer", summary: "Next.js App Router + Tailwind CSS", details: "React Server Components handle initial data fetching; client components subscribe to Socket.IO events for live updates. Tailwind CSS drives the UI. Optimistic UI updates keep interactions instant while server confirmation arrives." },
      { key: "api", title: "API Gateway", summary: "Express embedded in Next.js custom server", details: "REST endpoints handle CRUD operations with role-based middleware. Socket.IO server shares the same Node.js instance, enabling tight coordination between HTTP writes and real-time event emission." },
      { key: "logic", title: "Real-Time Layer", summary: "Socket.IO with Redis Pub/Sub backbone", details: "Socket rooms are scoped per content, chat, and group. Events (COMMENT_CREATED, COMMENT_UPDATED, COMMENT_DELETED) are emitted post-write. Redis Pub/Sub is the planned inter-instance broadcast layer for horizontal scaling." },
      { key: "ai", title: "Caching Layer", summary: "Redis Cache-Aside with stampede protection", details: "Comment trees are cached in Redis on read and invalidated on every mutation. Distributed locks prevent cache stampede under concurrent invalidation. TTL policies ensure stale data never persists beyond acceptable windows." },
      { key: "database", title: "Database Layer", summary: "MongoDB with service-layer abstraction", details: "Mongoose schemas model Users, Comments, Messages, and Posts. Nested comment trees use parent-reference with recursive population. A service layer decouples route handlers from data access, keeping business logic testable and portable." },
    ],
    github: "https://github.com/josephdev934/Timber",
    demo: "https://timber0.netlify.app/",
    image: "/timber.png",
  },
  {
    slug: "skill-lens",
    title: "SkillLens",
    description: "An AI-powered job skills analyzer that scores your readiness for any role and generates a personalized learning roadmap.",
    longDescription:
      "SkillLens is an AI-powered career tool that takes your skill set and a target job description, then delivers a structured gap analysis in seconds. It identifies matched and missing skills, separates technical from soft skills, calculates a readiness score, and generates a prioritized learning roadmap tailored to the exact role — giving job seekers a clear, actionable path from where they are to where they need to be.",
    category: "AI Platform",
    techStack: ["Next.js", "React", "Node.js", "Tailwind CSS","Gemini API"],
    features: [
      "Skill match analysis against any job description",
      "Matched vs. missing skills breakdown",
      "Technical vs. soft skills categorization",
      "Readiness score calculation",
      "Top-priority skill recommendations",
      "Personalized learning roadmap generation",
    ],
    problem: "Job seekers apply blindly without knowing which of their skills actually match a role — or which gaps are disqualifying them.",
    solution: "An AI analyzer that parses any job description against a user's skill set, scores alignment, and outputs a prioritized roadmap of exactly what to learn next.",
    impact: "Reduces job-search guesswork by surfacing skill gaps and learning priorities in a single analysis pass, cutting the time from 'should I apply?' to 'here's my plan' down to seconds.",
    challenges: [
      "Prompting the AI to produce consistent, structured output (matched skills, missing skills, score, roadmap) that maps reliably to UI components",
      "Normalizing free-form job description text into comparable skill categories without losing nuance",
    ],
    lessons: [
      "Structured AI output requires aggressive prompt constraints — vague instructions produce inconsistent JSON that breaks your UI unpredictably",
      "Separating 'technical' from 'soft' skills is harder than it looks; context from the job description matters more than the skill label alone",
    ],
    architecture: [
      { key: "frontend", title: "Frontend Layer", summary: "Next.js App Router + Tailwind CSS", details: "React components handle the two-panel input UI (skills input + job description paste) and render the structured analysis output — matched/missing skill lists, readiness score meter, and roadmap cards. Tailwind CSS drives layout and responsive styling." },
      { key: "api", title: "API Layer", summary: "Next.js API routes as the AI gateway", details: "A Next.js API route receives the user's skills and job description, constructs a structured prompt, and calls the AI model. The route enforces JSON response format and handles error fallbacks before returning parsed analysis data to the client." },
      { key: "ai", title: "AI Analysis Engine", summary: "LLM-powered skill gap and roadmap generation", details: "The core intelligence layer. A carefully engineered prompt instructs the model to act as a career analyst: extract skills from the job description, cross-reference against the user's input, classify by type (technical/soft), score overall readiness, and output a ranked learning roadmap — all as structured JSON." },
    ],
    github: "https://github.com/josephdev934/SkillLens",
    demo: "https://skilllens0.netlify.app/",
    image: "/skill-lens.png",
  },
  {
    slug: "luxe",
    title: "LUXE",
    description: "A premium full-stack e-commerce storefront with product browsing, secure checkout, wishlists, and an AI-powered live chat assistant.",
    longDescription:
      "LUXE is a full-stack fashion e-commerce platform built for a premium brand experience. Customers can browse a categorized product catalog with color and size variants, manage a persistent cart, save items to a wishlist, and check out via Paystack payment integration. Accounts support email/password and Google OAuth with mandatory email verification. A Supabase backend with PostgreSQL and Row-Level Security handles all data, while Deno Edge Functions power payment initialization, avatar uploads, and an AI customer support chat widget available site-wide.",
    category: "Fullstack",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query", "Supabase", "PostgreSQL", "Deno", "Paystack"],
    features: [
      "Product catalog with category, gender, color, and size filtering",
      "Persistent cart with variant-aware quantity management",
      "Wishlist tied to authenticated user accounts",
      "Email/password + Google OAuth with email verification",
      "Account dashboard (profile, addresses, order history, avatar upload)",
      "Secure checkout via Paystack payment integration",
      "AI-powered live chat support widget (site-wide)",
      "Row-Level Security (RLS) on all user data",
      "Serverless Edge Functions (payment, AI chat, file upload)",
      "Fully responsive with custom HSL design system",
    ],
    problem: "Premium fashion brands need a storefront that matches their aesthetic and trust standards — most off-the-shelf solutions compromise on design, security, or both.",
    solution: "A bespoke full-stack storefront with a polished React frontend, a Supabase backend secured by RLS policies, serverless Edge Functions for sensitive operations, and an AI chat assistant to handle support without human overhead.",
    impact: "Delivers a complete purchase flow — browse, wishlist, cart, checkout, order confirmation — with zero backend infrastructure to manage, using Supabase's managed PostgreSQL and Deno Edge Functions.",
    challenges: [
      "Modeling variant-aware cart state (color + size combinations) in Zustand while keeping localStorage persistence consistent across sessions",
      "Implementing RLS policies granular enough to protect user data without blocking legitimate cross-table queries",
      "Securing privilege escalation paths by storing roles in a dedicated table rather than the user profile record",
    ],
    lessons: [
      "RLS is only as strong as your policy coverage — one unprotected table in a relational schema can expose data you thought was isolated",
      "Cart state with product variants needs its own data model from day one; treating a variant as just a product attribute causes compounding pain at checkout",
      "Edge Functions are the right boundary for anything touching money or credentials — keep Paystack and OAuth logic off the client unconditionally",
    ],
    architecture: [
      { key: "frontend", title: "Frontend Layer", summary: "React 18 + TypeScript + Vite + Tailwind CSS", details: "Vite serves the React SPA with fast HMR. React Router handles client-side navigation across catalog, product detail, cart, checkout, account, and static info pages. TanStack React Query manages all server state (products, orders, wishlist) with caching and background revalidation. A custom HSL-based Tailwind design system and shadcn/ui primitives maintain visual consistency across components." },
      { key: "state", title: "Client State Layer", summary: "Zustand cart store with localStorage persistence", details: "Cart state lives in a Zustand store that tracks items by product ID plus variant (color + size combination). The store is persisted to localStorage so the cart survives page refreshes and browser restarts without requiring a backend session. Quantity updates and variant switches are handled as atomic store mutations." },
      { key: "auth", title: "Auth Layer", summary: "Supabase Auth — email/password + Google OAuth", details: "Supabase Auth manages session tokens and OAuth flows server-side. New accounts require email verification before access is granted. User roles are stored in a dedicated user_roles table — never on the profile record — to eliminate privilege escalation vectors. Custom hooks (useAuth) abstract session state into the React component tree." },
      { key: "backend", title: "Backend Layer", summary: "Supabase PostgreSQL with Row-Level Security", details: "All persistent data (products, orders, wishlists, addresses, profiles) lives in a PostgreSQL database managed by Supabase. RLS policies enforce per-user data isolation at the database level, ensuring API calls can never return another user's records regardless of client-side logic. Realtime subscriptions are available for live update support." },
      { key: "functions", title: "Edge Functions Layer", summary: "Deno serverless functions for payments, AI, and uploads", details: "Three Deno Edge Functions handle sensitive operations: initialize-paystack builds and signs the payment payload server-side before redirecting to Paystack; ai-customer-support proxies chat messages to the AI gateway without exposing keys to the client; upload-avatar validates, resizes, and stores profile images in Supabase Storage. Keeping these operations in Edge Functions ensures credentials never touch the browser." },
    ],
    github: "https://github.com/josephdev934/swiftcart-live",
    demo: "https://luxe14.netlify.app/",
    image: "/luxe.png",
  },
  {
    slug: "crypto-pulse",
    title: "CryptoPulse",
    description: "A real-time cryptocurrency dashboard with live market data, interactive charts, and personal portfolio tracking.",
    longDescription:
      "CryptoPulse is a client-side cryptocurrency dashboard that aggregates live prices, market cap, volume, and trend data from the CoinGecko API and surfaces it through a multi-page, trading-platform-style interface. Built with React 18, TypeScript, and TanStack React Query, it delivers auto-refreshing market data, interactive historical charts, coin detail pages, and a personal portfolio tracker with P&L calculations — all wrapped in a dark, glassmorphic UI with zero account requirements.",
    category: "Frontend",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Recharts", "React Router DOM", "CoinGecko API"],
    features: [
      "Live global market overview (cap, volume, BTC/ETH dominance)",
      "Top coins list with 7-day sparklines and favorites toggle",
      "Interactive historical price charts (24h / 7d / 30d / 90d / 1y)",
      "Full coin detail pages (ATH/ATL, supply, description, price action)",
      "Paginated, filterable markets explorer",
      "Portfolio tracker with 24h P&L and allocation pie chart",
      "Trending coins feed",
      "Global coin search by name or symbol",
      "Auto-refresh (prices every 30s, global data every 60s)",
      "Fully responsive with slide-out mobile menu",
    ],
    problem: "Retail crypto users have to juggle multiple tools — exchange dashboards, CoinMarketCap, and spreadsheets — just to get a coherent picture of the market and their holdings.",
    solution: "A unified, zero-login dashboard that pulls live CoinGecko data, caches and background-refreshes it with React Query, and presents everything — market overview, coin details, and personal portfolio — in one fast, responsive interface.",
    impact: "Renders live data for 250+ coins with sub-second UI response on cached hits; portfolio tracker computes real-time P&L without a backend or wallet connection.",
    challenges: [
      "Managing stale-while-revalidate behavior across multiple auto-refresh intervals without triggering redundant API calls against CoinGecko's rate limits",
      "Building a responsive, data-dense layout that stays readable on mobile without sacrificing the trading-platform aesthetic",
      "Keeping portfolio state consistent client-side without a backend, across page navigations and browser refreshes",
    ],
    lessons: [
      "React Query's staleTime and refetchInterval together are powerful — but you need to model your cache keys carefully or you'll revalidate more than you intend",
      "Design tokens with semantic naming (--success, --accent) pay off immediately when you have 10+ chart colors and conditional text classes",
      "Client-only portfolio state hits its ceiling fast — localStorage works for MVP, but persistence and sync will demand a backend sooner than expected",
    ],
    architecture: [
      { key: "frontend", title: "Frontend Layer", summary: "React 18 + TypeScript + Vite", details: "Vite handles bundling and dev serving with near-instant HMR. React Router DOM manages four routes (/, /markets, /portfolio, /coin/:id). All pages are client-rendered; TypeScript enforces API response shapes end-to-end, catching schema drift from CoinGecko before it reaches the UI." },
      { key: "data", title: "Data & Caching Layer", summary: "TanStack React Query + CoinGecko public API", details: "All API calls are encapsulated in custom hooks inside useCryptoData.ts. React Query handles caching, background refetching, and loading/error states. Different staleTime and refetchInterval values are set per data type — prices refresh every 30s, global stats every 60s, trending every 2 minutes — minimizing unnecessary requests while keeping data fresh." },
      { key: "ui", title: "Component & Design System", summary: "shadcn/ui primitives + custom glassmorphic design tokens", details: "shadcn/ui provides accessible Radix-based primitives (dialogs, tooltips, selects). A custom HSL-based design system in index.css defines semantic tokens (--primary, --accent, --success) consumed by Tailwind utility classes. Animated glows, shimmer skeletons, and fade/scale-in transitions are layered on top for the trading-platform feel." },
      { key: "charts", title: "Visualisation Layer", summary: "Recharts — line, area, sparkline, and pie charts", details: "Recharts renders all chart types: area charts for historical price action with switchable time ranges, sparkline lines embedded in the coins table, and a pie chart for portfolio allocation breakdown. Chart data is derived directly from React Query cache, so switching time ranges triggers a new query without unmounting the chart component." },
      { key: "portfolio", title: "Portfolio & State Layer", summary: "Client-side holdings tracker with localStorage persistence", details: "Portfolio holdings are stored in localStorage and hydrated on mount. Live coin prices from React Query cache are joined against holdings at render time to compute current value, 24h P&L, and allocation percentages — no backend required. The architecture is intentionally designed to be swappable: replacing localStorage with an API call is the planned upgrade path." },
    ],
    github: "https://github.com/josephdev934/Crypto-Dashboard",
    demo: "https://cryptopulse3.netlify.app/",
    image: "/crypto-pulse.png",
  },
];
