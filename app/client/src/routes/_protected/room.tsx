import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/room')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/room"!</div>
}
