

export default function AssignmentUploaderWrapper( {header, children} ) {
    return (
        <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>{header}</h2>
            {children}
        </div>
    )
}