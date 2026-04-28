
export const COURSE_QUERY_KEYS = {
    courses: () => ["courses"] as const,
    course: (courseId: string) => ["course", courseId] as const
}