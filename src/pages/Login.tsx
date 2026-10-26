import { AuthLayout, LoginForm } from '@/components/auth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** Login page (mock auth). */
export default function Login() {
  useDocumentTitle('Log in')
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue. Demo only: any valid email and an 8+ character password work.">
      <LoginForm />
    </AuthLayout>
  )
}
