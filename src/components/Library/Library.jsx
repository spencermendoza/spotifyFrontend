import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import { LibraryContext } from '../Context/LibraryContext';
import { ArtistCard } from '../../components';

const Library = () => {

    const { artistLibrary } = useContext(LibraryContext);

    useEffect(() => {

        console.log('this thing working? ', artistLibrary)

    }, []);


    //Checks if there are items in library in state, if there is shows number of tracks in library
    //and shows a button to view artists. If no artists in library in state, shows a <p>
    //that says 'please hold while I get your tracks'
    const waitingOnAPI = () => {
        if (artistLibrary.length > 0) {
            return (
                <div className='libraryPage'>
                    <h1>Here is your library:</h1>
                    <p>You have {artistLibrary.length} artists in your library</p>
                    <ul className='artistList'>
                        {artistLibrary.map(artist => (
                            <ArtistCard artist={artist} />
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (<p>Please hold while I get your tracks!</p>);
        }
    }

    return waitingOnAPI();
}

export default Library;