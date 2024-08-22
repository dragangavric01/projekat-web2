import './Navigation.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Banner from '../Banner/Banner.js';
import {UserRole} from '../../model/User.js';
import { getRoleFromToken, getToken } from '../../services/globalStateService.js';


export default function Navigation({disable}) {
    const role = getRoleFromToken(getToken());

    if (role == UserRole.CLIENT) {
        return (<ClientNavigation disable={disable}/>);
    } else if (role == UserRole.DRIVER) {
        return (<DriverNavigation disable={disable}/>);
    } else {  // admin
        return (<AdminNavigation/>);
    }
}


function ClientNavigation({disable}) {
    if (disable) {
        return (
            <div>
            <Banner/>
            <div className="navbar">
                <ul>
                    <li><p>Profile</p></li>
                    <li><p>My rides</p></li>
                    <li><p>New ride</p></li>
                    <li><p>Log out</p></li>
                </ul>
            </div>
        </div> 
        );
    } else {
        return (
            <div>
                <Banner/>
                <div className="navbar">
                    <ul>
                        <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/dashboard/new-ride" text="New ride" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.SMALL}/></li>
                    </ul>
                </div>
            </div>
        );
    }
}

function DriverNavigation({disable}) {
    if (disable) {
        return (
            <div>
                <Banner/>
                <div className="navbar">
                    <ul>
                    <li><p>Profile</p></li>
                    <li><p>My rides</p></li>
                    <li><p>New rides</p></li>
                    <li><p>Log out</p></li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Banner/>
                <div className="navbar">
                    <ul>
                        <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/dashboard/new-rides" text="New rides" size={HyperlinkSize.SMALL}/></li>
                        <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.SMALL}/></li>
                    </ul>
                </div>
            </div>
        );
    }
}

function AdminNavigation() {
    return (
        <div>
            <Banner/>
            <div className="navbar">
                <ul>
                    <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.SMALL}/></li>
                    <li><Hyperlink path="/dashboard/rides" text="Rides" size={HyperlinkSize.SMALL}/></li>
                    <li><Hyperlink path="/dashboard/drivers" text="Drivers" size={HyperlinkSize.SMALL}/></li>
                    <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.SMALL}/></li>
                </ul>
            </div>
        </div>
    );
}

