import { useEffect } from 'react'

const SITE = 'PageTurner'

/** Set `document.title` for the current page (a11y: announces route changes). */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Books worth turning pages for`
  }, [title])
}
