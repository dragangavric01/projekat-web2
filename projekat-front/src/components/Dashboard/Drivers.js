import Header from '../elements/Header/Header';
import Hyperlink, { HyperlinkHandler } from '../elements/Hyperlink/Hyperlink';
import {ShowRating} from '../elements/StarRating/StarRating';
import Navigation from './Navigation';
import Text from '../elements/Text/Text';
import './Drivers.css';
import {HandlerButton, NavigationButton} from '../elements/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getDriver, getDrivers, getDriversAverageRating } from '../../services/httpService';
import { Common, CommonWidth } from './Common';
import { useEffect, useState } from 'react';
import {RegistrationRequestStatus} from '../../model/DriverData'
import Output from '../elements/Output/Output';


export default function Drivers() {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);

    async function getAndSetDrivers() {
        const result = await getDrivers();
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // error
        }

        setDrivers(result);
    }

    useEffect(() => {
        getAndSetDrivers();

        const intervalId = setInterval(getAndSetDrivers, 10000);

        return () => clearInterval(intervalId);    
    }, []);


    return (
        <Common
            headerText={"Drivers"}

            bottomComponent={<DriversTable drivers={drivers}/>}

            width={CommonWidth.NORMAL}
        />
    );
}

function DriversTable({drivers}) {
    const [rows, setRows] = useState(null);

    useEffect(() => {
        const rowsList = drivers.map(driver => (
            <DriversTableRow
                username={driver.username}
                registrationRequestStatus={registrationRequestStatusToString(driver.registrationRequestStatus)}
                isBlocked={driver.blocked}
            />
        ));
        
        setRows(rowsList);
    }, [drivers]);


    if (rows == null) {
        return (<br/>);
    }

    if (rows.length == 0) {
        return (
            <Text content={"There are no drivers."}/>
        );
    } 

    return (
        <table>
            <thead>
                <DriversTableHeader/>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function DriversTableHeader() {
    return (
        <tr>
            <th><p>Driver</p></th>
            <th><p>Registration request status</p></th>
        </tr>
    );
}

function DriversTableRow({username, registrationRequestStatus, isBlocked}) {
    return (
        <tr>
            <td><Hyperlink text={username} path={'/dashboard/drivers/' + username}/></td>
            <td><p>{registrationRequestStatus}</p></td>
        </tr>
    );
}


export function Driver() {
    const {driverUsername} = useParams();
    const navigate = useNavigate();

    const [driver, setDriver] = useState(null);
    const [averageRating, setAverageRating] = useState(null);

    function checkResponse(result) {
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // show error
        }
    }

    useEffect(() => {
        getDriver(driverUsername).then(result => {
            checkResponse(result);
            setDriver(result);
        });

        getDriversAverageRating(driverUsername).then(result => {
            checkResponse(result);
            setAverageRating(result);
        });
    }, []);

    function handleAccept() {

    }

    function handleDeny() {

    }

    function handleBlock() {

    }

    function handleUnblock() {

    }


    if (driver == null || averageRating == null) return(
        <Navigation/>
    );

    var registrationRequestButtons;
    if (driver.registrationRequestStatus == RegistrationRequestStatus.PENDING) {
        registrationRequestButtons = 
            <>
                <HandlerButton text={"Accept"} handler={handleAccept}/>
                <HandlerButton text={"Deny"} handler={handleDeny}/>
            </>
    } else {
        registrationRequestButtons = null;
    }

    var blockingSection;
    if (driver.isBlocked) {
        blockingSection = 
            <>
                <Text content={"Driver is blocked."}/>
                <HandlerButton text={"Unblock"} handler={handleUnblock}/>
            </>
    } else {
        blockingSection = 
            <>
                <Text content={"Driver is not blocked."}/>
                <HandlerButton text={"Block"} handler={handleBlock}/>
            </>
    }


    return(
        <div>
            <Navigation/>
            <div className='driver-profile'>
                <div class="driver-profile-container">
                    <div class="driver-profile-picture">
                        <img src={"data:image/jpeg;base64," + driver.picture}  alt='No picture'/>
                    </div>
                    <div class="driver-profile-info">
                        <Header number={1} text="Driver's data"/>

                        <br/>
                        <br/>

                        <Output name={"Username"} value={driver.username}  />
                        <Output name={"Email"} value={driver.email} />
                        <Output name={"First name"} value={driver.firstName} />
                        <Output name={"Last name"} value={driver.lastName} />
                        <Output name={"Date of birth"} value={driver.dateOfBirth}/>
                        <Output name={"Address"} value={driver.address} />     

                        {averageRating != 0 && <>
                                <br/>
                                <Output name={"Average rating"} value={averageRating}/>
                            </>
                        }

                        <br/>
                        <br/>

                        <Output name={"Registration request status"} value={registrationRequestStatusToString(driver.registrationRequestStatus)} noPadding={true}/>
                        {registrationRequestButtons}

                        <br/>
                        <br/>
                        <br/>

                        {blockingSection}

                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}


function registrationRequestStatusToString(registrationRequestStatus) {
    if (registrationRequestStatus == RegistrationRequestStatus.ACCEPTED) {
        return "Accepted";
    } else if (registrationRequestStatus == RegistrationRequestStatus.PENDING) {
        return "Pending";
    } else {
        return "Denied"
    }
}