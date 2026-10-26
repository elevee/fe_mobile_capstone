import { createContext } from 'react'
import type { User } from '@/types'

export interface AuthContextValue {
  user: User | null
  /** Resolves with an error message, or `null` on success. */
  login: (email: string, password: string) => string | null
  register: (name: string, email: string, password: string) => string | null
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
