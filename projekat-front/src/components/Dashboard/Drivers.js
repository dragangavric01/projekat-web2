import Header from '../elements/Header/Header';
import Hyperlink from '../elements/Hyperlink/Hyperlink';
import {ShowRating} from '../elements/StarRating/StarRating';
import Navigation from './Navigation';
import Text from '../elements/Text/Text';
import './Drivers.css';
import {NavigationButton} from '../elements/Button/Button';
import { useParams } from 'react-router-dom';


export default function Drivers() {
    return (
        <div>
            <Navigation/>
            <div class="drivers">
                <div class="drivers-center">
                    <Header number={1} text="Drivers"/>
                    <br/>
                    <DriverTable drivers={drivers}/>
                </div>
            </div>
        </div>
    );
}

export function Driver() {
    const {driverUsername} = useParams();

    var thisDriver;
    for (var driver of drivers) {
        if (driver.username == driverUsername) {
            thisDriver = driver;
            break;
        }
    }

    return (
        <div>
            <Navigation/>
            <div class="driver">
                <div class="driver-center">
                    <DriverData driver={thisDriver}/>
                    
                    <br/>

                    <p>Treba i profile picture</p>
                </div>
            </div>
        </div>
    );
}


const drivers = [
    {
        username: "driver1",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 4
    }, 
    {
        username: "driver2",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: true,
        averageRating: 4
    }, 
    {
        username: "driver3",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 1
    }, 
    {
        username: "driver4",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: true,
        averageRating: 4
    }, 
    {
        username: "driver5",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 2
    }, 
    {
        username: "driver6",
        email: "asdasdsada",
        password: "asdasdsada",
        firstName: "asdasdsada",
        lastName: "asdasdsada",
        dateofBirth: "asdasdsada",
        address: "asdasdsada",
        registrationRequestStatus: "Pending",
        isBlocked: true,
        averageRating: 4
    }
]

function DriverTable({drivers}) {
    const rows = [];

    drivers.forEach((driver) => {
        rows.push(<DriverTableRow username={driver.username} registrationRequestStatus={driver.registrationRequestStatus} isBlocked={driver.isBlocked} averageRating={driver.averageRating}/>);
    });

    return (
        <table>
            <thead>
                <DriverTableHeader/>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function DriverTableHeader() {
    return (
        <tr>
            <th>Driver</th>
            <th>Registration request</th>
            <th>Average rating</th>
        </tr>
    );
}

function DriverTableRow({username, registrationRequestStatus, isBlocked, averageRating}) {
    return (
        <tr>
            <td><Hyperlink text={username} textColor={isBlocked ? "darkred" : "black"} path={"/dashboard/" + username}/></td>
            <td>{registrationRequestStatus}</td>
            <td><ShowRating rating={averageRating}/></td>
        </tr>
    );
}



function DriverData({driver}) {
    var registrationRequestStatusButtons;
    if (driver.registrationRequestStatus == "Pending") {
        registrationRequestStatusButtons = <><NavigationButton text={"Accept"}/><NavigationButton text={"Decline"}/></>
    } else {
        registrationRequestStatusButtons = null;
    }

    var blockStatusButtons;
    if (driver.isBlocked) {
        blockStatusButtons = <NavigationButton text={"Unblock"}/>
    } else {
        blockStatusButtons = <NavigationButton text={"Block"}/>
    }

    return (
        <div>
            <DriverField name={"Email:"} value={driver.email}/>
            <br/>
            <DriverField name={"Username:"} value={driver.username}/>
            <br/>
            <DriverField name={"Password:"} value={driver.password}/>
            <br/>
            <DriverField name={"First name:"} value={driver.firstName}/>
            <br/>
            <DriverField name={"Last name:"} value={driver.lastName}/>
            <br/>
            <DriverField name={"Date of birth:"} value={driver.dateofBirth}/>
            <br/>
            <DriverField name={"Address:"} value={driver.address}/>
            
            <br/>
            <br/>

            <Text content={"Average rating:"}/>
            <ShowRating rating={driver.averageRating}/>

            <br/>
            <br/>

            <DriverField name={"Registration request status:"} value={driver.registrationRequestStatus}/>
            {registrationRequestStatusButtons}

            <br/>

            <DriverField name={"Block status:"} value={driver.isBlocked ? "Blocked" : "Not blocked"}/>
            {blockStatusButtons}
        </div>
    );
}

function DriverField({name, value}) {
    return (
        <div style={{marginBottom:'20px', display:"inline"}}>
            <Text content={name} />
            <Text content={value}/>
        </div>
    );
}