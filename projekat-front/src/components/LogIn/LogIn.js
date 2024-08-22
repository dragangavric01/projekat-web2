import './LogIn.css';
import '../../services/httpService.js'
import Input, {InputType} from '../elements/Input/Input.js';
import {NavigationButton, HandlerButton, ButtonSize } from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';
import Banner from '../Banner/Banner.js';
import { logIn, ResultMetadata } from '../../services/httpService.js';
import {UserRole} from '../../model/User.js';
import { clearGlobalState, getRoleFromToken, setRole, setToken } from '../../services/globalStateService.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Common } from '../Dashboard/Common.js';
import { Error } from '../elements/Error/Error.js';


export default function LogIn() {
    const navigate = useNavigate();

    const [resultMetadata, setResultMetadata] = useState(null);
    const [validationText, setValidationText] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        clearGlobalState();
    }, []);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    async function handleLogIn() {
        setValidationText(null);
        setResultMetadata(null);

        if (email == "" || password == "") {
            setValidationText("All fields must be filled.");
        } else {
            var logInData = {email: email, password: password};
            var result = await logIn(logInData);
    
            setResultMetadata(result.metadata);
    
            if (result.metadata == ResultMetadata.SUCCESS) {
                setToken(result.data);
    
                navigate('/dashboard');
            }
        }
    }

    return (
        <Common
            headerText={"Log in"}

            mainComponent={
                <>
                    <Input name="Email" type={InputType.TEXT} handleChangeFunction={handleEmailChange}/>
                    <Input name="Password" type={InputType.PASSWORD} handleChangeFunction={handlePasswordChange}/>
                </>
            }

            bottomComponent={
                <>
                    <Error validationText={validationText} resultMetadata={resultMetadata}/>
                    <br/>
                    <HandlerButton text="Log in" size={ButtonSize.MEDIUM} handler={handleLogIn}/>
                    <br/>
                    <br/>
                    <Hyperlink text="Don't have an account? Click here to register." path="/register"  size={HyperlinkSize.SMALL}/>
                </>
            }

            noNavigation={true}
        />
    );
}
