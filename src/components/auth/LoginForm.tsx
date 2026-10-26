import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { FormField } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { hasErrors, validEmail, type Errors } from '@/lib/validation'

type Field = 'email' | 'password' | 'form'

/** Mock login. Returns the user to the page they came from, or home. */
export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
  const [errors, setErrors] = useState<Errors<Field>>({})

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email') ?? '')
    const password = String(data.get('password') ?? '')

    const next: Errors<Field> = {}
    const emailError = validEmail(email)
    if (emailError) next.email = emailError
    if (!password) next.password = 'Password is required.'
    if (!hasErrors(next)) {
      const failure = login(email, password)
      if (failure) next.password = failure
    }
    setErrors(next)
    if (!hasErrors(next)) void navigate(from, { replace: true })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
      <FormField label="Password" name="password" type="password" autoComplete="current-password" error={errors.password} />
      <Button type="submit" size="lg" className="h-12 w-full text-base">Log in</Button>
      <p className="text-center text-sm text-muted-foreground">
        New here? <Link to="/register" state={{ from }} className="font-medium text-primary underline">Create an account</Link>
      </p>
    </form>
  )
}
