# PRD: Manthan's Personal Portfolio (mj-portfolio)

## 1. Overview

A professional personal portfolio for Manthan, a pre-final year B.Tech CSE student (batch 2023-2027, Vadodara, Gujarat, India) who is job searching for Full Stack Developer and AI Developer roles. The site must make a recruiter understand in under 10 seconds who he is, what he builds, and how to contact him. It also includes a private admin panel to publish blog posts and manage projects without touching code.

## 2. Goals

- Convert recruiter and client visits into contact messages and resume downloads.
- Rank for the name "Manthan" + "Full Stack Developer" / "AI Developer" and for blog topics.
- Let the owner publish blogs and manage projects from /admin.
- The codebase itself is a portfolio piece: clean, typed, tested, documented.

## 3. Audience

1. Recruiters and hiring managers (skim fast, want proof of work).
2. Freelance clients (want services, past work, easy contact).
3. Developers reading blog posts (want useful, well-formatted content).

## 4. Tech stack (fixed, do not change without asking)

- Next.js 15 (App Router), TypeScript in strict mode
- Tailwind CSS + shadcn/ui, Framer Motion (subtle, lightweight)
- MongoDB Atlas + Mongoose (cached connection helper in `lib/mongodb.ts`)
- Auth.js (NextAuth v5), JWT strategy, single whitelisted admin email from `ADMIN_EMAIL`, no DB adapter
- Tiptap rich text editor (blog)
- Cloudinary (image uploads)
- Resend (contact emails)
- Zod for all input validation
- Vitest (unit) + Playwright (smoke e2e)
- Deployment: Vercel

## 5. Design direction

- Clean, minimal, editorial. Dark-first with a light theme, toggle in navbar, respects system preference.
- One accent color only. Neutral grays for everything else. Define all colors, spacing, radii, and type scale as design tokens (CSS variables + Tailwind theme). No hard-coded hex values in components.
- Fonts via `next/font`: Geist Sans for UI, Geist Mono for code and small labels.
- Real content and real screenshots only. No stock illustrations, no emoji as icons (use lucide-react), no purple-to-blue gradient hero, no glassmorphism cards stacked everywhere, no "floating blob" backgrounds.
- Motion: short fade/translate on section entry, hover states, page transitions at most. Must respect `prefers-reduced-motion`.
- Mobile-first. Test at 360px, 768px, 1280px.

## 6. Public pages

| Route                                     | Purpose                                                                                                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                       | Hero (name, "Full Stack & AI Developer", one-line value statement, CTAs: View Projects, Download Resume, Contact), featured projects (3), skills strip, latest 3 posts, closing CTA |
| `/about`                                  | Short story, education (PIET, 2023-2027), what he likes building, photo, current focus                                                                                              |
| `/projects`                               | Grid with category filter (Full Stack, AI, Hardware, Other)                                                                                                                         |
| `/projects/[slug]`                        | Case study: problem, solution, role, tech stack, screenshots, live link, repo link                                                                                                  |
| `/skills`                                 | Grouped: Frontend, Backend, Databases, AI, Tools                                                                                                                                    |
| `/experience`                             | Open source contributions, freelance work, courses                                                                                                                                  |
| `/blog`                                   | List, tag filter, search, pagination                                                                                                                                                |
| `/blog/[slug]`                            | Post with reading time, tags, share links, related posts                                                                                                                            |
| `/blog/tag/[tag]`                         | Posts by tag                                                                                                                                                                        |
| `/contact`                                | Form + direct links (email, GitHub, LinkedIn)                                                                                                                                       |
| `/resume`                                 | Inline resume view + PDF download                                                                                                                                                   |
| `not-found`                               | Custom 404                                                                                                                                                                          |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Generated                                                                                                                                                                           |

## 7. Admin panel (`/admin`, protected)

- Login at `/admin/login`. Only the email in `ADMIN_EMAIL` can sign in. Everyone else is rejected.
- Dashboard: counts (posts, projects, unread messages), recent messages, recent posts.
- Posts: list, create, edit, delete. Status: draft / scheduled / published. Fields below. Live slug generation with uniqueness check. Preview.
- Projects: list, create, edit, delete, reorder, toggle featured/published.
- Messages: inbox, read/unread, delete.
- Media: upload and delete Cloudinary images, copy URL.
- Settings: site title, tagline, resume URL, social links, availability text.

## 8. Data models (Mongoose)

