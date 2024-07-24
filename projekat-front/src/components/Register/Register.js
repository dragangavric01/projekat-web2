import './Register.css';
import Input, {InputType} from '../elements/Input/Input.js';
import Button from '../elements/Button/Button.js';
import Hyperlink from '../elements/Hyperlink/Hyperlink.js';
import {Newline} from '../elements/Microelements.js';

export default function Register() {
    return (
        <div class="register">
            <div class="register-center">
                <div>
                    <Hyperlink text="Click here to register with a facebook account" path="/register"/>
                    
                    <Newline/>
                    <Newline/>

                    <Input name="Email" type={InputType.TEXT}/>
                    <Input name="Password" type={InputType.PASSWORD}/>
                    <Input name="Repeat password" type={InputType.PASSWORD}/>
                    <Input name="Username" type={InputType.TEXT}/>
                    <Input name="First name" type={InputType.TEXT}/>
                    <Input name="Last name" type={InputType.TEXT}/>
                    <Input name="Date of birth" type={InputType.DATE}/>
                    <Input name="Address" type={InputType.TEXT}/>
                    <Input name="User type" type={InputType.DROPDOWN} dropdownOptions={["Client", "Driver"]}/>

                    <Button text="Register"/>

                    <Newline/>
                    <Newline/>
                    
                    <Hyperlink text="Already have an account? Click here to log in" path="/logIn"/>
                </div>
            </div>
        </div>
    );
}
