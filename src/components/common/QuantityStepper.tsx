import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MAX_QUANTITY } from '@/context/CartContext'

interface QuantityStepperProps {
  value: number
  onChange: (next: number) => void
  /** Accessible subject, e.g. the book title. */
  label: string
  min?: number
}

/** Accessible +/- control with 44px touch targets. */
export function QuantityStepper({ value, onChange, label, min = 1 }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={`Quantity for ${label}`}>
      <Button
        type="button"
        variant="outline"
        className="size-11 sm:size-9"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus aria-hidden="true" />
      </Button>
      <output className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </output>
      <Button
        type="button"
        variant="outline"
        className="size-11 sm:size-9"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  )
}
