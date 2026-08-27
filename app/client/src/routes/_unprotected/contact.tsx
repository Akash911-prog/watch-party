import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unprotected/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_unprotected/contact"!</div>
}
