import './NewRide.css';
import Navigation from './Navigation.js';
import Header from '../elements/Header/Header';
import Input, {InputType} from '../elements/Input/Input.js'
import {NavigationButton, ButtonSize, HandlerButton} from '../elements/Button/Button.js';
import Text from '../elements/Text/Text.js';
import {Rate} from '../elements/StarRating/StarRating.js'
import {Navigate, useLocation, useNavigate } from 'react-router-dom';
import { cancelRide, confirmRide, getRideStatus, orderRide, rateDriver, ResultMetadata } from '../../services/httpService.js';
import { useEffect, useState } from 'react';
import Output from '../elements/Output/Output.js';
import { RideStatus } from '../../model/Ride.js';
import { UserRole } from '../../model/User.js';
import { getIsRideActive, getRoleFromToken, getToken, setIsRideActive } from '../../services/globalStateService.js';
import { Common } from './Common.js';
import { BackError, FrontError } from '../elements/Error/Error.js';


export default function NewRide() {
    const [resultMetadata, setResultMetadata] = useState(null);
    const [validationText, setValidationText] = useState(null);

    const [startAddress, setStartAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [price, setPrice] = useState(null);
    const [waitTime, setWaitTime] = useState(null);
    const [duration, setDuration] = useState(null);

    const handleStartAddressChange = (event) => {setStartAddress(event.target.value); };
    const handleDestinationAddressChange = (event) => {setDestinationAddress(event.target.value); };

    async function handleOrder() {
        setValidationText(null);
        setResultMetadata(null);

        if (startAddress == "" || destinationAddress == "") {
            setValidationText("All fields must be filled.");
        } else {
            const addresses = {
                startAddress: startAddress,
                destinationAddress: destinationAddress
            }
    
            // No longer need it so it shouldn't waste memory
            setStartAddress(null);
            setDestinationAddress(null);
    
            const result = await orderRide(addresses);
    
            setResultMetadata(result.metadata);
    
            if (result.metadata == ResultMetadata.SUCCESS) {
                setPrice(result.data.price);
                setWaitTime(result.data.waitTime);
            }
        }
    }

    async function handleConfirm() {
        setValidationText(null);
        setResultMetadata(null);
        const result = await confirmRide();

        setResultMetadata(result.metadata);

        if (result.metadata == ResultMetadata.SUCCESS) {
            setDuration(result.data);
            setPrice(null);
        }
    }

    async function handleCancel() {
        setValidationText(null);
        setResultMetadata(null);
        const result = await cancelRide();

        setResultMetadata(result.metadata);

        setPrice(null);
        setWaitTime(null);
    }


    var component;
    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        component = <Common bottomComponent={<BackError resultMetadata={resultMetadata}/>}/>
    } else if (duration != null) {
        component = <CurrentRideWait waitTime={waitTime} duration={duration}/>
    } else if (waitTime != null) {
        component = <ConfirmRide price={price} waitTime={waitTime} confirmRideHandler={handleConfirm} cancelRideHandler={handleCancel}/>
    } else {
        component = <OrderRide handleStartAddressChange={handleStartAddressChange} handleDestinationAddressChange={handleDestinationAddressChange} handleOrder={handleOrder} validationText={validationText}/>
    }

    return (
        <>
            {component}
        </>
    );
}


function OrderRide({handleStartAddressChange, handleDestinationAddressChange, handleOrder, validationText}) {
    return (
        <Common
            headerText={"New ride"}

            mainComponent={
                <>
                    <Input name={"Start address"} type={InputType.TEXT} handleChangeFunction={handleStartAddressChange}/>
                    <Input name={"Destination address"} type={InputType.TEXT} handleChangeFunction={handleDestinationAddressChange}/>
                </>
            }

            bottomComponent={
                <>
                    <FrontError text={validationText}/>
                    <br/>
                    <HandlerButton text={"Order a taxi"} size={ButtonSize.MEDIUM} handler={handleOrder}/>
                </>
            }
        />
    );
}

function ConfirmRide({price, waitTime, confirmRideHandler, cancelRideHandler}) {
    return (
        <Common
            headerText={"New ride"}

            mainComponent={
                <>
                   <Output name={"Price"} value={price + "$"}/>
                   <Output name={"Estimated waiting time"} value={periodToString(waitTime)}/>
                </>
            }

            bottomComponent={
                <>
                    <br/>
                    <div className='horizontally-aligned-buttons'>
                        <HandlerButton text={"Confirm"} size={ButtonSize.MEDIUM} handler={confirmRideHandler}/>
                        <HandlerButton text={"Cancel"} size={ButtonSize.MEDIUM} handler={cancelRideHandler}/>
                    </div>
                </>
            }
        />
    );
}

