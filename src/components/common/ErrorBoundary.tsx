import { Component, type ErrorInfo, type ReactNode } from 'react'

interface State { failed: boolean }

/** Last-resort boundary so a render error shows a recovery screen instead of a blank page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', { message: error.message, componentStack: info.componentStack })
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">An unexpected error occurred. Reloading usually fixes it.</p>
        <button className="h-11 rounded-lg bg-primary px-5 text-primary-foreground" onClick={() => window.location.assign('/')}>
          Reload the store
        </button>
      </div>
    )
  }
}
