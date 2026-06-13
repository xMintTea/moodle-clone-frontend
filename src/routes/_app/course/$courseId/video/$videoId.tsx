import { VideosQueryOptions } from '#/features/videos/queries/videoQuery'
import { VideoPage } from '#/pages/VideoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/course/$courseId/video/$videoId',
)({
  loader: async ({context, params: {courseId}}) => {
    await context.queryClient.ensureQueryData(VideosQueryOptions(courseId))
  },
  component: VideoPage,
})
