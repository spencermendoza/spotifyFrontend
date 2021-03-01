import React, { useState, useEffect } from 'react';

const Navbar = ({displayOptions, returnOption, }) => {

    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        if (displayOptions) {
            setOptions(displayOptions);
        }
    }, [])

    return (
        <ul className='navbar'>
            {options.map((item, i) => (
                <li key={i} onClick={() => {returnOption(item)}}>{item}</li>
            ))}
        </ul>
    );
}

export default Navbar;