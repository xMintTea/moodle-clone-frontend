import { CourseQueryOptions } from '#/features/course-list/queries/courseQueries'
import CoursePage from '#/pages/CoursePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/course/$courseId')({
  loader: async ({context,params: {courseId}}) => {
    await context.queryClient.ensureQueryData(CourseQueryOptions(courseId))
  },
  component: CoursePage,
})
