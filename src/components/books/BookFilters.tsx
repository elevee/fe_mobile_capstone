import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CATEGORIES, type SortOption } from '@/types'

export interface FilterState {
  query: string
  category: string
  minPrice: string
  maxPrice: string
  sort: SortOption
}

interface BookFiltersProps {
  value: FilterState
  onChange: (patch: Partial<FilterState>) => void
  onReset: () => void
  hasActiveFilters: boolean
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'title', label: 'Title: A to Z' },
]

const selectClass =
  'h-11 w-full rounded-lg border border-input bg-card px-2.5 text-base md:h-9 md:text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none'

/** Search, category pills, price range, and sort. Fully controlled by the parent. */
export function BookFilters({ value, onChange, onReset, hasActiveFilters }: BookFiltersProps) {
  return (
    <section aria-label="Filter and sort books" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="search">Search title or author</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="search"
              type="search"
              inputMode="search"
              placeholder="e.g. Tolkien"
              className="h-11 pl-9 md:h-9"
              value={value.query}
              onChange={(e) => onChange({ query: e.target.value })}
            />
          </div>
        </div>

        <fieldset className="space-y-1.5">
          <legend className="text-sm leading-none font-medium">Price range ($)</legend>
          <div className="flex items-center gap-2 pt-1.5">
            <Input
              aria-label="Minimum price"
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="Min"
              className="h-11 w-full md:h-9 md:w-24"
              value={value.minPrice}
              onChange={(e) => onChange({ minPrice: e.target.value })}
            />
            <span aria-hidden="true">–</span>
            <Input
              aria-label="Maximum price"
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="Max"
              className="h-11 w-full md:h-9 md:w-24"
              value={value.maxPrice}
              onChange={(e) => onChange({ maxPrice: e.target.value })}
            />
          </div>
        </fieldset>

        <div className="space-y-1.5">
          <Label htmlFor="sort">Sort by</Label>
          <select
            id="sort"
            className={cn(selectClass, 'md:w-48')}
            value={value.sort}
            onChange={(e) => onChange({ sort: e.target.value as SortOption })}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div
          role="group"
          aria-label="Category"
          className="scrollbar-none -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {['All', ...CATEGORIES].map((c) => {
            const active = (c === 'All' ? '' : c) === value.category
            return (
              <Button
                key={c}
                type="button"
                variant={active ? 'default' : 'outline'}
                className="h-11 shrink-0 rounded-full px-4 sm:h-9"
                aria-pressed={active}
                onClick={() => onChange({ category: c === 'All' ? '' : c })}
              >
                {c}
              </Button>
            )
          })}
        </div>
        {hasActiveFilters && (
          <Button type="button" variant="ghost" className="h-11 shrink-0 sm:h-9" onClick={onReset}>
            <X aria-hidden="true" /> Reset
          </Button>
        )}
      </div>
    </section>
  )
}
