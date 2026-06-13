export const COURSE_REDACT_QUERY_KEYS = {
  course: (courseId: string) => ["course", courseId] as const,
  sections: (courseId: string) => ["sections", courseId] as const,
};