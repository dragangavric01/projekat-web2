import './NewRide.css';
import Navigation from './Navigation.js';
import Header from '../elements/Header/Header';
import Input, {InputType} from '../elements/Input/Input.js'
import {NavigationButton, ButtonSize} from '../elements/Button/Button.js';
import Text from '../elements/Text/Text.js';
import {Rate} from '../elements/StarRating/StarRating.js'
import {useLocation } from 'react-router-dom';


export default function NewRide() {
    var confirmNewRide = null;

    var entered = useLocation().state;
    if (entered != null && entered) {
        confirmNewRide = <ConfirmNewRide/>
    }

    return (
        <div>
            <Navigation/>
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



function RateDriver() {
    return (
        <div class="newride">
            <div class="newride-center">
                <Header number={1} text="Rate the driver:"/>
                <br/>
                <Rate/>
                <NavigationButton text="Send rating" size={ButtonSize.MEDIUM}/>
                <NavigationButton text="Skip" size={ButtonSize.MEDIUM}/>
            </div>
        </div>
    );
}


function EnterNewRide() {
    return (
        <div>
            <Input name={"Start address"} type={InputType.TEXT}/>
            <Input name={"Destination address"} type={InputType.TEXT}/>
            <NavigationButton text={"Order a taxi"} navigateTo={"/dashboard/new-ride"} state={true} size={ButtonSize.MEDIUM}/>
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
            <NavigationButton text={"Confirm"}  navigateTo={"/dashboard/current-ride"}  size={ButtonSize.SMALL}/>
            <NavigationButton text={"Cancel"} navigateTo={"/dashboard/new-ride"} size={ButtonSize.SMALL}/>
        </div>
    );
}
