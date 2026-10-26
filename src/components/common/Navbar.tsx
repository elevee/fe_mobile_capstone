import { useState } from 'react'
import { BookOpen, LogOut, Menu, ShoppingCart, User as UserIcon } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Books', end: false },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
    isActive ? 'bg-secondary text-primary' : 'text-foreground/80',
  )

/** Sticky site header: desktop links, cart badge, auth actions, and a mobile sheet menu. */
export function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
          <BookOpen className="size-6 text-bookmark" aria-hidden="true" />
          PageTurner
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <UserIcon className="size-4" aria-hidden="true" />
                  {user.name}
                </span>
                <Button variant="ghost" onClick={logout}>
                  <LogOut aria-hidden="true" /> Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className={buttonVariants({ variant: 'ghost' })}>Log in</Link>
                <Link to="/register" className={buttonVariants({ variant: 'default' })}>Sign up</Link>
              </>
            )}
          </div>

          <Link
            to="/cart"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative size-11 md:size-9')}
            aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
          >
            <ShoppingCart className="size-5" aria-hidden="true" />
            {totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-gold-foreground"
                aria-hidden="true"
              >
                {totalItems}
              </span>
            )}
          </Link>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="size-11 md:hidden" aria-label="Open menu" />}>
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} end={l.end} onClick={closeMenu} className={(s) => cn(linkClass(s), 'py-3 text-base')}>
                    {l.label}
                  </NavLink>
                ))}
                <NavLink to="/cart" onClick={closeMenu} className={(s) => cn(linkClass(s), 'py-3 text-base')}>
                  Cart ({totalItems})
                </NavLink>
                <hr className="my-2" />
                {user ? (
                  <>
                    <p className="px-3 text-sm text-muted-foreground">Signed in as {user.name}</p>
                    <Button variant="outline" className="h-11" onClick={() => { logout(); closeMenu() }}>
                      <LogOut aria-hidden="true" /> Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeMenu} className={cn(buttonVariants({ variant: 'outline' }), 'h-11')}>Log in</Link>
                    <Link to="/register" onClick={closeMenu} className={cn(buttonVariants(), 'h-11')}>Sign up</Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
