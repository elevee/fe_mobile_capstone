/** Browsable book categories. */
export const CATEGORIES = [
  'Fiction',
  'Fantasy',
  'Mystery',
  'Science',
  'Non-Fiction',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Book {
  id: string
  title: string
  author: string
  /** Price in USD. */
  price: number
  category: Category
  /** Average rating from 0 to 5. */
  rating: number
  ratingCount: number
  pages: number
  year: number
  description: string
  /** ISBN-13, used to resolve cover art from the Open Library CDN. */
  isbn: string
  featured?: boolean
}

export interface CartItem {
  book: Book
  quantity: number
}

export interface User {
  name: string
  email: string
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'title'
