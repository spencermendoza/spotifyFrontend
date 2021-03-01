import React, { useContext, useState, useEffect, useRef } from 'react';
import { LibraryContext } from '../Context/LibraryContext';

const PlaylistMaker = ({ props }) => {

    let {
        createOption,
        setSelection,
        selectedGenres,
        changeStateList,
        artistList,
        beginCreateStage,
    } = props;

    let { createPlaylist } = useContext(LibraryContext);
    const playlistNameRef = useRef(null);
    const [genreList, setGenreList] = useState([]);

    //checks if the selectedGenres object is an array
    useEffect(() => {
        if (Array.isArray(selectedGenres)) {
            let sortedList = selectedGenres.sort();
            setGenreList([...sortedList]);
        }
    }, [selectedGenres]);

    //clears the selected genre list
    const clearSelection = () => {
        if (createOption === 'create') {
            setSelection('');
        };
        changeStateList([]);
    }

    const createNewPlaylist = () => {
        createPlaylist(artistList, playlistNameRef.current.value);
    }

    //conditional rendering based on if user chose to create by genre
    //or create by artist, or begin the create stage
    const genreOrArtist = () => {
        if (props.createOption === 'artist') {
            return (
                <div className='playlistMaker'>
                    <p>This will be the PlaylistMaker using the 'Artist' selection</p>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            )
        } else if (props.createOption === 'genre') {
            return (
                <div className='playlistMaker'>
                    <p>Here are your selected genres so far:</p>
                    <ul>
                        {genreList.map((genre, key) => (
                            <li key={key}>{genre}</li>
                        ))}
                    </ul>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            )
        } else if (props.createOption === 'create') {
            return (
                <div className='playlistMaker'>
                    <p>Here is a list of artists matching your selection:</p>
                    <ul>
                        {artistList.map((artist, key) => (
                            <li key={key}>{artist.name}</li>
                        ))}
                    </ul>
                    <form className='name-playlist'>
                        <label>Name your playlist!</label>
                        <input type='text' name='Name your playlist' ref={playlistNameRef}></input>
                    </form>
                    <b>Clicking 'Create' below will create a playlist with these artists.</b><br></br>
                    <button onClick={() => createNewPlaylist()}>Create</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            )
        }
    }

    return (
        genreOrArtist()
    );
}

export default PlaylistMaker;