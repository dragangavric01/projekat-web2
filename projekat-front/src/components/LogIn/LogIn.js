import './LogIn.css';
import Input, {InputType} from '../elements/Input/Input.js';
import Button from '../elements/Button/Button.js';
import Hyperlink from '../elements/Hyperlink/Hyperlink.js';
import {Newline} from '../elements/Microelements.js';

export default function LogIn() {
    return (
        <div class="login">
            <div class="login-center">
                <div>
                    <Input name="Email" type={InputType.TEXT}/>
                    <Input name="Password" type={InputType.PASSWORD}/>

                    <Button text="Log in"/>

                    <Newline/>
                    <Newline/>
                    <Hyperlink text="Don't have an account? Click here to register" path="/register"/>
                </div>
            </div>
        </div>
    );
}
