import React, { useContext } from 'react';
import { LibraryContext } from '../../Context/LibraryContext';
import { CreateContext } from '../CreateContext/CreateContext';

const CreateSelections = () => {

    let { artistLibrary, compileGenres } = useContext(LibraryContext);
    let { createOption, setCreateOption, setList, setSelectedList } = useContext(CreateContext);


    const beginCreating = (selection, newList) => {
        setList(newList);
        setCreateOption(selection);
        setSelectedList([]);
    }

    return (
        <div className="createSelections">
            <button onClick={() => beginCreating('genre', compileGenres(artistLibrary))}>Create by genre</button>
            <button onClick={() => beginCreating('artist', artistLibrary)}>Create by artist</button>
        </div>
    );
}

export default CreateSelections;