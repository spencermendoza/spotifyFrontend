import React, { useContext, useState } from 'react';
import { LibraryContext } from '../../Context/LibraryContext';
import { CreateContext } from '../CreateContext/CreateContext';
import { CreateSelections, GenreList, PlaylistMaker, ArtistList} from '../..';


const Create = () => {

    // let { findArtistsByGenre, compileGenres, artistLibrary } = useContext(LibraryContext);
    let { createOption, } = useContext(CreateContext);

    // const [createOption, setCreateOption] = useState('');
    const [list, setList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);

    //simply sets the selected option in state,
    //this is passed down to <CreateSelections />
    // const setSelection = (selection) => {
    //     console.log('creating by: ', selection);
    //     setCreateOption(selection);
    // }

    //just a function that sets the list stored in state
    const changeStateList = (array) => {
        setList([...array]);
    }

    //starts the process of creating the playlist. will have more
    //steps in the future maybe
    // const beginCreateStage = () => {
    //     console.log('this will be a multi part function')
    //     if (createOption === 'genre') {
    //         console.log('creating by genre')
    //         let artistList = findArtistsByGenre(list);
    //         setList(artistList);
    //         // setArtistList(findArtistsByGenre(list));
    //     }
    //     setCreateOption('create');
    // }

    // const genreProps = {
    //     genreList: compileGenres(artistLibrary),
    //     changeStateList: changeStateList,
    //     selectedList: list,
    // }

    // const playlistMakerProps = {
    //     createOption: createOption,
    //     setSelection: setSelection,
    //     selectedList: list,
    //     changeStateList: changeStateList,
    //     beginCreateStage: beginCreateStage,
    // }

    //makes it easier to pass props as there are four
    //of them so far and they were taking up too much horizontal space lol
    // const props = {
    //     createOption: createOption,
    //     setSelection: setSelection,
    //     selectedList: list,
    //     changeStateList: changeStateList,
    //     // artistList: artistList,
    //     beginCreateStage: beginCreateStage,
    // }

    //determines which createOption is selected and renders
    //appropriate component based on selection
    const displayCreateMenu = () => {
        if (createOption === 'genre') {
            return (
                <div className='create'>
                    <GenreList />
                    <PlaylistMaker />
                </div>
            );
        } else if (createOption === 'artist') {
            return (
                <div className='create'>
                    <ArtistList />
                    <PlaylistMaker />
                </div>
            );
        } else if (createOption === 'create') {
            return (
                <div className='create'>
                    <PlaylistMaker />
                </div>
            )
        } else {
            return (
                <div className='createPage'>
                    <p>Use this page to create playlists based on all the genres present in your library or by one or multiple artists present in your library.</p>
                    <p>Make a selection to continue.</p>
                </div>
            );
        }
    }

    return (
        <div className='createPage'>
            <div className='createHead'>
                <h1>Create a playlist</h1>
                <CreateSelections />
            </div>
            {displayCreateMenu()}
        </div>
    );
}

export default Create;