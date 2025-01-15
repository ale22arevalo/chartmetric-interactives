import React from 'react'
import hoverIcon from '../images/hover-icon.svg'

const Heading = ({ text, level, type, textColor }) => {
    let headingElement;
    switch (level) {
        case 1:
            headingElement = <h1 style={{color:textColor}}>{text}</h1>;
            break;
        case 2:
            headingElement = <h2 style={{color:textColor}}>{text}</h2>;
            break;
        case 3:
            headingElement = <h3 style={{color:textColor}}>{type === 'instructions' ? <div><span className='instructions'><img src={hoverIcon} style={{color:textColor}}></img>{text}</span></div> : {text}}</h3>;
            break;
        case 4:
            headingElement = <p className='note' style={{color:textColor}}>{text}</p>
            break
        default:
            headingElement = <h1 style={{color:textColor}}>{text}</h1>;
            break;
    }

    return (
        <div className='heading'>
            {headingElement}
        </div>
    );
}

export default Heading