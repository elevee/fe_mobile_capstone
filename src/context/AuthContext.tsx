import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import { AuthContext, type AuthContextValue } from './auth-context'

export const MIN_PASSWORD_LENGTH = 8

/**
 * Demo-only authentication. There is no backend: accounts live in memory for the
 * session and passwords are validated for shape but never stored or persisted.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const accounts = useRef(new Map<string, User>())

  const login = useCallback((email: string, password: string) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    }
    const key = email.trim().toLowerCase()
    const known = accounts.current.get(key)
    setUser(known ?? { name: key.split('@')[0] ?? 'Reader', email: key })
    return null
  }, [])

  const register = useCallback((name: string, email: string, password: string) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    }
    const account = { name: name.trim(), email: email.trim().toLowerCase() }
    accounts.current.set(account.email, account)
    setUser(account)
    return null
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
