import { Skeleton } from '@/components/ui/skeleton'

/** Placeholder matching BookCard dimensions to avoid layout shift. */
export function BookGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading books">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="rounded-xl border p-3 sm:p-4">
            <Skeleton className="aspect-[2/3] w-full" />
            <Skeleton className="mt-3 h-5 w-16" />
            <Skeleton className="mt-2 h-5 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <Skeleton className="mt-4 h-9 w-full" />
          </li>
        ))}
      </ul>
      <span className="sr-only">Loading books…</span>
    </div>
  )
}
