import './LogIn.css';
import '../../services/httpService.js'
import Input, {InputType} from '../elements/Input/Input.js';
import {NavigationButton, HandlerButton, ButtonSize } from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';
import Banner from '../Banner/Banner.js';
import { logIn } from '../../services/httpService.js';
import {UserRole} from '../../model/User.js';
import { clearGlobalState, getRoleFromToken, setRole, setToken } from '../../services/globalStateService.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Common } from '../Dashboard/Common.js';


export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();

    useEffect(() => {
        clearGlobalState();
    }, []);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    async function handleLogIn() {
        var logInData = {email: email, password: password};
        var token = await logIn(logInData);
    
        if (token == 'error') {
            // show error
        } else if (token == 'token expired') {
            navigate('/log-in');
        } else if (token == null) {
            // show error
        } else {
            setToken(token);

            if (location.pathname == "/dashboard") {
                window.location.reload();
            } else {
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
