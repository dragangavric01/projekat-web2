import './StarRating.css'
import { useState } from 'react';
import Text from '../Text/Text';

export function Rate({rating, setRating}) {
    const [hover, setHover] = useState(0);

     return (
        <div className='rate'>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button type="button" key={index} className={index <= (hover || rating) ? "on" : "off"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}

export function ShowRating({rating}) {
    return (
        <div className='show-rating'>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button type="button" key={index} className={index <= (rating) ? "on" : "off"}>
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}