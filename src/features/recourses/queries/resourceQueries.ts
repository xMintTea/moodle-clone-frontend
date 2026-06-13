import { queryOptions } from "@tanstack/react-query";
import { RESOURCE_QUERY_KEYS } from "./queryKeys";
import resourceService from "../services/resourceService";


export function ResourceQueryOptions(resourceId: string) {
    return queryOptions({
        queryKey: RESOURCE_QUERY_KEYS.resource(resourceId),
        queryFn: () => resourceService.fetchResource(resourceId),
        staleTime: 1000 * 60 * 5
    })
}