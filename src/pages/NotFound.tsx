import { Compass } from 'lucide-react'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface NotFoundProps {
  title?: string
  message?: string
  linkTo?: string
  linkLabel?: string
}

/** 404 view, reused for unknown routes and unknown book ids. */
export default function NotFound({
  title = 'Page not found',
  message = "The page you're looking for doesn't exist.",
  linkTo = '/',
  linkLabel = 'Back to home',
}: NotFoundProps) {
  useDocumentTitle(title)
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <Compass className="size-14 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
      <Link to={linkTo} className={buttonVariants({ size: 'lg' })}>{linkLabel}</Link>
    </div>
  )
}
