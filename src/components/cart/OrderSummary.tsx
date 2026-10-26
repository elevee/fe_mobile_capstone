import { formatPrice } from '@/lib/format'
import { FREE_SHIPPING_THRESHOLD, getTotals } from '@/lib/pricing'

/** Itemised totals with a free-shipping progress hint. */
export function OrderSummary({ subtotal }: { subtotal: number }) {
  const { shipping, tax, total } = getTotals(subtotal)
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
        <div className="flex justify-between"><dt>Estimated tax</dt><dd>{formatPrice(tax)}</dd></div>
        <div className="flex justify-between border-t pt-3 text-base font-bold">
          <dt>Total</dt><dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {remaining > 0 && subtotal > 0 && (
        <p className="mt-3 rounded-md bg-accent px-3 py-2 text-sm">
          Add <strong>{formatPrice(remaining)}</strong> more for free shipping.
        </p>
      )}
    </div>
  )
}
