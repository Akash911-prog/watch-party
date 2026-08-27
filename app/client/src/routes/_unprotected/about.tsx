import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unprotected/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_unprotected/about"!</div>
}
