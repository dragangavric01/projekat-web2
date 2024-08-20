import Banner, { BottomBanner } from '../Banner/Banner';
import Header from '../elements/Header/Header';
import './Common.css';
import Navigation from './Navigation';


export const CommonWidth = {
    NORMAL: 0,
    WIDE: 1,
    EXTRAWIDE: 2
}

export function Common({headerText, mainComponent, bottomComponent, noNavigation, width}) {
    var rectangleClass;
    if (width == null || width == CommonWidth.NORMAL) {
        rectangleClass = "rectangle";
    } else if (width == CommonWidth.WIDE) {
        rectangleClass = "rectangle-wide";
    } else {
        rectangleClass = "rectangle-extra-wide";
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
