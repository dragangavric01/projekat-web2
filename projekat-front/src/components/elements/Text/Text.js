import './Text.css';


export default function Text({content, bold, leftMargin}) {
    if (leftMargin == null) {
        leftMargin = '0px';
    }

    if (bold != null) {
        return (
            <p className="bold-text" style={{marginLeft: leftMargin}}>{content}</p>
        );
    } 

    return (
        <p className="text" style={{marginLeft: leftMargin}}>{content}</p>
    );
}