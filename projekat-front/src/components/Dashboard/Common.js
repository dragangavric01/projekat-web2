import Banner, { BottomBanner } from '../Banner/Banner';
import Header from '../elements/Header/Header';
import './Common.css';
import Navigation from './Navigation';


export function Common({headerText, mainComponent, bottomComponent, noNavigation, wide}) {
    var rectangleClass;
    if (wide) {
        rectangleClass = "rectangle-wide";
    } else {
        rectangleClass = "rectangle";
    }

    var topComponent;
    if (noNavigation) {
        topComponent = <Banner/>;
    } else {
        topComponent = <Navigation/>;
    }

    return (
        <div>
            {topComponent}
            <div className="center-rectangle">
                <div className={rectangleClass}>
                    <br/>
                    <Header number={1} text={headerText}/>
                    <br/>
                    <br/>
                    <div>
                        {mainComponent}
                    </div>
                    {bottomComponent}
                </div>
            </div>
        </div>
    );
}
