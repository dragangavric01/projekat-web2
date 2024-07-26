import './Hyperlink.css';
import {Link} from 'react-router-dom'


export const HyperlinkSize = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2
};


export default function Hyperlink({text, path, size, state}) {
    if (size == HyperlinkSize.SMALL || size == null) {
        return (
            <Link className='hyperlink-small' to={path} state={state}>{text}</Link>
        );
    } else if (size == HyperlinkSize.MEDIUM) {
        return (
            <Link className='hyperlink-medium' to={path} state={state}>{text}</Link>
        );
    } else if (size == HyperlinkSize.LARGE) {
        return (
            <Link className='hyperlink-large' to={path} state={state}>{text}</Link>
        );
    } 
}