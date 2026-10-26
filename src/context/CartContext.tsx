import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { getBookById } from '@/data/books'
import type { Book, CartItem } from '@/types'
import { CartContext, type CartContextValue } from './cart-context'

const STORAGE_KEY = 'pageturner.cart.v1'
export const MAX_QUANTITY = 10

type Action =
  | { type: 'add'; book: Book; quantity: number }
  | { type: 'remove'; bookId: string }
  | { type: 'set'; bookId: string; quantity: number }
  | { type: 'clear' }

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(n)))

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.book.id === action.book.id)
      if (!existing) {
        return [...state, { book: action.book, quantity: clamp(action.quantity) }]
      }
      return state.map((i) =>
        i.book.id === action.book.id
          ? { ...i, quantity: clamp(i.quantity + action.quantity) }
          : i,
      )
    }
    case 'remove':
      return state.filter((i) => i.book.id !== action.bookId)
    case 'set':
      return action.quantity < 1
        ? state.filter((i) => i.book.id !== action.bookId)
        : state.map((i) =>
            i.book.id === action.bookId ? { ...i, quantity: clamp(action.quantity) } : i,
          )
    case 'clear':
      return []
  }
}

/** Restore the cart from localStorage, re-validating every entry against the catalogue. */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((entry): CartItem[] => {
      const { id, quantity } = (entry ?? {}) as { id?: unknown; quantity?: unknown }
      const book = typeof id === 'string' ? getBookById(id) : undefined
      return book && typeof quantity === 'number' && quantity >= 1
        ? [{ book, quantity: clamp(quantity) }]
        : []
    })
  } catch {
    return []
  }
}

/** Provides cart state and actions. Only book ids and quantities are persisted. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map((i) => ({ id: i.book.id, quantity: i.quantity }))),
      )
    } catch {
      /* storage unavailable (private mode / quota): cart stays in memory */
    }
  }, [items])

  const addItem = useCallback(
    (book: Book, quantity = 1) => dispatch({ type: 'add', book, quantity }),
    [],
  )
  const removeItem = useCallback((bookId: string) => dispatch({ type: 'remove', bookId }), [])
  const updateQuantity = useCallback(
    (bookId: string, quantity: number) => dispatch({ type: 'set', bookId, quantity }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.quantity * i.book.price, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext value={value}>{children}</CartContext>
}
