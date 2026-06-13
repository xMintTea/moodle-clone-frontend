import { createFileRoute } from '@tanstack/react-router'
import {TestQueryOptions} from "#/features/tests/queries/testQueries"
import { QuizPage } from '#/pages/QuizPage'


export const Route = createFileRoute('/_app/course/$courseId/test/$testId/')({
  loader: async ({context,params: {testId}}) => {
      await context.queryClient.ensureQueryData(TestQueryOptions(testId))
    },
  component: QuizPage
})
