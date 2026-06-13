import { queryOptions } from "@tanstack/react-query";
import testService from "../services/quizService"
import { TEST_QUERY_KEYS } from "./queryKeys";

export function TestsQueryOptions() {
    return queryOptions({
        queryKey: TEST_QUERY_KEYS.tests(),
        queryFn: () => testService.fetchTests(),
        staleTime: 1000 * 60 * 5
    })
}

export function TestQueryOptions(testId: string) {
    return queryOptions({
        queryKey: TEST_QUERY_KEYS.test(testId),
        queryFn: () => testService.fetchTest(testId),
        staleTime: 1000 * 60 * 5
    })
}

export function AttempsQueryOptions(testId: string, userId: string | null) {
    return queryOptions({
        queryKey: TEST_QUERY_KEYS.attemps(testId, userId),
        queryFn: () => testService.fetchAttemps(testId, userId),
        staleTime: 1000 * 60 * 5
    })
}


export function AttempsByCourseQueryOptions(userId: string, course_id: string) {
    return queryOptions({
        queryKey: TEST_QUERY_KEYS.attemptsCourse(userId, course_id),
        queryFn: () => testService.fetchAttempsCourse(userId, course_id),
        staleTime: 1000 * 60 * 5
    })
}
