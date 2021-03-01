import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { LibraryContext } from '../Context/LibraryContext';

const UserInfo = () => {

    const { user } = useContext(LibraryContext);

    const [userInfo, setUser] = useState({});

    // useEffect(() => {
        
    //     async function showUser() {
    //         try {
    //             await axios.get('http://localhost:8888/userinfo').then(response => {
    //                 setUser(response.data);
    //             })
    //         } catch (error) {
    //             if (error) {
    //                 console.log('there was an error on UserInfo: ', error)
    //             }
    //         }
    //     }

    //     if (Object.keys(user) > 0) {
    //         console.log('user passed through state: ', user)
    //         setUser(user);
    //     } else {
    //         showUser();
    //     }
    // }, []);

    const showInfo = (user) => {
        return (
            <ul>
                <li><b>Country:</b> {user.country}</li>
                <li><b>Display Name:</b> {user.display_name}</li>
                <li><b>Email:</b> {user.email}</li>
                <li><b>Subscription Type:</b> {user.product}</li>
            </ul>
        )
    }

    return (
        <div className='userInfo'>
            <h1>This is the current user:</h1>
            {showInfo(user)}
        </div>
    )
}

export default UserInfo;