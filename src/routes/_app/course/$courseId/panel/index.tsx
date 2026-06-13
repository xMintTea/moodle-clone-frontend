import CoursePanel from '#/pages/CoursePanel'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'


const searchSchema = z.object({
  group: z.string().optional(),
  studentId: z.string().optional(),
})



export const Route = createFileRoute('/_app/course/$courseId/panel/')({
  validateSearch: searchSchema,
  component: CoursePanel,
})

