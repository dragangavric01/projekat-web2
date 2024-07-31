import './Profile.css';
import {AdminNavigation, ClientNavigation, DriverNavigation} from './Dashboard';
import Text from '../elements/Text/Text.js'
import Button from '../elements/Button/Button';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink';
import { useLocation } from 'react-router-dom';
import Header from '../elements/Header/Header.js'


export function ProfileClient() {
    var state = useLocation().state;
    if (state == null) {
        state = {
            editField: null,
            editPassword: false
        }
    }

    return (
        <div>
            <ClientNavigation/>
            <div class="profile">
                <div class="profile-center">
                    <Header number={1} text="Your profile"/>
                    <br/>
                    <div>
                        <ProfileData editField={state.editField}  userType={"client"}/>
                    </div>
                    <br/>
                    <br/>

                    <ProfilePassword edit={state.editPassword}  userType={"client"}/>

                    <br/>

                    <p>Treba i profile picture</p>
                </div>
            </div>
        </div>
    );
}

export function ProfileDriver() {
    var state = useLocation().state;
    if (state == null) {
        state = {
            editField: null,
            editPassword: false
        }
    }

    return (
        <div>
            <DriverNavigation/>
            <div class="profile">
                <div class="profile-center">
                    <Header number={1} text="Your profile"/>
                    <br/>
                    <div>
                        <ProfileData editField={state.editField}  userType={"driver"}/>
                    </div>
                    <br/>
                    <br/>

                    <ProfilePassword edit={state.editPassword} userType={"driver"}/>

                    <br/>

                    <p>Treba i profile picture</p>
                </div>
            </div>
        </div>
    );
}


export function ProfileAdmin() {
    var state = useLocation().state;
    if (state == null) {
        state = {
            editField: null,
            editPassword: false
        }
    }

    return (
        <div>
            <AdminNavigation/>
            <div class="profile">
                <div class="profile-center">
                    <Header number={1} text="Your profile"/>
                    <br/>
                    <div>
                        <ProfileData editField={state.editField}  userType={"admin"}/>
                    </div>
                    <br/>
                    <br/>

                    <ProfilePassword edit={state.editPassword} userType={"admin"}/>

                    <br/>

                    <p>Treba i profile picture</p>
                </div>
            </div>
        </div>
    );
}


function ProfileData({editField, userType}) {
    return (
        <div>
            <ProfileField name={"Email:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <ProfileField name={"Username:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <ProfileField name={"First name:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <ProfileField name={"Last name:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <ProfileField name={"Date of birth:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <ProfileField name={"Address:"} value="asdfqwerzxcv" editField={editField} userType={userType}/>
            <Text content={"Registration request status:"}/>
            <Text content={"Pending"}/>
        </div>
    );
}

function ProfileField({name, value, editField, userType}) {
    if (editField != null && editField == name) {
        return (
            <div style={{marginBottom:'20px'}}>
                <Text content={name}/>
                <input type='text'/>
                <Hyperlink text="Apply" path={"/" + userType + "-dashboard/profile"} size={HyperlinkSize.SMALL}/>
            </div>
        );
    } else {
        return (
            <div style={{marginBottom:'20px'}}>
                <Text content={name} />
                <Text content={value}/>
                <Hyperlink text="Edit" path={"/" + userType + "-dashboard/profile"} state={{editField: name, editPassword: false}} size={HyperlinkSize.SMALL}/>
            </div>
        );
    }
}

function ProfilePassword({edit, userType}) {
    if (edit == null || edit == false) {
        return (
            <Hyperlink text="Change password" size={HyperlinkSize.SMALL}  state={{editField: null, editPassword: true}}/>
        );
    } else {
        return (
            <div>
                <Text content="New password:"/>
                <input type='password'/>
                <Hyperlink text="Apply" path={"/" + userType + "-dashboard/profile"} size={HyperlinkSize.SMALL}/>
            </div>
        );
    }
}