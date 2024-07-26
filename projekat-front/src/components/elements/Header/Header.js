import './Header.css';

export default function Header({text, number}) {
    if (number == 1) {
        return (
            <h1>{text}</h1>
        );
    } else if (number == 2) {
        return (
            <h2>{text}</h2>
        );
    } else if (number == 3) {
        return (
            <h3>{text}</h3>
        );
    } else if (number == 4) {
        return (
            <h4>{text}</h4>
        );
    } else if (number == 5) {
        return (
            <h5>{text}</h5>
        );
    } else if (number == 6) {
        return (
            <h6>{text}</h6>
        );
    } else {
        return null;
    }
}
