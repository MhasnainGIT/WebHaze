# WebHaze — Product Tickets

---

## 🔴 CRITICAL — Security & Stability

### TICKET-001 — Fix committed .env files
- **Priority:** Critical
- **Area:** Security
- `.env` files with real secrets are committed in `server/` and `client/`
- **Tasks:**
  - Add `.env` to `.gitignore` in both `server/` and `client/`
  - Rotate all exposed keys: JWT secret, Google OAuth, email API keys
  - Move all secrets to environment variables only
  - Update `.env.example` to reflect all required vars

---

### TICKET-002 — Add input sanitization
- **Priority:** Critical
- **Area:** Security / Backend
- No sanitization library exists on any route
- **Tasks:**
  - Install `express-validator`
  - Add validation middleware on: auth, contact, booking, payments routes
  - Sanitize all string inputs to prevent XSS and NoSQL injection via `$where` / `$regex`

---

### TICKET-003 — Add CSRF protection
- **Priority:** Critical
- **Area:** Security / Backend
- Auth uses httpOnly cookies with no CSRF protection
- **Tasks:**
  - Implement double-submit cookie pattern or add `csurf`
  - Apply to all state-changing routes (POST, PUT, DELETE)
  - Update frontend to send CSRF token in headers

---

### TICKET-004 — Add request timeout middleware
- **Priority:** Critical
- **Area:** Backend
- No timeout on any route — slow DB or external calls hang forever
- **Tasks:**
  - Add global 10s timeout middleware in `server/index.js`
  - Add specific shorter timeouts on external call routes (Google Calendar, email)

---

### TICKET-005 — Fix health check — add real status
- **Priority:** Critical
- **Area:** Backend / DevOps
- `/api/health` returns only `ok` with no real diagnostic info
- **Tasks:**
  - Add MongoDB connection status to health response
  - Add memory usage (`process.memoryUsage()`)
  - Add uptime (`process.uptime()`)
  - Used by Render for liveness probes

---

## 🟠 HIGH — Missing Core Features

### TICKET-006 — Wire up Redis caching
- **Priority:** High
- **Area:** Backend / Performance
- `ioredis` is installed but completely unused
- **Tasks:**
  - Connect Redis in `server/index.js`
  - Cache `/api/templates`, `/api/plans`, `/api/pages` with 5-minute TTL
  - Add cache invalidation on admin updates to plans/pages
  - Gracefully fall back to DB if Redis is unavailable

---

### TICKET-007 — Add database indexes
- **Priority:** High
- **Area:** Backend / Performance
- `User`, `Page`, `Contact`, `Booking` models have zero indexes
- **Tasks:**
  - `User`: index on `email`
  - `Booking`: compound index on `email + status`, index on `createdAt`
  - `Contact`: index on `createdAt`
  - `Page`: index on `slug`
  - `Transaction`: index on `userId + createdAt`

---

### TICKET-008 — Implement JWT refresh token flow
- **Priority:** High
- **Area:** Security / Backend
- Current tokens are 7-day static JWTs with no refresh mechanism
- **Tasks:**
  - Implement short-lived access tokens (15 min)
  - Implement long-lived refresh tokens (30 days) in httpOnly cookie
  - Add `POST /api/auth/refresh` endpoint
  - Update frontend `AuthContext` to handle token refresh automatically

---

### TICKET-009 — Set up CI/CD with GitHub Actions
- **Priority:** High
- **Area:** DevOps
- `.github/` folder exists but has no workflows
- **Tasks:**
  - Create `.github/workflows/ci.yml`
  - Pipeline: lint → test → build on every push to `main`
  - Add deploy step to Render (server) on successful build
  - Add deploy step to Vercel (client) on successful build
  - Block merges if pipeline fails

---

### TICKET-010 — Add Docker for local development
- **Priority:** High
- **Area:** DevOps
- No `Dockerfile` or `docker-compose.yml` exists
- **Tasks:**
  - Create `Dockerfile` for server
  - Create `docker-compose.yml` with: server, client, MongoDB, Redis
  - Add `.dockerignore`
  - Document usage in `README.md`

---

## 🟡 MEDIUM — Frontend / UX Completeness

### TICKET-011 — Replace placeholder testimonials
- **Priority:** Medium
- **Area:** Frontend / Conversion
- Testimonials use `pravatar.cc` placeholder avatars and fake names
- **Tasks:**
  - Replace with real client testimonials
  - Include: full name, company, role, photo, specific metric (e.g. "40% traffic growth")
  - If no real testimonials yet, add a "Results" section with project outcome stats instead

---

### TICKET-012 — Add social proof above the fold
- **Priority:** Medium
- **Area:** Frontend / Conversion
- No client logos or trust signals anywhere above the fold
- **Tasks:**
  - Add a logo strip of real clients/partners under the hero CTA
  - Or add "Trusted by X companies" with a number
  - This is the highest-leverage conversion change per startup design research

---

