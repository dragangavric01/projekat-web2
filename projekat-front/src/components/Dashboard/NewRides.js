import './NewRides.css';
import Header from '../elements/Header/Header';
import Navigation from './Navigation';
import Hyperlink, { HyperlinkHandler } from '../elements/Hyperlink/Hyperlink';
import Text from '../elements/Text/Text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { acceptRide, getRequestedRides } from '../../services/httpService';
import { setIsRideActive } from '../../services/globalStateService';
import { Common } from './Common';


export function NewRides() {
    const navigate = useNavigate();
    const [requestedRides, setRequestedRides] = useState([]);

    async function getAndSetRequestedRides() {
        const result = await getRequestedRides();
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // error
        }

        setRequestedRides(result);
    }

    useEffect(() => {
        getAndSetRequestedRides();

        const intervalId = setInterval(getAndSetRequestedRides, 10000);

        return () => clearInterval(intervalId);    
    }, []);

    return (
        <Common
            headerText={"New rides"}

            bottomComponent={<NewRidesTable requestedRides={requestedRides}/>}

            wide={true}
        />
    );
}

function NewRidesTable({requestedRides}) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const rowsList = requestedRides.map(ride => (
            <NewRidesTableRow
                key={ride.rowKey}
                startAddress={ride.startAddress}
                destinationAddress={ride.destinationAddress}
                price={ride.price}
                rowKey={ride.rowKey}
            />
        ));
        
        setRows(rowsList);
    }, [requestedRides]);


    if (rows.length == 0) {
        return (
            <Text content={"There are no new rides."}/>
        );
    } 

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
            <th><p>Start address</p></th>
            <th><p>Destination address</p></th>
            <th><p>Price</p></th>
            <th><p>Accept ride</p></th>
        </tr>
    );
}

function NewRidesTableRow({startAddress, destinationAddress, price, rowKey}) {
    const navigate = useNavigate();

    async function handleAccept() {
        const result = await acceptRide(rowKey);
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // error
        }
        
        setIsRideActive(true);
        navigate('/dashboard/current-ride', {state: result});
    }

    return (
        <tr>
            <td><p>{startAddress}</p></td>
            <td><p>{destinationAddress}</p></td>
            <td><p>{price}$</p></td>
            <td><HyperlinkHandler text={"Accept"} handlerFunction={handleAccept}/></td>
        </tr>
    );
}
