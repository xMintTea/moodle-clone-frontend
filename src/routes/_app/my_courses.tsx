import CourseListPage from '#/pages/CourseListPage'
import { createFileRoute } from '@tanstack/react-router'
import { CoursesQueryOptions } from '#/features/course-list/queries/courseQueries'

export const Route = createFileRoute('/_app/my_courses')({
  loader: async ({context}) => {
    await context.queryClient.ensureQueryData(CoursesQueryOptions())
  },
  staleTime: 1000 * 60 * 10,
  component: CourseListPage
})