import { CourseChatPage } from '#/pages/CourseChatPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/course/$courseId/chat')({
  component: CourseChatPage,
})