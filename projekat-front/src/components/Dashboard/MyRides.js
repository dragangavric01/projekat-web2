import './MyRides.css';
import {ClientNavigation} from './Dashboard';
import Header from '../elements/Header/Header';


export default function MyRides() {
    return (
        <div>
            <ClientNavigation/>
            <div class="myrides">
                <div class="myrides-center">
                    <Header number={1} text="My rides"/>
                    <br/>
                    <MyRidesTable rides={rides}/>
                </div>
            </div>
        </div>
    );
}


const rides = [
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33
    }
]

function MyRidesTable({rides}) {
    const rows = [];

    rides.forEach((ride) => {
        rows.push(<MyRidesTableRow startAddress={ride.startAddress} destinationAddress={ride.destinationAddress} price={ride.price}/>);
    });

    return (
        <table>
            <thead>
                <MyRidesTableHeader/>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function MyRidesTableHeader() {
    return (
        <tr>
            <th>Start address</th>
            <th>Destination address</th>
            <th>Price</th>
        </tr>
    );
}

function MyRidesTableRow({startAddress, destinationAddress, price}) {
    return (
        <tr>
            <td>{startAddress}</td>
            <td>{destinationAddress}</td>
            <td>{price}</td>
        </tr>
    );
}