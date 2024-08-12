import Header from '../elements/Header/Header'
import './Dashboard.css'
import Navigation from './Navigation'

export default function Dashboard() {
    return (
        <div>
            <Navigation/>
            <div class="dashboard">
                <div class="dashboard-center">
                    <Header number={1} text={"Welcome to uTaxi dashboard!"}/>
                </div>
            </div>
        </div>
    );
}