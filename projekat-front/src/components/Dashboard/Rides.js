import './Rides.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink';
import Navigation from './Navigation';
import Header from '../elements/Header/Header';
import { RideStatus } from '../../model/Ride';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRides } from '../../services/httpService';
import { Common, CommonWidth } from './Common';
import Text from '../elements/Text/Text';


export default function Rides() {
    const navigate = useNavigate();
    const [rides, setRides] = useState([]);

    async function getAndSetRides() {
        const result = await getRides();
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // error
        }

        setRides(result);
    }

    useEffect(() => {
        getAndSetRides();

        const intervalId = setInterval(getAndSetRides, 10000);

        return () => clearInterval(intervalId);    
    }, []);


    return (
        <Common
            headerText={"Rides"}

            bottomComponent={<RidesTable rides={rides}/>}

            width={CommonWidth.EXTRAWIDE}
        />
    );
}


function RidesTable({rides}) {
    const [rows, setRows] = useState(null);

    function rideStatusToString(status){
        if (status == RideStatus.REQUESTED) {
            return "Requested";
        } else if (status == RideStatus.INPROGRESS) {
            return "In progress";
        } else {
            return "Finished";
        }
    }

    useEffect(() => {
        const rowsList = rides.map(ride => (
            <RidesTableRow 
                startAddress={ride.startAddress} 
                destinationAddress={ride.destinationAddress} 
                price={ride.price} 
                driver={ride.driverUsername}  
                client={ride.clientUsername}  
                status={rideStatusToString(ride.status)}  
                dateAndTime={ride.creationDateAndTime}/>
        ));
        
        setRows(rowsList);
    }, [rides]);


    if (rows == null) {
        return (<br/>);;
    }

    if (rows.length == 0) {
        return (
            <Text content={"There are no rides."}/>
        );
    } 

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
            <th><p>Start address</p></th>
            <th><p>Destination address</p></th>
            <th><p>Price</p></th>
            <th><p>Driver</p></th>
            <th><p>Client</p></th>
            <th><p>Status</p></th>
            <th><p>Date and time</p></th>
        </tr>
    );
}

function RidesTableRow({startAddress, destinationAddress, price, driver, client, status, dateAndTime}) {
    return (
        <tr>
            <td><p>{startAddress}</p></td>
            <td><p>{destinationAddress}</p></td>
            <td><p>{price}$</p></td>
            <td><p>{driver}</p></td>
            <td><p>{client}</p></td>
            <td><p>{status}</p></td>
            <td style={{maxWidth: '240px'}}><p>{dateAndTime}</p></td>
        </tr>
    );
}