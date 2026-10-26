import { SearchX } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { BookFilters, BookGrid, type FilterState } from '@/components/books'
import { Button } from '@/components/ui/button'
import { books } from '@/data/books'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { filterBooks } from '@/lib/filterBooks'
import { CATEGORIES, type SortOption } from '@/types'

const SORTS: SortOption[] = ['featured', 'price-asc', 'price-desc', 'rating', 'title']

/**
 * Product listing. All filter state lives in the URL query string so views are
 * shareable, bookmarkable, and survive back/forward navigation.
 */
export default function Books() {
  const [params, setParams] = useSearchParams()

  const rawCategory = params.get('category') ?? ''
  const rawSort = params.get('sort') ?? 'featured'
  const filters: FilterState = {
    query: params.get('q') ?? '',
    category: (CATEGORIES as readonly string[]).includes(rawCategory) ? rawCategory : '',
    minPrice: params.get('min') ?? '',
    maxPrice: params.get('max') ?? '',
    sort: (SORTS as string[]).includes(rawSort) ? (rawSort as SortOption) : 'featured',
  }

  useDocumentTitle(filters.category ? `${filters.category} books` : 'All books')

  const update = (patch: Partial<FilterState>) => {
    const next = { ...filters, ...patch }
    const out = new URLSearchParams()
    if (next.query) out.set('q', next.query)
    if (next.category) out.set('category', next.category)
    if (next.minPrice) out.set('min', next.minPrice)
    if (next.maxPrice) out.set('max', next.maxPrice)
    if (next.sort !== 'featured') out.set('sort', next.sort)
    setParams(out, { replace: true })
  }

  const results = useMemo(
    () => filterBooks(books, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.query, filters.category, filters.minPrice, filters.maxPrice, filters.sort],
  )

  const hasActiveFilters = Boolean(
    filters.query || filters.category || filters.minPrice || filters.maxPrice || filters.sort !== 'featured',
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold sm:text-4xl">{filters.category || 'All books'}</h1>

      <div className="mt-6">
        <BookFilters
          value={filters}
          onChange={update}
          onReset={() => setParams({}, { replace: true })}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'result' : 'results'}
      </p>

      <div className="mt-4">
        {results.length > 0 ? (
          <BookGrid books={results} priorityCount={4} />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
            <SearchX className="size-10 text-muted-foreground" aria-hidden="true" />
            <h2 className="text-xl font-semibold">No books match your search</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Try a different title or author, widen the price range, or clear your filters.
            </p>
            <Button variant="outline" className="h-11" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
