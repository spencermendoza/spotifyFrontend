import React, { useState, useEffect } from 'react';
import { LibraryContext } from '../../Context/LibraryContext';
import '../../../App.css';
import icon from '../../../img/Spotify_Icon_RGB_Black.png';

const ArtistItem = ({artist}) => {

    let [numOfTracks, setNumOfTracks] = useState(0);
    let { name, music, images } = artist;

    useEffect(() => {
        formatArtist();
    }, [artist]);

    const formatArtist = () => {
        music.forEach(album => {
            setNumOfTracks(numOfTracks + album.tracks.length)
        })
        if (images.length === 0) {
            images.push({url: icon});
        }
    }


    return (
        <tr className='singleArtist'>
            <td><img className='artistImage' src={images[0] ? images[0].url : icon} /></td>
            <td><b>{name}</b></td>
            <td>{music.length}</td>
            <td>{numOfTracks}</td>
        </tr>
    );
}

export default ArtistItem;