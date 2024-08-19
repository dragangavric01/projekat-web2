import './Output.css';
import Text from '../Text/Text';


export default function Output({name, value}) {
    return (
        <div style={{paddingBottom: '15px'}}>
            <Text content={name + ":"} bold={true}/>
            <Text content={value} leftMargin={'5px'}/>
        </div>  
    );
}