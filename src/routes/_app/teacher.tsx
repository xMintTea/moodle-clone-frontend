import { TeacherPage } from '#/pages/TeacherPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/teacher')({
  component: TeacherPage,
})