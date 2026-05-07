import GradesPage from '#/pages/GradesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/grades')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GradesPage/>
}
