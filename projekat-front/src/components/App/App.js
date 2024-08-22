import './App.css';
import LogIn, { LogOut } from '../LogIn/LogIn.js';
import Register from '../Register/Register.js';
import Profile from '../Dashboard/Profile.js';
import { EditProfile } from '../Dashboard/EditProfile.js';
import {BrowserRouter,Routes, Route, useNavigate, useLocation, Navigate} from 'react-router-dom'
import MyRides from '../Dashboard/MyRides.js';
import NewRide, {ConfirmRide, CurrentRide, CurrentRideClient, CurrentRideWait} from '../Dashboard/NewRide.js';
import {NewRides, CurrentRideDriver} from '../Dashboard/NewRides.js';
import Rides from '../Dashboard/Rides.js';
import Drivers, { Driver } from '../Dashboard/Drivers.js';
import Dashboard from '../Dashboard/Dashboard.js';
import { clearGlobalState, getIsRideActive, setIsRideActive, getRole, getRoleFromToken, getToken, setRole } from '../../services/globalStateService.js';
import Text from '../elements/Text/Text.js';
import { UserRole } from '../../model/User.js';
import { useEffect } from 'react';
import { ButtonSize, HandlerButton } from '../elements/Button/Button.js';


export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/log-in' element={<LogIn/>}/>

                <Route path='' element={<ProtectedRoute component={<Dashboard/>}/>}/>
                <Route path='/dashboard' element={<ProtectedRoute component={<Dashboard/>}/>}/>
                <Route path='/dashboard/profile' element={<ProtectedRoute component={<Profile/>}/>}/>
                <Route path='/dashboard/edit-profile' element={<ProtectedRoute component={<EditProfile/>}/>}/>

                <Route path='/dashboard/my-rides' element={<ProtectedRoute component={<MyRides/>} requiredRole={UserRole.CLIENT} alternateRole={UserRole.DRIVER}/>}/>
                <Route path='/dashboard/rides' element={<ProtectedRoute component={<Rides/>} requiredRole={UserRole.ADMIN}/>}/>

                <Route path='/dashboard/drivers' element={<ProtectedRoute component={<Drivers/>} requiredRole={UserRole.ADMIN}/>}/>
                <Route path='/dashboard/drivers/:driverUsername' element={<ProtectedRoute component={<Driver/>} requiredRole={UserRole.ADMIN}/>}/>

                <Route path='/dashboard/new-ride' element={<ProtectedRoute component={<NewRide/>} requiredRole={UserRole.CLIENT}/>}/>
                <Route path='/dashboard/new-rides' element={<ProtectedRoute component={<NewRides/>} requiredRole={UserRole.DRIVER}/>}/>
                <Route path='/dashboard/current-ride' element={<ProtectedRoute component={<CurrentRide/>} requiredRole={UserRole.CLIENT} alternateRole={UserRole.DRIVER} rideActiveRestriction={true}/>}/>
            </Routes>
        </BrowserRouter>
    );
}


function ProtectedRoute({component, requiredRole, alternateRole, rideActiveRestriction}) {
    const navigate = useNavigate();
    const token = getToken();
    const role = getRoleFromToken(token);

    function goBack() {
        navigate(-1);
    }

    if (token == null) {
        return (<Navigate to="/log-in"/>);
    } 

    if (requiredRole != null && role != requiredRole) {
        if (alternateRole == null || (alternateRole != null && role != alternateRole)) {
            return (
                <div style={{textAlign: 'center', marginTop: '100px'}}>
                    <Text content={"Unauthorized access"} bold={true}/>
                    <br/>
                    <br/>
                    <HandlerButton text={"Go back"} size={ButtonSize.MEDIUM} handler={goBack}/>
                </div>
            );
        }
    }

    const isRideActive = getIsRideActive();    
    if (rideActiveRestriction) {
        if (!isRideActive) {
            return (
                <div style={{textAlign: 'center', marginTop: '100px'}}>
                    <Text content={"There is no active ride"} bold={true}/>
                    <br/>
                    <br/>
                    <HandlerButton text={"Go back"} size={ButtonSize.MEDIUM} handler={goBack}/>
                </div> 
            );
        }
    } else if (isRideActive) {
        setIsRideActive(false);
    }

    if (role == UserRole.DRIVER) {

    }

    return component;
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
