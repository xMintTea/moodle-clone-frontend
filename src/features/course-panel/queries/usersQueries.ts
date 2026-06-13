import { queryOptions } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from "./queryKeys";
import coursePanelService from "../services/coursePanelService";


export function UsersQueryOptions(course_id: string | null, groupName: string | null) {
    return queryOptions({
        queryKey: USERS_QUERY_KEYS.users(course_id, groupName),
        queryFn: () => coursePanelService.fetchUsers(course_id, groupName),
        staleTime: 1000 * 60 * 5
    })
}