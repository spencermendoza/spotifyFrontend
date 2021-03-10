import React, { useContext } from 'react';
import { CreateContext } from '../CreateContext/CreateContext';
import { LibraryContext } from '../../Context/LibraryContext';

const CreateButtons = (props) => {

    let {
        selectedList,
        createOption,
        clearSelection,
        setSelectedList,
        associateArtists,
        findArtistsByGenre,
        setArtistList,
        beginCreateStage,
        goBack,
    } = useContext(CreateContext);

    let {
        artistLibrary,
    } = useContext(LibraryContext);
    
    //switches the PlaylistMaker display back and forth between
    //'default-genre' and 'default-artist' and filters the
    //appropriate data to display what it should be displaying
    const toggleArtists = () => {
        console.log('toggling: ', props.display)
        if (props.display === 'default-genre') {
            let artistList = findArtistsByGenre(selectedList, artistLibrary);
            setArtistList(artistList);
            props.setDisplay('default-artist');
        } else if (props.display === 'default-artist') {
            props.setDisplay('default-genre');
        }
    };

    const whichOption = () => {
        if (createOption === 'genre') {
            return (
                <div className='createButtons'>
                    <button onClick={() => toggleArtists()}>{props.display === 'default-genre' ? 'Show Artists' : 'Show Selected Genres'}</button>
                    <button onClick={() => beginCreateStage(artistLibrary)}>Show Playlist</button>
                    <button onClick={() => {clearSelection(); props.setDisplay('default-genre')}}>Clear Selection</button>
                </div>
            );
        } else if (createOption === 'artist') {
            return (
                <div className='createButtons'>
                    <button onClick={() => setSelectedList(associateArtists(selectedList, artistLibrary))}>Associate Artists</button>
                    <button onClick={() => beginCreateStage(artistLibrary)}>Show Playlist</button>
                    <button onClick={() => {clearSelection()}}>Clear Selection</button>
                </div>
            );
        } else if (createOption === 'create') {
            return (
                <div className='createButtons'>
                    <button onClick={() => props.beginPlaylist()}>Create</button>
                    <button onClick={() => goBack()}>Go Back</button>
                    <button onClick={() => {clearSelection()}}>Clear Selection</button>
                </div>
            );
        };
    };

    return whichOption();
};

export default CreateButtons;