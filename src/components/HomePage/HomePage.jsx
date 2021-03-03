import React, { Component, useContext, useState } from 'react';
import axios from 'axios';
import { LibraryContext } from '../Context/LibraryContext';
import { Navbar, PlaylistList, UserInfo, Library, Create } from '../../components';

const HomePage = () => {

    let { artistLibrary, display } = useContext(LibraryContext);

    //determines which component to display based on the value stored in state
    const showComponent = () => {
        if (display === 'My Library') {
            return <Library />
        } else if (display === 'Create') {
            return <Create />
        } else if (display === 'User Info') {
            return <UserInfo />
        } else if (display === 'Base') {
            return (
                <div className='instructions'>
                    <h1>Ok, let's get to work!</h1>
                    <p>Make a selection above to get started</p>
                </div>
            )
        }
    }

    const waitForLibrary = () => {
        if (artistLibrary.length > 0) {
            return (
                <div className='homeDiv'>
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