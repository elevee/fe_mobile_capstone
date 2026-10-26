import { ArrowLeft, Check, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { BookCard, BookCover, Rating } from '@/components/books'
import { QuantityStepper } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { getBookById, getRelatedBooks } from '@/data/books'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatPrice } from '@/lib/format'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/pricing'
import NotFound from './NotFound'

/** Product detail with quantity selector, add-to-cart, and related books. */
export default function BookDetail() {
  const { id = '' } = useParams()
  const book = getBookById(id)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  useDocumentTitle(book?.title ?? 'Book not found')

  if (!book) {
    return (
      <NotFound
        title="Book not found"
        message="We couldn't find that title. It may have moved or never existed."
        linkTo="/books"
        linkLabel="Back to books"
      />
    )
  }

  const related = getRelatedBooks(book)

  const handleAdd = () => {
    addItem(book, quantity)
    toast.success(`Added ${quantity} × "${book.title}" to your cart`, {
      action: { label: 'View cart', onClick: () => void navigate('/cart') },
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/books" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden="true" /> All books
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <BookCover book={book} size="L" priority className="shadow-xl" />
        </div>

        <div className="space-y-5">
          <div>
            <Badge variant="secondary">{book.category}</Badge>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{book.title}</h1>
            <p className="mt-1 text-lg text-muted-foreground">by {book.author}</p>
          </div>

          <Rating value={book.rating} count={book.ratingCount} />

          <p className="text-3xl font-bold text-primary">{formatPrice(book.price)}</p>

          <p className="max-w-prose leading-relaxed text-foreground/85">{book.description}</p>

          <dl className="grid max-w-sm grid-cols-3 gap-4 border-y py-4 text-sm">
            <div><dt className="text-muted-foreground">Pages</dt><dd className="font-medium">{book.pages}</dd></div>
            <div><dt className="text-muted-foreground">Published</dt><dd className="font-medium">{book.year}</dd></div>
            <div><dt className="text-muted-foreground">ISBN</dt><dd className="font-medium">{book.isbn}</dd></div>
          </dl>

          <div className="flex flex-wrap items-center gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} label={book.title} />
            <Button size="lg" className="h-12 flex-1 px-6 text-base sm:flex-none" onClick={handleAdd}>
              <ShoppingCart aria-hidden="true" /> Add to cart · {formatPrice(book.price * quantity)}
            </Button>
          </div>

          <p className="flex items-center gap-2 text-sm text-sage">
            <Check className="size-4" aria-hidden="true" />
            Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
          </p>
          <Link to="/cart" className={buttonVariants({ variant: 'link' })}>Go to cart</Link>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16">
          <h2 id="related-heading" className="text-2xl font-semibold">You may also like</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((b) => (
              <li key={b.id}><BookCard book={b} /></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
