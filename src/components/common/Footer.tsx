import { BookOpen } from 'lucide-react'
import { Link } from 'react-router'
import { CATEGORIES } from '@/types'

const YEAR = new Date().getFullYear()

/** Site footer with category shortcuts and a tagline. */
export function Footer() {
  return (
    <footer className="mt-16 border-t bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <p className="flex items-center gap-2 font-heading text-xl font-semibold">
            <BookOpen className="size-6 text-gold" aria-hidden="true" /> PageTurner
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-foreground/75">
            Books worth turning pages for. Hand-picked classics and modern favourites, delivered to your door.
          </p>
        </div>
        <nav aria-label="Shop by category">
          <h2 className="font-sans text-sm font-semibold tracking-wide uppercase">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link className="py-1 text-ink-foreground/75 hover:text-gold hover:underline" to={`/books?category=${encodeURIComponent(c)}`}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Account">
          <h2 className="font-sans text-sm font-semibold tracking-wide uppercase">Account</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="py-1 text-ink-foreground/75 hover:text-gold hover:underline" to="/login">Log in</Link></li>
            <li><Link className="py-1 text-ink-foreground/75 hover:text-gold hover:underline" to="/register">Create account</Link></li>
            <li><Link className="py-1 text-ink-foreground/75 hover:text-gold hover:underline" to="/cart">Cart</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-ink-foreground/70">
        © {YEAR} PageTurner. Demo store: no real orders or payments. Built with IBM Bob.
      </div>
    </footer>
  )
}
