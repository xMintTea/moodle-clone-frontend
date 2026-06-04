import TestPage from '#/pages/TestPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/course/test/$testId/')({
  component: TestPage,
})
