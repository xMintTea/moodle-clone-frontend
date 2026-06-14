
export const ASSIGNMENT_QUERY_KEYS = {
    assignment: (assignmentId: string) => ["assignment", assignmentId] as const,
    submission: (assignmentId: string, userId: string) => ["submission", assignmentId, userId]
}