import React, { useContext, useState } from 'react';
import { CreateContext } from '../CreateContext/CreateContext';
import { LibraryContext } from '../../Context/LibraryContext';

const CreateButtons = () => {

    let [keepTrack, setKeepTrack] = useState(false);

    let {
        selectedList,
        createOption,
        clearSelection,
        setSelectedList,
        associateArtists,
    } = useContext(CreateContext);

    let {
        artistLibrary,
    } = useContext(LibraryContext);

    // console.log(artistLibrary)

    const whichOption = () => {
        if (createOption === 'genre') {
            return (
                <div className='createButtons'>
                    <button>Show Artists</button>
                    <button>Show Playlist</button>
                    <button onClick={() => {clearSelection()}}>Clear Selection</button>
                </div>
            );
        } else if (createOption === 'artist') {
            return (
                <div className='createButtons'>
                    <button onClick={() => setSelectedList(associateArtists(selectedList, artistLibrary))}>Associate Artists</button>
                    <button>Show Playlist</button>
                    <button onClick={() => {clearSelection()}}>Clear Selection</button>
                </div>
            );
        } else if (createOption === 'create') {
            return (
                <div className='createButtons'>
                    <button>Create Playlist</button>
                    <button>Go Back</button>
                    <button onClick={() => {clearSelection()}}>Clear Selection</button>
                </div>
            );
        };
    };

    return (
        whichOption()
    )
};

export default CreateButtons;