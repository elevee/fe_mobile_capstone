export type Errors<T extends string> = Partial<Record<T, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Required, trimmed, length-bounded text. */
export function required(value: string, label: string, max = 100): string | undefined {
  const v = value.trim()
  if (!v) return `${label} is required.`
  if (v.length > max) return `${label} must be ${max} characters or fewer.`
}

export function validEmail(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'Email is required.'
  if (v.length > 254 || !EMAIL.test(v)) return 'Enter a valid email address.'
}

/** Luhn checksum for demo card-number sanity checking. */
export function luhn(digits: string): boolean {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

export const hasErrors = (e: object) => Object.keys(e).length > 0
