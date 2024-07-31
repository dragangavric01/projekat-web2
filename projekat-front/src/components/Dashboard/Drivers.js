import Header from '../elements/Header/Header';
import Hyperlink from '../elements/Hyperlink/Hyperlink';
import {ShowRating} from '../elements/StarRating/StarRating';
import { AdminNavigation } from './Dashboard';
import Text from '../elements/Text/Text';
import './Drivers.css';
import Button from '../elements/Button/Button';


export default function Drivers() {
    return (
        <div>
            <AdminNavigation/>
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
    return (
        <div>
            <AdminNavigation/>
            <div class="driver">
                <div class="driver-center">
                    <DriverData/>
                    
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
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 4
    }, 
    {
        username: "driver1",
        registrationRequestStatus: "Pending",
        isBlocked: true,
        averageRating: 4
    }, 
    {
        username: "driver1",
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 1
    }, 
    {
        username: "driver1",
        registrationRequestStatus: "Pending",
        isBlocked: true,
        averageRating: 4
    }, 
    {
        username: "driver1",
        registrationRequestStatus: "Pending",
        isBlocked: false,
        averageRating: 2
    }, 
    {
        username: "driver1",
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
            <td><Hyperlink text={username} textColor={isBlocked ? "darkred" : "black"} path={"/admin-dashboard/driver"}/></td>
            <td>{registrationRequestStatus}</td>
            <td><ShowRating rating={averageRating}/></td>
        </tr>
    );
}



function DriverData() {
    var registrationRequestStatus = "Pending";
    var blockStatus = "Not blocked";
    
    var registrationRequestStatusButtons;
    if (registrationRequestStatus == "Pending") {
        registrationRequestStatusButtons = <><Button text={"Accept"}/><Button text={"Decline"}/></>
    } else {
        registrationRequestStatusButtons = null;
    }

    var blockStatusButtons;
    if (registrationRequestStatus == "Blocked") {
        blockStatusButtons = <Button text={"Unblock"}/>
    } else {
        blockStatusButtons = <Button text={"Block"}/>
    }

    return (
        <div>
            <DriverField name={"Email:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"Username:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"Password:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"First name:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"Last name:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"Date of birth:"} value="asdfqwerzxcv"/>
            <br/>
            <DriverField name={"Address:"} value="asdfqwerzxcv"/>
            
            <br/>
            <br/>

            <ShowRating rating={3}/>

            <br/>
            <br/>

            <DriverField name={"Registration request status:"} value={registrationRequestStatus}/>
            {registrationRequestStatusButtons}

            <br/>

            <DriverField name={"Block status:"} value={blockStatus}/>
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