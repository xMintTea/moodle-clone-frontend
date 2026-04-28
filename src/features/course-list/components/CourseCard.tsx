import Badge from '#/components/Badge';
import Card from '#/components/Card';
import { Link } from '@tanstack/react-router';

interface Course {
  id: string;
  name: string;
  description: string;
  teachers?: Array<{ first_name: string; middle_name: string }>;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard( {course} : CourseCardProps) {
  return (
    <Link to={`/course/$courseId`} params={{courseId: course.id}} draggable="false" className="no-underline text-inherit">
      <Card>
        <div className="relative">
          <Card.Image
            src={'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'}
            alt=""
          />
          <Badge variant="primary" className="absolute top-3 left-3">
            {course.id}
          </Badge>
        </div>
        <Card.Content>
          <Card.Title>{course.name}</Card.Title>
          <Card.Description>{course.description}</Card.Description>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>👨‍🏫</span>
            <span>
                {course.teachers && course.teachers.length > 0 ?
                 `${course.teachers[0].first_name} ${course.teachers[0].middle_name}` :
                  "Нет учителя"}
            </span>
          </div>
        </Card.Content>
      </Card>
    </Link>
  );
}