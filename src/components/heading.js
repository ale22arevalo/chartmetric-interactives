import React from 'react'
import hoverIcon from '../images/hover-icon.svg'

const Heading = ({ text, level, type }) => {
    let headingElement;
    switch (level) {
        case 1:
            headingElement = <h1>{text}</h1>;
            break;
        case 2:
            headingElement = <h2>{text}</h2>;
            break;
        case 3:
            headingElement = <h3>{type === 'instructions' ? <div><span className='instructions'><img src={hoverIcon}></img>{text}</span></div> : {text}}</h3>;
            break;
        case 4:
            headingElement = <p className='note'>{text}</p>
            break
        default:
            headingElement = <h1>{text}</h1>;
            break;
    }

    return (
        <div className='heading'>
            {headingElement}
        </div>
    );
}

export default Heading