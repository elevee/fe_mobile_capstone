import { useId, type ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormFieldProps extends Omit<ComponentProps<'input'>, 'id'> {
  label: string
  error?: string
}

/** Label + input + inline error, wired together with aria-invalid / aria-describedby. */
export function FormField({ label, error, className, ...props }: FormFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className="mt-1.5 h-11 md:h-9"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
