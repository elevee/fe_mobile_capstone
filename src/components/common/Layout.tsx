import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Toaster } from 'sonner'
import { Footer } from './Footer'
import { LoadingSpinner } from './LoadingSpinner'
import { Navbar } from './Navbar'

/** Reset scroll on navigation, unless the URL has a hash target. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/** App shell: skip link, header, routed content with Suspense, footer, and toasts. */
export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Suspense fallback={<LoadingSpinner className="min-h-dvh" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="bottom-center" richColors closeButton />
    </div>
  )
}
