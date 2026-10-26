# fe_mobile_capstone — Responsive eCommerce Bookstore

## Top-Level Overview

Build a fully responsive, mobile-first eCommerce bookstore SPA called **PageTurner** inside the new directory `fe_mobile_capstone/`. The project demonstrates Applied AI Specialist skills by using IBM Bob as an agentic tool throughout the build. The deliverables are:

1. A production-quality React 19 + Vite + TypeScript + Tailwind CSS + shadcn/ui frontend
2. A descriptive `README.md` for the GitHub repo
3. A 3-minute video script narrating the agentic development process

**Stack**
- React 19, Vite, TypeScript (strict), Tailwind CSS v3, shadcn/ui
- React Router v7 (client-side routing)
- React Context (cart state, auth state — in-memory, no backend)
- Mock JSON data (static books with Open Library cover CDN images)
- No external API calls, no persistence layer

**Pages in scope**
| Route | Page |
|---|---|
| `/` | Homepage (hero, featured books, categories) |
| `/books` | Product listing (grid, filter by category/price, search) |
| `/books/:id` | Product detail (cover, description, add to cart) |
| `/cart` | Cart (line items, quantity controls, subtotal) |
| `/checkout` | Checkout form (mock — no payment processing) |
| `/login` | Login page (mock auth) |
| `/register` | Register page (mock auth) |

---

## Sub-Task 1 — Project Scaffolding & Configuration

**Intent**: Initialize the Vite + React + TypeScript project inside `fe_mobile_capstone/`, configure Tailwind CSS, install and configure shadcn/ui, set up React Router, and establish the folder structure. This is the foundation every other sub-task builds on.

**Expected Outcomes**
- `fe_mobile_capstone/` directory exists with a working `npm run dev` and `npm run build`
- Tailwind v3 configured with a custom bookstore color palette
- shadcn/ui initialized with `components.json` and at least `Button`, `Card`, `Badge`, `Input`, `Dialog` components added
- React Router v7 installed; top-level `App.tsx` routing scaffold in place (routes render placeholder pages)
- Folder structure:
  ```
  src/
    assets/
    components/
      common/         ← shared UI (Navbar, Footer, LoadingSpinner)
      books/          ← BookCard, BookGrid, BookFilters
      cart/           ← CartItem, CartDrawer
      checkout/       ← CheckoutForm
      auth/           ← LoginForm, RegisterForm
    context/
      CartContext.tsx
      AuthContext.tsx
    data/
      books.ts        ← mock book data (20+ entries)
    hooks/
      useCart.ts
      useAuth.ts
    pages/
      Home.tsx
      Books.tsx
      BookDetail.tsx
      Cart.tsx
      Checkout.tsx
      Login.tsx
      Register.tsx
    types/
      index.ts
    lib/
      utils.ts        ← shadcn cn() helper
  ```
- `tsconfig.app.json` uses `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`
- ESLint config passes (`npm run lint`)
- Path alias `@/` mapped to `src/` in both `vite.config.ts` and `tsconfig.app.json`

**Todo List**
- [ ] `npm create vite@latest fe_mobile_capstone -- --template react-ts` from workspace root
- [ ] `cd fe_mobile_capstone && npm install`
- [ ] Install Tailwind CSS v3, postcss, autoprefixer; run `npx tailwindcss init -p`
- [ ] Configure `tailwind.config.js` with content paths and custom bookstore color tokens: `ink-black`, `parchment`, `library-blue`, `bookclub-red`, `gilded-gold`, `sage-green`
- [ ] Add Tailwind directives and CSS custom property tokens to `src/index.css`; define utility classes `.btn-primary`, `.btn-secondary`, `.card-book`, `.input-field`
- [ ] Install `react-router-dom@^7` and `lucide-react`, `clsx`, `tailwind-merge`
- [ ] Run `npx shadcn@latest init` and add components: `button card badge input dialog sheet separator skeleton`
- [ ] Configure `@/` path alias in `vite.config.ts` and `tsconfig.app.json`
- [ ] Tighten `tsconfig.app.json`: add `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`
- [ ] Create all `src/` folders and empty placeholder files
- [ ] Scaffold `App.tsx` with `BrowserRouter`, `Routes`, and placeholder route components
- [ ] Wrap `App` with `CartProvider` and `AuthProvider` in `main.tsx`
- [ ] Verify `npm run dev`, `npm run build`, and `npm run lint` all pass clean

