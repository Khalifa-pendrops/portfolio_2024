import onceImg from "../assets/once.png";
import kliniksImg from "../assets/kliniks.png";
import mycyberWebImg from "../assets/cy.png";
import api4Img from "../assets/api4.png";
import twelvetImg from "../assets/twelvet.png";
import realImg from "../assets/real.png";
import bankImg from "../assets/bank-creation.png";
import api1Img from "../assets/testAPI.jpg";
import api2Img from "../assets/testAPI2.jpg";
import cmoImg from "../assets/cmoPort.png";
import griggsImg from "../assets/Griggs.png";
import easydesignImg from "../assets/easy-design.png";
import whisperImg from "../assets/whisper-app.png";
import movieImg from "../assets/movie-app.png";
import weatherImg from "../assets/weather-app.png";
import eventlyImg from "../assets/evently-ai.png";
import breedImg from "../assets/breed-perfumes.png";
import pocketsyncImg from "../assets/pocketsync.png";

export const PROJECT_CATEGORIES = {
  FULL_STACK: "Full-Stack",
  BACKEND: "Backend",
  FRONTEND: "Frontend",
};

export const PROJECTS = [
  {
    id: "once",
    featured: true,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "ONCE — Ephemeral Cyber-Vault",
    summary:
      "Zero-knowledge encrypted messaging with hardware-backed x25519 keys, per-recipient encryption, and Redis TTL message incineration on delivery.",
    description:
      "High-security messaging platform where the relay server is cryptographically blind. Device identity keys live in SecureStore, messages use AES-GCM and ChaCha20-Poly1305, and the mobile UI includes biometric lock, QR handshake verification, and Paystack-backed premium tiers.",
    href: null,
    hrefLabel: "Private repo — available on request",
    image: onceImg,
    tags: [
      "React Native",
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
  },
  {
    id: "mycyberclinics",
    featured: true,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "MyCyber Clinics App",
    summary:
      "Cross-platform telehealth app for patient records, appointments, and clinician workflows — React Native client with Node.js backend.",
    description:
      "Healthcare platform for professionals and patients. Built the React Native client with NativeWind and contributed to the Koa + TypeScript server handling MongoDB, Redis caching, Firebase Auth, and CI/CD delivery.",
    href: "https://app.mycyberclinics.com",
    hrefLabel: "Live app",
    image: kliniksImg,
    tags: [
      "React Native",
      "NativeWind",
      "Node.js",
      "Koa",
      "MongoDB",
      "Redis",
    ],
  },
  {
    id: "mycyberclinics-web",
    featured: false,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "MyCyber Clinics Website",
    summary:
      "Public marketing site for 24/7 telehealth in Nigeria — service positioning, provider trust, and app conversion.",
    description:
      "Contributed to the front-facing MyCyber Clinics website at mycyberclinics.com, connecting patients and clinicians to the platform with clear service storytelling, responsive layout, and a polished healthcare brand experience.",
    href: "https://mycyberclinics.com",
    hrefLabel: "Live site",
    image: mycyberWebImg,
    tags: ["React", "Tailwind CSS", "Healthcare", "SEO"],
  },
  {
    id: "evently-ai",
    featured: true,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "Evently AI",
    summary:
      "AI-powered SaaS for luxury digital invitations — 7-step wizard, animated microsites, RSVP analytics, and Paystack gift payments.",
    description:
      "Full-stack event platform for weddings, traditional marriages, and birthdays across West African cultures. OpenAI generates culturally tuned copy, palettes, and typography; hosts publish animated microsites at /e/[slug] with Cloudinary galleries, music, deduplicated view tracking, guest RSVP, and a host dashboard with analytics.",
    href: "https://event-ai-three.vercel.app/",
    hrefLabel: "Live site",
    image: eventlyImg,
    tags: [
      "Next.js 16",
      "OpenAI",
      "Prisma",
      "PostgreSQL",
      "Paystack",
      "Cloudinary",
    ],
  },
  {
    id: "breed-perfumes",
    featured: true,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "Breed Perfumes",
    summary:
      "Production fragrance e-commerce for Nigeria — guest checkout, server-verified Paystack payments, admin CMS, and SEO-ready storefront.",
    description:
      "End-to-end Next.js commerce app with Prisma + Supabase PostgreSQL, Zustand cart, Upstash rate limiting, and Cloudinary media. Checkout never trusts client prices — server resolves DB prices, shipping, and Paystack webhooks before marking orders paid. Includes admin dashboard, blog CMS, inventory, and Resend transactional email.",
    href: "https://breed-perfumes.vercel.app/",
    hrefLabel: "Live site",
    image: breedImg,
    tags: [
      "Next.js 16",
      "Prisma",
      "Paystack",
      "Redis",
      "Cloudinary",
      "Resend",
    ],
  },
  {
    id: "pocketsync",
    featured: false,
    category: PROJECT_CATEGORIES.FULL_STACK,
    title: "PocketSync",
    summary:
      "Consolidated personal finance platform for the Nigerian market — multi-account dashboard, transfers, bill payments, and BVN onboarding.",
    description:
      "Production fintech MVP with email OTP verification, HttpOnly cookie auth, mock BVN onboarding, linked bank accounts, transaction history, interbank transfers, and bill payments. Full TypeScript API with Helmet, rate limiting, and OpenAPI documentation.",
    href: "https://psync-client.vercel.app",
    hrefLabel: "Live app",
    image: pocketsyncImg,
    tags: [
      "React",
      "TypeScript",
      "Express",
      "MongoDB",
      "JWT",
    ],
  },
  {
    id: "auth-api",
    featured: false,
    category: PROJECT_CATEGORIES.BACKEND,
    title: "Secure Authentication API",
    summary:
      "Production auth system with JWT rotation, refresh token reuse detection, rate limiting, and multi-device session revocation.",
    description:
      "Built for real threat models with bcrypt hashing, centralized error handling, request ID tracing, and end-to-end Postman testing.",
    href: "https://github.com/Khalifa-pendrops/scalable-api",
    hrefLabel: "GitHub",
    image: api4Img,
    tags: ["Node.js", "Express", "TypeScript", "MongoDB"],
  },
  {
    id: "bank-api",
    featured: false,
    category: PROJECT_CATEGORIES.BACKEND,
    title: "Bank Account API with Virtual Card",
    summary:
      "Secure Node.js API for bank account creation with auto-generated virtual cards and AES-256 encryption for sensitive data.",
    description:
      "TypeScript API featuring encrypted card data, JWT auth, and MongoDB persistence.",
    href: "https://github.com/Khalifa-pendrops/bank-account-virtual-card",
    hrefLabel: "GitHub",
    image: bankImg,
    tags: ["Node.js", "Express", "TypeScript", "MongoDB"],
  },
  {
    id: "notes-api",
    featured: false,
    category: PROJECT_CATEGORIES.BACKEND,
    title: "Note-Taking API with Auth",
    summary:
      "CRUD API with user-scoped notes, categories, and JWT-protected routes.",
    description:
      "Node.js + Express + TypeScript API with MongoDB Atlas for create, read, update, and delete operations tied to authenticated users.",
    href: "https://github.com/Khalifa-pendrops/note-taking-api",
    hrefLabel: "GitHub",
    image: api1Img,
    tags: ["Node.js", "Express", "TypeScript", "MongoDB"],
  },
  {
    id: "card-validator",
    featured: false,
    category: PROJECT_CATEGORIES.BACKEND,
    title: "Credit Card Number Validator",
    summary:
      "CLI validator for Verve, Visa, and Mastercard using prefix checks and the Luhn algorithm.",
    description:
      "Command-line Node.js program that validates card numbers by digit count, issuer prefixes, and Luhn checksum.",
    href: "https://github.com/Khalifa-pendrops/validate-credit-card-number",
    hrefLabel: "GitHub",
    image: api2Img,
    tags: ["Node.js", "JavaScript"],
  },
  {
    id: "twelvet",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Twelvet Educational Services",
    summary:
      "Production Next.js site for an education business — SEO, contact form, newsletter, and Vercel CI/CD.",
    description:
      "Independently designed and delivered from start to finish with multi-page routing, WhatsApp CTA, static generation, and global image optimization.",
    href: "https://velvet-ochre-one.vercel.app",
    hrefLabel: "Live site",
    image: twelvetImg,
    tags: ["Next.js", "Tailwind CSS", "SEO", "CI/CD"],
  },
  {
    id: "real-trift",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Real Trift E-commerce",
    summary:
      "Modern e-commerce frontend with Redux Toolkit, styled-components, and resilient API fallback.",
    description:
      "Neon/dark UI refresh with smooth UX and a data layer that falls back to local sample products when the remote API is unavailable.",
    href: "https://react-e-commerce-app-henna.vercel.app/",
    hrefLabel: "Live site",
    image: realImg,
    tags: ["React", "Redux Toolkit", "Styled Components"],
  },
  {
    id: "cyprian-nweze",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Cyprian Nweze & Associates",
    summary:
      "Professional services website — React + Tailwind frontend built in collaboration with a PHP/MySQL backend team.",
    description:
      "Delivered the full UI layer with responsive layouts and client-brand styling.",
    href: "https://cmonwezeandassociates.com.ng",
    hrefLabel: "Live site",
    image: cmoImg,
    tags: ["React", "Tailwind", "PHP", "MySQL"],
  },
  {
    id: "griggs",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Griggs Specialist Hospital",
    summary:
      "Hospital website frontend built with React and Tailwind in a collaborative full-stack delivery.",
    description:
      "Healthcare marketing site with responsive design and PHP/MySQL backend integration.",
    href: "https://griggsspecialisthospital.com.ng",
    hrefLabel: "Live site",
    image: griggsImg,
    tags: ["React", "Tailwind", "PHP", "MySQL"],
  },
  {
    id: "easy-design",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Easy Design UK",
    summary:
      "Web development agency site built from scratch with React, Bootstrap, and Express.",
    description:
      "Full frontend build with routing, animations, and API integration for a UK digital services business.",
    href: "https://easydesignuk.co.uk/index",
    hrefLabel: "Live site",
    image: easydesignImg,
    tags: ["React", "Bootstrap", "Express.js"],
  },
  {
    id: "whisper",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Whisper",
    summary:
      "Anonymous community messaging platform — contributed to the frontend in a team build.",
    description:
      "Social app where users post anonymously. Built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.",
    href: "https://whisper-app-three.vercel.app/",
    hrefLabel: "Live app",
    image: whisperImg,
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: "movie-app",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Movie Search App",
    summary:
      "TMDB-powered movie search with YouTube streaming links — built solo from scratch.",
    description:
      "React app that fetches movies via TMDB API and directs searches to YouTube for streaming.",
    href: "https://movie-search-app-by-khalifa.vercel.app/",
    hrefLabel: "Live app",
    image: movieImg,
    tags: ["React", "CSS", "REST API"],
  },
  {
    id: "weather-app",
    featured: false,
    category: PROJECT_CATEGORIES.FRONTEND,
    title: "Weather App",
    summary:
      "Weather conditions app using a public API — primary frontend contribution in a team project.",
    description:
      "Responsive weather display built with HTML, CSS, Tailwind, and JavaScript.",
    href: "https://simple-weather-app-psi-one.vercel.app/",
    hrefLabel: "Live app",
    image: weatherImg,
    tags: ["HTML", "CSS", "Tailwind", "JavaScript"],
  },
];

export const featuredProjects = PROJECTS.filter((p) => p.featured);

export const projectsByCategory = (category) =>
  PROJECTS.filter((p) => p.category === category && !p.featured);