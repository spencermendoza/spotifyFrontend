import React,  { useContext, } from 'react';
import { CreateContext } from '../CreateContext/CreateContext';


const GenreList = () => {

    let { list, selectedList, changeOption } = useContext(CreateContext);

    //simple component that creates a li with a label
    //for the genre and a checkbox that determines
    //if the item is selected or not
    const Checkbox = (genre, key) => {
        var checked = null;
        if (selectedList.includes(genre.genre)) {
            checked = true;
        };
        return (
            <li key={key}>
                <label>
                    <input type='checkbox' checked={checked} value={genre.genre} onChange={e => changeOption(genre.genre)} />{genre.genre}
                </label>
            </li>
        )
    }

    return (
        <ul className='list'>
            {list.map((genre, i) => (
                <Checkbox genre={genre} key={i} />
            ))}
        </ul>
    );
}

export default GenreList;