import React, { useContext, useState, useEffect, useRef } from 'react';
import { LibraryContext } from '../../Context/LibraryContext';
import { CreateContext } from '../CreateContext/CreateContext';
import { CreateButtons } from '../..';


const PlaylistMaker = () => {

    let { 
        createPlaylist, 
        findArtistsByGenre 
    } = useContext(LibraryContext);

    let {
        selectedList, 
        setSelectedList, 
        setArtistList,
        setCreateOption, 
        changeOption, 
        createOption, 
        clearSelection, 
        artistList
    } = useContext(CreateContext);

    const playlistNameRef = useRef(null);

    const beginCreateStage = () => {
        console.log('this will be a multi part function')
        let newArtistList = selectedList;
        if (createOption === 'genre') {
            console.log('creating by genre')
            newArtistList = findArtistsByGenre(selectedList);
        }
        setArtistList(newArtistList);
        setCreateOption('create');
    }

    //This is what is returned if 'createSelection' is set to 'genre'
    const createByGenre = () => {
        return (
            <div className='playlistMaker'>
                <p>Here are your selected genres so far:</p>
                <ul className='playlistMakerList'>
                    {selectedList.sort().map((genre, key) => (
                        <li key={key} onClick={e => {changeOption(genre)}}>{genre}</li>
                    ))}
                </ul>
                <CreateButtons />
                {/* <div className='createButtons'>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div> */}
            </div>
        )
    }

    //This is what is returned if 'createSelection' is set to 'artist'
    const createByArtist = () => {
        return (
            <div className='playlistMaker'>
                <p>Here are your selected artists so far:</p>
                <ul className='playlistMakerList'>
                    {selectedList.sort((a, b) => (a.name > b.name) ? 1 : -1).map((artist, key) => (
                        <li key={key} onClick={e => {changeOption(artist)}}>{artist.name}</li>
                    ))}
                </ul>
                <CreateButtons />
                {/* <div className='createButtons'>
                    <button onClick={() => beginCreateStage()}>Show Artists</button>
                    <button onClick={() => setSelectedList(associateArtists(selectedList))}>Associate Artists</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div> */}
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
                        <li key={key} onClick={e => {changeOption(artist)}}>{artist.name}</li>
                    ))}
                </ul>
                <form className='name-playlist'>
                    <label>Name your playlist:</label>
                    <input type='text' name='Name your playlist' ref={playlistNameRef}></input>
                </form>
                <b>Clicking 'Create' below will create a playlist with these artists</b><br></br>
                <CreateButtons />
                {/* <div className='createButtons'>
                    <button onClick={() => createPlaylist(artistList, playlistNameRef.current.value)}>Create</button>
                    <button onClick={() => clearSelection()}>Clear selection</button>
                </div> */}
            </div>
        )
    }

    //conditional rendering based on if user chose to create by genre
    //or create by artist, or begin the create stage
    const genreOrArtist = () => {
        if (createOption === 'artist') {
            return createByArtist();
        } else if (createOption === 'genre') {
            return createByGenre();
        } else if (createOption === 'create') {
            return create();
        }
    }

    return (
        genreOrArtist()
    );
}

export default PlaylistMaker;