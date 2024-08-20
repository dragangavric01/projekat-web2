import './Register.css';
import Input, {InputType} from '../elements/Input/Input.js';
import {ButtonSize, HandlerButton, NavigationButton} from '../elements/Button/Button.js';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Header from '../elements/Header/Header.js';
import Banner from '../Banner/Banner.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../services/httpService.js';
import { setToken, setRole, getRoleFromToken, convertRoleToInt } from '../../services/globalStateService.js';
import {User, UserRole} from '../../model/User.js'
import { Common } from '../Dashboard/Common.js';

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [userRole, setUserRole] = useState(UserRole.CLIENT);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [picture, setPicture] = useState(null);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRepeatedPasswordChange = (event) => setRepeatedPassword(event.target.value);
    const handleUserRoleChange = (event) => setUserRole(convertRoleToInt(event.target.value));
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleDateOfBirthChange = (event) => setDateOfBirth(event.target.value);
    const handleAddressChange = (event) => setAddress(event.target.value);
    const handlePictureChange = (event) => setPicture(event.target.files[0]);

    async function handleRegister() {
        if (password != repeatedPassword) {
            // error
        }

        const user = new User(username, email, password, firstName, lastName, dateOfBirth, address, userRole, picture);
        var token = await register(user);

        if (token == 'error') {
            // show error
        } else if (token == 'token expired') {
            navigate('/log-in');
        } else if (token == null) {
            // show error
        } else {
            setToken(token);

            navigate('/dashboard');
        }
    }


    return (
        <Common
            headerText={"Register"}

            mainComponent={
                <>
                    <Input name="Email" type={InputType.TEXT} handleChangeFunction={handleEmailChange}/>
                    <Input name="Password" type={InputType.PASSWORD} handleChangeFunction={handlePasswordChange}/>
                    <Input name="Repeat password" type={InputType.PASSWORD} handleChangeFunction={handleRepeatedPasswordChange}/>
                    <Input name="Role" type={InputType.DROPDOWN} dropdownOptions={["Client", "Driver"]} handleChangeFunction={handleUserRoleChange}/>
                    <Input name="Username" type={InputType.TEXT} handleChangeFunction={handleUsernameChange}/>
                    <Input name="First name" type={InputType.TEXT} handleChangeFunction={handleFirstNameChange}/>
                    <Input name="Last name" type={InputType.TEXT} handleChangeFunction={handleLastNameChange}/>
                    <Input name="Date of birth" type={InputType.DATE} handleChangeFunction={handleDateOfBirthChange}/>
                    <Input name="Address" type={InputType.TEXT} handleChangeFunction={handleAddressChange}/>
                    <Input name="Profile picture" type={InputType.PICTURE} handleChangeFunction={handlePictureChange}/>
                </>
            }

            bottomComponent={
                <>
                    <br/>
                    <HandlerButton text="Register" size={ButtonSize.MEDIUM} handler={handleRegister}/>
                    <br/>
                    <br/>
                    <Hyperlink text="Click here to register with a facebook account." path="/register" size={HyperlinkSize.SMALL}/>
                    <br/>
                    <br/>
                    <Hyperlink text="Already have an account? Click here to log in." path="/log-in"  size={HyperlinkSize.SMALL}/>
                </>
            }

            noNavigation={true}
        />
    );
}

