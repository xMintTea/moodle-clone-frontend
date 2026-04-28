import AssignmentPage from '#/pages/AssignmentPage'
import { createFileRoute } from '@tanstack/react-router'
import { assignmentQueryOptions } from '#/features/assignment-content/queries/assignmentQueries'

export const Route = createFileRoute('/course/assignment/$assignmentId')({
  loader: async ({params : {assignmentId}, context}) => {
    await context.queryClient.ensureQueryData(assignmentQueryOptions(assignmentId))
  },
  component: AssignmentPage,
})