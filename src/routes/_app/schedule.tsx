import { SchedulePage } from '#/pages/SchedulePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/schedule')({
  component: SchedulePage,
})