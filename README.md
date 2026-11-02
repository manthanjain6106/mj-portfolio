# Manthan's Personal Portfolio (mj-portfolio)

A clean, editorial personal portfolio and blog built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack (Phase 1 Foundation)

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark mode default)
- **Validation:** [Zod](https://zod.dev/)
- **Code Quality:** ESLint & Prettier

## Getting Started

1. Clone or navigate into the repository:

   ```bash
   cd mj-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Starts development server with Turbopack
- `npm run build` - Creates production build with Turbopack
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint checks
- `npm run typecheck` - Runs TypeScript strict type checking
- `npm run format` - Formats codebase with Prettier
- `npm run format:check` - Verifies Prettier formatting
- `npm run test` - Unit & E2E tests (configured in Phase 8)

## Project Structure

```
app/
  (public)/...           public routes
  admin/...              protected admin routes (Phase 3)
  api/...                route handlers (chat/ route stubbed)
components/
  ui/                    shadcn UI primitives
  layout/                layout components (Navbar, Footer, ThemeProvider, ThemeToggle)
  sections/              page sections (Phase 2+)
  blog/                  blog components (Phase 5)
  admin/                 admin components (Phase 3)
content/                 typed site content
lib/                     utilities, env validation, database helpers
models/                  Mongoose data models (Phase 3)
services/                data access layer (Phase 3+)
tests/                   unit and e2e tests (Phase 8)
public/                  static assets
```
