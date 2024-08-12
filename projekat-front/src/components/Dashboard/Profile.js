import './Profile.css';
import Navigation from './Navigation.js';
import Text from '../elements/Text/Text.js'
import {NavigationButton} from '../elements/Button/Button';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink';
import { useLocation } from 'react-router-dom';
import Header from '../elements/Header/Header.js'
import { useContext } from 'react';
import { getRole } from '../../services/stateService.js';
import {UserRole} from '../../model/User.js'


export default function Profile() {
    const role = getRole();

    var state = useLocation().state;
    if (state == null) {
        state = {
            editField: null,
            editPassword: false
        }
    }

    return (
        <div>
            <Navigation/>
            <div class="profile">
                <div class="profile-center">
                    <Header number={1} text="Your profile"/>
                    <br/>
                    <div>
                        <ProfileData editField={state.editField}/>
                        
                        {(role == UserRole.DRIVER) && 
                        <>
                            <Text content={"Registration request status:"}/>
                            <Text content={"Pending"}/>
                        </>}
                    </div>
                    <br/>
                    <br/>

                    <ProfilePassword edit={state.editPassword}/>

                    <br/>

                    <p>Treba i profile picture</p>
                </div>
            </div>
        </div>
    );
}


function ProfileData({editField}) {
    return (
        <div>
            <ProfileField name={"Email:"} value="asdfqwerzxcv" editField={editField} />
            <ProfileField name={"Username:"} value="asdfqwerzxcv" editField={editField} />
            <ProfileField name={"First name:"} value="asdfqwerzxcv" editField={editField} />
            <ProfileField name={"Last name:"} value="asdfqwerzxcv" editField={editField} />
            <ProfileField name={"Date of birth:"} value="asdfqwerzxcv" editField={editField} />
            <ProfileField name={"Address:"} value="asdfqwerzxcv" editField={editField} />
        </div>
    );
}

function ProfileField({name, value, editField}) {
    if (editField != null && editField == name) {
        return (
            <div style={{marginBottom:'20px'}}>
                <Text content={name}/>
                <input type='text'/>
                <Hyperlink text="Apply" path={"/dashboard/profile"} size={HyperlinkSize.SMALL}/>
            </div>
        );
    } else {
        return (
            <div style={{marginBottom:'20px'}}>
                <Text content={name} />
                <Text content={value}/>
                <Hyperlink text="Edit" path={"/dashboard/profile"} state={{editField: name, editPassword: false}} size={HyperlinkSize.SMALL}/>
            </div>
        );
    }
}

function ProfilePassword({edit}) {
    if (edit == null || edit == false) {
        return (
            <Hyperlink text="Change password" size={HyperlinkSize.SMALL}  state={{editField: null, editPassword: true}}/>
        );
    } else {
        return (
            <div>
                <Text content="New password:"/>
                <input type='password'/>
                <Hyperlink text="Apply" path={"/dashboard/profile"} size={HyperlinkSize.SMALL}/>
            </div>
        );
    }
}