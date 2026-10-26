import { ArrowRight, BookMarked, Truck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { BookCard } from '@/components/books'
import { buttonVariants } from '@/components/ui/button'
import { books } from '@/data/books'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/types'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/pricing'

const featured = books.filter((b) => b.featured)

const categoryBlurbs: Record<(typeof CATEGORIES)[number], string> = {
  Fiction: 'Timeless novels and modern voices',
  Fantasy: 'Dragons, magic and far-off worlds',
  Mystery: 'Whodunits to keep you up all night',
  Science: 'The universe, explained',
  'Non-Fiction': 'Ideas that change how you live',
}

/** Landing page: hero, featured shelf, category tiles, and trust badges. */
export default function Home() {
  useDocumentTitle()

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,oklch(0.38_0.09_255/0.7),transparent),radial-gradient(40%_50%_at_10%_90%,oklch(0.8_0.14_85/0.18),transparent)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:px-8 lg:py-28">
          <div className="fade-up">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">Welcome to PageTurner</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-6xl">
              Books worth turning pages for.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-foreground/80">
              From beloved classics to this year's must-reads, find your next favourite story
              and have it at your door in days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/books" className={cn(buttonVariants({ size: 'lg' }), 'h-12 bg-gold px-6 text-base text-gold-foreground hover:bg-gold/90')}>
                Browse books <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                to="/books?category=Fantasy"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 border-white/30 bg-transparent px-6 text-base text-ink-foreground hover:bg-white/10 hover:text-ink-foreground')}
              >
                Explore fantasy
              </Link>
            </div>
          </div>

          <ul className="fade-up hidden grid-cols-3 gap-3 sm:grid [animation-delay:150ms]" aria-label="Staff picks">
            {featured.slice(0, 3).map((b, i) => (
              <li key={b.id} className={i === 1 ? 'translate-y-6' : ''}>
                <Link to={`/books/${b.id}`} aria-label={`${b.title} by ${b.author}`}>
                  <img
                    src={`https://covers.openlibrary.org/b/isbn/${b.isbn}-M.jpg`}
                    alt=""
                    width={200}
                    height={300}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[2/3] w-full rounded-md object-cover shadow-2xl transition-transform hover:-translate-y-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-2xl font-semibold sm:text-3xl">Featured books</h2>
          <Link to="/books" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        {/* Scrollable regions must be focusable so keyboard users can scroll them (WCAG 2.1.1). */}
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <ul className="scrollbar-none -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0" tabIndex={0} aria-label="Featured books, scrollable">
          {featured.map((b) => (
            <li key={b.id} className="w-44 shrink-0 snap-start sm:w-56">
              <BookCard book={b} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 id="categories-heading" className="text-2xl font-semibold sm:text-3xl">Shop by category</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                to={`/books?category=${encodeURIComponent(c)}`}
                className="group flex h-full min-h-24 items-center justify-between gap-3 rounded-xl border bg-parchment p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <span>
                  <span className="block font-heading text-xl font-semibold">{c}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{categoryBlurbs[c]}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Why shop with us" className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Free shipping', text: `On orders over $${FREE_SHIPPING_THRESHOLD}` },
            { icon: BookMarked, title: 'Curated catalogue', text: 'Hand-picked classics and new favourites' },
            { icon: ShieldCheck, title: 'Easy returns', text: '30 days, no questions asked' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 rounded-xl border bg-card p-5">
              <Icon className="mt-0.5 size-6 text-sage" aria-hidden="true" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
