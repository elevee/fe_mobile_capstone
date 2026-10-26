import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import type { Book } from '@/types'
import { BookCover } from './BookCover'
import { Rating } from './Rating'

interface BookCardProps {
  book: Book
  /** Eager-load the cover (use for the first row above the fold). */
  priority?: boolean
  /** Heading element for the title; match the surrounding outline (h2 under an h1, h3 under an h2). */
  headingAs?: 'h2' | 'h3'
}

/** Product tile used on the homepage, listing, and "you may also like". */
export function BookCard({ book, priority = false, headingAs: Heading = 'h3' }: BookCardProps) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem(book)
    toast.success(`Added "${book.title}" to your cart`)
  }

  return (
    <article className="group flex h-full flex-col rounded-xl border bg-card p-3 transition-shadow hover:shadow-lg sm:p-4">
      <Link to={`/books/${book.id}`} className="block rounded-md" aria-label={`${book.title} by ${book.author}`}>
        <BookCover
          book={book}
          priority={priority}
          className="transition-transform duration-300 group-hover:-translate-y-1"
        />
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <Badge variant="secondary" className="w-fit">{book.category}</Badge>
        <Heading className="line-clamp-2 text-base leading-snug font-semibold">
          <Link to={`/books/${book.id}`} className="hover:underline">{book.title}</Link>
        </Heading>
        <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
        <Rating value={book.rating} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-bold text-primary">{formatPrice(book.price)}</span>
          <Button onClick={handleAdd} className="h-11 px-3 sm:h-9" aria-label={`Add ${book.title} to cart`}>
            <ShoppingCart aria-hidden="true" />
            <span className="hidden min-[400px]:inline">Add</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
