import './Hyperlink.css';
import {Link} from 'react-router-dom'


export const HyperlinkSize = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2
};


export default function Hyperlink({text, path, size, textColor, state}) {
    if (size == HyperlinkSize.SMALL || size == null) {
        if (textColor == null) {
            return (
                <Link className='hyperlink-small' to={path} state={state}>{text}</Link>
            );
        } else {
            return (
                <Link className='hyperlink-small-nocolor' to={path} state={state} style={{color:textColor}}>{text}</Link>
            );        
        }
    } else if (size == HyperlinkSize.MEDIUM) {
        if (textColor == null) {
            return (
                <Link className='hyperlink-medium' to={path} state={state}>{text}</Link>
            );
        } else {
            return (
                <Link className='hyperlink-medium-nocolor' to={path} state={state} style={{color:textColor}}>{text}</Link>
            );        
        }
    } else if (size == HyperlinkSize.LARGE) {
        if (textColor == null) {
            return (
                <Link className='hyperlink-large' to={path} state={state}>{text}</Link>
            );
        } else {
            return (
                <Link className='hyperlink-large-nocolor' to={path} state={state} style={{color:textColor}}>{text}</Link>
            );        
        }
    } 
}