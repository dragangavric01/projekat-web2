import Header from '../elements/Header/Header';
import Text from '../elements/Text/Text';
import './CurrentRide.css'
import Navigation from "./Navigation";

export function CurrentRide() {
    return (
        <div>
            <Navigation/>
            <div class="current-ride">
                <div class="current-ride-center">
                    <Header number={1} text="Current ride"/>
                    <br/>
                    <CurrentRideInfo/>
                </div>
            </div>
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
