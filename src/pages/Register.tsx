import { AuthLayout, RegisterForm } from '@/components/auth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** Registration page (mock auth). */
export default function Register() {
  useDocumentTitle('Create account')
  return (
    <AuthLayout title="Create your account" subtitle="Join PageTurner. Demo only: nothing is stored or sent anywhere.">
      <RegisterForm />
    </AuthLayout>
  )
}
