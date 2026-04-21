import { Link } from 'react-router-dom'
import './Course.css'
import Badge from '../Badge/Badge'

export default function Course(props) {
    return (
    <Link
        to={`/course/${props.course.id}`}
        style={{textDecoration: "none", color: "inherit"}}
    >
        <div className="card">
            <div style={{ position: 'relative' }}>
                <img className='card-image' draggable='false'
                 src='https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'></img>
                <Badge className="course-code">
                    {props.course.id}
                </Badge>
            </div>
            <div className="card-content">
                <h3 className="card-title">{props.course.name}</h3>
                <p className="card-description">{props.course.description}</p>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '14px', 
                    color: '#666',
                    marginBottom: '12px'}}>
                </div>
                <span>👨‍🏫</span>
                <span>
                    {props.course.teachers?.length > 0
                    ? `${props.course.teachers[0].first_name} ${props.course.teachers[0].middle_name}`
                    : "Нет учителя"}
                </span>
            </div>
        </div>
    </Link>
    )
}