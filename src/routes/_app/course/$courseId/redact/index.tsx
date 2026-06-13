import CourseRedact from '#/pages/CourseRedact'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/course/$courseId/redact/')({
  component: CourseRedact,
})
