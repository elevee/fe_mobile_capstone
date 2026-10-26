import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { OrderSummary } from '@/components/cart'
import { CheckoutForm } from '@/components/checkout'
import { Button, buttonVariants } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { formatPrice } from '@/lib/format'
import { getTotals } from '@/lib/pricing'

interface Order {
  id: string
  total: number
}

/** Checkout form + summary. Shows a confirmation after the (mock) order is placed. */
export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  useDocumentTitle(order ? 'Order confirmed' : 'Checkout')

  if (order) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center" role="status">
        <CheckCircle2 className="size-16 text-sage" aria-hidden="true" />
        <h1 className="text-3xl font-semibold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Order <strong className="text-foreground">{order.id}</strong> for {formatPrice(order.total)} is confirmed.
          This is a demo, so nothing will actually ship.
        </p>
        <Link to="/books" className={buttonVariants({ size: 'lg' })}>Keep browsing</Link>
      </div>
    )
  }

  if (items.length === 0) return <Navigate to="/cart" replace />

  const place = () => {
    setOrder({
      id: `PT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      total: getTotals(subtotal).total,
    })
    clearCart()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold sm:text-4xl">Checkout</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="rounded-xl border bg-card p-6">
          <CheckoutForm defaultName={user?.name} defaultEmail={user?.email} onSubmit={place} />
        </div>
        <aside aria-label="Order summary" className="rounded-xl border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
          <ul className="mb-4 divide-y text-sm">
            {items.map(({ book, quantity }) => (
              <li key={book.id} className="flex justify-between gap-3 py-2">
                <span className="min-w-0 truncate">{quantity} × {book.title}</span>
                <span>{formatPrice(book.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal} />
          <Button type="submit" form="checkout-form" size="lg" className="mt-6 hidden h-12 w-full text-base lg:inline-flex">
            Place order
          </Button>
        </aside>
      </div>
    </div>
  )
}
