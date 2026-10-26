import type { Book, SortOption } from '@/types'

export interface BookQuery {
  query: string
  category: string
  minPrice: string
  maxPrice: string
  sort: SortOption
}

const toNumber = (v: string): number | null => {
  if (v.trim() === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

/** Pure filter + sort used by the listing page. Trims and lowercases the search term. */
export function filterBooks(all: Book[], q: BookQuery): Book[] {
  const term = q.query.trim().toLowerCase()
  const min = toNumber(q.minPrice)
  const max = toNumber(q.maxPrice)

  const result = all.filter(
    (b) =>
      (!term || b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)) &&
      (!q.category || b.category === q.category) &&
      (min === null || b.price >= min) &&
      (max === null || b.price <= max),
  )

  switch (q.sort) {
    case 'price-asc':
      return result.toSorted((a, b) => a.price - b.price)
    case 'price-desc':
      return result.toSorted((a, b) => b.price - a.price)
    case 'rating':
      return result.toSorted((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount)
    case 'title':
      return result.toSorted((a, b) => a.title.localeCompare(b.title))
    default:
      return result
  }
}
