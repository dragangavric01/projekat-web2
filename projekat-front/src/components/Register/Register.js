import './Register.css';
import Input, {InputType} from '../elements/Input/Input.js';
import Button from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';
import Banner from '../Banner/Banner.js';

export default function Register() {
    return (
        <div>
            <Banner/>
            <div class="register">
                <div class="register-center">
                    <div>
                        <Header number={1} text={"Register"}/>

                        <Hyperlink text="Click here to register with a facebook account" path="/register" size={HyperlinkSize.SMALL}/>
                        
                        <br/>
                        <br/>

                        <Input name="Email" type={InputType.TEXT}/>
                        <Input name="Password" type={InputType.PASSWORD}/>
                        <Input name="Repeat password" type={InputType.PASSWORD}/>
                        <Input name="User type" type={InputType.DROPDOWN} dropdownOptions={["Client", "Driver"]}/>
                        <Input name="Username" type={InputType.TEXT}/>
                        <Input name="First name" type={InputType.TEXT}/>
                        <Input name="Last name" type={InputType.TEXT}/>
                        <Input name="Date of birth" type={InputType.DATE}/>
                        <Input name="Address" type={InputType.TEXT}/>
                        <Input name="Profile picture" type={InputType.TEXT}/>

                        <Button text="Register"/>

                        <br/>
                        <br/>
                        
                        <Hyperlink text="Already have an account? Click here to log in" path="/log-in"  size={HyperlinkSize.SMALL}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
