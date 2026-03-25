import "./Activity.css"

export default function Activity({page}) {

    const getActivityIcon = (type) => {
        switch (type) {
            case "video": return "🎥";
            case 'assignment': return '📝';
            case 'quiz': return '✅';
            case 'resource': return '📄';
            case 'forum': return '💬';
            default: return '📄';
        }
    }


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} >
                <span>{getActivityIcon(page?.type)}</span>
                <span style={{ fontWeight: '500' }} >{page?.title}</span>
                <span>Тип активности</span>
            </div>
            {page?.dueDate && (
                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }} >
                    Due: 
                </p>
            )}
            {page?.grade !== undefined && (
                <p style={{ fontSize: '14px', color: '#4caf50', marginTop: '4px' }} >
                    Grade: 
                </p>
            )}
        </div>
    )
}