import TestPage from '#/pages/TestPage'
import { createFileRoute } from '@tanstack/react-router'
import {TestQueryOptions, AttempsQueryOptions} from "#/features/tests/queries/testQueries"

export const Route = createFileRoute('/_app/course/test/$testId/')({
  loader: async ({context,params: {testId}}) => {
      await context.queryClient.ensureQueryData(TestQueryOptions(testId))
      await context.queryClient.ensureQueryData(AttempsQueryOptions(testId, "1"))
    },
  component: TestPage
})
