import './NewRide.css';
import {ClientNavigation} from './Dashboard';
import Header from '../elements/Header/Header';
import Input, {InputType} from '../elements/Input/Input.js'
import Button, {ButtonSize} from '../elements/Button/Button.js';
import Text from '../elements/Text/Text.js';
import StarRating from '../elements/StarRating/StarRating.js'
import {useLocation } from 'react-router-dom';


export default function NewRide() {
    var confirmNewRide = null;

    var entered = useLocation().state;
    if (entered != null && entered) {
        confirmNewRide = <ConfirmNewRide/>
    }

    return (
        <div>
            <ClientNavigation/>
            <div class="newride">
                <div class="newride-center">
                    <Header number={1} text="New ride"/>
                    <div>
                        <EnterNewRide/>
                        <br/>
                        <br/>
                        {confirmNewRide}
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CurrentRide() {
    return (
        <div>
            <ClientNavigation/>
            <div class="newride">
                <div class="newride-center">
                    <Header number={1} text="Current ride"/>
                    <br/>
                    <CurrentRideInfo/>
                </div>
            </div>
        </div>
    );
}

function RateDriver() {
    return (
        <div class="newride">
            <div class="newride-center">
                <Header number={1} text="Rate the driver:"/>
                <br/>
                <StarRating/>
                <Button text="Send rating" size={ButtonSize.MEDIUM}/>
                <Button text="Skip" size={ButtonSize.MEDIUM}/>
            </div>
        </div>
    );
}


function EnterNewRide() {
    return (
        <div>
            <Input name={"Start address"} type={InputType.TEXT}/>
            <Input name={"Destination address"} type={InputType.TEXT}/>
            <Button text={"Order a taxi"} navigateTo={"/dashboard/new-ride"} state={true} size={ButtonSize.MEDIUM}/>
        </div>
    );
}

function ConfirmNewRide() {
    return (
        <div>
            <Text content={"Cost:"}/>
            <Text content={"4.53$"}/>
            <br/>
            <br/>
            <Text content={"Estimated wating time:"}/>
            <Text content={"3 min"}/>
            <br/>
            <Button text={"Confirm"}  navigateTo={"/dashboard/current-ride"}  size={ButtonSize.SMALL}/>
            <Button text={"Cancel"} navigateTo={"/dashboard/new-ride"} size={ButtonSize.SMALL}/>
        </div>
    );
}

function CurrentRideInfo() {
    const rideStarted = false;

    if (rideStarted) {
        return (
            <div>
                <Text content={"Estimated ride duration:"}/>
                <Text content={"15 min"}/>
                <br/>
                <br/>
                <Text content={"Taxi at destination in:"}/>
                <Text content={"14 min"}/>
            </div>
        );
    } else {
        return (
            <div>
                <Text content={"Estimated ride duration:"}/>
                <Text content={"15 min"}/>
                <br/>
                <br/>
                <Text content={"Taxi arriving in:"}/>
                <Text content={"2 min"}/>
            </div>
        );
    }
}
