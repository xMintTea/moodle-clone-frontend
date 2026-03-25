import { Link } from "react-router-dom"
import Activity from "../Activity/Activity"


export default function Module({section}) {

    return (
        <>
        
        <div className="module">
        <div className="module-header">{section?.title}</div>
        <div>
            {section?.pages.map((page) => (
                <div key={page.id} className="activity-item">
                    <span style={{ fontSize: '20px' }} >
                        {page.completed ? '✓' : '○'}
                    </span>
                    {page.type !== 0 ? (
                        <Link to={`/course/${section.course_id}/assignment/${page.id}`}
                        style={{ 
                            flex: 1, 
                            textDecoration: 'none', 
                            color: 'inherit' 
                      }}>
                            <Activity page={page}></Activity>
                        </Link>
                    ) : (
                        <Activity page={page}></Activity>
                    ) }
                </div>
            ))}
        </div>
    </div>
    </>
    )
}