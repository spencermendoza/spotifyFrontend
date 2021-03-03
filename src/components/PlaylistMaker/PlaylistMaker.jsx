import React, { useContext, useState, useEffect, useRef } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import '../../App.css';


const PlaylistMaker = ({ props }) => {

    let {
        createOption,
        setSelection,
        selectedList,
        changeStateList,
        artistList,
        beginCreateStage,
    } = props;

    let { createPlaylist, associateArtists } = useContext(LibraryContext);
    const playlistNameRef = useRef(null);
    const [list, setList] = useState([]);

    //checks if the selectedList object is an array
    useEffect(() => {
        if (Array.isArray(selectedList)) {
            let sortedList = selectedList.sort();
            setList([...sortedList]);
        }
    }, [selectedList]);

    //clears the selected genre list
    const clearSelection = () => {
        if (createOption === 'create') {
            setSelection('');
        };
        changeStateList([]);
    }

    const removeFromList = (item) => {
        console.log('remove from list? ', item)
        let tempList = selectedList;
        if (tempList.includes(item)) {
            const index = tempList.indexOf(item);
            if (index > -1) {
                tempList.splice(index, 1);
            }
        }
        changeStateList(tempList);
    }

    const findAssociatedArtists = () => {
        let newArtistList = associateArtists(selectedList);
        changeStateList(newArtistList);
    }

    const createNewPlaylist = () => {
        createPlaylist(artistList, playlistNameRef.current.value);
    }

    //This is what is returned if 'createSelection' is set to 'genre'
    const createByGenre = () => {
        return (
            <div className='playlistMaker'>
                <p>Here are your selected genres so far:</p>
                <ul className='playlistMakerList'>
                    {list.map((genre, key) => (
                        <li key={key}>{genre}</li>
                    ))}
                </ul>
                <div className='createButtons'>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            </div>
        )
    }

    //This is what is returned if 'createSelection' is set to 'artist'
    const createByArtist = () => {
        return (
            <div className='playlistMaker'>
                <p>Here are your selected artists so far:</p>
                <ul className='playlistMakerList'>
                    {list.map((artist, key) => (
                        <li key={key} onClick={e => {removeFromList(artist)}}>{artist.name}</li>
                    ))}
                </ul>
                <div className='createButtons'>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => findAssociatedArtists()}>Associate Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            </div>
        )
    }

    //This is what is returned if 'createSelection' is set to 'create'
    const create = () => {
        return (
            <div className='playlistMaker'>
                <p>Here is a list of artists matching your selection:</p>
                <ul className='playlistMakerList'>
                    {artistList.map((artist, key) => (
                        <li key={key}>{artist.name}</li>
                    ))}
                </ul>
                <form className='name-playlist'>
                    <label>Name your playlist:</label>
                    <input type='text' name='Name your playlist' ref={playlistNameRef}></input>
                </form>
                <b>Clicking 'Create' below will create a playlist with these artists</b><br></br>
                <div className='createButtons'>
                    <button onClick={() => createNewPlaylist()}>Create</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div>
            </div>
        )
    }

    //conditional rendering based on if user chose to create by genre
    //or create by artist, or begin the create stage
    const genreOrArtist = () => {
        if (props.createOption === 'artist') {
            return createByArtist();
        } else if (props.createOption === 'genre') {
            return createByGenre();
        } else if (props.createOption === 'create') {
            return create();
        }
    }

    return (
        genreOrArtist()
    );
}

export default PlaylistMaker;