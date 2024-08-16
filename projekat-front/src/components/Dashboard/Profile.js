import './Profile.css';
import Navigation from './Navigation.js';
import Text from '../elements/Text/Text.js'
import {ButtonSize, HandlerButton, NavigationButton} from '../elements/Button/Button';
import Hyperlink, {HyperlinkSize, HandlerHyperlink} from '../elements/Hyperlink/Hyperlink';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../elements/Header/Header.js'
import { useContext, useEffect } from 'react';
import { getRole } from '../../services/globalStateService.js';
import {UserRole} from '../../model/User.js'
import { useState } from 'react';
import { setToken, setRole, getRoleFromToken, convertRoleToInt } from '../../services/globalStateService.js';
import { getCurrentUser, updateProfile } from '../../services/httpService.js';
import Input, { InputType } from '../elements/Input/Input.js';


export default function Profile() {
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
    const [fetched, setFetched] = useState(false);

    function checkResponse() {
        if (user == 'error') {
            // show error
        } else if (user == 'token expired') {
            navigate('/log-out');
        } else if (user == null) {
            // show error
        }
    }

    useEffect(() => {
        if (!fetched) {
            getCurrentUser().then(result => {
                setUser(result);
                checkResponse();
            });

            setFetched(true);
        }
    }, []);

    if (user == null) return <></>

    return (
        <div>
            <Navigation/>
            <div className="profile">
                <div className="profile-center">
                    <Header number={1} text="Your profile"/>
                    <br/>
                    <div>
                        <ProfileField name={"Email:"} value={user.email} />
                        <ProfileField name={"Username:"} value={user.username}  />
                        <ProfileField name={"First name:"} value={user.firstName} />
                        <ProfileField name={"Last name:"} value={user.lastName} />
                        <ProfileField name={"Date of birth:"} value={user.dateOfBirth}/>
                        <ProfileField name={"Address:"} value={user.address} />                    
                    </div>

                    <img src={"data:image/jpeg;base64," + user.picture} style={{maxWidth: '300px', maxHeight: '300px'}} alt='No picture'/>

                    <br/>
                    <NavigationButton text={"Edit profile"} navigateTo={"/dashboard/edit-profile"} state={user} size={ButtonSize.MEDIUM}/>
                </div>
            </div>
        </div>
    );
}

export function EditProfile() {
    const navigate = useNavigate()
    var user = useLocation().state;

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

    function checkResponse(result) {
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-out');
        } else if (result == null) {
            // show error
        } else if (result != "") {
            setToken(result);
        }
    }

    function handleApply() {
        const profileData = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            address: address,
            role: getRole(),    //////////////////////////
            picture: picture
        }

        updateProfile(profileData).then(r => {
            checkResponse(r);
            navigate("/dashboard/profile")
        });
    }

    return (
        <div>
            <Navigation/>
            <div className="profile">
                <div className="profile-center">
                    <Header number={1} text="Edit your profile"/>
                    <br/>
                    <div>
                        <EditProfileField name={"Email"} value={(email == null) ? user.email : email} handlerFunction={handleEmailChange}/>
                        <EditProfileField name={"Username"} value={(username == null) ? user.username : username}  handlerFunction={handleUsernameChange} />
                        <EditProfileField name={"First name"} value={(firstName == null) ? user.firstName : firstName} handlerFunction={handleFirstNameChange} />
                        <EditProfileField name={"Last name"} value={(lastName == null) ? user.lastName : lastName} handlerFunction={handleLastNameChange}/>
                        <EditProfileField name={"Date of birth"} value={(dateOfBirth == null) ? user.dateOfBirth : dateOfBirth} handlerFunction={handleDateOfBirthChange} />
                        <EditProfileField name={"Address"} value={(address == null) ? user.address : address}  handlerFunction={handleAddressChange}/>     
                        <EditProfileField name={"New profile picture"}  handlerFunction={handlePictureChange}/>     
                        <EditProfileField name={"New password"}  handlerFunction={handlePasswordChange} />     

                    </div>
                    
                    <br/>
                    
                    <HandlerButton text={"Apply changes"} size={ButtonSize.MEDIUM} handler={handleApply}/>
                </div>
            </div>
        </div>
    );
}


function ProfileField({name, value}) {
    return (
        <div style={{marginBottom:'20px'}}>
            <Text content={name}/>
            <Text content={value}/>
        </div>
    );
}

function EditProfileField({name, value, handlerFunction}) {
    if (name == "New password") {
        return (
            <div style={{marginBottom:'20px'}}>
                <Input name={name} type={InputType.PASSWORD} handleChangeFunction={handlerFunction} placeholder={"Enter new password"}/>
            </div>
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
        <div style={{marginBottom:'20px'}}>
            <Input name={name} type={inputType} handleChangeFunction={handlerFunction} initialValue={value}/>
        </div>
    );
}
