import { queryOptions } from "@tanstack/react-query";
import { VIDEO_QUERY_KEYS } from "./queryKeys";
import videoService from "../services/videoService"

export function VideosQueryOptions(courseId: string | null) {
    return queryOptions({
        queryKey: VIDEO_QUERY_KEYS.videos(courseId),
        queryFn: () => videoService.fetchVideos(courseId),
        staleTime: 1000 * 60 * 5
    })
}