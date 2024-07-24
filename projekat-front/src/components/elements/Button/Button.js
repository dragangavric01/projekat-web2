import './Button.css';

export default function Button({text}) {
    return (
        <input class="button" type="button" value={text}></input>
    );
}