### TICKET-013 — Add Portfolio / Case Studies page
- **Priority:** Medium
- **Area:** Frontend
- No portfolio page exists — critical for a web agency
- **Tasks:**
  - Create `/portfolio` route and page
  - Add 3–5 real project showcases: client, problem, solution, result metrics
  - Link from navbar and home page Services section

---

### TICKET-014 — Add real Team page
- **Priority:** Medium
- **Area:** Frontend / Trust
- No team page — anonymous companies convert worse
- **Tasks:**
  - Add team section to `/about` or create `/team` route
  - Include: real photos, names, roles, LinkedIn links
  - Add founder story / company origin section

---

### TICKET-015 — Add Blog / Content section
- **Priority:** Medium
- **Area:** Frontend / SEO
- No blog exists — SEO compounds over time
- **Tasks:**
  - Create `/blog` route with post list page
  - Create `/blog/:slug` individual post page
  - Add `BlogPost` model to server
  - Add admin CRUD for blog posts
  - Publish first 2 posts targeting "web design Hyderabad" keywords

---

### TICKET-016 — Add custom 404 page
- **Priority:** Medium
- **Area:** Frontend
- Unknown routes show a blank screen
- **Tasks:**
  - Create a styled `NotFound.jsx` page
  - Add `<Route path="*" element={<NotFound />} />` in `App.jsx`
  - Include link back to home and contact

---

### TICKET-017 — Fix pricing model inconsistency
- **Priority:** Medium
- **Area:** Frontend / UX
- Home page shows `/MO`, Pricing page shows `/ONCE` — inconsistent
- **Tasks:**
  - Decide on pricing model: one-time vs monthly
  - If both exist, add a billing toggle (monthly / one-time) on the Pricing page
  - Sync pricing display across Home and Pricing pages

---

### TICKET-018 — Add WhatsApp floating CTA
- **Priority:** Medium
- **Area:** Frontend / Conversion
- Contact page mentions 24/7 WhatsApp support but no button exists anywhere
- **Tasks:**
  - Add a floating WhatsApp button (bottom-right) sitewide
  - Link to `https://wa.me/918919019679`
  - Show on all pages except admin and dashboard

---

### TICKET-019 — Mobile navigation audit
- **Priority:** Medium
- **Area:** Frontend / Mobile
- `PremiumNavbar` has not been fully audited on mobile
- **Tasks:**
  - Verify hamburger menu opens/closes correctly
  - Verify all nav links are accessible and tap targets are ≥44px
  - Fix any horizontal scroll issues on screens <375px
  - Test on iOS Safari and Android Chrome

---

### TICKET-020 — Add skeleton loaders for data pages
- **Priority:** Medium
- **Area:** Frontend / UX
- Dashboard and admin pages show only a spinner — layout jumps on load
- **Tasks:**
  - Add skeleton UI components for Dashboard stats cards
  - Add skeleton rows for admin tables (users, contacts, bookings)
  - Use consistent skeleton style matching the black/white design system

---

## 🟢 MEDIUM — Backend Completeness

### TICKET-021 — Wire up Bull queue for emails
- **Priority:** Medium
- **Area:** Backend / Reliability
- `bull` is installed but unused — emails are fire-and-forget with no retry
- **Tasks:**
  - Create email queue using Bull + Redis
  - Move welcome email, booking confirmation, password reset into queue jobs
  - Add retry logic: 3 attempts with exponential backoff
  - Add dead-letter queue logging for failed jobs

---

### TICKET-022 — Add pagination to admin routes
- **Priority:** Medium
- **Area:** Backend / Performance
- Admin routes return all records with no pagination
- **Tasks:**
  - Add `?page=1&limit=20` query params to: `/api/admin/users`, `/api/admin/contacts`, `/api/admin/transactions`, `/api/admin/bookings`
  - Return `{ data, total, page, totalPages }` in response
  - Update admin frontend tables to use pagination controls

---

