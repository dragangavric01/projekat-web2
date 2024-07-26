import './Button.css';
import { useNavigate } from 'react-router-dom';


export const ButtonSize = {
    SMALL: 0,
    MEDIUM: 1,
    LARGE: 2
};

export default function Button({text, size, navigateTo, state}) {
    const nav=useNavigate();

    if (size == ButtonSize.SMALL || size == null) {
        if (navigateTo == null) {
            return (
                <button  className='btn-small' >{text}</button>
            );
        } else {
            return (
                <button  className='btn-small' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
            );
        }
    } else if (size == ButtonSize.MEDIUM) {
        if (navigateTo == null) {
            return (
                <button  className='btn-medium' >{text}</button>
            );
        } else {
            return (
                <button  className='btn-medium' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
            );
        }
    } else if (size == ButtonSize.LARGE) {
        if (navigateTo == null) {
            return (
                <button  className='btn-large' >{text}</button>
            );
        } else {
            return (
                <button  className='btn-large' onClick={()=>nav(navigateTo, state={state})}>{text}</button>
            );
        }
    } 
}