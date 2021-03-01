import React, { useContext, useState } from 'react';
import { LibraryContext } from '../Context/LibraryContext';

const ArtistList = ({ props }) => {

    let { artistLibrary } = useContext(LibraryContext);

    return (
        <p><b>This is the ArtistList component!!</b></p>
    )
}

export default ArtistList;