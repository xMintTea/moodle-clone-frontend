import { Link } from "react-router-dom";


export default function NotFoundBlock({header, body, to}) {

    return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>{header}</h2>
            <Link to={to} style={{ color: '#1976d2' }}>
            {body}
            </Link>
        </div>
    )

}