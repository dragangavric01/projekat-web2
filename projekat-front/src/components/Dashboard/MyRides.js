import './MyRides.css';
import Navigation from './Navigation';
import Header from '../elements/Header/Header';
import { getUsersRides, ResultMetadata } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Text from '../elements/Text/Text';
import { Common, CommonWidth } from './Common';
import { Error } from '../elements/Error/Error';


export default function MyRides() {
    const navigate = useNavigate()

    const [rides, setRides] = useState(null);
    const [resultMetadata, setResultMetadata] = useState(null);

    useEffect(() => {
        getUsersRides().then(result => {
            setResultMetadata(result.metadata);
            setRides(result.data);
        });
    }, []);


    var component;
    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        component = <Error resultMetadata={resultMetadata}/>
    } else if (rides == null) {  // not fetched yet
        component = <br/>
    } else if (rides.length == 0) {
        component = <Text content={"You have no rides."}/>
    } else {
        component = <MyRidesTable rides={rides}/>
    }

    return (
        <Common
            headerText={"My rides"}

            bottomComponent={component}

            width={CommonWidth.WIDE}
        />
    );
}

function MyRidesTable({rides}) {
    const [rows, setRows] = useState(null);

    useEffect(() => {
        const rowsList = rides.map(ride => (
            <MyRidesTableRow
                startAddress={ride.startAddress}
                destinationAddress={ride.destinationAddress}
                price={ride.price}
                dateAndTime={ride.creationDateAndTime}
            />
        ));
        
        setRows(rowsList);
    }, [rides]);


    if (rows == null) {
        return (<br/>);
    }

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
            <th><p>Start address</p></th>
            <th><p>Destination address</p></th>
            <th><p>Price</p></th>
            <th><p>Date and time</p></th>
        </tr>
    );
}

function MyRidesTableRow({startAddress, destinationAddress, price, dateAndTime}) {
    return (
        <tr>
            <td><p>{startAddress}</p></td>
            <td><p>{destinationAddress}</p></td>
            <td><p>{price}$</p></td>
            <td style={{maxWidth: '240px'}}><p>{dateAndTime}</p></td>
        </tr>
    );
}