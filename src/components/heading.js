import React from 'react'
import * as styles from '../styles/styles.css'

const Heading = ({ text, level }) => {
    let headingElement;
    switch (level) {
        case 1:
            headingElement = <h1>{text}</h1>;
            break;
        case 2:
            headingElement = <h2>{text}</h2>;
            break;
        case 3:
            headingElement = <h3><span>{text}</span></h3>;
            break;
        case 4:
            headingElement = <p className='note'>{text}</p>
            break
        default:
            headingElement = <h1>{text}</h1>;
            break;
    }

    return (
        <div className={styles.heading}>
            {headingElement}
        </div>
    );
}

export default Heading