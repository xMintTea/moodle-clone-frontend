

export const TEST_QUERY_KEYS = {
    tests: () => ["tests"] as const,
    test: (testId: string) => ["test", testId] as const,
    attemps: (testId: string, userId: string | null) => ["attemps", testId, userId]
}