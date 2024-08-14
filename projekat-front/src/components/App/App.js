import './App.css';
import LogIn from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import Profile from '../Dashboard/Profile.js';
import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom'
import MyRides from '../Dashboard/MyRides.js';
import NewRide, {CurrentRideClient} from '../Dashboard/NewRide.js';
import {NewRides, CurrentRideDriver} from '../Dashboard/NewRides.js';
import Rides from '../Dashboard/Rides.js';
import Drivers, { Driver } from '../Dashboard/Drivers.js';
import { CurrentRide } from '../Dashboard/CurrentRide.js';
import Dashboard from '../Dashboard/Dashboard.js';
import { clearGlobalState, getRole, getToken, setRole } from '../../services/globalStateService.js';
import Text from '../elements/Text/Text.js';
import { UserRole } from '../../model/User.js';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/register' element={<Register/>}/>

                <Route path='/dashboard' element={<ProtectedRoute component={<Dashboard/>}/>}/>
                <Route path='/dashboard/profile' element={<ProtectedRoute component={<Profile/>}/>}/>

                <Route path='/dashboard/my-rides' element={<ProtectedRoute component={<MyRides/>} requiredRole={UserRole.CLIENT} alternateRole={UserRole.Driver}/>}/>
                <Route path='/dashboard/rides' element={<ProtectedRoute component={<Rides/>} requiredRole={UserRole.ADMIN}/>}/>

                <Route path='/dashboard/drivers' element={<ProtectedRoute component={<Rides/>} requiredRole={UserRole.ADMIN}/>}/>
                <Route path='/dashboard/:driverUsername' element={<ProtectedRoute component={<Driver/>} requiredRole={UserRole.ADMIN}/>}/>

                <Route path='/dashboard/new-ride' element={<ProtectedRoute component={<NewRide/>} requiredRole={UserRole.CLIENT}/>}/>
                <Route path='/dashboard/new-rides' element={<ProtectedRoute component={<NewRides/>} requiredRole={UserRole.DRIVER}/>}/>
                <Route path='/dashboard/current-ride' element={<ProtectedRoute component={<CurrentRide/>} requiredRole={UserRole.CLIENT} alternateRole={Driver}/>}/>
            </Routes>
        </BrowserRouter>
    );
}


function ProtectedRoute({component, requiredRole, alternateRole}) {
    const role = getRole();

    if (role == null) {
        return (<LogIn/>);
    } 

    if (requiredRole != null && (role != requiredRole && role != alternateRole)) {
        return (<Text content={"Unauthorized access"}/>);
    }

    return component;
}


