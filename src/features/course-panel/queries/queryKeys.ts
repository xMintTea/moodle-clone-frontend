export const USERS_QUERY_KEYS = {
    users: (course_id: string | null, groupName: string | null) =>
        ["users", course_id, groupName]
}