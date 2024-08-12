import './Button.css';
import { useNavigate } from 'react-router-dom';


export const ButtonSize = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2
};


export function NavigationButton({text, size, navigateTo, state}) {
    const nav=useNavigate();

    if (size == ButtonSize.SMALL || size == null) {
        return (
            <button  className='btn-small' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
        );
    } else if (size == ButtonSize.MEDIUM) {
        return (
            <button  className='btn-medium' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
        );
    } else if (size == ButtonSize.LARGE) {
        return (
            <button  className='btn-large' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
        );
    } 
}

export function HandlerButton({text, size, handler}) {
    if (size == ButtonSize.SMALL || size == null) {
        return (
            <button  className='btn-small' onClick={handler}>{text}</button>
        );
    } else if (size == ButtonSize.MEDIUM) {
        return (
            <button  className='btn-medium' onClick={handler}>{text}</button>
        );
    } else if (size == ButtonSize.LARGE) {
        return (
            <button  className='btn-large' onClick={handler}>{text}</button>
        );
    } 
}