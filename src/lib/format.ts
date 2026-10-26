const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** Format a number as US dollars, e.g. `12.99` -> `$12.99`. */
export function formatPrice(value: number): string {
  return currency.format(value)
}

/** Open Library cover URL for an ISBN. `S`, `M` and `L` are the available sizes. */
export function coverUrl(isbn: string, size: 'S' | 'M' | 'L' = 'M'): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`
}
