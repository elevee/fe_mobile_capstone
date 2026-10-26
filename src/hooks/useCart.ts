import { use } from 'react'
import { CartContext } from '@/context/cart-context'

/** Access the cart. Must be called inside `<CartProvider>`. */
export function useCart() {
  const ctx = use(CartContext)
  if (!ctx) throw new Error('useCart must be used within a <CartProvider>')
  return ctx
}
