export const FREE_SHIPPING_THRESHOLD = 35
export const FLAT_SHIPPING = 4.99
export const TAX_RATE = 0.07

/** Shipping is flat-rate, free over the threshold, and zero for an empty cart. */
export function calcShipping(subtotal: number): number {
  return subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING
}

/** Estimated tax, rounded to cents. */
export function calcTax(subtotal: number): number {
  return Math.round(subtotal * TAX_RATE * 100) / 100
}

/** Shipping, tax and grand total for a subtotal. */
export function getTotals(subtotal: number) {
  const shipping = calcShipping(subtotal)
  const tax = calcTax(subtotal)
  return { shipping, tax, total: subtotal + shipping + tax }
}
