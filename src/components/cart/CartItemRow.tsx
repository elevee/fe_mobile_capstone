import { Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { BookCover } from '@/components/books'
import { QuantityStepper } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import type { CartItem } from '@/types'

/** One cart line: cover, details, quantity, line total, and remove. */
export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()
  const { book, quantity } = item

  return (
    <li className="flex gap-4 py-5">
      <Link to={`/books/${book.id}`} className="w-20 shrink-0 sm:w-24" aria-label={`View ${book.title}`}>
        <BookCover book={book} size="S" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold">
              <Link to={`/books/${book.id}`} className="hover:underline">{book.title}</Link>
            </h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="mt-1 text-sm text-muted-foreground">{formatPrice(book.price)} each</p>
          </div>
          <p className="font-bold text-primary">{formatPrice(book.price * quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <QuantityStepper value={quantity} onChange={(n) => updateQuantity(book.id, n)} label={book.title} />
          <Button
            variant="ghost"
            className="h-11 text-destructive sm:h-9"
            onClick={() => removeItem(book.id)}
            aria-label={`Remove ${book.title} from cart`}
          >
            <Trash2 aria-hidden="true" /> <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>
    </li>
  )
}