**Relevant Context**
- shadcn/ui docs: https://ui.shadcn.com/docs/installation/vite
- Path alias config: `resolve: { alias: { '@': path.resolve(__dirname, './src') } }` in vite.config.ts

**Status**: `[ ] pending`

---

## Sub-Task 2 — Types, Mock Data & Context

**Intent**: Define all shared TypeScript types, populate a rich mock book dataset (20+ books), and implement the CartContext and AuthContext so all pages have real state to render against.

**Expected Outcomes**
- `src/types/index.ts` exports `Book`, `CartItem`, `User`, `Category` types
- `src/data/books.ts` exports an array of 20+ `Book` objects with realistic fields (id, title, author, price, category, rating, description, coverUrl via Open Library CDN or picsum.photos)
- `CartContext` provides: `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalItems`, `totalPrice`
- `AuthContext` provides: `user`, `login`, `logout`, `register` (mock — stores user in memory)
- `useCart()` and `useAuth()` hooks throw a descriptive error if used outside their providers
- All exported functions have JSDoc comments

**Todo List**
- [ ] Define `Book`, `CartItem`, `User`, `Category` in `src/types/index.ts`
- [ ] Create `src/data/books.ts` with 20+ books across 4+ categories (Fiction, Non-Fiction, Science, Fantasy); use `https://covers.openlibrary.org/b/id/{id}-L.jpg` for covers
- [ ] Implement `CartContext.tsx` with full cart operations and `useCart()` hook
- [ ] Implement `AuthContext.tsx` with mock login/register (no password hashing — demo only) and `useAuth()` hook
- [ ] Add JSDoc to every exported function and hook

**Status**: `[ ] pending`

---

## Sub-Task 3 — Shared Layout Components (Navbar, Footer, LoadingSpinner)

**Intent**: Build the persistent shell of the app — the responsive Navbar with mobile hamburger menu + cart icon badge, and the Footer. These appear on every page and must be fully responsive from 320px mobile to 1440px desktop.

**Expected Outcomes**
- `Navbar` renders brand logo, nav links (Home, Books), cart icon with live item-count badge, Login/Register or user name + Logout depending on auth state
- Mobile: hamburger toggles a slide-in sheet (shadcn `Sheet`) with nav links
- `Footer` renders copyright, social links (icons only), and a tagline
- `LoadingSpinner` is a reusable centered spinner for async-feeling transitions
- All components are barrel-exported from `src/components/common/index.ts`
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)

**Todo List**
- [ ] Build `Navbar.tsx` with desktop nav + mobile Sheet drawer using shadcn; wire `useCart()` for badge count; wire `useAuth()` for conditional links
- [ ] Build `Footer.tsx` with Tailwind grid layout
- [ ] Build `LoadingSpinner.tsx` using a Tailwind `animate-spin` div
- [ ] Create `src/components/common/index.ts` barrel export
- [ ] Add `<Navbar />` and `<Footer />` to a `Layout` wrapper component; wrap all routes in `App.tsx` with `Layout`

**Status**: `[ ] pending`

---

## Sub-Task 4 — Homepage

**Intent**: Build the hero landing page with a visually compelling hero section, a "Featured Books" horizontal scroll row, and a category grid — establishing the visual identity of PageTurner.

**Expected Outcomes**
- Hero section: full-viewport-height banner with headline, subtext, CTA button ("Browse Books" → `/books`), and a decorative background image or gradient
- "Featured Books" row: horizontally scrollable `BookCard` strip (first 6 books flagged `featured: true`)
- Category grid: 4 clickable category tiles that navigate to `/books?category=X`
- Entrance animations using CSS transitions or a simple `opacity + translateY` pattern
- Fully responsive: stacks to single column on mobile

