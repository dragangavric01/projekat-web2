import './Rides.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink';
import { AdminNavigation } from './Dashboard';
import Header from '../elements/Header/Header';


export default function Rides() {
    return (
        <div>
            <AdminNavigation/>
            <div class="rides">
                <div class="rides-center">
                    <Header number={1} text="Rides"/>
                    <br/>
                    <RidesTable rides={rides}/>
                </div>
            </div>
        </div>
    );
}



const rides = [
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33,
        driver: "driver1",
        client: "client1",
        status: "finished",
        dateAndTime: "21.04.2024. 17:33"
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33,
        driver: "driver1",
        client: "client1",
        status: "finished",
        dateAndTime: "21.04.2024. 17:33"
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33,
        driver: "driver1",
        client: "client1",
        status: "finished",
        dateAndTime: "21.04.2024. 17:33"
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33,
        driver: "driver1",
        client: "client1",
        status: "finished",
        dateAndTime: "21.04.2024. 17:33"
    }, 
    {
        startAddress: "Filipa Visnjica 21",
        destinationAddress: "Gavrila Principa 43",
        price: 5.33,
        driver: "driver1",
        client: "client1",
        status: "finished",
        dateAndTime: "21.04.2024. 17:33"
    }
]

function RidesTable({rides}) {
    const rows = [];

    rides.forEach((ride) => {
        rows.push(<RidesTableRow startAddress={ride.startAddress} destinationAddress={ride.destinationAddress} price={ride.price} driver={ride.driver}  client={ride.client}  status={ride.status}  dateAndTime={ride.dateAndTime}/>);
    });

    return (
        <table>
            <thead>
                <RidesTableHeader/>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function RidesTableHeader() {
    return (
        <tr>
            <th>Start address</th>
            <th>Destination address</th>
            <th>Price</th>
            <th>Driver</th>
            <th>Client</th>
            <th>Status</th>
            <th>Date and time</th>
        </tr>
    );
}

function RidesTableRow({startAddress, destinationAddress, price, driver, client, status, dateAndTime}) {
    return (
        <tr>
            <td>{startAddress}</td>
            <td>{destinationAddress}</td>
            <td>{price}</td>
            <td>{driver}</td>
            <td>{client}</td>
            <td>{status}</td>
            <td>{dateAndTime}</td>
        </tr>
    );
}