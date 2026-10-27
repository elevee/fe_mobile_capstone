# Video Script: PageTurner with IBM Bob (target 2:55)

**Format:** screen recording with voice-over. About 415 words at a natural pace (~150 wpm). Bracketed lines are on-screen actions.

**Before recording:** see the setup and command sections at the bottom. Keep IBM Bob open in the editor with the plan file visible.

---

## 0:00–0:25 | The brief and the approach

**[Show the capstone brief, then Bob open on `fe_mobile_capstone-plan.md`]**

> "Hi, I'm [name]. The brief was to build a responsive front end for an eCommerce bookstore using an agentic tool. I used IBM Bob, and I treated it like a teammate, not autocomplete.
>
> I started by having Bob plan. It broke the work into ten scoped sub-tasks, each with an intent, expected outcomes, and a todo list, so every step had a clear definition of done."

## 0:25–1:15 | Building with Bob

**[Scroll the plan, then the file tree; open `index.css`, then `filterBooks.ts`]**

> "Bob scaffolded React, Vite, TypeScript in strict mode, Tailwind, and shadcn/ui, and checked the latest stable versions rather than trusting stale defaults. When the tooling disagreed with the plan, for example Tailwind 4 instead of 3, Bob adapted to what was current and kept the code consistent.
>
> I set the guardrails up front: mobile-first, accessible, secure by default, and minimal. So Bob put filter state in the URL, kept logic like filtering, pricing, and validation as pure functions, and re-validating the persisted cart against the catalogue.
>
> It also pushed back on a plan item. A fake loading delay would hurt performance, so it used code splitting instead."

## 1:15–1:50 | Bob verifies its own work

**[Terminal, in this order: `npm run typecheck`, `npm run lint`, `npm run test:e2e`, `npm run perf`. Output is pre-recorded or sped up; see the commands section]**

> "Here's what I think matters most. Bob didn't stop when the code compiled. It drove a real browser through twenty-two scripted checks, including an axe accessibility scan, and ran Lighthouse.
>
> Those checks found real problems: layout shift from a loading fallback, a checkout focus bug, and a heading-order violation. Bob diagnosed each one from the reports and fixed it. Cumulative layout shift went from point-four-four to zero, and accessibility, best practices, and SEO all reached a hundred."

## 1:50–2:35 | Live demo

**[Browser at desktop width, then the DevTools device toolbar at 375px]**

> "Here's the result. The home page has a hero, featured books, and category tiles. On mobile, the navigation collapses into a slide-in menu, and every control is a comfortable touch target.
>
> In the catalogue I'll search for Tolkien, filter to Fantasy, and sort by price. Notice the URL updates, so this view is shareable.
>
> On a book page, I'll set the quantity to two and add it to the cart. The toast confirms it, and the badge updates. The cart persists across a refresh, and shipping becomes free over thirty-five dollars. (That's before tax).
>
> Checkout validates every field inline and moves focus to the first error. A test card places the order, and the cart clears."

## 2:35–2:55 | Wrap-up

**[Show the README and the GitHub repo]**

> "The repo has a README with setup steps, the quality results, and screenshots. My takeaway: agentic tools work best when you give them a plan, set constraints, and make them prove the result. Thanks for watching."

---

## Terminal commands for the 1:15–1:50 segment

All commands run from the repo root. Nothing needs a global install: `tsc`, `oxlint`, Playwright, axe and Lighthouse are dev dependencies, and `npm run` finds them in `node_modules`.

**One-time setup (do before recording):**

```bash
npm install
```

**Terminal 1: keep the app running**

```bash
npm run dev                    # http://127.0.0.1:5173
```

**Terminal 2: the commands to show on camera**

```bash
npm run typecheck              # tsc -b            ~2s,  prints nothing when clean
npm run lint                   # oxlint            <1s,  "Found 0 warnings and 0 errors."
npm run test:e2e               # Playwright + axe  ~30s, ends with "22/22 checks passed"
```

**Lighthouse needs the production build, so run it separately:**

```bash
npm run build && npm run preview    # serves http://127.0.0.1:4173 (use a third terminal)
npm run perf                        # ~2 min; prints scores table
```

Notes:

- `npm run perf` takes about two minutes, so don't run it live. Record it ahead of time and speed it up, or paste the table on screen while you talk.
- Mobile Lighthouse performance scores vary run to run (about 82–93). Accessibility, best practices and SEO are consistently 100, and CLS is 0. Say "above eighty" for performance if you quote it.
- Lighthouse and `test:e2e` use your installed Google Chrome. Quit other heavy apps first for steadier scores.
- If port 5173 is busy, Vite silently picks the next port and `test:e2e` will fail. Use `npm run dev -- --strictPort` to fail loudly instead, or set `BASE_URL=http://127.0.0.1:5174`.
- `typecheck` and `lint` print almost nothing on success. Show the clean exit with `npm run typecheck && echo "typecheck OK"`.

## Other things you'll need for the video

- **Screen recorder:** macOS Screenshot toolbar (`Cmd+Shift+5`, choose "Record Entire Screen" or a portion, and enable the microphone under Options). QuickTime Player (File, New Screen Recording) also works. Grant the recorder Screen Recording and Microphone permission in System Settings, Privacy & Security, then restart it if prompted.
- **Trimming:** QuickTime (Edit, Trim) or iMovie is enough. Speeding up the Lighthouse run is easiest in iMovie.
- **Bob on screen:** the 0:25–1:15 segment depends on showing real Bob prompts and responses. Scroll your Bob conversation history ahead of time and pick two or three moments to show: the planning step, the dependency version check, and the fixes after the Lighthouse and axe reports.
- **Browser for the demo:** use a fresh Chrome window with no extensions or bookmarks bar. Open DevTools and press `Cmd+Shift+M` for the device toolbar, then choose "iPhone 12 Pro" or set 375 width.
- **Reset the cart before recording:** open DevTools, Application, Local Storage, and delete the `pageturner.cart.v1` key, or use a new Incognito window. Otherwise the cart may already contain items from testing.
- **Demo sequence to rehearse:**
  1. Home at desktop width, scroll to the featured row and categories.
  2. Switch to 375px, open the menu.
  3. `/books`: search "tolkien", click Fantasy, sort by price, point at the URL.
  4. Open The Hobbit, set quantity 2, Add to cart, point at the toast and badge. Refresh to show persistence.
  5. Cart, Proceed to checkout, click Place order empty to show errors, then fill the form with test card `4242 4242 4242 4242`, expiry `12/30`, CVV `123`.
- **Check the length:** read the narration aloud with a timer. At about 415 words it should land near 2:45. Trim the demo first if you go over 3:00.
- **Hosting:** the assignment asks for the video as an attachment, plus the GitHub link in the text field: `https://github.com/elevee/fe_mobile_capstone`.

---

## Recording checklist

- [ ] Keep the final video under 3:00. Trim the demo first if it runs long.
- [ ] Show Bob's actual prompts and outputs on screen during the 0:25–1:50 section.
- [ ] Add the GitHub repository link in the submission text field.
- [ ] Don't enter real personal or payment information during the demo. Use `4242 4242 4242 4242`.
