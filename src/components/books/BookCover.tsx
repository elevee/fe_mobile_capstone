import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { coverUrl } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Book } from '@/types'

interface BookCoverProps {
  book: Book
  size?: 'S' | 'M' | 'L'
  /** Above-the-fold covers should load eagerly for a better LCP. */
  priority?: boolean
  className?: string
}

/** Cover image with a fixed 2:3 aspect ratio (no layout shift) and a typographic fallback. */
export function BookCover({ book, size = 'M', priority = false, className }: BookCoverProps) {
  const [failed, setFailed] = useState(false)
  const frame = cn('aspect-[2/3] w-full overflow-hidden rounded-md bg-parchment shadow-md', className)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`Cover of ${book.title}`}
        className={cn(frame, 'flex flex-col items-center justify-center gap-2 bg-primary p-3 text-center text-primary-foreground')}
      >
        <BookOpen className="size-6 text-gold" aria-hidden="true" />
        <span className="font-heading text-sm leading-tight">{book.title}</span>
      </div>
    )
  }

  return (
    <div className={frame}>
      <img
        src={coverUrl(book.isbn, size)}
        alt={`Cover of ${book.title} by ${book.author}`}
        width={200}
        height={300}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={() => setFailed(true)}
        className="size-full object-cover"
      />
    </div>
  )
}