function CurrentRideWait({waitTime, duration}) {
    const navigate = useNavigate();

    const [resultMetadata, setResultMetadata] = useState(null);

    async function navigateToCurrentRide() {
        setResultMetadata(null);
        const result = await getRideStatus();

        setResultMetadata(result.metadata);

        if (result.metadata == ResultMetadata.SUCCESS) {
            if (result.data == RideStatus.INPROGRESS) {
                setIsRideActive(true);
                navigate('/dashboard/current-ride', {state: {waitTime: waitTime, duration: duration}});
            }
        }
    }

    useEffect(() => {
        navigateToCurrentRide();

        const intervalId = setInterval(navigateToCurrentRide, 1000);

        return () => clearInterval(intervalId);    
    }, []);


    if (resultMetadata != null && resultMetadata != ResultMetadata.SUCCESS) {
        return (
            <Common bottomComponent={<BackError resultMetadata={resultMetadata}/>}/>
        );
    }

    return (
        <Common
            headerText={"Current ride"}

            mainComponent={
                <Text content={"Waiting for a driver to accept the ride..."}/>
            }

            disableNavigation={true}
        />
    );
}


export function CurrentRide() {
    const waitTimeAndDuration = useLocation().state;
    const [waitTimeCounter, setWaitTimeCounter] = useState(waitTimeAndDuration.waitTime);
    const [durationCounter, setDurationCounter] = useState(waitTimeAndDuration.duration);

    function decrementCounter(counterPeriod) {
        const decrementedCounter = {minutes: counterPeriod.minutes, seconds: counterPeriod.seconds};

        if (decrementedCounter.seconds > 0) {
            decrementedCounter.seconds--;
        } else  {
            decrementedCounter.minutes--;
            decrementedCounter.seconds = 59;
        } 

        return decrementedCounter;
    }


    useEffect(() => {
        if (!isCounterZero(waitTimeCounter)) {
            const timer = setTimeout(() => {
                const currentWaitTimeCounter = decrementCounter(waitTimeCounter);
                setWaitTimeCounter(currentWaitTimeCounter);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (!isCounterZero(durationCounter)) {
            const timer = setTimeout(() => {
                const currentDurationCounter = decrementCounter(durationCounter);
                setDurationCounter(currentDurationCounter);
            }, 1000);
            
            return () => clearTimeout(timer);
        } 
    }, [waitTimeCounter.minutes, waitTimeCounter.seconds, durationCounter.minutes, durationCounter.seconds]);

    var component;
    if (!isCounterZero(durationCounter)) {
        component = <ShowCounter waitTimeCounter={waitTimeCounter} durationCounter={durationCounter}/>
    } else if (getRoleFromToken(getToken()) == UserRole.CLIENT) {
        component = <RateDriver/>
    } else {
        component = <RideFinished/>
    }

    return (
        <Common
            headerText={"Current ride"}

            bottomComponent={component}

            disableNavigation={true}
        />
    );
}

function ShowCounter({waitTimeCounter, durationCounter}) {
    if (!isCounterZero(waitTimeCounter)) {
        return (
            <Output name={"Taxi at start address in"} value={periodToString(waitTimeCounter)}/>
        );
    } else {
        return (
            <Output name={"Taxi at destination address in"} value={periodToString(durationCounter)}/>
        );
    }
}

function RateDriver() {
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [validationText, setValidationText] = useState(null);

    async function handleSendRating() {
        setValidationText(null);
        if (rating == null || rating == 0) {
            setValidationText("Rating was not chosen.");
        } else {
            await rateDriver(rating);
            navigate("/dashboard/my-rides");
        }
    }

    function handleExit() {
        navigate("/dashboard/my-rides");
    }

    setIsRideActive(false);

    return (
        <>
            <Text content="Ride is finished."/>
            <br/>
            <br/>
            <br/>
            <Text content={"Rate the driver:"}/>
            <Rate rating={rating} setRating={setRating}/>
            <FrontError text={validationText}/>
            <br/>
            <div className='horizontally-aligned-buttons'>
                <HandlerButton text="Send rating" size={ButtonSize.MEDIUM} handler={handleSendRating}/>
                <HandlerButton text="Exit" size={ButtonSize.MEDIUM} handler={handleExit}/>
            </div>
        </>
    );
}

function RideFinished() {
    const navigate = useNavigate();

    function handleExit() {
        navigate("/dashboard/my-rides");
    }

    setIsRideActive(false);

    return (
        <>
            <Text content="Ride is finished."/>
            <br/>
            <br/>
            <HandlerButton text="Exit" size={ButtonSize.MEDIUM} handler={handleExit}/>
        </>
    );
}


function periodToString(period) {
    return period.minutes + "min" + " " + period.seconds + "s";
}

function isCounterZero(counterPeriod) {
    return !(counterPeriod.minutes > 0 || counterPeriod.seconds > 0);
}