**Post**: title, slug (unique, indexed), excerpt, content (HTML from Tiptap, sanitized on save and on render), coverImage {url, publicId, alt}, tags [string], status (draft | scheduled | published), publishedAt, seoTitle, seoDescription, readingTime, timestamps.
**Project**: title, slug (unique), summary, problem, solution, role, techStack [string], category (fullstack | ai | hardware | other), images [{url, publicId, alt}], liveUrl, repoUrl, featured, order, status (draft | published), timestamps.
**Message**: name, email, subject, body, read, ipHash, timestamps.
**Setting**: singleton document: siteTitle, tagline, resumeUrl, socials {github, linkedin, email}, availability.

Scheduled posts: a post is public when `status` is `published`, or `scheduled` with `publishedAt <= now`. Evaluate this at query time. No cron needed.

## 9. SEO requirements

- `generateMetadata` on every page: unique title, description, canonical URL.
- Open Graph and Twitter cards. Dynamic OG image per blog post and per project via `next/og`.
- `sitemap.ts` (includes published posts and projects), `robots.ts` (disallow `/admin`, `/api`), RSS feed.
- JSON-LD: `Person` (home), `BlogPosting` (post), `BreadcrumbList` (inner pages).
- One `h1` per page, correct heading order, semantic landmarks.
- `next/image` with meaningful `alt`, `next/font`, no layout shift.
- Targets: Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO (mobile).

## 10. Security requirements

- All route handlers and server actions validate input with Zod.
- Every admin route handler and server action re-checks the session on the server. Do not rely on middleware alone.
- Sanitize Tiptap HTML (allowlist of tags and attributes) before saving and before rendering.
- Contact form: honeypot field, Mongo-backed rate limit per hashed IP (max 5 per hour), length limits.
- Secrets only in env vars. `.env.example` lists every variable. Validate env at startup with Zod.
- Security headers in `next.config` (CSP, X-Content-Type-Options, Referrer-Policy, frame-ancestors).
- Cloudinary uploads: validate type and size on the server (images only, max 5 MB).

## 11. Rules to avoid "vibe coded" output (MANDATORY)

1. Read `PRD.md` and `progress.txt` at the start of every task. Do only the phase asked.
2. No lorem ipsum, no invented metrics, no fake testimonials, no made-up companies or numbers. If content is missing, use a clearly marked `TODO(manthan)` placeholder in `content/` files and list it in `progress.txt`.
3. No dead code, no commented-out code, no unused dependencies, no `any`, no `@ts-ignore`. Fix types properly.
4. Small focused files. Components under about 150 lines. Business logic in `lib/` or `services/`, not inside components.
5. One source of truth for site content: typed files in `content/`. One source of truth for design tokens.
6. Every form and API has validation, error states, loading states, and empty states.
7. Meaningful names. Comments only where the reason is not obvious from the code.
8. Before finishing a phase: run `npm run lint`, `npm run typecheck`, `npm run build`, and fix everything. Never claim something works without running it.
9. Do not install a library without stating why in `progress.txt`.
10. Do not build future phases or the chatbot early.

## 12. Folder structure (target)

```
app/
  (public)/...           public routes
  admin/...              protected admin routes
  api/...                route handlers (chat/ reserved)
components/
  ui/                    shadcn primitives
  layout/ sections/ blog/ admin/
content/                 typed site content (site.ts, skills.ts, experience.ts)
lib/                     mongodb.ts, auth.ts, env.ts, seo.ts, sanitize.ts, rate-limit.ts
models/                  Post.ts, Project.ts, Message.ts, Setting.ts
services/                data access functions (posts, projects, settings)
tests/                   unit/ e2e/
public/
PRD.md
progress.txt
README.md
.env.example
```

## 13. Future-proofing for AI chatbot (do NOT build now)

- Root layout contains a `<ChatWidgetSlot />` component that renders nothing for now.
- `app/api/chat/route.ts` exists as a stub returning HTTP 501 with a JSON message.
- All portfolio content is read through functions in `services/` so a chatbot can use it as context later.

## 14. Out of scope (for now)

Comments on blog, newsletter, multi-user admin, i18n, payments, the AI chatbot.

## 15. Phases

1. Foundation: setup, tokens, layout, theme
2. Static public pages and content files
3. Database, models, auth, admin shell
4. Projects (admin CRUD + public pages) and image upload
5. Blog (editor, publish flow, public pages)
6. Contact form, messages inbox, settings
7. SEO (metadata, OG, sitemap, RSS, JSON-LD)
8. Hardening: performance, accessibility, tests, README, deploy

## 16. Definition of done

- All phases checked off in `progress.txt`.
- `lint`, `typecheck`, `test`, `build` pass with zero errors.
- Lighthouse targets met on home, a project page, and a blog post.
- Admin can log in, publish a post, add a project, and read a message, end to end.
- README explains setup, env vars, scripts, and deployment.
