import CourseCard from "#/features/course-list/components/CourseCard"
import { CoursesQueryOptions } from "#/features/course-list/queries/courseQueries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"


function CourseListPage() {

    const {data: courses} = useSuspenseQuery(CoursesQueryOptions())

    return (
        <div>
            <div className="mb-3">
                <h1 className="text-[32px] p-2 mb-1 text-zinc-700 font-bold">Мои курсы</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course}/>
                ))}
            </div>
        </div>

    )
}

export default CourseListPage