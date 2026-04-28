import GradesPage from '#/pages/GradesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/grades')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GradesPage/>
}
