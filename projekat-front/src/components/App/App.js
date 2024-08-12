import './App.css';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import Profile from '../Dashboard/Profile.js';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import MyRides from '../Dashboard/MyRides.js';
import NewRide, {CurrentRideClient} from '../Dashboard/NewRide.js';
import {NewRides, CurrentRideDriver} from '../Dashboard/NewRides.js';
import Rides from '../Dashboard/Rides.js';
import Drivers, { Driver } from '../Dashboard/Drivers.js';
import { CurrentRide } from '../Dashboard/CurrentRide.js';
import Dashboard from '../Dashboard/Dashboard.js';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/register' element={<Register/>}/>

                <Route path='/dashboard' element={<Dashboard/>}/> 
                <Route path='/dashboard/profile' element={<Profile/>}/>
                
                <Route path='/dashboard/my-rides' element={<MyRides/>}/>
                <Route path='/dashboard/new-ride' element={<NewRide/>}/>
                <Route path='/dashboard/current-ride' element={<CurrentRide/>}/>
                <Route path='/dashboard/new-rides' element={<NewRides/>}/>
                <Route path='/dashboard/rides' element={<Rides/>}/>

                <Route path='/dashboard/drivers' element={<Drivers/>}/>
                <Route path='/dashboard/:driverUsername' element={<Driver/>}/>
            </Routes>
        </BrowserRouter>
    );
}

