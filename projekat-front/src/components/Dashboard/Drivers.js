import Header from '../elements/Header/Header';
import Hyperlink, { HyperlinkHandler } from '../elements/Hyperlink/Hyperlink';
import {ShowRating} from '../elements/StarRating/StarRating';
import Navigation from './Navigation';
import Text from '../elements/Text/Text';
import './Drivers.css';
import {HandlerButton, NavigationButton} from '../elements/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptDriversRegistrationRequest, blockDriver, denyDriversRegistrationRequest, getDriver, getDrivers, getDriversAverageRating, ResultMetadata, unblockDriver } from '../../services/httpService';
import { Common, CommonWidth } from './Common';
import { useEffect, useState } from 'react';
import {RegistrationRequestStatus} from '../../model/DriverData'
import Output from '../elements/Output/Output';
import { BackError, Error } from '../elements/Error/Error';


export default function Drivers() {
    const navigate = useNavigate();

    const [drivers, setDrivers] = useState(null);
    const [resultMetadata, setResultMetadata] = useState(null);

    async function getAndSetDrivers() {
        setResultMetadata(null);
        const result = await getDrivers();
        setResultMetadata(result.metadata);
        setDrivers(result.data);
    }

    useEffect(() => {
        getAndSetDrivers();

        const intervalId = setInterval(getAndSetDrivers, 10000);

        return () => clearInterval(intervalId);    
    }, []);


    var component;
    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        component = <Error resultMetadata={resultMetadata}/>
    } else if (drivers == null) {  // not fetched yet
        component = <br/>
    } else if (drivers.length == 0) {
        component = <Text content={"There are no drivers."}/>
    } else {
        component = <DriversTable drivers={drivers}/>
    }

    return (
        <Common
            headerText={"Drivers"}

            bottomComponent={component}

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
    var linkColor;
    if (isBlocked) {
        linkColor = "darkred";
    } else {
        linkColor = "darkblue";
    }

    return (
        <tr>
            <td><Hyperlink text={username} path={'/dashboard/drivers/' + username} textColor={linkColor}/></td>
            <td><p>{registrationRequestStatus}</p></td>
        </tr>
    );
}


export function Driver() {
    const {driverUsername} = useParams();
    const navigate = useNavigate();

    const [resultMetadata1, setResultMetadata1] = useState(null);
    const [resultMetadata2, setResultMetadata2] = useState(null);
    const [driver, setDriver] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [denied, setDenied] = useState(false);
    const [blockedUpdated, setBlockedUpdated] = useState(false);

    useEffect(() => {
        setResultMetadata1(null);
        setResultMetadata2(null);

        getDriver(driverUsername).then(result1 => {
            setResultMetadata1(result1.metadata);
            setDriver(result1.data);
        });

        getDriversAverageRating(driverUsername).then(result2 => {
            setResultMetadata2(result2.metadata);
            setAverageRating(result2.data);
        });
    }, []);

    useEffect(() => {
        if (accepted) {
            const newDriver = JSON.parse(JSON.stringify(driver));
            newDriver.registrationRequestStatus = RegistrationRequestStatus.ACCEPTED;
            setDriver(newDriver);

            setAccepted(false);
        } else if (denied) {
            const newDriver = JSON.parse(JSON.stringify(driver));
            newDriver.registrationRequestStatus = RegistrationRequestStatus.DENIED;
            setDriver(newDriver);

            setDenied(false);
        } else if (blockedUpdated) {
            const newDriver = JSON.parse(JSON.stringify(driver));

            if (driver.blocked) {
                newDriver.blocked = false;
            } else {
                newDriver.blocked = true;
            }
            setDriver(newDriver);
            
            setBlockedUpdated(false);
        }
    }, [accepted, denied, blockedUpdated]);


    async function handleAccept() {
        setResultMetadata1(null);

        const result = await acceptDriversRegistrationRequest(driverUsername);

        setResultMetadata1(result);
        setAccepted(true);
    }

    async function handleDeny() {
        setResultMetadata1(null);
        const result = await denyDriversRegistrationRequest(driverUsername);

        setResultMetadata1(result);
        setDenied(true);
    }

    async function handleBlock() {
        setResultMetadata1(null);
        const result = await blockDriver(driverUsername);
        
        setResultMetadata1(result);
        setBlockedUpdated(true);
    }

    async function handleUnblock() {
        setResultMetadata1(null);
        const result = await unblockDriver(driverUsername);

        setResultMetadata1(result);
        setBlockedUpdated(true);
    }


    if (resultMetadata1 != null && resultMetadata1 != ResultMetadata.SUCCESS) {
        return (
            <Common bottomComponent={<BackError resultMetadata={resultMetadata1}/>}/>
        );
    } else if (resultMetadata2 != null && resultMetadata2 != ResultMetadata.SUCCESS) {
        return (
            <Common bottomComponent={<BackError resultMetadata={resultMetadata2}/>}/>
        );
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
    if (driver.blocked) {
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