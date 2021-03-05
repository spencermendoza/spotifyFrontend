import React, { useContext, useEffect, useState} from 'react';
import { CreateContext } from '../CreateContext/CreateContext';

const Checkbox = (props) => {

    let { item } = props;

    let { selectedList, changeOption, createOption } = useContext(CreateContext);
    let checked = false;
    let name = typeof item === 'object' ? item.name : item;

    if (selectedList.includes(item)) {
        checked = true;
    }

    return (
        <li>
            <label>
                <input type='checkbox' checked={checked} value={name} onChange={e => changeOption(item)} />{name}
            </label>
        </li>
    );
}

export default Checkbox;