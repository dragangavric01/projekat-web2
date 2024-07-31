import './NewRides.css';
import Header from '../elements/Header/Header';
import {DriverNavigation} from './Dashboard';
import Hyperlink from '../elements/Hyperlink/Hyperlink';
import Text from '../elements/Text/Text';


export function NewRides() {
    return (
        <div>
            <DriverNavigation/>
            <div class="newrides">
                <div class="newrides-center">
                    <Header number={1} text="New rides"/>
                    <br/>
                    <NewRidesTable rides={rides}/>
                </div>
            </div>
        </div>
    );
}

export function CurrentRideDriver() {
    return (
        <div>
            <DriverNavigation/>
            <div class="newrides">
                <div class="newrides-center">
                    <Header number={1} text="Current ride"/>
                    <br/>
                    <CurrentRideInfo/>
                </div>
            </div>
        </div>
    );
}


const rides = [
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.64
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.64
    }, 
    {
        startAddress: "Filipa Visnica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.64
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.64
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.64
    }
]

function NewRidesTable({rides}) {
    const rows = [];

    rides.forEach((ride) => {
        rows.push(<NewRidesTableRow startAddress={ride.startAddress} destinationAddress={ride.destinationAddress} price={ride.price}/>);
    });

    return (
        <table>
            <thead>
                <NewRidesTableHeader/>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function NewRidesTableHeader() {
    return (
        <tr>
            <th>Start address</th>
            <th>Destination address</th>
            <th>Price</th>
            <th>Accept ride</th>
        </tr>
    );
}

function NewRidesTableRow({startAddress, destinationAddress, price}) {
    return (
        <tr>
            <td>{startAddress}</td>
            <td>{destinationAddress}</td>
            <td>{price}</td>
            <td><Hyperlink text={"Accept"} path={"/driver-dashboard/current-ride"}/></td>
        </tr>
    );
}

function CurrentRideInfo() {
    const rideStarted = false;

    if (rideStarted) {
        return (
            <div>
                <Text content={"Estimated ride duration:"}/>
                <Text content={"15 min"}/>
                <br/>
                <br/>
                <Text content={"Taxi at destination in:"}/>
                <Text content={"14 min"}/>
            </div>
        );
    } else {
        return (
            <div>
                <Text content={"Estimated ride duration:"}/>
                <Text content={"15 min"}/>
                <br/>
                <br/>
                <Text content={"Taxi arriving in:"}/>
                <Text content={"2 min"}/>
            </div>
        );
    }
}