**Todo List**
- [ ] Build `BookCard.tsx` component (used on Homepage, Books listing, and related sections): cover image, title, author, price, rating stars, "Add to Cart" button
- [ ] Build `Home.tsx` with hero, featured row (using `BookCard`), and category grid
- [ ] Mark 6 books in mock data as featured
- [ ] Wire category tiles to navigate with query param

**Status**: `[ ] pending`

---

## Sub-Task 5 — Product Listing Page (Books)

**Intent**: Build the `/books` page with a searchable, filterable grid of all books — the core commerce experience.

**Expected Outcomes**
- Grid of `BookCard` components (responsive: 1 col mobile → 2 col tablet → 3–4 col desktop)
- Search bar filters books by title or author in real-time (no API, client-side filter)
- Category filter (tabs or sidebar pills) — reads `?category` query param on load
- Price range filter (min/max inputs)
- Sort by: Price Low–High, Price High–Low, Rating, Title A–Z
- "No results" empty state with a friendly message
- Loading skeleton state using shadcn `Skeleton` while simulating a brief data load (100ms timeout)

**Todo List**
- [ ] Build `BookFilters.tsx` with search input, category pills, price range, and sort dropdown
- [ ] Build `Books.tsx` page with filter state, derived filtered+sorted book list, and responsive grid
- [ ] Add `Skeleton` loading state (200ms simulated delay on mount)
- [ ] Sync category filter with URL `?category` query param so category tiles on homepage link correctly
- [ ] Add "X results" count label above the grid

**Status**: `[ ] pending`

---

## Sub-Task 6 — Product Detail Page

**Intent**: Build the `/books/:id` detail page — the primary conversion point where users read about a book and add it to cart.

**Expected Outcomes**
- Two-column layout (desktop): cover image left, details right
- Mobile: stacked, cover on top
- Details: title, author, category badge, star rating, price, full description, quantity selector, "Add to Cart" button
- Toast notification on add-to-cart success
- "You may also like" row: 3–4 books from the same category (filtered from mock data)
- 404-like "Book not found" state if `:id` doesn't match

**Todo List**
- [ ] Install `react-hot-toast` for toast notifications
- [ ] Build `BookDetail.tsx` with `useParams`, mock data lookup, responsive two-column layout
- [ ] Implement quantity selector (+ / − buttons, min 1)
- [ ] Wire "Add to Cart" to `useCart().addItem` and trigger a toast
- [ ] Build "You may also like" section using filtered `BookCard` strip
- [ ] Handle not-found case (render a message with a "Back to Books" link)

**Status**: `[ ] pending`

---

## Sub-Task 7 — Cart Page

**Intent**: Build the `/cart` page where users review their selections, adjust quantities, remove items, and proceed to checkout.

**Expected Outcomes**
- List of `CartItem` rows: cover thumbnail, title, author, unit price, quantity stepper, remove button, line total
- Order summary sidebar (desktop) / section (mobile): subtotal, estimated shipping ($4.99 or free over $35), order total
- "Continue Shopping" and "Proceed to Checkout" CTAs
- Empty cart state with illustration/icon and "Browse Books" link
- Responsive: single-column on mobile, two-column (items + summary) on desktop

**Todo List**
- [ ] Build `CartItemRow.tsx` with quantity stepper and remove button wired to `useCart()`
- [ ] Build `OrderSummary.tsx` with subtotal, shipping, and total calculations
- [ ] Build `Cart.tsx` page composing both components; handle empty state
- [ ] Ensure "Proceed to Checkout" is disabled/hidden when cart is empty

**Status**: `[ ] pending`

---

## Sub-Task 8 — Checkout & Auth Pages

**Intent**: Build the `/checkout`, `/login`, and `/register` pages. Checkout is a multi-field mock form (no real payment). Auth pages are mock (no backend).

