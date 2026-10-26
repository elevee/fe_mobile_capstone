import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import { CartItemRow, OrderSummary } from '@/components/cart'
import { Button, buttonVariants } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { cn } from '@/lib/utils'

/** Cart review page with an order summary that sticks beside the list on desktop. */
export default function Cart() {
  const { items, subtotal, totalItems, clearCart } = useCart()
  useDocumentTitle('Your cart')

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingBag className="size-14 text-muted-foreground" aria-hidden="true" />
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground">Looks like you haven't added any books yet.</p>
        <Link to="/books" className={buttonVariants({ size: 'lg' })}>Browse books</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Your cart <span className="text-lg font-normal text-muted-foreground">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </h1>
        <Button variant="ghost" className="h-11 sm:h-9" onClick={clearCart}>Clear cart</Button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <ul className="divide-y rounded-xl border bg-card px-4 sm:px-6" aria-label="Cart items">
          {items.map((item) => <CartItemRow key={item.book.id} item={item} />)}
        </ul>

        <aside aria-label="Order summary" className="rounded-xl border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
          <OrderSummary subtotal={subtotal} />
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/checkout" className={cn(buttonVariants({ size: 'lg' }), 'h-12 text-base')}>
              Proceed to checkout
            </Link>
            <Link to="/books" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12')}>
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
