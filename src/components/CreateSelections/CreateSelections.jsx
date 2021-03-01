import React, { useState, useContext } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import { GenreDrop, ArtistList } from '../../components';

const CreateSelections = ({setSelection}) => {

    // let { setCreateState } = useContext(LibraryContext);

    return (
        <div>
            <button onClick={() => setSelection('genre')}>Create by genre</button>
            <button onClick={() => setSelection('artist')}>Create by artist</button>
        </div>
    );
}

export default CreateSelections;