import './Navigation.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Banner from '../Banner/Banner.js';
import {UserRole} from '../../model/User.js';
import { getRole } from '../../services/globalStateService.js';


export default function Navigation() {
    const role = getRole();

    if (role == UserRole.CLIENT) {
        return (<ClientNavigation/>);
    } else if (role == UserRole.DRIVER) {
        return (<DriverNavigation/>);
    } else {  // admin
        return (<AdminNavigation/>);
    }
}


function ClientNavigation() {
    return (
        <div>
            <Banner/>
            <div className="navbar">
                <ul>
                    <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/new-ride" text="New ride" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-out" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}

function DriverNavigation() {
    return (
        <div>
            <Banner/>
            <div className="navbar">
                <ul>
                    <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/new-rides" text="New rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-out" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}

function AdminNavigation() {
    return (
        <div>
            <Banner/>
            <div className="navbar">
                <ul>
                    <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/rides" text="Rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/dashboard/drivers" text="Drivers" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-out" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}
