import {queryOptions} from "@tanstack/react-query"
import assignmentService from "../services/assignmentService"
import { ASSIGNMENT_QUERY_KEYS } from "./queryKeys"

export function assignmentQueryOptions(assignmentId: string) {
    return queryOptions({
        queryKey: ASSIGNMENT_QUERY_KEYS.assignment(assignmentId),
        queryFn: () => assignmentService.fetchAssignment(assignmentId),
        staleTime: 1000 * 60 * 5
    })
}