### TICKET-023 — Connect S3 for media uploads
- **Priority:** Medium
- **Area:** Backend / Infrastructure
- `@aws-sdk/client-s3` is installed but not wired up — files save to local `uploads/` which is ephemeral on Render
- **Tasks:**
  - Wire up S3 client in media route
  - Upload files to S3 bucket on `POST /api/media/upload`
  - Return S3 URL in response
  - Add `AWS_BUCKET_NAME`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` to `.env.example`

---

### TICKET-024 — Fix webhook signature verification
- **Priority:** Medium
- **Area:** Security / Backend
- `/api/payments/webhook/:provider` reads signature header but never verifies it
- **Tasks:**
  - Implement Razorpay HMAC signature verification
  - Implement Stripe webhook signature verification
  - Return 400 immediately if signature is invalid
  - Add raw body parser middleware for webhook route (required for Stripe)

---

### TICKET-025 — Add database migration strategy
- **Priority:** Medium
- **Area:** Backend / DevOps
- No migration tooling — schema changes are applied manually
- **Tasks:**
  - Install `migrate-mongo`
  - Create initial migration for existing schema
  - Add `npm run migrate` script to `package.json`
  - Document migration workflow in `README.md`

---

## 🔵 TESTING

### TICKET-026 — Unit tests: auth middleware + utils
- **Priority:** Medium
- **Area:** Testing
- Zero tests exist in the project
- **Tasks:**
  - Write Jest unit tests for `server/middleware/auth.js` (authenticate, admin)
  - Write unit tests for `server/utils/emailService.js` with mocked Resend client
  - Write unit tests for `server/utils/memoryStore.js`
  - Target: 80% coverage on these files

---

### TICKET-027 — Integration tests: API routes
- **Priority:** Medium
- **Area:** Testing
- `supertest` is installed but no tests exist
- **Tasks:**
  - Test auth flow: register → login → GET `/me` → logout
  - Test contact form: valid submission, missing fields, rate limit
  - Test booking submission: valid, missing fields
  - Test admin routes: unauthorized access returns 403
  - Use in-memory MongoDB (`mongodb-memory-server`) for test isolation

---

### TICKET-028 — Frontend component tests
- **Priority:** Medium
- **Area:** Testing
- No frontend tests exist
- **Tasks:**
  - Install React Testing Library
  - Test `AuthContext`: login state, logout, token persistence
  - Test `CurrencyContext`: currency switching, price formatting
  - Test `Contact` form: field validation, submit success, submit error states

---

### TICKET-029 — E2E tests with Playwright
- **Priority:** Medium
- **Area:** Testing
- No end-to-end tests exist
- **Tasks:**
  - Install Playwright
  - Test: homepage loads → scroll to pricing → click contact CTA
  - Test: signup → login → dashboard → logout
  - Test: contact form submission flow
  - Test: booking form submission flow
  - Run in CI pipeline (TICKET-009)

---

### TICKET-030 — Add test coverage reporting to CI
- **Priority:** Medium
- **Area:** Testing / DevOps
- `jest --coverage` exists in scripts but never runs in CI
- **Tasks:**
  - Wire `npm run test:coverage` into GitHub Actions workflow
  - Set minimum coverage threshold: 60% overall
  - Fail CI if coverage drops below threshold
  - Add coverage badge to `README.md`

---

## ⚪ LOW — Polish & SEO

### TICKET-031 — Fix sitemap.xml
- **Priority:** Low
- **Area:** SEO
- `/public/sitemap.xml` is static and missing dynamic routes
- **Tasks:**
  - Add `/services/*`, `/blog/*`, `/careers/*` routes to sitemap
  - Either generate at build time or add `GET /sitemap.xml` server route
  - Submit updated sitemap to Google Search Console

---

### TICKET-032 — Add structured data for services
- **Priority:** Low
- **Area:** SEO
- `StructuredData` component only covers the organization schema
- **Tasks:**
  - Add `Service` schema markup on each service page
  - Add `FAQPage` schema on pages with FAQ sections
  - Add `BreadcrumbList` schema on inner pages
  - Validate with Google Rich Results Test

---

### TICKET-033 — Add error monitoring with Sentry
- **Priority:** Low
- **Area:** Observability
- No error monitoring beyond Winston logs
- **Tasks:**
  - Install `@sentry/node` on server
  - Install `@sentry/react` on client
  - Configure DSN via environment variable
  - Add Sentry error boundary on client
  - Add Sentry error handler middleware on server

---

### TICKET-034 — Add startup config validator
- **Priority:** Low
- **Area:** DevOps / DX
- Optional features (Google Calendar, S3, Redis) silently fail when not configured
- **Tasks:**
  - Add a `validateConfig()` function that runs on server start
  - Log clearly which features are enabled/disabled based on env vars present
  - Warn (not crash) for optional features, crash for required ones (JWT_SECRET, MONGO_URI)

---

### TICKET-035 — Make job listings dynamic
- **Priority:** Low
- **Area:** Frontend / Backend
- Careers page job listings appear to be hardcoded
- **Tasks:**
  - Add `Job` model to server (title, department, location, type, description, requirements, slug)
  - Add admin CRUD routes for jobs under `/api/admin/jobs`
  - Add job management UI in AdminNexus
  - Update `Careers.jsx` and `JobDetail.jsx` to fetch from API

---

## 📊 Summary

| Priority | Count |
|----------|-------|
| 🔴 Critical | 5 |
| 🟠 High | 5 |
| 🟡 Medium (Frontend) | 10 |
| 🟢 Medium (Backend) | 5 |
| 🔵 Testing | 5 |
| ⚪ Low | 5 |
| **Total** | **35** |

## 🗺️ Suggested Implementation Order

1. **TICKET-001 → 005** — Security fixes (do today)
2. **TICKET-009** — CI/CD (unblocks everything else)
3. **TICKET-006, 007, 008** — Backend reliability
4. **TICKET-011 → 015** — Conversion-critical frontend
5. **TICKET-021 → 025** — Backend completeness
6. **TICKET-026 → 030** — Testing
7. **TICKET-031 → 035** — Polish & SEO
