import React,  { useState, useEffect, useContext, } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import '../../App.css';


const GenreList = ({ props }) => {

    let {
        createOption,
        changeStateList,
        selectedList,
    } = props;

    let { artistLibrary, compileGenres } = useContext(LibraryContext);
    const [genres, setGenres] = useState([]);

    //simply aggregates a list of all genres present in the 
    //artistLibrary stored in LibraryContext
    useEffect(() => {
        let genreCompiler = compileGenres(artistLibrary)
        setGenres(genreCompiler);
    }, [createOption]);

    //checks if passed option is already on the selectedGenre list. 
    //if it is, removes option from list.
    //if it is not, adds option to list.
    const changeOption = (option) => {
        let tempGenreList = selectedList;
        if (tempGenreList.includes(option.genre)) {
            const index = tempGenreList.indexOf(option.genre);
            if (index > -1) {
                tempGenreList.splice(index, 1);
            }
        } else {
            tempGenreList.push(option.genre);
        }
        changeStateList(tempGenreList);
    }

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
                    <input type='checkbox' checked={checked} value={genre.genre} onChange={e => changeOption(genre)} />{genre.genre}
                </label>
            </li>
        )
    }

    return (
        <ul className='list'>
            {genres.map((genre, i) => (
                <Checkbox genre={genre} key={i} />
            ))}
        </ul>
    );
}

export default GenreList;