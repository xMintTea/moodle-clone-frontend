import Badge from "#/components/Badge"
import Card from "#/components/Card"
import CourseSection from "#/features/course-content/components/CourseSection"
import { CourseQueryOptions } from "#/features/course-list/queries/courseQueries";
import { Route } from "#/routes/course/$courseId";
import { useSuspenseQuery } from "@tanstack/react-query";




function CoursePage() {
    const {courseId} = Route.useParams()
    const {data: course} = useSuspenseQuery(CourseQueryOptions(courseId))


    return (
        <div>
            <div>{JSON.stringify(course)}</div>
            <Card className="mb-4">
                <div className="relative h-[200px]">
                    <img src="" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <Badge>{course.id}</Badge>
                        <h1 className="text-[28px] mb-1">{course.name}</h1>
                        <p className="course-teacher opacity-90">Учитель</p>
                    </div>
                </div>
                <div className="p-6">
                    <p className="mb-4">{course.description}</p>
                </div>
            </Card>
            <div className="flex flex-col gap-4">
                {course.sections.map(section => (
                    <CourseSection key={section.id} section={section} />
                ))}
            </div>
        </div>
    )
}


export default CoursePage