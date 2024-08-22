import './Error.css'
import '../Text/Text.js'
import { Navigate, useNavigate } from 'react-router-dom';
import { ResultMetadata } from '../../../services/httpService.js';
import { useEffect, useState } from 'react';


export function Error({validationText, resultMetadata}) {
    if (validationText != null && validationText != "") {
        return <FrontError text={validationText}/>
    } else if (resultMetadata != null) {
        return <BackError resultMetadata={resultMetadata} />
    } else {
        return <></>
    }
}

export function FrontError({text}) {
    if (text == null) {
        return <></>
    } else {
        return (
            <p className='error'>{text}</p>
        );
    }
}

export function BackError({resultMetadata}) {
    const navigate = useNavigate();
    const [text, setText] = useState("");

    useEffect(() => {
        if (resultMetadata == ResultMetadata.TOKEN_EXPIRED) {
            navigate("/log-in");
        } else if (resultMetadata == ResultMetadata.EXCEPTION) {
            setText("Unknown error occured.");
        } else if (resultMetadata == ResultMetadata.USERNAME_CONFLICT) {
            setText("This username already exists.");
        } else if (resultMetadata == ResultMetadata.EMAIL_CONFLICT) {
            setText("This email already exists.");
        } else if (resultMetadata == ResultMetadata.LOGIN_FAILED) {
            setText("Email or password is incorrect.");
        } else if (resultMetadata == ResultMetadata.ALREADY_ACCEPTED) {
            setText("The ride has been already accepted.");
        } 
    }, []);

    if (text == "") {
        return <></>
    } else {
        return (
            <p className='error'>{text}</p>
        );
    }
}