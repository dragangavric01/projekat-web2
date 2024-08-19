import './MyRides.css';
import Navigation from './Navigation';
import Header from '../elements/Header/Header';
import { getUsersRides } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Text from '../elements/Text/Text';
import { Common } from './Common';


export default function MyRides() {
    const navigate = useNavigate()

    const [rides, setRides] = useState(null);

    function checkResponse(result) {
        if (result == 'error') {
            // show error
        } else if (result == 'token expired') {
            navigate('/log-in');
        } else if (result == null) {
            // show error
        }
    }

    useEffect(() => {
        getUsersRides().then(result => {
            checkResponse(result);
            setRides(result);
        });
    }, []);

    var component;
    if (rides == null) {
        component = <Text content={"You have no rides."}/>
    } else {
        component = <MyRidesTable/>
    }

    return (
        <Common
            headerText={"My rides"}

            bottomComponent={component}

            wide={true}
        />
    );
}

function MyRidesTable({rides}) {
    const rows = [];

    rides.forEach((ride) => {
        rows.push(<MyRidesTableRow startAddress={ride.startAddress} destinationAddress={ride.destinationAddress} price={ride.price}  dateAndTime={ride.dateAndTime}/>);
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
            <th>Date and time</th>
        </tr>
    );
}

function MyRidesTableRow({startAddress, destinationAddress, price, dateAndTime}) {
    return (
        <tr>
            <td>{startAddress}</td>
            <td>{destinationAddress}</td>
            <td>{price}</td>
            <td>{dateAndTime}</td>
        </tr>
    );
}