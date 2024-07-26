import './App.css';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import Profile from '../Dashboard/Profile.js';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import MyRides from '../Dashboard/MyRides.js';
import NewRide, {CurrentRide} from '../Dashboard/NewRide.js';

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/log-in' element={<LogIn/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/dashboard/profile' element={<Profile/>}/>
                    <Route path='/dashboard/my-rides' element={<MyRides/>}/>
                    <Route path='/dashboard/new-ride' element={<NewRide/>}/>
                    <Route path='/dashboard/current-ride' element={<CurrentRide/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

