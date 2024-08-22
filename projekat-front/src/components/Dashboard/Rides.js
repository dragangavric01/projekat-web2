import './Rides.css';
import Hyperlink, {HyperlinkSize} from '../elements/Hyperlink/Hyperlink';
import Navigation from './Navigation';
import Header from '../elements/Header/Header';
import { RideStatus } from '../../model/Ride';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRides, ResultMetadata } from '../../services/httpService';
import { Common, CommonWidth } from './Common';
import Text from '../elements/Text/Text';
import { Error } from '../elements/Error/Error';


export default function Rides() {
    const navigate = useNavigate();
    const [rides, setRides] = useState(null);
    const [resultMetadata, setResultMetadata] = useState(null);

    async function getAndSetRides() {
        setResultMetadata(null);
        const result = await getRides();
        setResultMetadata(result.metadata);
        setRides(result.data);
    }

    useEffect(() => {
        getAndSetRides();

        const intervalId = setInterval(getAndSetRides, 10000);

        return () => clearInterval(intervalId);    
    }, []);


    var component;
    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        component = <Error resultMetadata={resultMetadata}/>
    } else if (rides == null) {  // not fetched yet
        component = <br/>
    } else if (rides.length == 0) {
        component = <Text content={"There are no rides."}/>
    } else {
        component = <RidesTable rides={rides}/>
    }

    return (
        <Common
            headerText={"Rides"}

            bottomComponent={component}

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