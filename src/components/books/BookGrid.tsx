import type { Book } from '@/types'
import { BookCard } from './BookCard'

/** Responsive grid: 2 columns on phones, scaling to 5 on wide desktops. */
export function BookGrid({ books, priorityCount = 0 }: { books: Book[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book, i) => (
        <li key={book.id}>
          <BookCard book={book} priority={i < priorityCount} headingAs="h2" />
        </li>
      ))}
    </ul>
  )
}
