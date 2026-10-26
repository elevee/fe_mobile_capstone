import { createContext } from 'react'
import type { Book, CartItem } from '@/types'

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (book: Book, quantity?: number) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
