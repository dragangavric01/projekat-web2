import './Profile.css';
import Navigation from './Navigation.js';
import Text from '../elements/Text/Text.js'
import {ButtonSize, HandlerButton, NavigationButton} from '../elements/Button/Button';
import Hyperlink, {HyperlinkSize, HandlerHyperlink} from '../elements/Hyperlink/Hyperlink';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../elements/Header/Header.js'
import { useContext, useEffect } from 'react';
import {UserRole} from '../../model/User.js'
import { useState } from 'react';
import { setToken, setRole, getRoleFromToken, convertRoleToInt } from '../../services/globalStateService.js';
import { getCurrentUser, ResultMetadata, updateProfile } from '../../services/httpService.js';
import Input, { InputType } from '../elements/Input/Input.js';
import Output from '../elements/Output/Output.js';
import { Common } from './Common.js';
import { BackError, Error } from '../elements/Error/Error.js';


export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [resultMetadata, setResultMetadata] = useState(null);

    useEffect(() => {
        getCurrentUser().then(result => {
            setResultMetadata(result.metadata);
            setUser(result.data);
        });
    }, []);

    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        return (
            <Common bottomComponent={<BackError resultMetadata={resultMetadata}/>}/>
        );
    }

    if (user == null) return(
        <Navigation/>
    );

    return(
        <div>
            <Navigation/>
            <div className='profile'>
                <div class="profile-container">
                    <div class="profile-picture">
                        <img src={"data:image/jpeg;base64," + user.picture}  alt='No picture'/>
                    </div>
                    <div class="profile-info">
                        <Header number={1} text="Your profile"/>

                        <NavigationButton text={"Edit profile"} navigateTo={"/dashboard/edit-profile"} state={user} size={ButtonSize.MEDIUM}/>

                        <br/>
                        <br/>

                        <Output name={"Username"} value={user.username}  />
                        <Output name={"Email"} value={user.email} />
                        <Output name={"First name"} value={user.firstName} />
                        <Output name={"Last name"} value={user.lastName} />
                        <Output name={"Date of birth"} value={user.dateOfBirth}/>
                        <Output name={"Address"} value={user.address} />     
                    </div>
                </div>
            </div>
        </div>
    );
}
