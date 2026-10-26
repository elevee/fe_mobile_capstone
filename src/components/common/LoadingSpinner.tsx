import { cn } from '@/lib/utils'

/** Centered spinner. As the route fallback it fills the viewport so the footer never jumps. */
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div role="status" className={cn('flex min-h-[40vh] items-center justify-center', className)}>
      <div className="size-10 animate-spin rounded-full border-4 border-border border-t-primary" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
