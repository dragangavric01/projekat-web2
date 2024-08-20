import './MyRides.css';
import Navigation from './Navigation';
import Header from '../elements/Header/Header';
import { getUsersRides } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Text from '../elements/Text/Text';
import { Common, CommonWidth } from './Common';


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

    if (rows.length == 0) {
        return (
            <Text content={"There are no rides."}/>
        );
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