import './App.css';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import { ProfileAdmin, ProfileClient, ProfileDriver } from '../Dashboard/Profile.js';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import {MyRidesClient, MyRidesDriver} from '../Dashboard/MyRides.js';
import NewRide, {CurrentRideClient} from '../Dashboard/NewRide.js';
import {NewRides, CurrentRideDriver} from '../Dashboard/NewRides.js';
import Rides from '../Dashboard/Rides.js';
import Drivers, { Driver } from '../Dashboard/Drivers.js';


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/log-in' element={<LogIn/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/client-dashboard/profile' element={<ProfileClient/>}/>
                    <Route path='/driver-dashboard/profile' element={<ProfileDriver/>}/>
                    <Route path='/admin-dashboard/profile' element={<ProfileAdmin/>}/>
                    <Route path='/client-dashboard/my-rides' element={<MyRidesClient/>}/>
                    <Route path='/driver-dashboard/my-rides' element={<MyRidesDriver/>}/>
                    <Route path='/client-dashboard/new-ride' element={<NewRide/>}/>
                    <Route path='/client-dashboard/current-ride' element={<CurrentRideClient/>}/>
                    <Route path='/driver-dashboard/current-ride' element={<CurrentRideDriver/>}/>
                    <Route path='/driver-dashboard/new-rides' element={<NewRides/>}/>
                    <Route path='/admin-dashboard/rides' element={<Rides/>}/>
                    <Route path='/admin-dashboard/drivers' element={<Drivers/>}/>
                    <Route path='/admin-dashboard/driver' element={<Driver/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

