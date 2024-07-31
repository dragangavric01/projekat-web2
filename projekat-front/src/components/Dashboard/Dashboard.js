import './Dashboard.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import Profile from './Profile';
import Banner from '../Banner/Banner.js';

export function ClientNavigation() {
    return (
        <div>
            <Banner/>
            <div class="navbar">
                <ul>
                    <li><Hyperlink path="/client-dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/client-dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/client-dashboard/new-ride" text="New ride" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}

export function DriverNavigation() {
    return (
        <div>
            <Banner/>
            <div class="navbar">
                <ul>
                    <li><Hyperlink path="/driver-dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/driver-dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/driver-dashboard/new-rides" text="New rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}

export function AdminNavigation() {
    return (
        <div>
            <Banner/>
            <div class="navbar">
                <ul>
                    <li><Hyperlink path="/admin-dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/admin-dashboard/rides" text="Rides" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/admin-dashboard/drivers" text="Drivers" size={HyperlinkSize.MEDIUM}/></li>
                    <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
                </ul>
            </div>
        </div>
    );
}
