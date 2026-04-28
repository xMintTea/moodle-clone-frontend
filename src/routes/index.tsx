import CourseListPage from '#/pages/CourseListPage'
import { createFileRoute } from '@tanstack/react-router'
import courseService from '#/features/course-list/services/courseService'
import { CoursesQueryOptions } from '#/features/course-list/queries/courseQueries'

export const Route = createFileRoute('/')({
  loader: async ({context}) => {
    await context.queryClient.ensureQueryData(CoursesQueryOptions())
  },
  staleTime: 1000 * 60 * 10,
  component: CourseListPage
})