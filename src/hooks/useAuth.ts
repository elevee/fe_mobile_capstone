import { use } from 'react'
import { AuthContext } from '@/context/auth-context'

/** Access auth state. Must be called inside `<AuthProvider>`. */
export function useAuth() {
  const ctx = use(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>')
  return ctx
}
