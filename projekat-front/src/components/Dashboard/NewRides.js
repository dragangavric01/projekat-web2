import './NewRides.css';
import Header from '../elements/Header/Header';
import Navigation from './Navigation';
import Hyperlink, { HyperlinkHandler } from '../elements/Hyperlink/Hyperlink';
import Text from '../elements/Text/Text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { acceptRide, getRegistrationRequestStatus, getRegistrationRequestStatusAndBlocked, getRequestedRides, ResultMetadata } from '../../services/httpService';
import { setIsRideActive } from '../../services/globalStateService';
import { Common, CommonWidth } from './Common';
import { RegistrationRequestStatus } from '../../model/DriverData';
import { BackError, Error } from '../elements/Error/Error';


export function NewRides() {
    const navigate = useNavigate();
    const [requestedRides, setRequestedRides] = useState(null);
    const [resultMetadata, setResultMetadata] = useState(null);
    const [resultMetadataRow, setResultMetadataRow] = useState(null);

    async function getAndSetRequestedRides() {
        setResultMetadata(null);
        const result = await getRequestedRides();
        setResultMetadata(result.metadata);
        setRequestedRides(result.data);
    }

    useEffect(() => {
        getAndSetRequestedRides();

        const intervalId = setInterval(getAndSetRequestedRides, 10000);

        return () => clearInterval(intervalId);    
    }, []);


    var component;
    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        component = <Error resultMetadata={resultMetadata}/>
    } else if (requestedRides == null) {  // not fetched yet
        component = <br/>
    } else if (requestedRides.length == 0) {
        component = <Text content={"There are no new rides."}/>
    } else {
        component = 
            <>
                <BackError resultMetadata={resultMetadataRow}/>
                <NewRidesTable requestedRides={requestedRides} setResultMetadataRow={setResultMetadataRow}/>
            </>
    }

    return (
        <Common
            headerText={"New rides"}

            bottomComponent={component}

            width={CommonWidth.WIDE}
        />
    );
}

function NewRidesTable({requestedRides, setResultMetadataRow}) {
    const [rows, setRows] = useState(null);

    useEffect(() => {
        const rowsList = requestedRides.map(ride => (
            <NewRidesTableRow
                key={ride.rowKey}
                startAddress={ride.startAddress}
                destinationAddress={ride.destinationAddress}
                price={ride.price}
                rowKey={ride.rowKey}
                setResultMetadata={setResultMetadataRow}
            />
        ));
        
        setRows(rowsList);
    }, [requestedRides]);

    
    if (rows == null) {
        return (<br/>);
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

function NewRidesTableRow({startAddress, destinationAddress, price, rowKey, setResultMetadata}) {
    const navigate = useNavigate();

    async function handleAccept() {
        setResultMetadata(null);
        const result1 = await getRegistrationRequestStatusAndBlocked();
        setResultMetadata(result1.metadata);

        if (result1.metadata == ResultMetadata.SUCCESS) {
            setResultMetadata(null);

            if (result1.data.blocked) {
                alert("Admins have blocked you. You can't accept rides.")
            } else if (result1.data.registrationRequestStatus == RegistrationRequestStatus.PENDING) {
                alert("Admins haven't yet accepted your registration request. You can't accept rides until your request is accepted.")
            } else if (result1.data.registrationRequestStatus == RegistrationRequestStatus.DENIED) {
                alert("Admins have denied your registration request. You can't accept rides.")
            } else {
                const result2 = await acceptRide(rowKey);

                setResultMetadata(result2.metadata);

                if (result2.metadata == ResultMetadata.SUCCESS) {
                    setIsRideActive(true);
                    navigate('/dashboard/current-ride', {state: result2.data});
                }
            }
        }
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
