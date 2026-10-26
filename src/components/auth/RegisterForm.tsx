import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { FormField } from '@/components/common'
import { Button } from '@/components/ui/button'
import { MIN_PASSWORD_LENGTH } from '@/context/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { hasErrors, required, validEmail, type Errors } from '@/lib/validation'

type Field = 'name' | 'email' | 'password' | 'confirm'

/** Mock registration; signs the new user in immediately. */
export function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
  const [errors, setErrors] = useState<Errors<Field>>({})

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const password = String(data.get('password') ?? '')
    const confirm = String(data.get('confirm') ?? '')

    const next: Errors<Field> = {}
    const nameError = required(name, 'Name')
    if (nameError) next.name = nameError
    const emailError = validEmail(email)
    if (emailError) next.email = emailError
    if (password.length < MIN_PASSWORD_LENGTH) next.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    if (confirm !== password) next.confirm = 'Passwords do not match.'

    setErrors(next)
    if (hasErrors(next)) return
    register(name, email, password)
    void navigate(from, { replace: true })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField label="Full name" name="name" autoComplete="name" error={errors.name} />
      <FormField label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
      <FormField label="Password" name="password" type="password" autoComplete="new-password" error={errors.password} />
      <FormField label="Confirm password" name="confirm" type="password" autoComplete="new-password" error={errors.confirm} />
      <Button type="submit" size="lg" className="h-12 w-full text-base">Create account</Button>
      <p className="text-center text-sm text-muted-foreground">
        Already registered? <Link to="/login" state={{ from }} className="font-medium text-primary underline">Log in</Link>
      </p>
    </form>
  )
}
