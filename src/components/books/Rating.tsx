import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  count?: number
}

/** Star rating. Exposes a single text label to assistive tech instead of five icons. */
export function Rating({ value, count }: RatingProps) {
  const label = `Rated ${value.toFixed(1)} out of 5${count ? ` from ${count.toLocaleString()} reviews` : ''}`
  return (
    <div className="flex items-center gap-1.5 text-sm" role="img" aria-label={label}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={
              n <= Math.round(value)
                ? 'size-4 fill-gold text-gold'
                : 'size-4 text-border'
            }
          />
        ))}
      </span>
      <span className="font-medium" aria-hidden="true">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground" aria-hidden="true">({count.toLocaleString()})</span>
      )}
    </div>
  )
}
