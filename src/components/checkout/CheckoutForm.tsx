import { useState, type SubmitEvent } from 'react'
import { FormField } from '@/components/common'
import { Button } from '@/components/ui/button'
import { hasErrors, luhn, required, validEmail, type Errors } from '@/lib/validation'

type Field =
  | 'name' | 'email' | 'address' | 'city' | 'zip' | 'country'
  | 'cardName' | 'cardNumber' | 'expiry' | 'cvv'

interface CheckoutFormProps {
  defaultName?: string
  defaultEmail?: string
  onSubmit: () => void
}

/** Format as groups of four digits, max 16 digits. */
const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
/** Format as MM/YY. */
const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

function validateExpiry(v: string): string | undefined {
  const m = /^(\d{2})\/(\d{2})$/.exec(v)
  if (!m) return 'Use MM/YY format.'
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return 'Enter a valid month.'
  const now = new Date()
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
    return 'This card has expired.'
  }
}

/**
 * Mock checkout form. Card fields are validated for shape only: values are read
 * once on submit, never stored, logged, or transmitted.
 */
export function CheckoutForm({ defaultName = '', defaultEmail = '', onSubmit }: CheckoutFormProps) {
  const [errors, setErrors] = useState<Errors<Field>>({})
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const get = (k: string) => String(d.get(k) ?? '')
    const next: Errors<Field> = {}
    const set = (k: Field, msg: string | undefined) => { if (msg) next[k] = msg }

    set('name', required(get('name'), 'Full name'))
    set('email', validEmail(get('email')))
    set('address', required(get('address'), 'Address', 200))
    set('city', required(get('city'), 'City'))
    set('country', required(get('country'), 'Country'))
    set('cardName', required(get('cardName'), 'Name on card'))
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(get('zip').trim())) next.zip = 'Enter a valid postal code.'
    const digits = card.replace(/\D/g, '')
    if (digits.length < 13 || !luhn(digits)) next.cardNumber = 'Enter a valid card number (try 4242 4242 4242 4242).'
    set('expiry', validateExpiry(expiry))
    if (!/^\d{3,4}$/.test(get('cvv'))) next.cvv = 'Enter a 3 or 4 digit code.'

    setErrors(next)
    if (hasErrors(next)) {
      // Move focus to the first invalid field for keyboard / screen-reader users.
      // Wait for React to render the error state, then focus the first invalid field.
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8" id="checkout-form">
      <fieldset className="space-y-4">
        <legend className="mb-2 font-heading text-xl font-semibold">Shipping</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" name="name" autoComplete="name" defaultValue={defaultName} error={errors.name} />
          <FormField label="Email" name="email" type="email" autoComplete="email" defaultValue={defaultEmail} error={errors.email} />
        </div>
        <FormField label="Address" name="address" autoComplete="street-address" error={errors.address} />
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="City" name="city" autoComplete="address-level2" error={errors.city} />
          <FormField label="Postal code" name="zip" autoComplete="postal-code" error={errors.zip} />
          <FormField label="Country" name="country" autoComplete="country-name" error={errors.country} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-heading text-xl font-semibold">Payment</legend>
        <p className="rounded-md bg-accent px-3 py-2 text-sm">
          Demo store: no payment is processed. Use any future expiry and the test card <code>4242 4242 4242 4242</code>.
        </p>
        <FormField label="Name on card" name="cardName" autoComplete="cc-name" error={errors.cardName} />
        <FormField
          label="Card number"
          name="cardNumber"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          value={card}
          onChange={(e) => setCard(formatCard(e.target.value))}
          error={errors.cardNumber}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Expiry (MM/YY)"
            name="expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="08/29"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            error={errors.expiry}
          />
          <FormField label="CVV" name="cvv" type="password" inputMode="numeric" autoComplete="cc-csc" maxLength={4} error={errors.cvv} />
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="h-12 w-full text-base lg:hidden">Place order</Button>
    </form>
  )
}