**Expected Outcomes**
- `Checkout.tsx`: form with shipping info (name, address, city, zip, country) + payment info (card number, expiry, CVV — masked, demo only); "Place Order" clears cart and navigates to a confirmation message
- `Login.tsx`: email + password form; mock validates against `AuthContext`; redirects to previous page or `/`
- `Register.tsx`: name + email + password form; creates user in `AuthContext`; auto-logs in
- Form validation: required field checks using controlled inputs; error messages rendered inline
- All forms use shadcn `Input` and `Button` components; styled with `.input-field`

**Todo List**
- [ ] Build `CheckoutForm.tsx` with shipping + payment sections; wire "Place Order" to `clearCart()` + show inline success confirmation
- [ ] Build `Checkout.tsx` page; redirect to `/cart` if cart is empty
- [ ] Build `LoginForm.tsx` and `Login.tsx`; wire to `useAuth().login`
- [ ] Build `RegisterForm.tsx` and `Register.tsx`; wire to `useAuth().register`
- [ ] Add inline validation error messages for all required fields
- [ ] Add a "Protected" redirect: accessing `/checkout` while cart is empty redirects to `/cart`

**Status**: `[ ] pending`

---

## Sub-Task 9 — Polish, Performance & Accessibility

**Intent**: Apply finishing touches — smooth scroll behavior, focus management, keyboard navigation, ARIA labels, responsive image sizing, and Lighthouse-friendly optimizations — so the project "Significantly Exceeds" evaluation criteria.

**Expected Outcomes**
- All images use `loading="lazy"` and explicit `width`/`height` or `aspect-ratio` to prevent layout shift
- All interactive elements have accessible labels (`aria-label`, `aria-describedby` where needed)
- Color contrast meets WCAG AA on all text/background combinations
- `npm run build` produces no TypeScript errors and no ESLint warnings
- `npm run lint` passes clean
- Smooth CSS scroll behavior (`scroll-behavior: smooth` on `html`)
- 404 catch-all route renders a friendly "Page Not Found" component

**Todo List**
- [ ] Add `loading="lazy"` and `alt` text to all `<img>` tags
- [ ] Audit and fix any color contrast issues in Tailwind config
- [ ] Add `aria-label` to icon-only buttons (cart badge, hamburger, remove item)
- [ ] Add `404.tsx` catch-all page and wire it in `App.tsx`
- [ ] Add `scroll-behavior: smooth` to `html` in `index.css`
- [ ] Run `npm run build` — resolve all TypeScript and ESLint errors to zero
- [ ] Final responsive check: test layout at 375px, 768px, 1024px, 1440px breakpoints

**Status**: `[ ] pending`

---

## Sub-Task 10 — README & Video Script

**Intent**: Write the GitHub README and 3-minute video script that narrate the agentic development process using IBM Bob, demonstrating the Applied AI Specialist skills being evaluated.

**Expected Outcomes**
- `README.md` at `fe_mobile_capstone/README.md` covering: project overview, tech stack, features, setup instructions, folder structure, and screenshots (placeholder text for images)
- `VIDEO_SCRIPT.md` at `fe_mobile_capstone/VIDEO_SCRIPT.md`: a timed (~3 min / ~450 words) script narrating the key decisions made with IBM Bob, the prompts used, how the agentic tool accelerated the build, and a walkthrough of the running app

**Todo List**
- [ ] Write `README.md` with badges (React, Vite, TypeScript, Tailwind, shadcn), feature list, setup instructions (`npm install && npm run dev`), and folder structure tree
- [ ] Write `VIDEO_SCRIPT.md` with timestamp markers (0:00–0:30 intro, 0:30–1:30 Bob-assisted build walkthrough, 1:30–2:30 live app demo, 2:30–3:00 wrap-up)
- [ ] Ensure README links to the GitHub repo placeholder and includes a "Built with IBM Bob" note

**Status**: `[ ] pending`
