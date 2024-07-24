import './Hyperlink.css';
import {Link} from 'react-router-dom'

export default function Hyperlink({text, path}) {
    return (
        <Link to={path}>{text}</Link>
    );
}