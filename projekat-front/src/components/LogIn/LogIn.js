import './LogIn.css';
import '../../services/httpService.js'
import Input, {InputType} from '../elements/Input/Input.js';
import {NavigationButton, HandlerButton } from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';
import Banner from '../Banner/Banner.js';
import { logIn } from '../../services/httpService.js';
import {UserRole} from '../../model/User.js';
import { clearGlobalState, getRoleFromToken, setRole, setToken } from '../../services/globalStateService.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import jwt_decode from "jwt-decode";


export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    
    async function handleLogIn() {
        var logInData = {email: email, password: password};
        var token = await logIn(logInData);
    
        if (token == 'error') {
            // show error
        } else if (token == null) {
            // show error
        } else {
            setToken(token);
            setRole(getRoleFromToken(token))

            navigate('/dashboard');
        }
    }

    return (
        <div>
            <Banner/>
            <div className="login">
                <div className="login-center">
                    <div>
                        <Header number={1} text={"Log in"}/>
                        <Input name="Email" type={InputType.TEXT} handleChangeFunction={handleEmailChange}/>
                        <Input name="Password" type={InputType.PASSWORD} handleChangeFunction={handlePasswordChange}/>

                        <HandlerButton text="Log in" handler={handleLogIn}/>

                        <br/>
                        <br/>
                        <Hyperlink text="Don't have an account? Click here to register" path="/register"  size={HyperlinkSize.SMALL}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LogOut() {
    clearGlobalState();

    return (
        <LogIn/>
    );
}