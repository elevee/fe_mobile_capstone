# Video Script: PageTurner with IBM Bob (target 2:55)

**Format:** screen recording with voice-over. About 415 words at a natural pace (~150 wpm). Bracketed lines are on-screen actions.

**Before recording:** run `npm run dev`, open `http://127.0.0.1:5173` in a clean browser window, and keep IBM Bob open in the editor with the plan file visible.

---

## 0:00–0:25 | The brief and the approach

**[Show the capstone brief, then Bob open on `fe_mobile_capstone-plan.md`]**

> "Hi, I'm [name]. The brief: build a responsive front end for an eCommerce bookstore using an agentic tool. I used IBM Bob, and I treated it like a teammate, not autocomplete.
>
> I started by having Bob plan. It broke the work into ten scoped sub-tasks, each with an intent, expected outcomes, and a todo list, so every step had a clear definition of done."

## 0:25–1:15 | Building with Bob

**[Scroll the plan, then the file tree; open `index.css`, then `filterBooks.ts`]**

> "Bob scaffolded React, Vite, TypeScript in strict mode, Tailwind, and shadcn/ui, and checked the latest stable versions rather than trusting stale defaults. When the tooling disagreed with the plan, for example Tailwind 4 instead of 3, Bob adapted to what was current and kept the code consistent.
>
> I set the guardrails up front: mobile-first, accessible, secure by default, and minimal. So Bob put filter state in the URL, kept logic like filtering, pricing, and validation as pure functions, and re-validates the persisted cart against the catalogue.
>
> It also pushed back on a plan item. A fake loading delay would hurt performance, so it used code splitting instead."

## 1:15–1:50 | Bob verifies its own work

**[Show the terminal: tsc, oxlint, then the Playwright pass and Lighthouse output]**

> "Here's what I think matters most. Bob didn't stop when the code compiled. It drove a real browser through twenty scripted flows, ran an axe accessibility scan, and ran Lighthouse.
>
> Those checks found real problems: layout shift from a loading fallback, a checkout focus bug, and a heading-order violation. Bob diagnosed each one from the reports and fixed it. Cumulative layout shift went from point-four-four to zero, and accessibility, best practices, and SEO all reached a hundred."

## 1:50–2:35 | Live demo

**[Browser at desktop width, then the DevTools device toolbar at 375px]**

> "Here's the result. The home page has a hero, featured books, and category tiles. On mobile, the navigation collapses into a slide-in menu, and every control is a comfortable touch target.
>
> In the catalogue I'll search for Tolkien, filter to Fantasy, and sort by price. Notice the URL updates, so this view is shareable.
>
> On a book page, I'll set the quantity to two and add it to the cart. The toast confirms it, and the badge updates. The cart persists across a refresh, and shipping becomes free over thirty-five dollars.
>
> Checkout validates every field inline and moves focus to the first error. A test card places the order, and the cart clears."

## 2:35–2:55 | Wrap-up

**[Show the README and the GitHub repo]**

> "The repo has a README with setup steps, the quality results, and screenshots. My takeaway: agentic tools work best when you give them a plan, set constraints, and make them prove the result. Thanks for watching."

---

## Recording checklist

- [ ] Keep the final video under 3:00. Trim the demo first if it runs long.
- [ ] Show Bob's actual prompts and outputs on screen during the 0:25–1:50 section.
- [ ] Add the GitHub repository link in the submission text field.
- [ ] Don't enter real personal or payment information during the demo. Use `4242 4242 4242 4242`.
