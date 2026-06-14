import { CourseSearchPage } from '#/pages/CourseSearchPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/courses')({
  component: CourseSearchPage,
})