import { ResourceQueryOptions } from '#/features/recourses/queries/resourceQueries'
import { ResourcePage } from '#/pages/ResourcePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/course/$courseId/resource/$resourceId',
)({
  loader: async ({context, params: {resourceId}}) => {
    await context.queryClient.ensureQueryData(ResourceQueryOptions(resourceId))
  },
  component: ResourcePage,
})
