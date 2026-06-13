import TestAttemptPage from '#/pages/TestAttemptPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/course/$courseId/test/$testId/attempt/')({
  component: TestAttemptPage
})
