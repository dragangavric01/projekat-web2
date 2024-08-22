import './EditProfile.css'
import './Profile.css';
import Navigation from './Navigation.js';
import Text from '../elements/Text/Text.js'
import {ButtonSize, HandlerButton, NavigationButton} from '../elements/Button/Button';
import Hyperlink, {HyperlinkSize, HandlerHyperlink} from '../elements/Hyperlink/Hyperlink';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../elements/Header/Header.js'
import { useContext, useEffect } from 'react';
import { clearGlobalState, getToken } from '../../services/globalStateService.js';
import {UserRole} from '../../model/User.js'
import { useState } from 'react';
import { setToken, setRole, getRoleFromToken, convertRoleToInt } from '../../services/globalStateService.js';
import { getCurrentUser, ResultMetadata, updateProfile } from '../../services/httpService.js';
import Input, { InputType } from '../elements/Input/Input.js';
import { Common } from './Common.js';
import { Error } from '../elements/Error/Error.js';


export function EditProfile() {
    const navigate = useNavigate()
    var user = useLocation().state;

    const [resultMetadata, setResultMetadata] = useState(null);
    const [validationText, setValidationText] = useState(null);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [address, setAddress] = useState(null);
    const [picture, setPicture] = useState(null);

    const handleEmailChange = (event) => {setEmail(event.target.value); };
    const handlePasswordChange = (event) => {setPassword(event.target.value); };
    const handleUsernameChange = (event) => {setUsername(event.target.value); };
    const handleFirstNameChange = (event) => {setFirstName(event.target.value); };
    const handleLastNameChange = (event) => {setLastName(event.target.value); };
    const handleDateOfBirthChange = (event) => {setDateOfBirth(event.target.value); };
    const handleAddressChange = (event) => {setAddress(event.target.value); };
    const handlePictureChange = (event) => {setPicture(event.target.files[0]); };

    async function handleApply() {
        setValidationText(null);
        setResultMetadata(null);

        if (email == "" || username == "" || firstName == "" || lastName == "" || address == "" || dateOfBirth == "") {
            setValidationText("There are empty fields.");
        } else {
            const profileData = {
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                address: address,
                role: getRoleFromToken(getToken()),    
                picture: picture
            }
    
            const result = await updateProfile(profileData);
    
            setResultMetadata(result.metadata);
    
            if (result.metadata == ResultMetadata.SUCCESS) {
                if (result.data != null) {
                    setToken(result.data);
                    navigate("/dashboard/profile");
                }
            }
        }
    }


    return (
        <Common 
            headerText={"Edit your profile"}

            mainComponent={
                <>
                    <EditProfileField name={"Email"} value={(email == null) ? user.email : email} handlerFunction={handleEmailChange}/>
                    <EditProfileField name={"Username"} value={(username == null) ? user.username : username}  handlerFunction={handleUsernameChange} />
                    <EditProfileField name={"First name"} value={(firstName == null) ? user.firstName : firstName} handlerFunction={handleFirstNameChange} />
                    <EditProfileField name={"Last name"} value={(lastName == null) ? user.lastName : lastName} handlerFunction={handleLastNameChange}/>
                    <EditProfileField name={"Date of birth"} value={(dateOfBirth == null) ? user.dateOfBirth : dateOfBirth} handlerFunction={handleDateOfBirthChange} />
                    <EditProfileField name={"Address"} value={(address == null) ? user.address : address}  handlerFunction={handleAddressChange}/>     
                    <EditProfileField name={"New profile picture"}  handlerFunction={handlePictureChange}/>     
                    <EditProfileField name={"New password"}  handlerFunction={handlePasswordChange} />   
                </>
            }

            bottomComponent={
                <>
                    <Error validationText={validationText} resultMetadata={resultMetadata}/>
                    <br/>
                    <HandlerButton text={"Apply changes"} size={ButtonSize.LARGE} handler={handleApply}/>
                </>
            }
        />
    );
}


function EditProfileField({name, value, handlerFunction}) {
    if (name == "New password") {
        return (
            <Input name={name} type={InputType.PASSWORD} handleChangeFunction={handlerFunction} placeholder={"Enter new password"}/>
        );
    }

    var inputType;
    if (name == "Date of birth") {
        inputType = InputType.DATE;
    } else if (name == "New profile picture") {
        inputType = InputType.PICTURE;
    } else {
        inputType = InputType.TEXT;
    }

    return (
        <Input name={name} type={inputType} handleChangeFunction={handlerFunction} initialValue={value}/>
    );
}
