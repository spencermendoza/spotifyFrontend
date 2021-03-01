import React, { useContext, useState } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import { CreateSelections, GenreList, PlaylistMaker, ArtistList} from '../../components';


const Create = () => {

    let { findArtistsByGenre } = useContext(LibraryContext);
    const [createOption, setCreateOption] = useState('');
    const [list, setList] = useState([]);
    const [artistList, setArtistList] = useState([]);

    //simply sets the selected option in state,
    //this is passed down to <CreateSelections />
    const setSelection = (selection) => {
        console.log('creating by: ', selection);
        setCreateOption(selection);
    }

    //just a function that sets the list stored in state
    const changeStateList = (array) => {
        setList([...array]);
    }

    //starts the process of creating the playlist. will have more
    //steps in the future maybe
    const beginCreateStage = () => {
        console.log('this will be a multi part function')
        if (createOption === 'genre') {
            console.log('creating by genre')
            setArtistList(findArtistsByGenre(list));
        }
        setCreateOption('create');
    }

    //makes it easier to pass props as there are four
    //of them so far and they were taking up too much horizontal space lol
    const props = {
        createOption: createOption,
        setSelection: setSelection,
        selectedGenres: list,
        changeStateList: changeStateList,
        artistList: artistList,
        beginCreateStage: beginCreateStage,
    }

    //determines which createOption is selected and renders
    //appropriate component based on selection
    const displayCreateMenu = () => {
        if (createOption === 'genre') {
            return (
                <div className='cbGenre'>
                    <GenreList props={props}/>
                    <PlaylistMaker props={props}/>
                </div>
            );
        } else if (createOption === 'artist') {
            return (
                <div className='cbArtist'>
                    <ArtistList />
                    <PlaylistMaker props={props}/>
                </div>
            );
        } else if (createOption === 'create') {
            return (
                <div className='create'>
                    <PlaylistMaker props={props}/>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Use this page to create playlists based on all the genres present in your library or by one or multiple artists present in your library.</p>
                    <p>Make a selection to continue.</p>
                </div>
            );
        }
    }

    return (
        <div className='createPage'>
            <h1>Create a playlist:</h1>
            <CreateSelections setSelection={setSelection}/>
            {displayCreateMenu()}
        </div>
    );
}

export default Create;