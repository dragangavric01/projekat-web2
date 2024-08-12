import './NewRides.css';
import Header from '../elements/Header/Header';
import Navigation from './Navigation';
import Hyperlink from '../elements/Hyperlink/Hyperlink';
import Text from '../elements/Text/Text';


export function NewRides() {
    return (
        <div>
            <Navigation/>
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
            <td><Hyperlink text={"Accept"} path={"/dashboard/current-ride"}/></td>
        </tr>
    );
}
