import { queryOptions } from "@tanstack/react-query";
import { COURSE_QUERY_KEYS } from "./queryKeys";
import courseService from "../services/courseService";


export function CoursesQueryOptions() {
    return queryOptions({
        queryKey: COURSE_QUERY_KEYS.courses(),
        queryFn: () => courseService.fetchCourses(),
        staleTime: 1000 * 60 * 5
    })
}

export function CourseQueryOptions(courseId: string) {
    return queryOptions({
        queryKey: COURSE_QUERY_KEYS.course(courseId),
        queryFn: () => courseService.fetchCourse(courseId),
        staleTime: 1000 * 60 * 5
    })
}