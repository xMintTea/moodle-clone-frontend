import './Course.css'

export default function Course() {
    return (
    <a>
        <div className="card">
            <div style={{ position: 'relative' }}>
                <img className='card-image' draggable='false'
                 src='https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'></img>
                <div className="badge badge-primary"
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px',
                    background: '#69fa69',
                  }}>
                    Код курса
                </div>
            </div>
            <div className="card-content">
                <h3 className="card-title">Имя курса</h3>
                <p className="card-description">Описание курса</p>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '14px', 
                    color: '#666',
                    marginBottom: '12px'}}>
                </div>
                <span>👨‍🏫</span>
                <span>Кабан Кабаныч</span>
            </div>
        </div>
    </a>
    )
}