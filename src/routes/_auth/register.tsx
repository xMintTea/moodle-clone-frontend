import { grapCookie } from '#/auth/session'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
    beforeLoad: () => grapCookie()
})

function RouteComponent() {
  return <div>Hello "/_auth/register"!</div>
}
 