import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink.js';
import './Dashboard.css';
import Profile from './Profile';

export function ClientNavigation() {
    return (
        <div class="navbar">
            <ul>
                <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/new-ride" text="New ride" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
            </ul>
        </div>
    );
}

export function DriverNavigation() {
    return (
        <div class="navbar">
            <ul>
                <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/my-rides" text="My rides" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/new-rides" text="New rides" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
            </ul>
        </div>
    );
}

export function AdminNavigation() {
    return (
        <div class="navbar">
            <ul>
                <li><Hyperlink path="/dashboard/profile" text="Profile" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/rides" text="Rides" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/dashboard/drivers" text="New ride" size={HyperlinkSize.MEDIUM}/></li>
                <li><Hyperlink path="/log-in" text="Log out" size={HyperlinkSize.MEDIUM}/></li>
            </ul>
        </div>
    );
}
