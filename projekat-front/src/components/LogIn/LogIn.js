import './LogIn.css';
import Input, {InputType} from '../elements/Input/Input.js';
import Button from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';

export default function LogIn() {
    return (
        <div class="login">
            <div class="login-center">
                <div>
                    <Header number={1} text={"Log in"}/>
                    <Input name="Email" type={InputType.TEXT}/>
                    <Input name="Password" type={InputType.PASSWORD}/>

                    <Button text="Log in"/>

                    <br/>
                    <br/>
                    <Hyperlink text="Don't have an account? Click here to register" path="/register"  size={HyperlinkSize.SMALL}/>
                </div>
            </div>
        </div>
    );
}
