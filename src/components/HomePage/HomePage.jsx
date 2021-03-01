import React, { Component, useContext, useState } from 'react';
import axios from 'axios';
import { LibraryContext } from '../Context/LibraryContext';
import { Navbar, PlaylistList, UserInfo, Library, Create } from '../../components';

const HomePage = () => {

    const [chosenOption, setChosenOption] = useState('Home');

    const displayOptions = [
        'View My Library',
        'Create',
        'Show User Info',
    ];

    let { artistLibrary } = useContext(LibraryContext);

    // testing setting HomePage state using child components
    const stateSetter = (itemValue) => {
        console.log('HomePage setting state: ', itemValue)
        setChosenOption(itemValue);
    }

    //determines which component to display based on the value stored in state
    const showComponent = () => {
        if (chosenOption === 'View My Library') {
            return <Library />
        } else if (chosenOption === 'Create') {
            return <Create />
        } else if (chosenOption === 'Show User Info') {
            return <UserInfo />
        } else {
            return <h1>Ok, let's get to work!</h1>
        }
    }

    const waitForLibrary = () => {
        if (artistLibrary.length > 0) {
            return (
                <div className='topLevel'>
                    <Navbar displayOptions={displayOptions} returnOption={stateSetter}/>
                    {showComponent()}
                </div>
            );
        } else {
            return <h3>Please hold while I retrieve your music library!</h3>
        }
    }

    return waitForLibrary()
};


export default HomePage;